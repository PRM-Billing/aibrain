import type { ComponentType } from 'react';
import { HeroScene } from './scenes/HeroScene';
import { OperatingLoopScene } from './scenes/OperatingLoopScene';
import { MeetingAgentScene } from './scenes/MeetingAgentScene';
import { KnowledgeRepositoryScene } from './scenes/KnowledgeRepositoryScene';
import { LearningOpportunitiesScene } from './scenes/LearningOpportunitiesScene';
import { CustomChecksScene } from './scenes/CustomChecksScene';
import { IntelligentChatScene } from './scenes/IntelligentChatScene';
import { ManyMoreScene } from './scenes/ManyMoreScene';
import { AgenticSystemScene } from './scenes/AgenticSystemScene';
import { ModernFeaturesScene } from './scenes/ModernFeaturesScene';
import { ConclusionScene } from './scenes/ConclusionScene';
import { SecurityScene } from './scenes/SecurityScene';
import { HumanLoopScene } from './scenes/HumanLoopScene';
import { AccessControlScene } from './scenes/AccessControlScene';
import { OrgBrainScene } from './scenes/OrgBrainScene';
import { ArtifactPipelineScene } from './scenes/ArtifactPipelineScene';
import { ClosingScene } from './scenes/ClosingScene';

export type SceneDef = {
  id: string;
  label: string;
  durationMs: number;
  component: ComponentType<{ active: boolean }>;
};

export const SCENES: SceneDef[] = [
  { id: 'hero', label: 'Aura', durationMs: 9000, component: HeroScene },
  { id: 'operating-loop', label: 'How It Works', durationMs: 14000, component: OperatingLoopScene },
  { id: 'meeting-agent', label: 'In Meetings', durationMs: 12000, component: MeetingAgentScene },
  { id: 'org-brain', label: 'Org Brain', durationMs: 12000, component: OrgBrainScene },
  { id: 'artifact-pipeline', label: 'AI Pipelines', durationMs: 13000, component: ArtifactPipelineScene },
  { id: 'knowledge-repository', label: 'Knowledge', durationMs: 13000, component: KnowledgeRepositoryScene },
  { id: 'learning-opportunities', label: 'Learning', durationMs: 13000, component: LearningOpportunitiesScene },
  { id: 'custom-checks', label: 'Checks', durationMs: 13000, component: CustomChecksScene },
  { id: 'intelligent-chat', label: 'Ask Aura', durationMs: 13000, component: IntelligentChatScene },
  { id: 'many-more', label: 'Possibilities', durationMs: 12000, component: ManyMoreScene },
  { id: 'agentic-system', label: 'Agentic', durationMs: 13000, component: AgenticSystemScene },
  { id: 'modern-features', label: 'Modern', durationMs: 12000, component: ModernFeaturesScene },
  { id: 'conclusion', label: 'Recap', durationMs: 12000, component: ConclusionScene },
  { id: 'security', label: 'Security', durationMs: 11000, component: SecurityScene },
  { id: 'human-loop', label: 'Human Approved', durationMs: 10000, component: HumanLoopScene },
  { id: 'access-control', label: 'Access', durationMs: 10000, component: AccessControlScene },
  { id: 'closing', label: 'Start Now', durationMs: 11000, component: ClosingScene },
];
