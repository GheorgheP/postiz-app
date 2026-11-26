import { useCallback } from 'react';
import { useVariables } from '@gitroom/react/helpers/variable.context';

export const useFireEvents = () => {
  const { billingEnabled } = useVariables();

  return useCallback(
    (name: string, props?: any) => {
      if (!billingEnabled) {
        return;
      }

      // loaded by PlausibleProvider (apps/frontend/src/components/layout/plausible.component.tsx)
      (window as any).plausible?.(name, { props });
    },
    [billingEnabled]
  );
};
