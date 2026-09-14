// Treatment payment pages: choose location and day, then pay with iDEAL | Wero via Mollie.
// Also renders the result on betaling-status.html.

(function () {
    const LOCATION_DAYS = { leerdam: [1, 3, 4, 5], roelofarendsveen: [2] };
    const WEEKS_AHEAD = 8;
    const DAY_NAMES = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    const MONTH_NAMES = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    const GENERIC_ERROR = 'Betaling kon niet worden gestart. Probeer het later opnieuw.';

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function formatDate(date) {
        return `${DAY_NAMES[date.getDay()]} ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
    }

    // ---------- Payment form ----------
    const form = document.getElementById('paymentForm');
    if (form) {
        const dateSelect = document.getElementById('date');
        const errorBox = document.getElementById('paymentError');
        const submitBtn = form.querySelector('button[type="submit"]');
        const submitLabel = submitBtn.innerHTML;

        function showError(message) {
            errorBox.textContent = message;
            errorBox.hidden = false;
        }

        function fillDates(location) {
            const days = LOCATION_DAYS[location];
            dateSelect.innerHTML = '<option value="">Kies een dag</option>';
            const date = new Date();
            date.setHours(12, 0, 0, 0);
            for (let i = 1; i <= WEEKS_AHEAD * 7; i++) {
                date.setDate(date.getDate() + 1);
                if (!days.includes(date.getDay())) continue;
                const option = document.createElement('option');
                option.value = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
                option.textContent = formatDate(date);
                dateSelect.appendChild(option);
            }
            dateSelect.disabled = false;
        }

        form.querySelectorAll('input[name="location"]').forEach(input => {
            input.addEventListener('change', () => {
                form.querySelectorAll('.location-card').forEach(card => {
                    card.classList.toggle('selected', card.contains(input) && input.checked);
                });
                fillDates(input.value);
            });
        });

        form.addEventListener('submit', async event => {
            event.preventDefault();
            errorBox.hidden = true;

            const data = Object.fromEntries(new FormData(form));
            data.treatment = form.dataset.treatment;
            if (!data.location) return showError('Kies een locatie.');
            if (!data.date) return showError('Kies een dag.');

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Doorsturen naar uw bank...';

            try {
                const response = await fetch('/api/create-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json().catch(() => ({}));
                if (!response.ok || !result.checkoutUrl) throw new Error(result.error || GENERIC_ERROR);
                window.location.href = result.checkoutUrl;
            } catch (err) {
                showError(err instanceof TypeError ? GENERIC_ERROR : err.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = submitLabel;
            }
        });
    }

    // ---------- Result page ----------
    const statusBox = document.getElementById('paymentStatus');
    if (statusBox) {
        const icon = statusBox.querySelector('.payment-status-icon');
        const title = statusBox.querySelector('h3');
        const text = statusBox.querySelector('p');
        const actions = statusBox.querySelector('.payment-status-actions');

        function render(state, heading, message) {
            icon.className = 'fas payment-status-icon ' + {
                paid: 'fa-circle-check',
                pending: 'fa-hourglass-half',
                failed: 'fa-circle-xmark'
            }[state];
            statusBox.classList.toggle('is-failed', state === 'failed');
            title.textContent = heading;
            text.textContent = message;
            actions.hidden = state === 'pending';
        }

        const id = new URLSearchParams(window.location.search).get('id');
        if (!id) {
            render('failed', 'Betaling niet gevonden', 'Wij konden uw betaling niet vinden. Neem contact met ons op als er wel geld is afgeschreven.');
        } else {
            fetch(`/api/payment-status?id=${encodeURIComponent(id)}`)
                .then(response => response.json().then(result => ({ ok: response.ok, result })))
                .then(({ ok, result }) => {
                    if (!ok) throw new Error();
                    let when = '';
                    if (result.date) {
                        const [y, m, d] = result.date.split('-').map(Number);
                        when = ` op ${formatDate(new Date(y, m - 1, d, 12))} in ${result.location}`;
                    }
                    const amount = `€${result.amount.replace('.', ',')}`;
                    if (result.status === 'paid') {
                        render('paid', 'Bedankt voor uw betaling!',
                            `Wij hebben ${amount} ontvangen voor ${result.treatment}${when}. Wij nemen contact met u op om de exacte tijd af te spreken.`);
                    } else if (result.status === 'open' || result.status === 'pending' || result.status === 'authorized') {
                        render('pending', 'Uw betaling wordt verwerkt',
                            'Dit kan een paar minuten duren. Vernieuw deze pagina straks om de status te zien.');
                    } else {
                        render('failed', 'Betaling niet gelukt',
                            'De betaling is geannuleerd of verlopen. Er is niets afgeschreven. U kunt het opnieuw proberen.');
                    }
                })
                .catch(() => {
                    render('failed', 'Status onbekend', 'Wij konden de status van uw betaling niet ophalen. Neem contact met ons op.');
                });
        }
    }
})();
