/* ==========================================================================
   TECH CARDS — Keyboard & Touch Accessibility
   - Keyboard: Enter / Space toggles the name overlay
   - Touch: tapping a card shows its overlay and hides others
========================================================================== */
(function () {
  const techCards = document.querySelectorAll('.tech-card');
  if (!techCards.length) return;

  techCards.forEach((card) => {
    // Keyboard activation
    card.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      const overlay  = card.querySelector('.tech-overlay');
      if (!overlay) return;
      const isVisible = overlay.style.opacity === '1';
      overlay.style.opacity = isVisible ? '0' : '1';
    });

    // Touch tap — show this card, hide all others
    card.addEventListener('touchstart', () => {
      techCards.forEach((other) => {
        if (other === card) return;
        const ov = other.querySelector('.tech-overlay');
        if (ov) ov.style.opacity = '';
      });
    }, { passive: true });
  });
}());
