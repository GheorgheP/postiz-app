import { createFileRoute } from '@tanstack/react-router';
import { ContinueIntegration } from '@gitroom/frontend/components/launches/continue.integration';
import { isLogged } from '@gitroom/frontend/components/layout/session';

export const Route = createFileRoute('/_app/integrations/social/$provider/')({
  loader: async () => ({ logged: await isLogged() }),
  component: Page,
});

function Page() {
  const { provider } = Route.useParams();
  const searchParams = Route.useSearch();
  const { logged } = Route.useLoaderData();
  return (
    <ContinueIntegration
      searchParams={searchParams}
      provider={provider}
      logged={logged}
    />
  );
}
