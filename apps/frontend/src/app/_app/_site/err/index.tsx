import { createFileRoute } from '@tanstack/react-router';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export const Route = createFileRoute('/_app/_site/err/')({
  head: () => ({
    meta: [{ title: 'Error' }],
  }),
  component: Page,
});

function Page() {
  const t = useT();
  return (
    <div>
      {t(
        'we_are_experiencing_some_difficulty_try_to_refresh_the_page',
        'We are experiencing some difficulty, try to refresh the page'
      )}
    </div>
  );
}
