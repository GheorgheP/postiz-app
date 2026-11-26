import { createFileRoute, Outlet } from '@tanstack/react-router';
import { LayoutComponent } from '@gitroom/frontend/components/new-layout/layout.component';

export const Route = createFileRoute('/_app/_site')({
  component: () => (
    <LayoutComponent>
      <Outlet />
    </LayoutComponent>
  ),
});
