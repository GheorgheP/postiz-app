import { createFileRoute } from '@tanstack/react-router';
import { SettingsPopup } from '@gitroom/frontend/components/layout/settings.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/settings/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Settings`,
      },
    ],
  }),
  component: SettingsPopup,
});
