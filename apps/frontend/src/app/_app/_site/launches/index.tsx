import { createFileRoute } from '@tanstack/react-router';
import { LaunchesComponent } from '@gitroom/frontend/components/launches/launches.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/launches/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz Calendar' : 'Gitroom Launches'}`,
      },
    ],
  }),
  component: LaunchesComponent,
});
