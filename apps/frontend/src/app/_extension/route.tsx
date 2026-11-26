import { createFileRoute, Outlet } from '@tanstack/react-router';
import LayoutContext from '@gitroom/frontend/components/layout/layout.context';
import {
  runtimeVariables,
  VariableContextComponent,
} from '@gitroom/react/helpers/variable.context';
import UtmSaver from '@gitroom/helpers/utils/utm.saver';

export const Route = createFileRoute('/_extension')({
  component: ExtensionLayout,
});

function ExtensionLayout() {
  const {
    disableRegistration,
    datafastWebsiteId,
    googleAdsId,
    googleAdsTrialTracking,
    recaptchaSiteKey,
    ...variables
  } = runtimeVariables();
  return (
    <VariableContextComponent
      {...variables}
      language="en"
      stripeClient=""
      environment={process.env.NODE_ENV!}
      dub={false}
      isChatBase={false}
    >
      <LayoutContext>
        <UtmSaver />
        <Outlet />
      </LayoutContext>
    </VariableContextComponent>
  );
}
