// Creates a Mollie iDEAL | Wero payment for a treatment booking.
// Prices are defined here on the server, so a customer can't change what they pay.
// Needs the MOLLIE_API_KEY environment variable (test_... or live_...).

const TREATMENTS = {
    'medische-pedicure': { name: 'Intake + Agape (Medische) Pedicure', price: '75.00', zorgcode: true },
    'deelbehandeling': { name: 'Deelbehandeling', price: '37.50' },
    'neuropathische-pijnmassage': { name: 'Neuropathische Pijnmassage', price: '90.00' },
    'agape-spa-ritual': { name: 'Agapè Spa Ritual', price: '65.00' },
    'agape-magnesium-ritual': { name: 'Agapè Magnesium Ritual', price: '55.00' },
    'nagelcorrectie': { name: 'Nagelcorrectie', price: '35.00' },
    'gellak-teennagels': { name: 'Gellak Teennagels', price: '47.50' },
    'orthese': { name: 'Orthese', price: '40.00' }
};

// Opening days per location (0 = Sunday ... 6 = Saturday)
const LOCATIONS = {
    leerdam: { name: 'Leerdam', days: [1, 3, 4, 5] },
    roelofarendsveen: { name: 'Roelofarendsveen', days: [2] }
};

const MAX_DAYS_AHEAD = 60;
const MOLLIE_API = 'https://api.mollie.com/v2/payments';

function send(res, status, data) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}

async function readBody(req) {
    if (req.body && typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') return JSON.parse(req.body);
    let raw = '';
    for await (const chunk of req) raw += chunk;
    return raw ? JSON.parse(raw) : {};
}

function clean(value, max) {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// Today's date in the Netherlands as YYYY-MM-DD
function todayInAmsterdam() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date());
}

function validateDate(dateStr, location) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return 'Kies een geldige datum.';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) {
        return 'Kies een geldige datum.';
    }
    const [ty, tm, td] = todayInAmsterdam().split('-').map(Number);
    const daysAhead = Math.round((date - Date.UTC(ty, tm - 1, td)) / 86400000);
    if (daysAhead < 1 || daysAhead > MAX_DAYS_AHEAD) return 'Kies een datum binnen de komende weken.';
    if (!LOCATIONS[location].days.includes(date.getUTCDay())) return 'Op deze dag zijn wij niet op deze locatie.';
    return null;
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) return send(res, 500, { error: 'Online betalen is nog niet ingesteld. Neem contact met ons op.' });

    let body;
    try {
        body = await readBody(req);
    } catch {
        return send(res, 400, { error: 'Ongeldige aanvraag.' });
    }

    const treatment = TREATMENTS[body.treatment];
    if (!treatment) return send(res, 400, { error: 'Onbekende behandeling.' });

    const name = clean(body.name, 100);
    const phone = clean(body.phone, 20);
    const email = clean(body.email, 120);
    const location = clean(body.location, 30);
    const date = clean(body.date, 10);
    const zorgcode = treatment.zorgcode ? clean(body.zorgcode, 50) : '';

    if (name.length < 2) return send(res, 400, { error: 'Vul uw naam in.' });
    if (!/^[+0-9 ()-]{8,20}$/.test(phone)) return send(res, 400, { error: 'Vul een geldig telefoonnummer in.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: 'Vul een geldig e-mailadres in.' });
    if (!LOCATIONS[location]) return send(res, 400, { error: 'Kies een locatie.' });
    const dateError = validateDate(date, location);
    if (dateError) return send(res, 400, { error: dateError });

    const [y, m, d] = date.split('-');
    const locationName = LOCATIONS[location].name;
    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const statusPage = `${proto}://${host}/betaling-status.html`;
    const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };

    try {
        const createRes = await fetch(MOLLIE_API, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                amount: { currency: 'EUR', value: treatment.price },
                description: `${treatment.name} - ${locationName} ${d}-${m}-${y} - ${name}`.slice(0, 255),
                redirectUrl: statusPage,
                method: 'ideal',
                locale: 'nl_NL',
                metadata: {
                    treatment: body.treatment,
                    treatmentName: treatment.name,
                    name,
                    phone,
                    email,
                    location: locationName,
                    date,
                    zorgcode: zorgcode || undefined
                }
            })
        });
        const payment = await createRes.json();
        if (!createRes.ok) {
            console.error('Mollie create failed', createRes.status, payment);
            return send(res, 502, { error: 'Betaling kon niet worden gestart. Probeer het later opnieuw.' });
        }

        // Mollie doesn't add the payment id to the return address, so add it now
        const patchRes = await fetch(`${MOLLIE_API}/${payment.id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ redirectUrl: `${statusPage}?id=${payment.id}` })
        });
        if (!patchRes.ok) console.error('Mollie redirect update failed', patchRes.status);

        return send(res, 200, { checkoutUrl: payment._links.checkout.href, id: payment.id });
    } catch (err) {
        console.error('Mollie request failed', err);
        return send(res, 502, { error: 'Betaling kon niet worden gestart. Probeer het later opnieuw.' });
    }
};
