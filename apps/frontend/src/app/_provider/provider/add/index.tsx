import { createFileRoute } from '@tanstack/react-router';
import { MobileIntegration } from '@gitroom/frontend/components/new-layout/mobile.integration';

export const Route = createFileRoute('/_provider/provider/add/')({
  component: MobileIntegration,
});
