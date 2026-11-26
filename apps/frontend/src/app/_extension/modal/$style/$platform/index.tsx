import { createFileRoute } from '@tanstack/react-router';
import { StandaloneModal } from '@gitroom/frontend/components/standalone-modal/standalone.modal';

export const Route = createFileRoute('/_extension/modal/$style/$platform/')({
  component: () => (
    <div className="w-screen h-screen overflow-hidden bg-black">
      <div className="text-textColor h-[calc(100vh+80px)] w-[calc(100vw+80px)] -m-[40px]">
        <StandaloneModal />
      </div>
    </div>
  ),
});
