// Local preview server: serves dist/ and runs the api/ functions the way Vercel does.
// Usage: npm run preview   (put MOLLIE_API_KEY=test_... in .env.local to test payments)

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const DIST = path.join(__dirname, 'dist');
const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
};

http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const api = url.pathname.match(/^\/api\/([a-z-]+)$/);
    if (api) {
        const file = path.join(__dirname, 'api', `${api[1]}.js`);
        if (!fs.existsSync(file)) {
            res.statusCode = 404;
            return res.end('Not found');
        }
        delete require.cache[require.resolve(file)];
        try {
            return await require(file)(req, res);
        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            return res.end('Server error');
        }
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    const filePath = path.join(DIST, path.normalize(pathname));
    if (!filePath.startsWith(DIST)) {
        res.statusCode = 403;
        return res.end('Forbidden');
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            return res.end('Not found');
        }
        res.setHeader('Content-Type', TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-store');
        res.end(data);
    });
}).listen(PORT, '127.0.0.1', () => {
    console.log(`Preview: http://127.0.0.1:${PORT}`);
    console.log(process.env.MOLLIE_API_KEY ? 'Mollie key loaded' : 'No MOLLIE_API_KEY set: payments will show "nog niet ingesteld"');
});
