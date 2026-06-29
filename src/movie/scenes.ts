import type { ComponentType } from 'react';
import slideManifest from '../narration/slides.json';
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

const durationById = Object.fromEntries(
  slideManifest.slides.map((slide) => [slide.id, slide.durationMs]),
) as Record<string, number>;

export const SCENES: SceneDef[] = [
  { id: 'hero', label: 'Aura', durationMs: durationById.hero, component: HeroScene },
  { id: 'operating-loop', label: 'How It Works', durationMs: durationById['operating-loop'], component: OperatingLoopScene },
  { id: 'meeting-agent', label: 'In Meetings', durationMs: durationById['meeting-agent'], component: MeetingAgentScene },
  { id: 'org-brain', label: 'Org Brain', durationMs: durationById['org-brain'], component: OrgBrainScene },
  { id: 'artifact-pipeline', label: 'AI Pipelines', durationMs: durationById['artifact-pipeline'], component: ArtifactPipelineScene },
  { id: 'knowledge-repository', label: 'Knowledge', durationMs: durationById['knowledge-repository'], component: KnowledgeRepositoryScene },
  { id: 'learning-opportunities', label: 'Learning', durationMs: durationById['learning-opportunities'], component: LearningOpportunitiesScene },
  { id: 'custom-checks', label: 'Checks', durationMs: durationById['custom-checks'], component: CustomChecksScene },
  { id: 'intelligent-chat', label: 'Ask Aura', durationMs: durationById['intelligent-chat'], component: IntelligentChatScene },
  { id: 'many-more', label: 'Possibilities', durationMs: durationById['many-more'], component: ManyMoreScene },
  { id: 'agentic-system', label: 'Agentic', durationMs: durationById['agentic-system'], component: AgenticSystemScene },
  { id: 'modern-features', label: 'Modern', durationMs: durationById['modern-features'], component: ModernFeaturesScene },
  { id: 'conclusion', label: 'Recap', durationMs: durationById.conclusion, component: ConclusionScene },
  { id: 'security', label: 'Security', durationMs: durationById.security, component: SecurityScene },
  { id: 'human-loop', label: 'Human Approved', durationMs: durationById['human-loop'], component: HumanLoopScene },
  { id: 'access-control', label: 'Access', durationMs: durationById['access-control'], component: AccessControlScene },
  { id: 'closing', label: 'Start Now', durationMs: durationById.closing, component: ClosingScene },
];
