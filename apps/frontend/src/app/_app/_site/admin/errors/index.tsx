import { createFileRoute } from '@tanstack/react-router';
import { AdminErrorsComponent } from '@gitroom/frontend/components/admin/admin-errors.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/admin/errors/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Admin Errors`,
      },
    ],
  }),
  component: () => (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <AdminErrorsComponent />
    </div>
  ),
});
