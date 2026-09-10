document.addEventListener("DOMContentLoaded", () => {
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
