import { FC, ReactNode, useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plausible?: any;
  }
}

// The script next-plausible's PlausibleProvider added, events are sent with
// useFireEvents (libraries/helpers/src/utils/use.fire.events.ts)
export const PlausibleProvider: FC<{ domain: string; children: ReactNode }> = ({
  domain,
  children,
}) => {
  const enabled = process.env.NODE_ENV === 'production';
  useEffect(() => {
    if (!enabled) {
      return;
    }
    window.plausible =
      window.plausible ||
      function (...args: unknown[]) {
        (window.plausible.q = window.plausible.q || []).push(args);
      };
  }, []);
  return (
    <>
      {enabled && (
        <script
          async
          defer
          data-domain={domain}
          src="https://plausible.io/js/script.js"
        />
      )}
      {children}
    </>
  );
};
