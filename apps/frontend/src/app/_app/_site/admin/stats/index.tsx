import { createFileRoute } from '@tanstack/react-router';
import { AdminStatsComponent } from '@gitroom/frontend/components/admin/admin-stats.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/admin/stats/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Admin Stats`,
      },
    ],
  }),
  component: () => (
    <div className="bg-newBgColorInner flex-1 min-w-0 flex-col flex p-[20px] gap-[12px]">
      <AdminStatsComponent />
    </div>
  ),
});
