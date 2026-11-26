import { createFileRoute } from '@tanstack/react-router';
import { Login } from '@gitroom/frontend/components/auth/login';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/auth/login/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Login`,
      },
    ],
  }),
  component: Login,
});
