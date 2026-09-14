/* ==========================================================================
   NAVIGATION — Active-Link Observer
   Uses IntersectionObserver to highlight the nav link whose section
   is currently most visible in the viewport.
========================================================================== */
(function () {
  const sections = document.querySelectorAll('.hero, .section');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { root: null, rootMargin: '-25% 0px -45% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}());
