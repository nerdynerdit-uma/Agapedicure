// Sends the contact form to the salon by email through Resend (resend.com).
// Needs the RESEND_API_KEY environment variable.
// Optional: CONTACT_TO (default info@agapepedicure.nl) and CONTACT_FROM. Without a verified
// domain in Resend, the default sender can only deliver to the Resend account's own email address.

const RESEND_API = 'https://api.resend.com/emails';
const DEFAULT_TO = 'info@agapepedicure.nl';
const DEFAULT_FROM = 'Agapè website <onboarding@resend.dev>';
const SEND_ERROR = 'Uw bericht kon niet worden verzonden. Probeer het later opnieuw of mail naar info@agapepedicure.nl.';

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

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return send(res, 500, { error: 'Het contactformulier is nog niet ingesteld. Mail naar info@agapepedicure.nl of bel 06 49121690.' });
    }

    let body;
    try {
        body = await readBody(req);
    } catch {
        return send(res, 400, { error: 'Ongeldige aanvraag.' });
    }

    // Hidden field that only bots fill in: pretend it worked, send nothing
    if (clean(body.website, 200)) return send(res, 200, { ok: true });

    const name = clean(body.name, 100);
    const email = clean(body.email, 120);
    const phone = clean(body.phone, 20);
    const message = clean(body.message, 5000);

    if (name.length < 2) return send(res, 400, { error: 'Vul uw naam in.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(res, 400, { error: 'Vul een geldig e-mailadres in.' });
    if (phone && !/^[+0-9 ()-]{8,20}$/.test(phone)) return send(res, 400, { error: 'Vul een geldig telefoonnummer in.' });
    if (message.length < 10) return send(res, 400, { error: 'Schrijf een bericht van minimaal 10 tekens.' });

    const text = [
        `Naam: ${name}`,
        `E-mail: ${email}`,
        `Telefoon: ${phone || '-'}`,
        '',
        'Bericht:',
        message
    ].join('\n');

    try {
        const resendRes = await fetch(RESEND_API, {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM || DEFAULT_FROM,
                to: [process.env.CONTACT_TO || DEFAULT_TO],
                reply_to: email,
                subject: `Contactformulier: ${name}`,
                text
            })
        });
        if (!resendRes.ok) {
            console.error('Resend send failed', resendRes.status, await resendRes.text());
            return send(res, 502, { error: SEND_ERROR });
        }
        return send(res, 200, { ok: true });
    } catch (err) {
        console.error('Resend request failed', err);
        return send(res, 502, { error: SEND_ERROR });
    }
};
