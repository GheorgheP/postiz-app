import { createFileRoute, Outlet } from '@tanstack/react-router';
import { PreviewWrapper } from '@gitroom/frontend/components/preview/preview.wrapper';

export const Route = createFileRoute('/_app/(preview)/p/$id')({
  component: () => (
    <div className="bg-newBgColor min-h-screen text-newTextColor">
      <PreviewWrapper>
        <Outlet />
      </PreviewWrapper>
    </div>
  ),
});
