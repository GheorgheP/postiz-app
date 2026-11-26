import { createFileRoute } from '@tanstack/react-router';
import { Activate } from '@gitroom/frontend/components/auth/activate';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/auth/activate/')({
  head: () => ({
    meta: [
      {
        title: `${
          runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'
        } - Activate your account`,
      },
    ],
  }),
  component: Activate,
});
