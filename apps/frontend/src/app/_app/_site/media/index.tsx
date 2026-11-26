import { createFileRoute } from '@tanstack/react-router';
import { MediaLayoutComponent } from '@gitroom/frontend/components/new-layout/layout.media.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/media/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Media`,
      },
    ],
  }),
  component: MediaLayoutComponent,
});
