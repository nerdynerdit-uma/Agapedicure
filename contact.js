// Contact form: sends the message through /api/contact, then shows a thank-you message.

(function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const errorBox = document.getElementById('contactError');
    const successBox = document.getElementById('contactSuccess');
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn.innerHTML;
    const GENERIC_ERROR = 'Uw bericht kon niet worden verzonden. Probeer het later opnieuw of mail naar info@agapepedicure.nl.';

    form.addEventListener('submit', async event => {
        event.preventDefault();
        errorBox.hidden = true;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verzenden...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
            });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || GENERIC_ERROR);

            form.hidden = true;
            successBox.hidden = false;
            successBox.focus();
        } catch (err) {
            errorBox.textContent = err instanceof TypeError ? GENERIC_ERROR : err.message;
            errorBox.hidden = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitLabel;
        }
    });
})();
