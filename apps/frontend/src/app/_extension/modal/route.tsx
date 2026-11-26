import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AppLayout } from '@gitroom/frontend/components/launches/layout.standalone';

export const Route = createFileRoute('/_extension/modal')({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
