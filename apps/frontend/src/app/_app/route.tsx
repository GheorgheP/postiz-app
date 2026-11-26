import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SentryComponent } from '@gitroom/frontend/components/layout/sentry.component';
import LayoutContext from '@gitroom/frontend/components/layout/layout.context';
import { PlausibleProvider } from '@gitroom/frontend/components/layout/plausible.component';
import {
  runtimeVariables,
  VariableContextComponent,
} from '@gitroom/react/helpers/variable.context';
import { Fragment } from 'react';
import UtmSaver from '@gitroom/helpers/utils/utm.saver';
import { DubAnalytics } from '@gitroom/frontend/components/layout/dubAnalytics';
import { FacebookComponent } from '@gitroom/frontend/components/layout/facebook.component';
import { GoogleTagManagerComponent } from '@gitroom/frontend/components/layout/gtm.component';
import { getCookie } from 'react-use-cookie';
import {
  cookieName,
  fallbackLng,
} from '@gitroom/react/translation/i18n.config';
import { HtmlComponent } from '@gitroom/frontend/components/layout/html.component';
import { ChangeDirClient } from '@gitroom/frontend/components/new-layout/change.dir.client';

export const Route = createFileRoute('/_app')({
  component: AppLayout,
});

function AppLayout() {
  const { disableRegistration, datafastWebsiteId, ...variables } =
    runtimeVariables();
  const language = getCookie(cookieName) || fallbackLng;
  const Plausible = variables.billingEnabled ? PlausibleProvider : Fragment;
  return (
    <>
      {!!datafastWebsiteId && (
        <script
          async
          data-website-id={datafastWebsiteId}
          data-domain="postiz.com"
          src="https://datafa.st/js/script.js"
        />
      )}
      <ChangeDirClient />
      <VariableContextComponent
        {...variables}
        environment={process.env.NODE_ENV!}
        language={language}
      >
        <SentryComponent>
          <HtmlComponent />
          <DubAnalytics />
          <FacebookComponent />
          <GoogleTagManagerComponent gtmId={variables.googleAdsId} />
          <Plausible
            domain={variables.isGeneral ? 'postiz.com' : 'gitroom.com'}
          >
            <LayoutContext>
              <UtmSaver />
              <Outlet />
            </LayoutContext>
          </Plausible>
        </SentryComponent>
      </VariableContextComponent>
    </>
  );
}
