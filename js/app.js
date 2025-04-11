// var cursor = document.querySelector(".blob");

// document.addEventListener("mousemove", function (e) {
//   var x = e.clientX;
//   var y = e.clientY;
//   cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
// });

let menu = document.getElementById("menu");

let navlinks = document.getElementsByClassName("nav-links")[0];

menu.addEventListener("click", () => {
  navlinks.classList.add("show-menu");
  // document.getElementById("menu-container").style.display = "block";
});
let close = document.getElementById("close");
close.addEventListener("click", () => {
  // document.getElementById("menu-container").style.display = "none";
  navlinks.classList.remove("show-menu");
});
