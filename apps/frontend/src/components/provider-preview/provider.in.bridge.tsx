import { FC, lazy, Suspense } from 'react';
const Bridge = lazy(
  () => import('@gitroom/frontend/components/provider-preview/provider.bridge')
);
export const InBridge: FC<{ provider: string }> = ({ provider }) => {
  return (
    <Suspense fallback={null}>
      <Bridge provider={provider} />
    </Suspense>
  );
};
