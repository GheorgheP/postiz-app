import { createFileRoute, Link } from '@tanstack/react-router';
import useSWR from 'swr';
import { Register } from '@gitroom/frontend/components/auth/register';
import { LoginWithOidc } from '@gitroom/frontend/components/auth/login.with.oidc';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
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
  component: Auth,
});

// with DISABLE_REGISTRATION the backend can still allow it (e.g. first user)
const useCanRegister = (check: boolean) => {
  const fetch = useFetch();
  return useSWR(check ? 'can-register' : null, async () => {
    return !!(await (await fetch('/auth/can-register')).json()).register;
  });
};

function Auth() {
  const t = useT();
  const { provider } = Route.useSearch() as { provider?: string };
  const check = runtimeVariables().disableRegistration && !provider;
  const { data: canRegister, isLoading } = useCanRegister(check);
  if (check && isLoading) {
    return null;
  }
  if (check && !canRegister) {
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
