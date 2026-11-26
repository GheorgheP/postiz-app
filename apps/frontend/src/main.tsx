// first: the provider settings DTOs use decorators that read it as they load,
// and with code splitting their chunk can run before any component imports it
import 'reflect-metadata';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import '@gitroom/frontend/fonts/plus-jakarta-sans/plus.jakarta.sans.font';

// @ts-expect-error TanStack Router's types need strictNullChecks, which the
// shared tsconfig.base.json turns off
const router = createRouter({
  routeTree,
  // Search values stay the strings of the URL, as with URLSearchParams in
  // Next.js. TanStack's default parsing would turn ?id=1 into a number and
  // ?onboarding=true into a boolean.
  parseSearch: (searchStr: string) =>
    Object.fromEntries(new URLSearchParams(searchStr)),
  stringifySearch: (search: Record<string, unknown>) => {
    const searchStr = new URLSearchParams(
      Object.entries(search).filter(([, value]) => value !== undefined) as [
        string,
        string
      ][]
    ).toString();
    return searchStr ? `?${searchStr}` : '';
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
