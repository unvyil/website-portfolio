document.addEventListener("DOMContentLoaded", () => {
  // Handle contact form submission text change
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
});
