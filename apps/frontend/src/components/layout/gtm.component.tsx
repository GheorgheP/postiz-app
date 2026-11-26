'use client';

import { FC, useEffect } from 'react';
import { useUser } from '@gitroom/frontend/components/layout/user.context';
import { useVariables } from '@gitroom/react/helpers/variable.context';

export const TrialTracker: FC = () => {
  const user = useUser();
  const { googleAdsId, googleAdsTrialTracking } = useVariables();
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !user?.id ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      !window.gtag ||
      !googleAdsId ||
      !googleAdsTrialTracking
    )
      return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('trialStart') !== 'true') return;
    const key = `gtm_start_trial_${user?.id}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, '1');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    gtag('event', 'conversion', {
      send_to: `${googleAdsId}/${googleAdsTrialTracking}`,
      transaction_id: user.id,
    });
  }, [user]);
  return null;
};

export const GoogleTagManagerComponent: FC<{ gtmId?: string }> = ({
  gtmId,
}) => {
  useEffect(() => {
    if (!gtmId) {
      return;
    }
    const gtag = document.createElement('script');
    gtag.src = '/g.js';
    gtag.async = true;
    document.head.appendChild(gtag);

    const config = document.createElement('script');
    config.id = 'google-ads-gtag';
    config.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gtmId}');
  `;
    document.head.appendChild(config);
  }, [gtmId]);
  return null;
};
