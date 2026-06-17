import type { ComponentType } from 'react';
import { HeroScene } from './scenes/HeroScene';
import { OperatingLoopScene } from './scenes/OperatingLoopScene';
import { MeetingAgentScene } from './scenes/MeetingAgentScene';
import { LivingMemoryScene } from './scenes/LivingMemoryScene';
import { ManyMoreScene } from './scenes/ManyMoreScene';
import { ArchitectureScene } from './scenes/ArchitectureScene';
import { DashboardsScene } from './scenes/DashboardsScene';
import { KnowledgeScene } from './scenes/KnowledgeScene';
import { CitationsScene } from './scenes/CitationsScene';
import { LearningScene } from './scenes/LearningScene';
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
  { id: 'living-memory', label: 'Memory', durationMs: 11000, component: LivingMemoryScene },
  { id: 'many-more', label: 'Possibilities', durationMs: 12000, component: ManyMoreScene },
  { id: 'architecture', label: 'Architecture', durationMs: 10000, component: ArchitectureScene },
  { id: 'dashboards', label: 'Dashboards', durationMs: 10000, component: DashboardsScene },
  { id: 'knowledge', label: 'Knowledge', durationMs: 10000, component: KnowledgeScene },
  { id: 'citations', label: 'Citations', durationMs: 11000, component: CitationsScene },
  { id: 'learning', label: 'Learning', durationMs: 11000, component: LearningScene },
  { id: 'security', label: 'Security', durationMs: 11000, component: SecurityScene },
  { id: 'human-loop', label: 'Human Approved', durationMs: 10000, component: HumanLoopScene },
  { id: 'access-control', label: 'Access', durationMs: 10000, component: AccessControlScene },
  { id: 'closing', label: 'Start Now', durationMs: 11000, component: ClosingScene },
];
