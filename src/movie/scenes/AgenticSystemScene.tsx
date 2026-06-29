import { useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowDown, Bot, Brain, Calculator, Database, FileSearch, GitBranch,
  MessageSquare, PenLine, RefreshCw, Scale, ShieldCheck, Sparkles, Wrench, Zap,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, sequenceIn, staggerIn } from '../useSceneTimeline';

type Props = { active: boolean };

const specialistNodes = [
  {
    icon: <MessageSquare size={15} />,
    color: 'blue' as const,
    label: 'Meeting Node',
    sub: 'Parses transcript, speakers, action items, and decisions',
    outputs: ['Context bundle', 'Speaker map', 'Decision log'],
  },
  {
    icon: <PenLine size={15} />,
    color: 'gold' as const,
    label: 'Drafting Node',
    sub: 'Generates BCs, BRDs, SOPs, summaries, and task lists',
    outputs: ['Draft artifacts', 'Source citations', 'Change diffs'],
  },
  {
    icon: <ShieldCheck size={15} />,
    color: 'green' as const,
    label: 'Review Node',
    sub: 'Runs custom checks, scoring gates, and policy rules',
    outputs: ['Gate results', 'Scorecards', 'Approval queue'],
  },
];

const tools = [
  { icon: <FileSearch size={12} />, label: 'Search', sub: 'Find approved docs & past decisions', nodes: ['Meeting', 'Drafting'] },
  { icon: <Calculator size={12} />, label: 'Calculate', sub: 'Budget ranges, ROI, risk scores', nodes: ['Drafting', 'Review'] },
  { icon: <Database size={12} />, label: 'Retrieve', sub: 'Pull citations from shared memory', nodes: ['Meeting', 'Review'] },
  { icon: <PenLine size={12} />, label: 'Draft', sub: 'Write and revise artifact sections', nodes: ['Drafting'] },
  { icon: <Scale size={12} />, label: 'Score', sub: 'CEO scorecards & threshold checks', nodes: ['Review'] },
  { icon: <Zap size={12} />, label: 'Route', sub: 'Send to approvers & next pipeline step', nodes: ['Review'] },
];

const memoryLayers = [
  { label: 'Meetings', detail: 'Transcripts, speakers, decisions' },
  { label: 'Artifacts', detail: 'BCs, BRDs, SOPs, tasks' },
  { label: 'Approvals', detail: 'Who signed off and when' },
  { label: 'Rules', detail: 'Custom checks & org standards' },
];

const principles = [
  { icon: <GitBranch size={13} />, color: 'purple' as const, label: 'Graph orchestration', sub: 'Orchestrator picks the right node for each step — no single monolithic prompt.' },
  { icon: <Database size={13} />, color: 'teal' as const, label: 'Memory grounded', sub: 'Every answer and draft cites approved organisational memory, not the open web.' },
  { icon: <Wrench size={13} />, color: 'blue' as const, label: 'Tool using', sub: 'Nodes call specialised tools on demand — search, score, retrieve, draft, route.' },
  { icon: <RefreshCw size={13} />, color: 'green' as const, label: 'Learns from approval', sub: 'Human edits and sign-offs become standards for the next run.' },
];

const exampleRun = [
  { icon: <MessageSquare size={14} />, color: 'blue' as const, title: 'Meeting ends', sub: 'Orchestrator ingests transcript and extracts decisions' },
  { icon: <PenLine size={14} />, color: 'gold' as const, title: 'Draft BC', sub: 'Drafting node retrieves past BCs and writes a first draft' },
  { icon: <ShieldCheck size={14} />, color: 'green' as const, title: 'Run checks', sub: 'Review node scores and routes to CEO, then BRD approval' },
  { icon: <RefreshCw size={14} />, color: 'teal' as const, title: 'Approve & learn', sub: 'Published BC updates shared memory for the next meeting' },
];

