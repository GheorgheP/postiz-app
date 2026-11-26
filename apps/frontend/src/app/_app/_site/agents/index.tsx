import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/_site/agents/')({
  beforeLoad: () => {
    throw redirect({ href: '/agents/new' });
  },
});
