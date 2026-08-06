// Smooth Lerping Mouse Follower Trailer
const blob = document.querySelector(".blob");
if (blob) {
  let curX = window.innerWidth / 2;
  let curY = window.innerHeight / 2;
  let tgX = curX;
  let tgY = curY;

  window.addEventListener("mousemove", (e) => {
    tgX = e.clientX;
    tgY = e.clientY;
  });

  function animateTrailer() {
    // Linear interpolation: curVal = curVal + (targetVal - curVal) * easeRate
    curX += (tgX - curX) * 0.08;
    curY += (tgY - curY) * 0.08;
    blob.style.transform = `translate(-50%, -50%) translate3d(${curX}px, ${curY}px, 0)`;
    requestAnimationFrame(animateTrailer);
  }

  // Start the animation loop
  animateTrailer();
}

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector("i") : null;
const navbar = document.getElementById("navbar");

if (mobileMenuBtn && mobileMenu && navbar) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const isOpen = !mobileMenu.classList.contains("hidden");
    if (menuIcon) {
      menuIcon.className = isOpen ? "fas fa-times text-xl" : "fas fa-bars text-xl";
    }
    
    // Solid background and border when mobile menu is open
    if (isOpen) {
      navbar.classList.add("bg-black/95", "backdrop-blur-md", "border-white/10");
      navbar.classList.remove("bg-transparent", "border-transparent");
    } else if (window.scrollY <= 20) {
      navbar.classList.remove("bg-black/95", "bg-black/80", "backdrop-blur-md", "border-white/10");
      navbar.classList.add("bg-transparent", "border-transparent");
    }
  });
}

// Smooth scrolling for anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      if (mobileMenu && navbar) {
        mobileMenu.classList.add("hidden");
        if (menuIcon) menuIcon.className = "fas fa-bars text-xl";
        if (window.scrollY <= 20) {
          navbar.classList.remove("bg-black/95", "bg-black/80", "backdrop-blur-md", "border-white/10");
          navbar.classList.add("bg-transparent", "border-transparent");
        }
      }

      // Smooth scroll to target with offset
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar scroll visual state transition
if (navbar) {
  window.addEventListener("scroll", () => {
    // If mobile menu is open, auto-close it on scroll to prevent overlay block
    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      if (menuIcon) menuIcon.className = "fas fa-bars text-xl";
    }

    if (window.scrollY > 20) {
      navbar.classList.add("bg-black/80", "backdrop-blur-md", "border-white/10");
      navbar.classList.remove("bg-transparent", "border-transparent");
    } else {
      // Only transition back to transparent if the mobile menu is closed
      const isMenuOpen = mobileMenu && !mobileMenu.classList.contains("hidden");
      if (!isMenuOpen) {
        navbar.classList.remove("bg-black/80", "bg-black/95", "backdrop-blur-md", "border-white/10");
        navbar.classList.add("bg-transparent", "border-transparent");
      }
    }
  });
}

// Intersection Observer for scroll entrance animations (reveal)
const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards";
      // Unobserve once animated
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

// Observe all fade-in targets
document.querySelectorAll(".card-hover, .skill-card, .project-card").forEach((el) => {
  el.style.opacity = "0";
  revealObserver.observe(el);
});

// Scroll spy for active navbar link highlighting
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const spyOptions = {
  threshold: 0.3,
  rootMargin: "-80px 0px -40% 0px"
};

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, spyOptions);

sections.forEach((section) => {
  spyObserver.observe(section);
});

// Custom Toast Notification System (Single active toast to prevent clutter)
function showToast(message, iconClass = "fas fa-check-circle") {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  } else {
    // Clear previous toasts so they don't stack up
    toastContainer.innerHTML = "";
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Fast auto dismiss after 1.8 seconds
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
      if (toastContainer && toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    }, 300);
  }, 1800);
}

// Contact Form submission handling with Toast Alert
const contactForm = document.querySelector("#contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Retrieve values
    const name = document.getElementById("name")?.value || "there";

    // Showcase custom Toast Notification
    showToast(`Thank you, ${name}! Your message has been sent successfully.`, "fas fa-paper-plane");

    // Reset the form values
    this.reset();
  });
}

