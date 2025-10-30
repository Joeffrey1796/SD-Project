//? Debugging
console.log("JS connected!");
 

/* =============================
   Starbrew Coffee - main.js
   Handles navbar, theme toggle,
   and simple UI animations
   ============================= */

// ======== NAVIGATION ACTIVE LINK ========
document.addEventListener("DOMContentLoaded", () => {
  //? Debug
  // console.log("Test 1")

  //! Delete, replaced with hamburger method hrefs
  // const navLinks = document.querySelectorAll(".navbar a");
  // const currentPage = window.location.pathname.split("/").pop();

  // navLinks.forEach(link => {
  //   const href = link.getAttribute("href");
  //   if (href === currentPage) link.classList.add("active");
  // });

  //* Burgir
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) {
    console.error("Navbar elements not found!");
    return;
  }

  // Toggle menu visibility
  menuToggle.addEventListener("click", () => {
    // console.log("Hamburger clicked!");
    navLinks.classList.toggle("show");
  });
});

// ======== THEME TOGGLE (Light / Dark Mode) ========
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Check saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
  themeToggle.textContent = "🌙";
}

//! Delete
//! themeToggle.addEventListener("click", () => {
//!   root.classList.toggle("dark");
//!   const isDark = root.classList.contains("dark");
//!   themeToggle.textContent = isDark ? "🌙" : "☀️";
//!   localStorage.setItem("theme", isDark ? "dark" : "light");
//! });

// ======== SCROLL NAVBAR EFFECT ========
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ======== OPTIONAL: Smooth Scroll for internal links ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/* ======== DARK MODE STYLES (injected) ======== */
const style = document.createElement("style");
style.textContent = `
  .dark {
    --color-bg: #121212;
    --color-text: #f0f0f0;
    --color-primary: #2e8b57;
    --color-secondary: #1b5e20;
    --color-light: #1f1f1f;
  }
  .dark body {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  .dark .navbar {
    background: var(--color-secondary);
  }
  .dark .footer {
    background: var(--color-light);
    color: #ccc;
  }
`;
document.head.appendChild(style);

// document.addEventListener("DOMContentLoaded", () => {
  
// });