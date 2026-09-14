/* ==========================================================================
   SCROLL TO TOP BUTTON
   Shows the floating button once the user has scrolled past 350 px,
   and smoothly scrolls back to the top when clicked.
========================================================================== */
(function () {
  const btn = document.querySelector(".scroll-top");
  if (!btn) return;

  // Show / hide based on scroll position
  function handleScroll() {
    btn.classList.toggle("show", window.scrollY > 350);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // run once on load

  // Smooth scroll to top on click
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
