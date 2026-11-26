import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/auth/login-required/')({
  component: () => (
    <div className="fixed left-0 top-0 w-full h-full bg-[#121212] z-[100] flex justify-center items-center text-4xl">
      Login to use the wizard to generate API code
    </div>
  ),
});
