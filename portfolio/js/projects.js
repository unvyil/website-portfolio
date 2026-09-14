/* ==========================================================================
   PROJECTS — Card Click Handler
   Ensures clicking a project card always opens the correct link,
   with a GitHub fallback for cards without a valid href.
========================================================================== */
(function () {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const targetUrl = card.getAttribute('href');
      if (!targetUrl || targetUrl === '#') {
        e.preventDefault();
        window.open('https://github.com/unvyil', '_blank');
      }
    });
  });
}());
