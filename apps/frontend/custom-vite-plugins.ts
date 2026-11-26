import type { Connect, Plugin } from 'vite';
import { runtimeConfigScript } from './runtime.config.mjs';
import { localUploadsMiddleware } from './local.uploads';

// In Docker nginx serves /config.js and /uploads (var/docker/nginx.conf). The
// Vite dev and preview servers serve them the same way, so the app also works
// without nginx.
const serve = (name: string, middleware: Connect.NextHandleFunction): Plugin => ({
  name,
  configureServer: (server) => {
    server.middlewares.use(middleware);
  },
  configurePreviewServer: (server) => {
    server.middlewares.use(middleware);
  },
});

// /config.js: the runtime settings, read from the environment on every request
export const runtimeConfig = () =>
  serve('postiz-runtime-config', (req, res, next) => {
    if (req.url?.split('?')[0] !== '/config.js') {
      return next();
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.setHeader('Cache-Control', 'no-store');
    res.end(runtimeConfigScript());
  });

// /uploads/*: files of the local storage provider
export const localUploads = () =>
  serve('postiz-local-uploads', localUploadsMiddleware);
