document.addEventListener("DOMContentLoaded", () => {
  // === 1. Contact Form Submission ===
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector(".submit-btn");
      const originalText = btn.innerText;

      btn.innerText = "SENT!";
      btn.style.backgroundColor = "#e63946";

      contactForm.reset();

      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "";
      }, 3000);
    });
  }

  // === 2. Auto Highlight Nav Links on Scroll ===
  const sections = document.querySelectorAll(".hero, .section");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinks.length) {
    const observerOptions = {
      root: null,
      // Shifts viewport check bounds to match screen-center focal visibility
      rootMargin: "-30% 0px -50% 0px",
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
});
