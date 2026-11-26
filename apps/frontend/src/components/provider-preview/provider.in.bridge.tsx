import dynamic from '@gitroom/react/helpers/dynamic';
import { FC } from 'react';
const Bridge = dynamic(
  () => import('@gitroom/frontend/components/provider-preview/provider.bridge')
);
export const InBridge: FC<{ provider: string }> = ({ provider }) => {
  return <Bridge provider={provider} />;
};
