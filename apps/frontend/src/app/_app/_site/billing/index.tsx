import { createFileRoute } from '@tanstack/react-router';
import { BillingComponent } from '@gitroom/frontend/components/billing/billing.component';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/billing/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Billing`,
      },
    ],
  }),
  component: () => (
    <div className="bg-newBgColorInner flex-1 flex-col flex p-[20px] gap-[12px]">
      <BillingComponent />
    </div>
  ),
});
