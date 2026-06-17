const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;

const appUsername = (process.env.APP_USERNAME || 'prm').trim();
const appPassword = (process.env.APP_PASSWORD || '').trim();
const authEnabled = Boolean(appPassword);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function parseBasicAuth(header) {
  if (!header || !header.startsWith('Basic ')) return null;
  try {
    const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
    const sep = decoded.indexOf(':');
    if (sep < 0) return null;
    return { username: decoded.slice(0, sep), password: decoded.slice(sep + 1) };
  } catch {
    return null;
  }
}

function unauthorized(res) {
  res.writeHead(401, {
    'Content-Type': 'text/plain; charset=utf-8',
    'WWW-Authenticate': 'Basic realm="PRM AI Operating Platform"',
    'X-Robots-Tag': 'noindex, nofollow, noarchive'
  });
  res.end('Authentication required');
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive'
      });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow, noarchive'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (authEnabled) {
    const creds = parseBasicAuth(req.headers.authorization);
    if (!creds || creds.username !== appUsername || creds.password !== appPassword) {
      unauthorized(res);
      return;
    }
  }

  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = safePath === '/' ? path.join(root, 'index.html') : path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    res.writeHead(403, {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow, noarchive'
    });
    res.end('Forbidden');
    return;
  }

  sendFile(res, filePath);
});

server.listen(port, () => {
  if (authEnabled) {
    console.log(`AI Operating Platform deck listening on port ${port} (basic auth enabled for user "${appUsername}")`);
  } else {
    console.warn(`AI Operating Platform deck listening on port ${port} — WARNING: APP_PASSWORD not set; site is public`);
  }
});
