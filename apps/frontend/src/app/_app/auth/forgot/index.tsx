import { createFileRoute } from '@tanstack/react-router';
import { Forgot } from '@gitroom/frontend/components/auth/forgot';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/auth/forgot/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Forgot Password`,
      },
    ],
  }),
  component: Forgot,
});
