import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/integrations/connect')({
  head: () => ({
    meta: [{ title: 'Connect Channel' }],
  }),
  // w-full: the page can be taller than a small window, and w-screen then adds
  // a horizontal scrollbar next to the vertical one
  component: () => (
    <div className="bg-[#0B0A0A] flex flex-1 min-h-screen w-full">
      <Outlet />
    </div>
  ),
});
