// first: the provider settings DTOs use decorators that read it as they load,
// and with code splitting their chunk can run before any component imports it
import 'reflect-metadata';
import {
  createRouter,
  parseSearchWith,
  RouterProvider,
  stringifySearchWith,
} from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import '@gitroom/frontend/fonts/plus-jakarta-sans/plus.jakarta.sans.font';

// @ts-expect-error TanStack Router's types need strictNullChecks, which the
// shared tsconfig.base.json turns off
const router = createRouter({
  routeTree,
  // Search values stay the strings in the URL, as with URLSearchParams in
  // Next.js (TanStack's default JSON parsing would turn ?id=1 into a number)
  parseSearch: parseSearchWith((value) => value),
  stringifySearch: stringifySearchWith(JSON.stringify),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
