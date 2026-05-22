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

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    if (menuIcon) {
      if (mobileMenu.classList.contains("hidden")) {
        menuIcon.className = "fas fa-bars text-xl";
      } else {
        menuIcon.className = "fas fa-times text-xl";
      }
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
      if (mobileMenu) {
        mobileMenu.classList.add("hidden");
        if (menuIcon) menuIcon.className = "fas fa-bars text-xl";
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
const navbar = document.getElementById("navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add(
        "bg-black/80",
        "backdrop-blur-md",
        "border-white/10"
      );
      navbar.classList.remove("border-transparent");
    } else {
      navbar.classList.remove(
        "bg-black/80",
        "backdrop-blur-md",
        "border-white/10"
      );
      navbar.classList.add("border-transparent");
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

// Custom Toast Notification System
function showToast(message, iconClass = "fas fa-check-circle") {
  // Ensure toast container exists
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => {
      toast.remove();
      // Remove container if empty
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    });
  }, 4000);
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
