import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Agent } from '@gitroom/frontend/components/agents/agent';

export const Route = createFileRoute('/_app/_site/agents')({
  head: () => ({
    meta: [{ title: 'Postiz - Agent' }],
  }),
  component: () => (
    <Agent>
      <Outlet />
    </Agent>
  ),
});
