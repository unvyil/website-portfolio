document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
                                 CONTACTS
========================================================================== 
*/
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

  /* ==========================================================================
                                NAVIGATION
========================================================================== 
*/
  const sections = document.querySelectorAll(".hero, .section");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (sections.length && navLinks.length) {
    const observerOptions = {
      root: null,
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

  /* ==========================================================================
                          FOOTER / UTILITIES
========================================================================== 
*/
  const scrollTopBtn = document.querySelector(".scroll-top");

  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      scrollTopBtn.classList.remove("show");
    });
  }
});
