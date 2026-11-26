import * as Sentry from '@sentry/react';
import { ErrorComponentProps } from '@tanstack/react-router';
import { useEffect } from 'react';

// errorComponent of the root route: what is shown when rendering crashes
export function GlobalError({ error }: ErrorComponentProps) {
  useEffect(() => {
    // The variables context is not mounted here (this replaces the root
    // layout), so don't gate on its DSN. Without a client this is a no-op, and
    // beforeSend already opens the report dialog for captured exceptions
    Sentry.captureException(error);
  }, [error]);
  return (
    <div className="fixed start-0 top-0 w-full h-full flex justify-center items-center text-[20px] text-center p-[20px]">
      Application error: a client-side exception has occurred, try to refresh
      the page.
    </div>
  );
}
