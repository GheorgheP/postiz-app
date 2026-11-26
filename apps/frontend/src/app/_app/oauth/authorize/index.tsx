import { createFileRoute } from '@tanstack/react-router';
import { OAuthAuthorize } from '@gitroom/frontend/components/oauth/authorize.component';
import { isLogged } from '@gitroom/frontend/components/layout/session';

// signed-out visitors get the page too (sign in, or use self-hosted)
export const Route = createFileRoute('/_app/oauth/authorize/')({
  loader: async () => ({ logged: await isLogged() }),
  component: Page,
});

function Page() {
  const { logged } = Route.useLoaderData();
  return <OAuthAuthorize logged={logged} />;
}
