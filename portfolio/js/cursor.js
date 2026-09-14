/* ==========================================================================
   CURSOR — Stained-Glass Particle Trail
   Spawns coloured petal particles that follow the mouse exclusively
   within the hero section. Canvas is overlaid on the full page but
   only renders while the hero is in the viewport.
========================================================================== */
(function () {
  const canvas = document.querySelector('.stained-glass-cursor');
  const heroSection = document.getElementById('home');

  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let mouse     = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let particles     = [];
  let isInsideHero  = true;

  /* --- Canvas sizing ---------------------------------------------------- */
  function updateCanvasSize() {
    const dpr     = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  updateCanvasSize();
  window.addEventListener('resize', updateCanvasSize);

  /* --- Hero visibility check -------------------------------------------- */
  function checkHeroVisibility() {
    const heroRect = heroSection.getBoundingClientRect();
    isInsideHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
  }

  window.addEventListener('scroll', checkHeroVisibility, { passive: true });
  checkHeroVisibility();

  /* --- Particle spawning on mouse move ---------------------------------- */
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    checkHeroVisibility();
    if (!isInsideHero) return;

    const dx   = mouse.x - prevMouse.x;
    const dy   = mouse.y - prevMouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Fill gaps between frames; cap at 14 particles per move event
    const spawnCount = Math.min(Math.floor(dist / 4) + 2, 14);

    for (let i = 0; i < spawnCount; i++) {
      const randomT  = Math.random();
      const basePathX = prevMouse.x + dx * randomT;
      const basePathY = prevMouse.y + dy * randomT;

      // Colour palette — pink / lime / cream
      const colorType = Math.random();
      let color;
      if      (colorType < 0.4) color = '255, 0, 110';    // --accent-pink
      else if (colorType < 0.8) color = '219, 255, 73';   // --accent-lime
      else                      color = '250, 253, 234';   // --text-cream

      particles.push({
        x:      basePathX + (Math.random() - 0.5) * 45,
        y:      basePathY + (Math.random() - 0.5) * 45,
        size:   Math.random() * 12 + 8,
        angle:  Math.random() * Math.PI * 2,
        spin:   (Math.random() - 0.5) * 0.015,
        driftX: (Math.random() - 0.5) * 0.4,
        driftY: (Math.random() - 0.5) * 0.4 - 0.2, // slight upward float
        color,
        life:   1,
        decay:  Math.random() * 0.02 + 0.015,
      });
    }

    prevMouse.x = mouse.x;
    prevMouse.y = mouse.y;

    // Safety trim if the mouse is moved extremely fast
    if (particles.length > 150) {
      particles.splice(0, particles.length - 150);
    }
  });

  /* --- Render loop ------------------------------------------------------ */
  function renderParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    canvas.style.opacity = isInsideHero ? '1' : '0';
    if (!isInsideHero) {
      particles = [];
      requestAnimationFrame(renderParticles);
      return;
    }

    ctx.globalCompositeOperation = 'screen';

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life  -= p.decay;
      p.angle += p.spin;
      p.x     += p.driftX;
      p.y     += p.driftY;

      if (p.life <= 0) { particles.splice(i, 1); continue; }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.life * 0.85;

      // 1. Dreamy radial halo
      const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3.8);
      halo.addColorStop(0,   `rgba(${p.color}, 0.08)`);
      halo.addColorStop(0.5, `rgba(${p.color}, 0.04)`);
      halo.addColorStop(1,   'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 3.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. 4-petal flower body
      ctx.fillStyle = `rgba(${p.color}, 0.2)`;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.35, 0, 0, Math.PI * 2);
      ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2);
      ctx.fill();

      // 3. Core gleam
      ctx.fillStyle = 'rgba(255, 255, 255, 0.44)';
      ctx.beginPath();
      ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(renderParticles);
  }

  renderParticles();
}());
