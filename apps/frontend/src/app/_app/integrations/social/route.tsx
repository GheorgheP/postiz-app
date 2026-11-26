import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/integrations/social')({
  component: () => (
    <div className="bg-[#0B0A0A] flex flex-1 min-h-screen w-screen">
      <Outlet />
    </div>
  ),
});