export function AgenticSystemScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(tl, root, '[data-animate="graph"]', 0.18, 0.1, { opacity: 0, y: 12, scale: 0.97 });
    staggerIn(tl, root, '[data-animate="tool"]', 0.06, 0.72);
    staggerIn(tl, root, '[data-animate="memory"]', 0.05, 1.05);
    staggerIn(tl, root, '[data-animate="principle"]', 0.08, 0.45);
    staggerIn(tl, root, '[data-animate="run"]', 0.1, 0.95);
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="agentic-system-shell"
        hideMeta
        eyebrow={<><GitBranch size={11} /> Agentic System</>}
        headline="How Aura Thinks: Nodes, Tools, One Shared Memory."
        subline="Specialist agents coordinate through an orchestrator, use the right tools, and learn from every approved decision."
      >
        <div className="agentic-system-scene">
          <GlassCard accent="purple" className="agentic-system-graph">
            <div className="agentic-orchestrator" data-animate="graph">
              <IconBadge color="purple" size="xl"><Brain size={24} /></IconBadge>
              <div className="agentic-orchestrator-copy">
                <div className="agentic-orchestrator-title">Aura Orchestrator</div>
                <div className="agentic-orchestrator-sub">Decomposes each request into steps, routes to specialist nodes, and coordinates tool calls</div>
              </div>
              <div className="agentic-orchestrator-meta">
                <span>Parallel nodes</span>
                <span>Policy aware</span>
              </div>
            </div>

            <div className="agentic-graph-connector" data-animate="graph">
              <ArrowDown size={14} />
              <span>Routes to specialist nodes</span>
            </div>

            <div className="agentic-node-row">
              {specialistNodes.map((node) => (
                <div key={node.label} className="agentic-node" data-animate="graph">
                  <IconBadge color={node.color} size="lg">{node.icon}</IconBadge>
                  <div className="agentic-node-title">{node.label}</div>
                  <div className="agentic-node-sub">{node.sub}</div>
                  <div className="agentic-node-outputs">
                    {node.outputs.map((output) => (
                      <span key={output} className="agentic-node-output">{output}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="agentic-tools" data-animate="graph">
              <div className="agentic-tools-head">
                <div className="agentic-tools-title"><Wrench size={13} /> Pluggable tools — called by nodes on demand</div>
                <span className="agentic-tools-note">Swap or extend without rebuilding the graph</span>
              </div>
              <div className="agentic-tool-grid">
                {tools.map((tool) => (
                  <div key={tool.label} className="agentic-tool-card" data-animate="tool">
                    <div className="agentic-tool-card-top">
                      <span className="agentic-tool-icon">{tool.icon}</span>
                      <strong>{tool.label}</strong>
                    </div>
                    <div className="agentic-tool-sub">{tool.sub}</div>
                    <div className="agentic-tool-nodes">
                      {tool.nodes.map((node) => (
                        <span key={node} className="agentic-tool-node-tag">{node}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="agentic-memory-row">
              <div className="agentic-memory agentic-memory--shared" data-animate="memory">
                <IconBadge color="teal" size="lg"><Database size={18} /></IconBadge>
                <div className="agentic-memory-copy">
                  <div className="agentic-memory-title">Shared Memory</div>
                  <div className="agentic-memory-sub">Single source of truth every node reads from and writes back to</div>
                  <div className="agentic-memory-layers">
                    {memoryLayers.map((layer) => (
                      <div key={layer.label} className="agentic-memory-layer" data-animate="memory">
                        <strong>{layer.label}</strong>
                        <span>{layer.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="agentic-feedback-block" data-animate="memory">
                <RefreshCw size={16} className="agentic-feedback-icon" />
                <div className="agentic-memory agentic-memory--feedback">
                  <div className="agentic-memory-title">Approval feedback loop</div>
                  <div className="agentic-memory-sub">Edits, rejections, and sign-offs update rules and standards for the next run</div>
                </div>
              </div>
            </div>
          </GlassCard>

          <aside className="agentic-system-principles">
            <GlassCard accent="blue" className="agentic-principle-panel">
              <div className="modern-panel-title" data-animate="principle">
                <Sparkles size={13} /> How everything works together
              </div>
              {principles.map((item) => (
                <div key={item.label} className="agentic-principle" data-animate="principle">
                  <IconBadge color={item.color} size="sm">{item.icon}</IconBadge>
                  <div>
                    <div className="agentic-principle-label">{item.label}</div>
                    <div className="agentic-principle-sub">{item.sub}</div>
                  </div>
                </div>
              ))}
            </GlassCard>

            <GlassCard accent="gold" className="agentic-run-panel">
              <div className="modern-panel-title" data-animate="run">
                <Bot size={13} /> Example: BC after a meeting
              </div>
              <div className="agentic-run-steps">
                {exampleRun.map((step, i) => (
                  <div key={step.title} className="agentic-run-step" data-animate="run">
                    <div className="agentic-run-rail">
                      <IconBadge color={step.color} size="md">{step.icon}</IconBadge>
                      {i < exampleRun.length - 1 && <span className="agentic-run-line" />}
                    </div>
                    <div className="agentic-run-card">
                      <div className="agentic-run-title">{step.title}</div>
                      <div className="agentic-run-sub">{step.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </aside>
        </div>
      </SceneShell>
    </div>
  );
}
