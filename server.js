import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const appDir = __dirname;
const distRoot = path.join(appDir, 'dist');
const root = fs.existsSync(distRoot) ? distRoot : appDir;

const authDisabled = ['1', 'true', 'yes'].includes(String(process.env.AUTH_DISABLED || '').toLowerCase());

const appUsername = (
  process.env.APP_USERNAME ||
  process.env.DECK_USERNAME ||
  'prm'
).trim();

const appPassword = (
  process.env.APP_PASSWORD ||
  process.env.SITE_PASSWORD ||
  process.env.DECK_PASSWORD ||
  process.env.AUTH_PASSWORD ||
  'PrmAIBrain2026!'
).trim();

const authEnabled = !authDisabled && Boolean(appPassword);
const passwordFromEnv = Boolean(
  process.env.APP_PASSWORD ||
  process.env.SITE_PASSWORD ||
  process.env.DECK_PASSWORD ||
  process.env.AUTH_PASSWORD
);
const sessionSecret = (process.env.SESSION_SECRET || appPassword || 'dev-insecure-secret').trim();
const sessionCookie = 'aibrain_session';
const sessionMaxAgeSec = 60 * 60 * 24;

const PUBLIC_PATHS = new Set(['/login.html', '/robots.txt']);

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
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.webp': 'image/webp',
};

function robotsHeaders(extra = {}) {
  return { 'X-Robots-Tag': 'noindex, nofollow, noarchive', ...extra };
}

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const key = part.slice(0, idx).trim();
    const val = part.slice(idx + 1).trim();
    out[key] = decodeURIComponent(val);
  }
  return out;
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', sessionSecret).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;
  const dot = token.lastIndexOf('.');
  if (dot < 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', sessionSecret).update(body).digest('base64url');
  if (sig.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    if (!payload || payload.exp < Date.now()) return null;
    if (payload.user !== appUsername) return null;
    return payload;
  } catch {
    return null;
  }
}

function isAuthenticated(req) {
  if (!authEnabled) return true;
  const cookies = parseCookies(req.headers.cookie);
  return Boolean(verifyToken(cookies[sessionCookie]));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function sendJson(res, status, data, extraHeaders = {}) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...robotsHeaders(extraHeaders)
  });
  res.end(JSON.stringify(data));
}

function redirect(res, location) {
  res.writeHead(302, robotsHeaders({ Location: location, 'Cache-Control': 'no-store' }));
  res.end();
}

function setSessionCookie(res, username) {
  const token = signToken({ user: username, exp: Date.now() + sessionMaxAgeSec * 1000 });
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${sessionCookie}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionMaxAgeSec}${secure}`
  );
}

function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${sessionCookie}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
  );
}

function resolveFile(safePath) {
  if (safePath === '/') return path.join(root, 'index.html');
  const rel = safePath.startsWith('/') ? safePath.slice(1) : safePath;
  return path.join(root, rel);
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, robotsHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }));
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': contentTypes[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable',
      ...robotsHeaders()
    });
    res.end(data);
  });
}

function sendSpa(res) {
  sendFile(res, path.join(root, 'index.html'));
}

async function handleAuthRoutes(req, res, pathname) {
  if (pathname === '/api/auth/check' && req.method === 'GET') {
    sendJson(res, 200, {
      authenticated: isAuthenticated(req),
      authRequired: authEnabled
    });
    return true;
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    if (!authEnabled) {
      sendJson(res, 200, { ok: true, message: 'Auth disabled' });
      return true;
    }
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      sendJson(res, 400, { error: 'Invalid request body' });
      return true;
    }
    const username = String(body.username || '').trim();
    const password = String(body.password || '');
    if (username === appUsername && password === appPassword) {
      setSessionCookie(res, username);
      sendJson(res, 200, { ok: true });
    } else {
      sendJson(res, 401, { error: 'Invalid username or password.' });
    }
    return true;
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    clearSessionCookie(res);
    sendJson(res, 200, { ok: true });
    return true;
  }

  return false;
}

const server = http.createServer(async (req, res) => {
  const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, '') || '/';

  if (await handleAuthRoutes(req, res, safePath)) return;

  if (authEnabled && !isAuthenticated(req)) {
    if (PUBLIC_PATHS.has(safePath)) {
      const filePath = resolveFile(safePath === '/' ? '/login.html' : safePath);
      if (filePath.startsWith(root)) {
        sendFile(res, filePath);
        return;
      }
    }
    const next = encodeURIComponent(safePath + (req.url.includes('?') ? '?' + req.url.split('?')[1] : ''));
    redirect(res, `/login.html?next=${next}`);
    return;
  }

  const filePath = resolveFile(safePath);
  if (!filePath.startsWith(root)) {
    res.writeHead(403, robotsHeaders({ 'Content-Type': 'text/plain; charset=utf-8' }));
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, filePath);
      return;
    }
    if (safePath.startsWith('/assets/') || safePath.startsWith('/audio/')) {
      sendFile(res, filePath);
      return;
    }
    sendSpa(res);
  });
});

server.listen(port, () => {
  console.log(`Aura video deck on port ${port} — serving ${root}`);
  if (authEnabled) {
    console.log(
      `UI login enabled (user: "${appUsername}", password: ${passwordFromEnv ? 'env' : 'built-in default'})`
    );
  } else {
    console.warn('WARNING: auth disabled; site is public');
  }
});
