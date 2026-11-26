import {
  useLocation,
  useParams as useRouteParams,
  useRouter as useTanstackRouter,
} from '@tanstack/react-router';
import { useMemo } from 'react';

// The navigation hooks the app used from next/navigation, with the same
// behaviour, on top of TanStack Router. Search values are always strings
// (see parseSearch in apps/frontend/src/main.tsx).

// Next.js navigates client-side to a same-origin absolute URL too
const toHref = (href: string) => {
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin
      ? url.pathname + url.search + url.hash
      : href;
  } catch (err) {
    return href;
  }
};

export const useRouter = () => {
  const router = useTanstackRouter();
  return useMemo(
    () => ({
      push: (href: string) => router.navigate({ href: toHref(href) }),
      replace: (href: string) =>
        router.navigate({ href: toHref(href), replace: true }),
      back: () => router.history.back(),
      refresh: () => router.invalidate(),
    }),
    [router]
  );
};

export const usePathname = () => useLocation({ select: (l) => l.pathname });

export const useSearchParams = () => {
  const searchStr = useLocation({ select: (l) => l.searchStr });
  return useMemo(() => new URLSearchParams(searchStr), [searchStr]);
};

export const useParams = <
  T extends Record<string, string> = Record<string, string>
>() => {
  const params = useRouteParams({ strict: false });
  return params as T;
};