// Wire up Download CV simulation
const downloadCvBtn = document.getElementById("download-cv-btn");
if (downloadCvBtn) {
  downloadCvBtn.addEventListener("click", () => {
    showToast("Preparing curriculum vitae... Download started!", "fas fa-file-download");
    // Simulate direct download path trigger
    const link = document.createElement("a");
    link.href = "./Vikram Somai 2026  (1).pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Wire up Hire Me sticky button
const floatingHire = document.querySelector(".fixed.bottom-6.right-6 button");
if (floatingHire) {
  floatingHire.addEventListener("click", () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
      showToast("Let's build something great together!", "fas fa-handshake");
    }
  });
}

// Top Scroll Progress Bar Listener (Optimized with RAF)
let scrollProgressTicking = false;
window.addEventListener("scroll", () => {
  if (!scrollProgressTicking) {
    window.requestAnimationFrame(() => {
      const scrollProgress = document.getElementById("scroll-progress");
      if (scrollProgress && window._custProgressEnabled !== false) {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        scrollProgress.style.width = `${progress}%`;
      }
      scrollProgressTicking = false;
    });
    scrollProgressTicking = true;
  }
});

// Typewriter Cycling Title Effect
function initTypewriter() {
  const roleEl = document.getElementById("typewriter-role");
  if (!roleEl) return;

  const roles = [
    "Full Stack Developer",
    "React & Angular Specialist",
    "Node.js Engineer",
    "Software Engineer"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      roleEl.textContent = currentRole.substring(0, charIdx);
    } else {
      charIdx++;
      roleEl.textContent = currentRole.substring(0, charIdx);
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Theme Accent Color Switcher
function initThemeSwitcher() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "emerald";
  document.body.setAttribute("data-theme", savedTheme);

  document.querySelectorAll("[data-theme-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-btn");
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("portfolio-theme", theme);
      showToast(`Accent theme changed to ${theme.toUpperCase()}!`, "fas fa-palette");
    });
  });
}

// Interactive CLI Developer Terminal
function initDeveloperTerminal() {
  const terminalInput = document.getElementById("terminal-input");
  const terminalBody = document.getElementById("terminal-body");
  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: "Available commands: <span class='text-emerald-400 font-bold'>whoami</span>, <span class='text-emerald-400 font-bold'>skills</span>, <span class='text-emerald-400 font-bold'>projects</span>, <span class='text-emerald-400 font-bold'>experience</span>, <span class='text-emerald-400 font-bold'>contact</span>, <span class='text-emerald-400 font-bold'>clear</span>",
    whoami: "Vikram Somai - Full Stack Developer with 2.5+ years of experience based in Surat, India. MCA Graduate.",
    skills: "Languages: C/C++, Java, JS, TS, PHP, SQL | Frontend: React, Angular, Vue, Tailwind | Backend: Node.js, NestJS, Express, GraphQL, MongoDB, MySQL",
    projects: "Featured Projects: PixoraWave (pixorawave.com), JSON Flow AI (jsonflowai.com), HealthCare Dashboard, Dorsan Filtration India, Design Declares Clone, Gen Spark Academy",
    experience: "2.5+ Years Full Stack Experience & MCA in Computer Science",
    contact: "Email: vikramsomai23@outlook.com | LinkedIn: /in/vikramsomai | GitHub: github.com/vikramsomai"
  };

  function executeCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();

    // Create prompt line
    const promptLine = document.createElement("div");
    promptLine.className = "terminal-line";
    promptLine.innerHTML = `<span class="terminal-prompt">guest@vikramsomai:~$</span> <span class="terminal-command">${cmd}</span>`;
    terminalBody.appendChild(promptLine);

    if (trimmed === "clear") {
      terminalBody.innerHTML = "";
      return;
    }

    const outputLine = document.createElement("div");
    outputLine.className = "terminal-line";

    if (commands[trimmed]) {
      outputLine.innerHTML = `<span class="terminal-output">${commands[trimmed]}</span>`;
    } else if (trimmed === "") {
      outputLine.innerHTML = "";
    } else {
      outputLine.innerHTML = `<span class="text-red-400">Command not found: '${trimmed}'. Type 'help' for available commands.</span>`;
    }

    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = terminalInput.value;
      executeCommand(val);
      terminalInput.value = "";
    }
  });

  // Wire shortcut buttons
  document.getElementById("term-btn-help")?.addEventListener("click", () => executeCommand("help"));
  document.getElementById("term-btn-skills")?.addEventListener("click", () => executeCommand("skills"));
  document.getElementById("term-btn-projects")?.addEventListener("click", () => executeCommand("projects"));
}

