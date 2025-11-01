//? Debugging
console.log("JS connected!");
 


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

// ======== Back to top functions ========

