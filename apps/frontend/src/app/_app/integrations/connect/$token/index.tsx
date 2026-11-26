import { createFileRoute } from '@tanstack/react-router';
import { ConnectLink } from '@gitroom/frontend/components/launches/connect.link';

// The person who opens a connect link may have no Postiz account
export const Route = createFileRoute('/_app/integrations/connect/$token/')({
  component: Page,
});

function Page() {
  const { token } = Route.useParams();
  return <ConnectLink token={token} />;
}
