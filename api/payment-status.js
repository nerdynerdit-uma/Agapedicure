// Looks up a Mollie payment so the result page can tell the customer whether it went through.
// Only returns what the page shows, never the customer's contact details.

const MOLLIE_API = 'https://api.mollie.com/v2/payments';

function send(res, status, data) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify(data));
}

module.exports = async function handler(req, res) {
    const id = new URL(req.url, 'http://localhost').searchParams.get('id') || '';
    if (!/^tr_[A-Za-z0-9]+$/.test(id)) return send(res, 400, { error: 'Onbekende betaling.' });

    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) return send(res, 500, { error: 'Online betalen is nog niet ingesteld.' });

    try {
        const mollieRes = await fetch(`${MOLLIE_API}/${id}`, {
            headers: { Authorization: `Bearer ${apiKey}` }
        });
        if (!mollieRes.ok) return send(res, 404, { error: 'Betaling niet gevonden.' });

        const payment = await mollieRes.json();
        const metadata = payment.metadata || {};
        return send(res, 200, {
            status: payment.status,
            amount: payment.amount.value,
            treatment: metadata.treatmentName,
            location: metadata.location,
            date: metadata.date
        });
    } catch (err) {
        console.error('Mollie status request failed', err);
        return send(res, 502, { error: 'Status kon niet worden opgehaald.' });
    }
};
