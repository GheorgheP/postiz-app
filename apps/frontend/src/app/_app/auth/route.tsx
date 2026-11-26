import { createFileRoute, Outlet } from '@tanstack/react-router';
import { TestimonialComponent } from '@gitroom/frontend/components/auth/testimonial.component';
import { AttributionComponent } from '@gitroom/frontend/components/auth/attribution.component';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { MantineWrapper } from '@gitroom/react/helpers/mantine.wrapper';
import { Toaster } from '@gitroom/react/toaster/toaster';
import ReturnUrlComponent from '@gitroom/frontend/components/auth/return.url.component';

export const Route = createFileRoute('/_app/auth')({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <MantineWrapper>
      <Toaster />
      <div className="bg-[#0E0E0E] flex flex-1 p-[12px] gap-[12px] min-h-screen w-screen text-white">
        {/*<style>{`html, body {overflow-x: hidden;}`}</style>*/}
        <ReturnUrlComponent />
        <AttributionComponent />
        <div className="flex flex-col py-[40px] px-[20px] flex-1 lg:w-[600px] lg:flex-none rounded-[12px] text-white p-[12px] bg-[#1A1919]">
          <div className="w-full max-w-[440px] mx-auto justify-center gap-[20px] h-full flex flex-col text-white">
            <LogoTextComponent />
            <div className="flex">
              <Outlet />
            </div>
          </div>
        </div>
        <div className="text-[36px] flex-1 pt-[88px] hidden lg:flex flex-col items-center">
          <div className="text-center">
            Over <span className="text-[42px] text-[#FC69FF]">20,000+</span>{' '}
            Entrepreneurs use
            <br />
            Postiz To Grow Their Social Presence
          </div>
          <TestimonialComponent />
        </div>
      </div>
    </MantineWrapper>
  );
}
