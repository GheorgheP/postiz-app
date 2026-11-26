import { createFileRoute, Link } from '@tanstack/react-router';
import { Register } from '@gitroom/frontend/components/auth/register';
import { LoginWithOidc } from '@gitroom/frontend/components/auth/login.with.oidc';
import { customFetch } from '@gitroom/helpers/utils/custom.fetch.func';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export const Route = createFileRoute('/_app/auth/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Register`,
      },
    ],
  }),
  loaderDeps: ({ search }) => ({
    provider: (search as { provider?: string }).provider,
  }),
  loader: async ({ deps }) => {
    const { disableRegistration, backendUrl } = runtimeVariables();
    if (!disableRegistration || deps.provider) {
      return { canRegister: true };
    }
    const { register } = await (
      await customFetch({ baseUrl: backendUrl })('/auth/can-register')
    ).json();
    return { canRegister: !!register };
  },
  component: Auth,
});

function Auth() {
  const t = useT();
  const { canRegister } = Route.useLoaderData();
  if (!canRegister) {
    return (
      <>
        <LoginWithOidc />
        <div className="text-center">
          {t('registration_is_disabled', 'Registration is disabled')}
          <br />
          <Link className="underline hover:font-bold" href="/auth/login">
            {t('login_instead', 'Login instead')}
          </Link>
        </div>
      </>
    );
  }
  return <Register />;
}
