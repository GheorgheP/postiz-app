import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_site/third-party/')({
  beforeLoad: () => {
    throw redirect({ href: '/settings?tab=integrations' });
  },
});
