document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================================
                           HERO-ONLY INSTANT LUSH CLOUD ENGINE (NO STICKS, NO LAG)
  ========================================================================== */
  const canvas = document.querySelector('.stained-glass-cursor');
  const heroSection = document.getElementById('home');
  
  if (canvas && heroSection) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let prevMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let particles = [];
    let isInsideHero = true;

    function updateCanvasSize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    function checkHeroVisibility() {
      const heroRect = heroSection.getBoundingClientRect();
      isInsideHero = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
    }

    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
    checkHeroVisibility();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      checkHeroVisibility();
      if (!isInsideHero) return;

      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // LAG KILLER: Calculate needed particles for gap-filling, but strictly limit to 14 per frame max.
      const spawnCount = Math.min(Math.floor(dist / 4) + 2, 14);

      for (let i = 0; i < spawnCount; i++) {
        // STICK KILLER: Random placement along the path instead of a uniform line!
        // This makes it an organic cloud rather than a rigid streak.
        const randomT = Math.random(); 
        const basePathX = prevMouse.x + dx * randomT;
        const basePathY = prevMouse.y + dy * randomT;

        const colorType = Math.random();
        let color;
        if (colorType < 0.4) {
          color = '255, 0, 110'; // Accent Pink
        } else if (colorType < 0.8) {
          color = '219, 255, 73'; // Accent Lime
        } else {
          color = '250, 253, 234'; // Text Cream
        }

        particles.push({
          x: basePathX + (Math.random() - 0.5) * 45, // Wide, fluffy scatter
          y: basePathY + (Math.random() - 0.5) * 45,
          size: Math.random() * 12 + 8,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.015,
          driftX: (Math.random() - 0.5) * 0.4,
          driftY: (Math.random() - 0.5) * 0.4 - 0.2, // Wispy upward float
          color: color,
          life: 1,
          decay: Math.random() * 0.02 + 0.015 // Slightly faster decay to keep performance high
        });
      }

      // Update instantly so there is absolutely zero delay behind your cursor
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;

      // PERFORMANCE SAFETY: Trim the array if you wiggle incredibly fast
      if (particles.length > 150) {
        particles.splice(0, particles.length - 150);
      }
    });

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
        let p = particles[i];
        p.life -= p.decay;
        p.angle += p.spin;
        p.x += p.driftX;
        p.y += p.driftY;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.life * 0.85;

        // 1. Soft, dreamy blur halo
        const dreamyHalo = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3.8);
        dreamyHalo.addColorStop(0, `rgba(${p.color}, 0.08)`);
        dreamyHalo.addColorStop(0.5, `rgba(${p.color}, 0.04)`);
        dreamyHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = dreamyHalo;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // 2. Custom 4-petal flower shape
        ctx.fillStyle = `rgba(${p.color}, 0.2)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.35, 0, 0, Math.PI * 2);
        ctx.ellipse(0, 0, p.size * 0.35, p.size, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3. Center core gleam
        ctx.fillStyle = 'rgba(255, 255, 255, 0.44)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.18, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }
  
/* ==========================================================================
                                 CONTACTS FORM
  ========================================================================== */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector(".submit-btn");
      const originalText = btn.innerText;

      // Disable button and show loading state
      btn.innerText = "SENDING...";
      btn.style.opacity = "0.7";
      btn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          // Success! Trigger your custom lime green animation
          btn.innerText = "SENT!";
          btn.style.backgroundColor = "#DBFF49";
          btn.style.color = "#171717";
          btn.style.opacity = "1";
          contactForm.reset();
        } else {
          // API error
          btn.innerText = "ERROR!";
          btn.style.backgroundColor = "#FF006E";
          btn.style.color = "#FAFDEA";
          btn.style.opacity = "1";
          console.error("Web3Forms Error:", data.message);
        }

      } catch (error) {
        // Network error
        btn.innerText = "ERROR!";
        btn.style.backgroundColor = "#FF006E";
        btn.style.color = "#FAFDEA";
        btn.style.opacity = "1";
      } finally {
        // Reset the button back to normal after 3.5 seconds
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
          btn.style.color = "";
          btn.style.opacity = "";
          btn.disabled = false;
        }, 3500);
      }
    });
  }

  /* ==========================================================================
                                NAVIGATION OBSERVER
  ========================================================================== */
  const sections = document.querySelectorAll(".hero, .section");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinks.length) {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  /* ==========================================================================
                              PROJECT CARD REDIRECTS
  ========================================================================== */
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    // Ensure clicking the card or arrow handles redirection reliably
    card.addEventListener("click", (e) => {
      const targetUrl = card.getAttribute("href");
      if (!targetUrl || targetUrl === "#") {
        e.preventDefault();
        // Fallback default portfolio link if none specified
        window.open("https://github.com/unvyil", "_blank");
      }
    });
  });

  /* ==========================================================================
                           TECH STACK MOBILE/ACCESSIBILITY
  ========================================================================== */
  const techCards = document.querySelectorAll(".tech-card");

  techCards.forEach((card) => {
    // Allow keyboard activation (Enter / Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const overlay = card.querySelector(".tech-overlay");
        if (overlay) {
          const isVisible = overlay.style.opacity === "1";
          overlay.style.opacity = isVisible ? "0" : "1";
        }
      }
    });

    // Touch tap toggle for mobile devices
    card.addEventListener("touchstart", () => {
      techCards.forEach((c) => {
        if (c !== card) {
          const otherOverlay = c.querySelector(".tech-overlay");
          if (otherOverlay) otherOverlay.style.opacity = "";
        }
      });
    }, { passive: true });
  });

  /* ==========================================================================
                           SCROLL TO TOP BUTTON
  ========================================================================== */
  const scrollTopBtn = document.querySelector(".scroll-top");

  if (scrollTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    scrollTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
