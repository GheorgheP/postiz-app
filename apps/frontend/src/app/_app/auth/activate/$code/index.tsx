import { createFileRoute } from '@tanstack/react-router';
import { AfterActivate } from '@gitroom/frontend/components/auth/after.activate';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/auth/activate/$code/')({
  head: () => ({
    meta: [
      {
        title: `${
          runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'
        } - Activate your account`,
      },
    ],
  }),
  component: AfterActivate,
});