// Category Filter Pills
function initProjectFilters() {
  const filterBtns = document.querySelectorAll("#projects-filter .filter-pill");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Subtle 3D Card Tilt Effect (Optimized with cached dimensions)
function init3DTilt() {
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach((card) => {
    let rect = null;

    card.addEventListener("mouseenter", () => {
      rect = card.getBoundingClientRect();
    });

    card.addEventListener("mousemove", (e) => {
      if (window._custTiltEnabled === false) return;
      if (!rect) rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      rect = null;
    });
  });
}

// Project Quick View Modal Dialog
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeModalBtn = document.getElementById("close-modal-btn");

  if (!modal || !modalContent) return;

  document.querySelectorAll(".modal-open-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = btn.getAttribute("data-project-title");
      const cat = btn.getAttribute("data-project-cat");
      const desc = btn.getAttribute("data-project-desc");
      const tags = btn.getAttribute("data-project-tags") ? btn.getAttribute("data-project-tags").split(",") : [];
      const github = btn.getAttribute("data-project-github");
      const demo = btn.getAttribute("data-project-demo");

      modalContent.innerHTML = `
        <div class="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full mb-3">${cat}</div>
        <h3 class="text-2xl font-bold text-white mb-3">${title}</h3>
        <p class="text-gray-300 text-sm leading-relaxed mb-6">${desc}</p>
        <div class="mb-6">
          <h4 class="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Technologies Used</h4>
          <div class="flex flex-wrap gap-2">
            ${tags.map((t) => `<span class="text-xs bg-white/10 text-emerald-300 px-2.5 py-1 rounded-md font-mono">${t}</span>`).join("")}
          </div>
        </div>
        <div class="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          ${demo && demo !== "#" ? `<a href="${demo}" target="_blank" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ""}
          ${github && github !== "#" ? `<a href="${github}" target="_blank" class="border border-white/20 hover:bg-white/10 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2"><i class="fab fa-github"></i> Source Code</a>` : ""}
        </div>
      `;

      modal.classList.add("open");
    });
  });

  const closeModal = () => modal.classList.remove("open");

  closeModalBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Skill Category Filter Pills
function initSkillFilters() {
  const skillFilterBtns = document.querySelectorAll("#skills-filter .filter-pill");
  const skillCards = document.querySelectorAll(".skill-card");

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      skillFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-skill-filter");

      skillCards.forEach((card) => {
        const cat = card.getAttribute("data-skill-cat");
        if (filter === "all" || cat === filter) {
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Live Skill Search & Highlighting (Optimized by caching DOM queries)
function initLiveSkillSearch() {
  const searchInput = document.getElementById("skill-search-input");
  if (!searchInput) return;

  const skillPills = document.querySelectorAll(".skill-pill");
  const skillCards = document.querySelectorAll(".skill-card");

  // Pre-map the DOM relationships and content text once to avoid querying on key inputs
  const cachedCards = Array.from(skillCards).map((card) => ({
    cardElement: card,
    pills: Array.from(card.querySelectorAll(".skill-pill")).map((pill) => ({
      pillElement: pill,
      text: pill.textContent.toLowerCase(),
    })),
  }));

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query === "") {
      skillPills.forEach((pill) => pill.classList.remove("search-highlight"));
      skillCards.forEach((card) => (card.style.opacity = "1"));
      return;
    }

    cachedCards.forEach((cardObj) => {
      let cardHasMatch = false;

      cardObj.pills.forEach((pillObj) => {
        if (pillObj.text.includes(query)) {
          pillObj.pillElement.classList.add("search-highlight");
          cardHasMatch = true;
        } else {
          pillObj.pillElement.classList.remove("search-highlight");
        }
      });

      cardObj.cardElement.style.opacity = cardHasMatch ? "1" : "0.3";
    });
  });
}

// Interactive Customization Control Center (Enhanced)
function initCustomizerDrawer() {
  const toggleBtn = document.getElementById("customizer-toggle-btn");
  const closeBtn = document.getElementById("close-customizer-btn");
  const drawer = document.getElementById("customizer-drawer");
  const cursorCheckbox = document.getElementById("toggle-cursor-checkbox");
  const soundCheckbox = document.getElementById("toggle-sound-checkbox");
  const cursorDot = document.getElementById("custom-cursor-dot");
  const cursorAura = document.getElementById("custom-cursor-aura");
  const resetBtn = document.getElementById("reset-customizer-btn");

  if (!toggleBtn || !drawer) return;

  // ─── Drawer Open/Close ───
  toggleBtn.addEventListener("click", () => drawer.classList.toggle("open"));
  closeBtn?.addEventListener("click", () => drawer.classList.remove("open"));

  // ─── Tab Navigation ───
  const tabs = drawer.querySelectorAll(".customizer-tab");
  const panels = drawer.querySelectorAll(".customizer-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.getAttribute("data-cust-tab");
      drawer.querySelector(`[data-cust-panel="${target}"]`)?.classList.add("active");
    });
  });

  // ─── Web Audio UI Click Synthesizer ───
  let audioEnabled = localStorage.getItem("cust-audio") === "true";
  if (soundCheckbox) soundCheckbox.checked = audioEnabled;

  const playClickSound = () => {
    if (!audioEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) { }
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest("button") || e.target.closest("a")) playClickSound();
  });

  soundCheckbox?.addEventListener("change", () => {
    audioEnabled = soundCheckbox.checked;
    localStorage.setItem("cust-audio", audioEnabled);
    if (audioEnabled) showToast("UI Audio Clicks Enabled!", "fas fa-volume-up");
  });

  // ─── Custom Cursor Follower (Optimized with RAF & translate3d) ───
  let cursorEnabled = localStorage.getItem("cust-cursor") === "true";
  if (cursorCheckbox) cursorCheckbox.checked = cursorEnabled;
  if (cursorEnabled) document.body.classList.add("cursor-active");

  let cursorX = 0, cursorY = 0;
  let cursorTicking = false;

  const updateCursorPosition = () => {
    if (!cursorEnabled || !cursorDot || !cursorAura) {
      cursorTicking = false;
      return;
    }
    cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    cursorAura.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    cursorTicking = false;
  };

  const onMouseMove = (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    if (!cursorTicking) {
      window.requestAnimationFrame(updateCursorPosition);
      cursorTicking = true;
    }
  };

  if (cursorEnabled) window.addEventListener("mousemove", onMouseMove);

  cursorCheckbox?.addEventListener("change", () => {
    cursorEnabled = cursorCheckbox.checked;
    document.body.classList.toggle("cursor-active", cursorEnabled);
    localStorage.setItem("cust-cursor", cursorEnabled);
    if (cursorEnabled) {
      window.addEventListener("mousemove", onMouseMove);
      showToast("Neon Glowing Cursor Enabled!", "fas fa-mouse-pointer");
    } else {
      window.removeEventListener("mousemove", onMouseMove);
    }
  });

  // ─── Marquee Speed Controls ───
  const speedBtns = document.querySelectorAll(".speed-btn");
  const marqueeTracks = document.querySelectorAll(".tech-marquee-track");

  speedBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      speedBtns.forEach((b) => {
        b.classList.remove("bg-emerald-500/30", "text-emerald-300");
        b.classList.add("bg-white/10", "text-gray-300");
      });
      btn.classList.remove("bg-white/10", "text-gray-300");
      btn.classList.add("bg-emerald-500/30", "text-emerald-300");

      const speed = btn.getAttribute("data-speed");
      marqueeTracks.forEach((track) => {
        if (speed === "pause") {
          track.style.animationPlayState = "paused";
        } else {
          track.style.animationPlayState = "running";
          track.style.animationDuration = speed;
        }
      });
      localStorage.setItem("cust-marquee-speed", speed);
    });
  });

  // Restore saved marquee speed
  const savedSpeed = localStorage.getItem("cust-marquee-speed");
  if (savedSpeed) {
    speedBtns.forEach((b) => {
      b.classList.remove("bg-emerald-500/30", "text-emerald-300");
      b.classList.add("bg-white/10", "text-gray-300");
      if (b.getAttribute("data-speed") === savedSpeed) {
        b.classList.remove("bg-white/10", "text-gray-300");
        b.classList.add("bg-emerald-500/30", "text-emerald-300");
      }
    });
    marqueeTracks.forEach((track) => {
      if (savedSpeed === "pause") {
        track.style.animationPlayState = "paused";
      } else {
        track.style.animationPlayState = "running";
        track.style.animationDuration = savedSpeed;
      }
    });
  }

  // ─── Color Accent Theme (Enhanced with checkmarks) ───
  const colorBtns = drawer.querySelectorAll(".cust-color-swatch");
  const savedTheme = localStorage.getItem("portfolio-theme") || "emerald";

  const updateColorChecks = (theme) => {
    colorBtns.forEach((btn) => {
      if (btn.getAttribute("data-theme-btn") === theme) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  };

  updateColorChecks(savedTheme);

  colorBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-btn");
      document.body.setAttribute("data-theme", theme);
      localStorage.setItem("portfolio-theme", theme);
      updateColorChecks(theme);
      showToast(`Accent theme changed to ${theme.toUpperCase()}!`, "fas fa-palette");
    });
  });

  // ─── Font Family Switcher ───
  const fontBtns = drawer.querySelectorAll(".cust-font-btn");
  const savedFont = localStorage.getItem("cust-font") || "Poppins";

  const applyFont = (fontName) => {
    document.body.style.fontFamily = `'${fontName}', sans-serif`;
    fontBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-font") === fontName));
  };

  applyFont(savedFont);

  fontBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const font = btn.getAttribute("data-font");
      applyFont(font);
      localStorage.setItem("cust-font", font);
      showToast(`Font changed to ${font}!`, "fas fa-font");
    });
  });

  // ─── Background Pattern Selector ───
  const patternBtns = drawer.querySelectorAll(".cust-pattern-btn");
  const dotPatternEl = document.querySelector(".dot-pattern");
  const savedPattern = localStorage.getItem("cust-pattern") || "dots";

  const applyPattern = (pattern) => {
    if (!dotPatternEl) return;
    dotPatternEl.classList.remove("bg-pattern-dots", "bg-pattern-grid", "bg-pattern-cross", "bg-pattern-none");
    dotPatternEl.classList.add(`bg-pattern-${pattern}`);
    dotPatternEl.style.opacity = pattern === "none" ? "0" : "0.2";
    patternBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-pattern") === pattern));
  };

  applyPattern(savedPattern);

  patternBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pattern = btn.getAttribute("data-pattern");
      applyPattern(pattern);
      localStorage.setItem("cust-pattern", pattern);
    });
  });

  // ─── Card Corner Radius ───
  const radiusBtns = drawer.querySelectorAll(".cust-radius-btn");
  const savedRadius = localStorage.getItem("cust-radius") || "rounded";

  const applyRadius = (radius) => {
    document.body.classList.remove("card-radius-sharp", "card-radius-pill");
    if (radius !== "rounded") document.body.classList.add(`card-radius-${radius}`);
    radiusBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-radius") === radius));
  };

  applyRadius(savedRadius);

  radiusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const radius = btn.getAttribute("data-radius");
      applyRadius(radius);
      localStorage.setItem("cust-radius", radius);
    });
  });

  // ─── Glow Intensity Slider ───
  const glowSlider = document.getElementById("glow-intensity-slider");
  const glowValue = document.getElementById("glow-intensity-value");
  const glowEl = document.querySelector(".gradient-glow");
  const blobEl = document.querySelector(".blob");
  const savedGlow = localStorage.getItem("cust-glow") || "100";

  const applyGlow = (val) => {
    const opacity = val / 100;
    if (glowEl) glowEl.style.opacity = opacity;
    if (blobEl) blobEl.style.opacity = opacity;
    if (glowValue) glowValue.textContent = `${val}%`;
    if (glowSlider) glowSlider.value = val;
  };

  applyGlow(savedGlow);

  glowSlider?.addEventListener("input", (e) => {
    applyGlow(e.target.value);
    localStorage.setItem("cust-glow", e.target.value);
  });

  // ─── Glassmorphism Blur Intensity ───
  const blurSlider = document.getElementById("blur-intensity-slider");
  const blurValue = document.getElementById("blur-intensity-value");
  const savedBlur = localStorage.getItem("cust-blur") || "12";

  const applyBlur = (val) => {
    document.documentElement.style.setProperty("--cust-blur", `${val}px`);
    document.querySelectorAll(".card-hover, .skill-card, .project-card, .terminal-window").forEach((el) => {
      el.style.backdropFilter = `blur(${val}px)`;
      el.style.webkitBackdropFilter = `blur(${val}px)`;
    });
    if (blurValue) blurValue.textContent = `${val}px`;
    if (blurSlider) blurSlider.value = val;
  };

  applyBlur(savedBlur);

  blurSlider?.addEventListener("input", (e) => {
    applyBlur(e.target.value);
    localStorage.setItem("cust-blur", e.target.value);
  });

  // ─── Animation Speed Multiplier ───
  const animSlider = document.getElementById("anim-speed-slider");
  const animValue = document.getElementById("anim-speed-value");
  const savedAnimSpeed = localStorage.getItem("cust-anim-speed") || "100";

  const applyAnimSpeed = (val) => {
    const multiplier = val / 100;
    const label = val == 0 ? "Off" : `${multiplier.toFixed(1)}×`;
    if (animValue) animValue.textContent = label;
    if (animSlider) animSlider.value = val;

    // Apply to CSS custom property for all transitions/animations
    document.documentElement.style.setProperty("--anim-multiplier", multiplier);

    // Toggle all animations on/off
    if (val == 0) {
      document.documentElement.style.setProperty("--anim-duration", "0s");
      document.body.style.setProperty("animation-duration", "0s");
    } else {
      document.documentElement.style.removeProperty("--anim-duration");
    }
  };

  applyAnimSpeed(savedAnimSpeed);

  animSlider?.addEventListener("input", (e) => {
    applyAnimSpeed(e.target.value);
    localStorage.setItem("cust-anim-speed", e.target.value);
  });

  // ─── 3D Tilt Toggle ───
  const tiltCheckbox = document.getElementById("toggle-tilt-checkbox");
  const savedTilt = localStorage.getItem("cust-tilt") !== "false"; // default true

  window._custTiltEnabled = savedTilt;
  if (tiltCheckbox) tiltCheckbox.checked = savedTilt;

  tiltCheckbox?.addEventListener("change", () => {
    window._custTiltEnabled = tiltCheckbox.checked;
    localStorage.setItem("cust-tilt", tiltCheckbox.checked);

    if (!tiltCheckbox.checked) {
      document.querySelectorAll(".tilt-card").forEach((card) => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      });
      showToast("3D Tilt Disabled", "fas fa-cube");
    } else {
      showToast("3D Tilt Enabled!", "fas fa-cube");
    }
  });

  // ─── Parallax Toggle ───
  const parallaxCheckbox = document.getElementById("toggle-parallax-checkbox");
  const savedParallax = localStorage.getItem("cust-parallax") !== "false"; // default true

  window._custParallaxEnabled = savedParallax;
  if (parallaxCheckbox) parallaxCheckbox.checked = savedParallax;

  if (!savedParallax) {
    document.querySelectorAll(".parallax-orb, .parallax-floating-badge").forEach((el) => {
      el.style.display = "none";
    });
  }

  parallaxCheckbox?.addEventListener("change", () => {
    window._custParallaxEnabled = parallaxCheckbox.checked;
    localStorage.setItem("cust-parallax", parallaxCheckbox.checked);
    document.querySelectorAll(".parallax-orb, .parallax-floating-badge").forEach((el) => {
      el.style.display = parallaxCheckbox.checked ? "" : "none";
    });
    showToast(parallaxCheckbox.checked ? "Parallax Enabled!" : "Parallax Disabled", "fas fa-layer-group");
  });

  // ─── Scroll Progress Bar Toggle ───
  const progressCheckbox = document.getElementById("toggle-progress-checkbox");
  const scrollProgressEl = document.getElementById("scroll-progress");
  const savedProgress = localStorage.getItem("cust-progress") !== "false"; // default true

  window._custProgressEnabled = savedProgress;
  if (progressCheckbox) progressCheckbox.checked = savedProgress;
  if (!savedProgress && scrollProgressEl) scrollProgressEl.style.display = "none";

  progressCheckbox?.addEventListener("change", () => {
    window._custProgressEnabled = progressCheckbox.checked;
    localStorage.setItem("cust-progress", progressCheckbox.checked);
    if (scrollProgressEl) {
      scrollProgressEl.style.display = progressCheckbox.checked ? "" : "none";
    }
  });

  // ─── Export / Share Settings ───
  const exportBtn = document.getElementById("export-settings-btn");
  exportBtn?.addEventListener("click", () => {
    const settings = {
      theme: localStorage.getItem("portfolio-theme") || "emerald",
      font: localStorage.getItem("cust-font") || "Poppins",
      pattern: localStorage.getItem("cust-pattern") || "dots",
      radius: localStorage.getItem("cust-radius") || "rounded",
      glow: localStorage.getItem("cust-glow") || "100",
      blur: localStorage.getItem("cust-blur") || "12",
      animSpeed: localStorage.getItem("cust-anim-speed") || "100",
      tilt: localStorage.getItem("cust-tilt") !== "false",
      parallax: localStorage.getItem("cust-parallax") !== "false",
      progress: localStorage.getItem("cust-progress") !== "false",
    };
    const encoded = btoa(JSON.stringify(settings));
    const shareUrl = `${window.location.origin}${window.location.pathname}?cust=${encoded}`;

    navigator.clipboard.writeText(shareUrl).then(() => {
      showToast("Settings link copied to clipboard!", "fas fa-clipboard-check");
    }).catch(() => {
      showToast("Couldn't copy — try manually!", "fas fa-exclamation-triangle");
    });
  });

  // ─── Reset All Settings ───
  resetBtn?.addEventListener("click", () => {
    const custKeys = [
      "portfolio-theme", "cust-font", "cust-pattern", "cust-radius",
      "cust-glow", "cust-blur", "cust-anim-speed", "cust-tilt",
      "cust-parallax", "cust-progress", "cust-cursor", "cust-audio",
      "cust-marquee-speed"
    ];
    custKeys.forEach((k) => localStorage.removeItem(k));

    // Re-apply defaults
    document.body.setAttribute("data-theme", "emerald");
    updateColorChecks("emerald");
    applyFont("Poppins");
    applyPattern("dots");
    applyRadius("rounded");
    applyGlow("100");
    applyBlur("12");
    applyAnimSpeed("100");

    window._custTiltEnabled = true;
    if (tiltCheckbox) tiltCheckbox.checked = true;

    window._custParallaxEnabled = true;
    if (parallaxCheckbox) parallaxCheckbox.checked = true;
    document.querySelectorAll(".parallax-orb, .parallax-floating-badge").forEach((el) => {
      el.style.display = "";
    });

    window._custProgressEnabled = true;
    if (progressCheckbox) progressCheckbox.checked = true;
    if (scrollProgressEl) scrollProgressEl.style.display = "";

    cursorEnabled = false;
    if (cursorCheckbox) cursorCheckbox.checked = false;
    document.body.classList.remove("cursor-active");
    window.removeEventListener("mousemove", onMouseMove);

    audioEnabled = false;
    if (soundCheckbox) soundCheckbox.checked = false;

    // Reset marquee
    speedBtns.forEach((b) => {
      b.classList.remove("bg-emerald-500/30", "text-emerald-300");
      b.classList.add("bg-white/10", "text-gray-300");
    });
    const normalBtn = [...speedBtns].find((b) => b.getAttribute("data-speed") === "25s");
    if (normalBtn) {
      normalBtn.classList.remove("bg-white/10", "text-gray-300");
      normalBtn.classList.add("bg-emerald-500/30", "text-emerald-300");
    }
    marqueeTracks.forEach((track) => {
      track.style.animationPlayState = "running";
      track.style.animationDuration = "25s";
    });

    showToast("All settings reset to defaults!", "fas fa-rotate-left");
  });

  // ─── Load Shared Settings from URL ───
  const urlParams = new URLSearchParams(window.location.search);
  const custParam = urlParams.get("cust");
  if (custParam) {
    try {
      const settings = JSON.parse(atob(custParam));
      if (settings.theme) { document.body.setAttribute("data-theme", settings.theme); localStorage.setItem("portfolio-theme", settings.theme); updateColorChecks(settings.theme); }
      if (settings.font) { applyFont(settings.font); localStorage.setItem("cust-font", settings.font); }
      if (settings.pattern) { applyPattern(settings.pattern); localStorage.setItem("cust-pattern", settings.pattern); }
      if (settings.radius) { applyRadius(settings.radius); localStorage.setItem("cust-radius", settings.radius); }
      if (settings.glow) { applyGlow(settings.glow); localStorage.setItem("cust-glow", settings.glow); }
      if (settings.blur) { applyBlur(settings.blur); localStorage.setItem("cust-blur", settings.blur); }
      if (settings.animSpeed) { applyAnimSpeed(settings.animSpeed); localStorage.setItem("cust-anim-speed", settings.animSpeed); }
      showToast("Custom settings loaded from shared link!", "fas fa-share-nodes");
    } catch (e) { }
  }
}

// Framer Motion-style Parallax, Magnetic Hover & Scroll Reveal
function initFramerMotionEffects() {
  // 1. Magnetic Buttons Effect (Optimized with cached dimensions on enter & translate3d)
  const magneticBtns = document.querySelectorAll(".magnetic-btn, .filter-pill, #customizer-toggle-btn");

  magneticBtns.forEach((btn) => {
    let rect = null;

    btn.addEventListener("mouseenter", () => {
      rect = btn.getBoundingClientRect();
    });

    btn.addEventListener("mousemove", (e) => {
      if (!rect) rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate3d(${x * 0.3}px, ${y * 0.3}px, 0)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = `translate3d(0px, 0px, 0)`;
      rect = null;
    });
  });

  // 2. High-Performance RAF Scroll Parallax Depth Engine
  const parallaxOrbs = document.querySelectorAll(".parallax-orb, .parallax-floating-badge");
  let ticking = false;

  const updateParallax = () => {
    if (window._custParallaxEnabled === false) { ticking = false; return; }
    const scrollY = window.scrollY;
    parallaxOrbs.forEach((orb) => {
      const speed = parseFloat(orb.getAttribute("data-speed") || "0.2");
      orb.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();

  // 3. Auto-apply Framer Reveal to all major section blocks & cards
  const targetElements = document.querySelectorAll(
    "section h2, .project-card, .skill-card, .timeline-item"
  );

  targetElements.forEach((el) => {
    if (!el.classList.contains("framer-reveal")) {
      el.classList.add("framer-reveal");
    }
  });

  // Scroll Reveal Observer with Framer Spring Easing
  const revealElements = document.querySelectorAll(".framer-reveal, .framer-reveal-left, .framer-reveal-right, .timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// Initialize all features once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initTypewriter();
  initThemeSwitcher();
  initDeveloperTerminal();
  initProjectFilters();
  initSkillFilters();
  initLiveSkillSearch();
  initCustomizerDrawer();
  initFramerMotionEffects();
  init3DTilt();
  initProjectModal();
});

