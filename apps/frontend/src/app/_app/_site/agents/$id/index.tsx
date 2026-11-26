import { createFileRoute } from '@tanstack/react-router';
import { AgentChat } from '@gitroom/frontend/components/agents/agent.chat';

export const Route = createFileRoute('/_app/_site/agents/$id/')({
  component: AgentChat,
});
