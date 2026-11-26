import { createReadStream, statSync } from 'fs';
import { resolve, sep } from 'path';
import type { Connect } from 'vite';
// @ts-ignore
import mime from 'mime';

// Files of the local storage provider (STORAGE_PROVIDER=local) on /uploads/*,
// for the Vite dev and preview servers. In Docker nginx serves them instead
// (var/docker/nginx.conf).
export const localUploadsMiddleware: Connect.NextHandleFunction = (
  req,
  res,
  next
) => {
  if (process.env.STORAGE_PROVIDER !== 'local') {
    return next();
  }
  let pathname: string;
  try {
    pathname = decodeURIComponent((req.url || '').split('?')[0]);
  } catch (err) {
    res.statusCode = 400;
    return res.end('Bad request');
  }
  if (pathname.startsWith('/api/uploads/')) {
    res.statusCode = 301;
    res.setHeader('Location', pathname.replace('/api/uploads/', '/uploads/'));
    return res.end();
  }
  if (!pathname.startsWith('/uploads/')) {
    return next();
  }

  const base = resolve(process.env.UPLOAD_DIRECTORY!);
  const filePath = resolve(base, pathname.slice('/uploads/'.length));
  // Confine reads to UPLOAD_DIRECTORY. resolve() collapses any `..` segments
  // (including URL-decoded ones), so this blocks every path-traversal variant.
  if (filePath === base || !filePath.startsWith(base + sep)) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  let fileStats;
  try {
    fileStats = statSync(filePath);
  } catch (err) {
    res.statusCode = 404;
    return res.end('Not found');
  }
  if (!fileStats.isFile()) {
    res.statusCode = 404;
    return res.end('Not found');
  }

  // Honor ranged requests: providers that push video in chunks (TikTok,
  // YouTube, LinkedIn, X) fetch byte windows with a Range header and reject
  // anything but a 206, so ignoring Range breaks their uploads.
  const range = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range || '');
  const start = range ? Number(range[1]) : 0;
  const end =
    range && range[2]
      ? Math.min(Number(range[2]), fileStats.size - 1)
      : fileStats.size - 1;

  if (range && (start >= fileStats.size || start > end)) {
    res.statusCode = 416;
    res.setHeader('Content-Range', `bytes */${fileStats.size}`);
    return res.end();
  }

  res.statusCode = range ? 206 : 200;
  res.setHeader(
    'Content-Type',
    mime.getType(filePath) || 'application/octet-stream'
  );
  res.setHeader('Content-Length', (end - start + 1).toString());
  res.setHeader('Last-Modified', fileStats.mtime.toUTCString());
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.setHeader('Accept-Ranges', 'bytes');
  if (range) {
    res.setHeader('Content-Range', `bytes ${start}-${end}/${fileStats.size}`);
  }
  createReadStream(filePath, range ? { start, end } : {}).pipe(res);
};
