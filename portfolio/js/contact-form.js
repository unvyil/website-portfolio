/* ==========================================================================
   CONTACT FORM — Web3Forms Submission
   Handles async POST to Web3Forms, shows loading / success / error states
   on the submit button, then resets after 3.5 seconds.
========================================================================== */
(function () {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn          = contactForm.querySelector('.submit-btn');
    const originalText = btn.innerText;

    // Loading state
    btn.innerText  = 'SENDING...';
    btn.style.opacity  = '0.7';
    btn.disabled       = true;

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm),
      });
      const data = await response.json();

      if (response.ok) {
        btn.innerText            = 'SENT!';
        btn.style.backgroundColor = '#DBFF49';
        btn.style.color           = '#171717';
        btn.style.opacity         = '1';
        contactForm.reset();
      } else {
        throw new Error(data.message || 'API error');
      }
    } catch {
      btn.innerText            = 'ERROR!';
      btn.style.backgroundColor = '#FF006E';
      btn.style.color           = '#FAFDEA';
      btn.style.opacity         = '1';
    } finally {
      // Reset button after 3.5 s
      setTimeout(() => {
        btn.innerText            = originalText;
        btn.style.backgroundColor = '';
        btn.style.color           = '';
        btn.style.opacity         = '';
        btn.disabled              = false;
      }, 3500);
    }
  });
}());
