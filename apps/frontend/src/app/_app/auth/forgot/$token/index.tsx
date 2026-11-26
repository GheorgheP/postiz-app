import { createFileRoute } from '@tanstack/react-router';
import { ForgotReturn } from '@gitroom/frontend/components/auth/forgot-return';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/auth/forgot/$token/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Forgot Password`,
      },
    ],
  }),
  component: Page,
});

function Page() {
  const { token } = Route.useParams();
  return <ForgotReturn token={token} />;
}
