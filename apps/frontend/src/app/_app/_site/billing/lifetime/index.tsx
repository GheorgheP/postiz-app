import { createFileRoute } from '@tanstack/react-router';
import { LifetimeDeal } from '@gitroom/frontend/components/billing/lifetime.deal';
import { runtimeVariables } from '@gitroom/react/helpers/variable.context';

export const Route = createFileRoute('/_app/_site/billing/lifetime/')({
  head: () => ({
    meta: [
      {
        title: `${runtimeVariables().isGeneral ? 'Postiz' : 'Gitroom'} Lifetime deal`,
      },
    ],
  }),
  component: LifetimeDeal,
});
