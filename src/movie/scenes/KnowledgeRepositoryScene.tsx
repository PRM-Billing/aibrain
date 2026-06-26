import { useCallback } from 'react';
import gsap from 'gsap';
import {
  ArrowDown, BookMarked, Bot, ChevronDown, ChevronRight, FileText, Folder, FolderOpen,
  History, Link2, MessageSquare, PenLine, Send, Sparkles, User,
} from 'lucide-react';
import { SceneShell } from '../../components/SceneShell';
import { GlassCard, IconBadge } from '../../components/GlassCard';
import { useSceneTimeline, staggerIn, sequenceIn, fadeIn } from '../useSceneTimeline';

type Props = { active: boolean };

type FolderNode = {
  id: string;
  name: string;
  icon?: 'folder' | 'folderOpen' | 'file';
  children?: FolderNode[];
  selected?: boolean;
};

const folderTree: FolderNode[] = [
  {
    id: 'finance',
    name: 'Finance',
    icon: 'folderOpen',
    children: [
      {
        id: 'bc',
        name: 'Business Cases',
        icon: 'folder',
        children: [
          { id: 'q3-bc', name: 'Q3 Budget BC.md', icon: 'file', selected: true },
          { id: 'infra-bc', name: 'Infrastructure BC.md', icon: 'file' },
        ],
      },
      { id: 'fin-reports', name: 'Quarterly Reports', icon: 'folder' },
    ],
  },
  {
    id: 'ops',
    name: 'Operations',
    icon: 'folder',
    children: [
      { id: 'sops', name: 'SOPs', icon: 'folder' },
      { id: 'incident', name: 'Incident Response.md', icon: 'file' },
    ],
  },
  {
    id: 'legal',
    name: 'Legal',
    icon: 'folder',
    children: [
      { id: 'policies', name: 'Policies', icon: 'folder' },
      { id: 'retention', name: 'Data Retention.md', icon: 'file' },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    icon: 'folder',
    children: [
      { id: 'onboarding', name: 'Onboarding', icon: 'folder' },
      { id: 'handbook', name: 'Employee Handbook.md', icon: 'file' },
    ],
  },
  {
    id: 'it',
    name: 'IT',
    icon: 'folder',
    children: [
      { id: 'runbooks', name: 'Runbooks', icon: 'folder' },
      { id: 'security', name: 'Security Policy.md', icon: 'file' },
    ],
  },
];

const flowSteps = [
  {
    icon: <FolderOpen size={16} strokeWidth={2.25} />,
    color: 'teal' as const,
    label: 'Browse folders',
    desc: 'Grouped by team, project, and type.',
    example: 'Finance → Business Cases → Q3 Budget BC.md',
  },
  {
    icon: <PenLine size={16} strokeWidth={2.25} />,
    color: 'gold' as const,
    label: 'Edit in place',
    desc: 'Refine sections, attach sources, track versions.',
    example: 'Add risk section · link Q2 Infrastructure Review.',
  },
  {
    icon: <MessageSquare size={16} strokeWidth={2.25} />,
    color: 'blue' as const,
    label: 'Update via chat',
    desc: 'Describe the change — Aura drafts the update.',
    example: '“Add a risk section citing last quarter’s scope slip.”',
  },
];

const chatMessages = [
  {
    id: '1',
    role: 'user' as const,
    text: 'Add a risk section citing last quarter\'s scope slip.',
  },
  {
    id: '2',
    role: 'ai' as const,
    text: 'Found Q2 Infrastructure Review — drafting section now.',
  },
  {
    id: '3',
    role: 'ai' as const,
    text: 'Added Risk & Mitigation with source link. Ready for your review in the editor.',
  },
];

const editorSections = [
  { id: 'summary', label: 'Executive Summary', body: 'Q3 infrastructure budget approved at $4.2M with phased rollout across Finance and IT.' },
  { id: 'scope', label: 'Scope & Deliverables', body: 'Cloud migration, network refresh, and security hardening — delivery target Q4.' },
  {
    id: 'risk',
    label: 'Risk & Mitigation',
    body: 'Similar scope in Q2 slipped 6 weeks (Q2 Infrastructure Review, p. 4). Recommend contingency buffer and weekly checkpoint with VP Ops.',
    highlight: true,
    source: 'Q2 Infrastructure Review.pdf · p. 4',
  },
  { id: 'owners', label: 'Owners & Timeline', body: 'VP Ops · Due Mar 28 · Finance sign-off required before commit.' },
  { id: 'approval', label: 'Approval Status', body: 'Draft — awaiting VP Ops review. Sources attached from Q2 Infrastructure Review and budget actuals.' },
];

function FolderIcon({ type }: { type?: FolderNode['icon'] }) {
  if (type === 'file') return <FileText size={12} strokeWidth={2.25} />;
  if (type === 'folderOpen') return <FolderOpen size={12} strokeWidth={2.25} />;
  return <Folder size={12} strokeWidth={2.25} />;
}

function FolderTree({ nodes, depth = 0 }: { nodes: FolderNode[]; depth?: number }) {
  return (
    <>
      {nodes.map((node) => {
        const isOpen = node.icon === 'folderOpen' || (node.children && node.children.some((c) => c.selected || c.children?.some((g) => g.selected)));
        return (
          <div key={node.id}>
            <div
              data-animate="folder"
              className={`knowledge-repo-folder-item${node.selected ? ' knowledge-repo-folder-item--selected' : ''}`}
              style={{ paddingLeft: `${0.5 + depth * 0.65}rem` }}
            >
              <span className={`knowledge-repo-folder-icon knowledge-repo-folder-icon--${node.icon ?? 'folder'}`}>
                <FolderIcon type={node.icon} />
              </span>
              <span className="knowledge-repo-folder-name">{node.name}</span>
              {node.children && node.children.length > 0 && (
                isOpen
                  ? <ChevronDown size={10} className="knowledge-repo-folder-chevron" aria-hidden />
                  : <ChevronRight size={10} className="knowledge-repo-folder-chevron" aria-hidden />
              )}
            </div>
            {node.children && <FolderTree nodes={node.children} depth={depth + 1} />}
          </div>
        );
      })}
    </>
  );
}

export function KnowledgeRepositoryScene({ active }: Props) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLElement) => {
    staggerIn(tl, root, '[data-animate="header"]', 0.08, 0);
    sequenceIn(
      tl, root, '[data-animate="folder"]', 0.2, 0.06,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
    sequenceIn(
      tl, root, '[data-animate="flow"]', 0.32, 0.12,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeIn(tl, root, '[data-animate="editor-toolbar"]', 0.75);
    sequenceIn(
      tl, root, '[data-animate="editor-block"]', 0.85, 0.1,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatHeader(tl, root);
    sequenceIn(
      tl, root, '[data-animate="chat"]', 1.15, 0.12,
      { opacity: 0, y: 12, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.38, ease: 'power3.out', clearProps: 'transform' },
    );
    fadeInChatCompose(tl, root);

    const highlight = root.querySelector('[data-animate="editor-highlight"]');
    if (highlight) {
      tl.fromTo(
        highlight,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', clearProps: 'transform' },
        2.1,
      );
      tl.to(highlight, {
        boxShadow: '0 0 16px rgba(251, 191, 36, 0.22)',
        duration: 0.6,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      }, 2.35);
    }
  }, []);

  const ref = useSceneTimeline(active, build);

  return (
    <div ref={ref}>
      <SceneShell
        className="knowledge-repo-shell"
        hideMeta
        eyebrow={<><BookMarked size={11} /> Knowledge Repository</>}
        headline="Every Document. Organised. Editable. Updatable by Chat."
        subline="Folder structure your teams understand — edit directly or tell Aura what to change."
      >
        <div className="knowledge-repo-scene">
          <div className="knowledge-repo-body">
            <aside className="knowledge-repo-aside">
              <GlassCard accent="teal" className="knowledge-repo-folders-panel">
                <div className="knowledge-repo-panel-title" data-animate="folder">
                  <FolderOpen size={13} /> Browse folders
                </div>
                <div className="knowledge-repo-tree">
                  <FolderTree nodes={folderTree} />
                </div>
              </GlassCard>

              <GlassCard accent="purple" className="knowledge-repo-flow-panel">
                <div className="knowledge-repo-panel-title knowledge-repo-panel-title--flow" data-animate="flow">
                  <Sparkles size={13} /> How it works
                </div>
                <div className="knowledge-repo-flow-steps">
                  {flowSteps.map((step, i) => (
                    <div key={step.label} className="knowledge-repo-flow-step-wrap">
                      <div data-animate="flow" className="knowledge-repo-flow-card">
                        <div className="knowledge-repo-flow-card-head">
                          <span className="knowledge-repo-flow-num">{i + 1}</span>
                          <IconBadge color={step.color} size="md">{step.icon}</IconBadge>
                          <div className="knowledge-repo-flow-label">{step.label}</div>
                        </div>
                        <div className="knowledge-repo-flow-desc">{step.desc}</div>
                        <div className="knowledge-repo-flow-example">{step.example}</div>
                      </div>
                      {i < flowSteps.length - 1 && (
                        <ArrowDown size={14} className="knowledge-repo-flow-arrow" aria-hidden />
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </aside>

            <GlassCard accent="gold" className="knowledge-repo-editor-panel">
              <div className="knowledge-repo-editor-toolbar" data-animate="editor-toolbar">
                <span className="knowledge-repo-editor-file">
                  <FileText size={12} /> Q3 Budget BC.md
                </span>
                <div className="knowledge-repo-editor-chips">
                  <span className="knowledge-repo-chip knowledge-repo-chip--active"><PenLine size={10} /> Edit</span>
                  <span className="knowledge-repo-chip"><History size={10} /> Version history</span>
                  <span className="knowledge-repo-chip"><Link2 size={10} /> Sources attached</span>
                </div>
              </div>
              <div className="knowledge-repo-editor-doc">
                <div className="knowledge-repo-doc-title" data-animate="editor-block">
                  Q3 Infrastructure Budget — Business Case
                </div>
                <div className="knowledge-repo-doc-sections">
                  {editorSections.map((section) => (
                    <div
                      key={section.id}
                      data-animate={section.highlight ? 'editor-highlight' : 'editor-block'}
                      className={`knowledge-repo-doc-section${section.highlight ? ' knowledge-repo-doc-section--highlight' : ''}`}
                    >
                      <div className="knowledge-repo-doc-heading">{section.label}</div>
                      <p className="knowledge-repo-doc-body">{section.body}</p>
                      {section.source && (
                        <div className="knowledge-repo-doc-source">
                          <Link2 size={10} /> {section.source}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard accent="blue" className="pipeline-chat-panel knowledge-repo-chat-panel">
              <div className="pipeline-chat-header" data-animate="chat-header">
                <div className="pipeline-chat-header-avatar" aria-hidden>
                  <Bot size={14} strokeWidth={2.25} />
                </div>
                <div className="pipeline-chat-header-text">
                  <div className="pipeline-chat-header-title">Document Assistant</div>
                  <div className="pipeline-chat-header-status">
                    <span className="pipeline-chat-status-dot" aria-hidden /> Aura · Online
                  </div>
                </div>
              </div>

              <div className="pipeline-chat-thread">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    data-animate="chat"
                    className={`pipeline-chat-msg pipeline-chat-msg--${msg.role}`}
                  >
                    <div className={`pipeline-chat-msg-avatar pipeline-chat-msg-avatar--${msg.role}`} aria-hidden>
                      {msg.role === 'ai' ? <Bot size={11} /> : <User size={11} />}
                    </div>
                    <div className="pipeline-chat-msg-content">
                      <div className="pipeline-chat-msg-name">
                        {msg.role === 'ai' ? 'Aura' : 'You'}
                      </div>
                      <div className={`pipeline-chat-msg-bubble pipeline-chat-msg-bubble--${msg.role}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pipeline-chat-compose" data-animate="chat-compose">
                <div className="pipeline-chat-input-mock">Describe the change you want…</div>
                <button type="button" className="pipeline-chat-send" aria-label="Send" tabIndex={-1}>
                  <Send size={12} />
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </SceneShell>
    </div>
  );
}

function fadeInChatHeader(tl: gsap.core.Timeline, root: HTMLElement) {
  const header = root.querySelector('[data-animate="chat-header"]');
  if (!header) return;
  tl.fromTo(
    header,
    { opacity: 0, y: -8 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', clearProps: 'transform' },
    1.05,
  );
}

function fadeInChatCompose(tl: gsap.core.Timeline, root: HTMLElement) {
  const compose = root.querySelector('[data-animate="chat-compose"]');
  if (!compose) return;
  tl.fromTo(
    compose,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', clearProps: 'transform' },
    1.65,
  );
}
