# Aura — HTML Presentation Build Brief

**Purpose of this document:** Hand this entire file to Claude (or any capable model) as the single source of truth to generate a polished, animated, **video-style HTML presentation** for a product called **Aura**. Everything needed — branding, messaging, scene-by-scene content, copy, design system, animation guidance, and a voiceover-ready narration script — is below.

---

## 0. How to use this brief

Prompt the model with something like:

> "Using the attached build brief, produce a single self-contained `index.html` file (inline CSS + JS, CDN libraries allowed) that implements the Aura presentation exactly as specified — all 15 scenes, the design system, the animations, and the autoplay 'video' behaviour. Do not invent internal product names. Output only the HTML file."

---

## 1. Output requirements

- **One self-contained `index.html`** — inline `<style>` and `<script>`. External CDNs allowed (Google Fonts, an icon library such as Lucide, and optionally GSAP for animation).
- **Plays like a video:** autoplays on load, auto-advances scene to scene, with a **minimal control bar** (play/pause, mute toggle that is voiceover-ready, and prev/next for manual override). No timeline scrubber, no chapter list.
- **Voiceover-ready:** each scene has a narration script (Section 6) and a target duration. Build so that audio files (e.g. `audio/scene-01.mp3`) can later drive scene advance; until then, advance on a per-scene timer equal to the suggested duration. The mute button should already exist.
- **16:9 friendly, full-bleed,** looks good fullscreen and on a laptop. Responsive down to tablet.
- **Respect `prefers-reduced-motion`** (collapse animations to instant).
- **Accessibility:** readable contrast, captions/subtitle line showing the current narration text at the bottom.

---

## 2. Audience & tone (critical)

- **Audience:** external prospects and clients — business buyers, often **non-technical**. A technical person may occasionally be present, so be credible but never jargon-heavy.
- **Tone:** confident, modern, "marketing video." Plain English. Benefit-led. Slightly aspirational but honest.
- **Hard rule — NO internal references.** Do not use any of: "Track 3", "Dynamic Repository", "D-04", billing-department names, internal function/tool names, citation id formats (like `bc:42`), or any internal codename. Keep everything conceptual and benefit-led.
- Do not name any specific AI framework or library as "what we use." Architecture is described conceptually.

---

## 3. Brand

- **Name:** **Aura**
- **Lockup:** "Aura" with a small "by PRM" underneath.
- **One-line positioning:** *Your organisation's collective intelligence — every decision captured, validated, and compounding.*
- **Keep a single swappable brand constant** in the code (name + tagline) so it can be renamed in one place. (Alternate names the client may swap to later: Sage, Synapse, Lumen, Nexus, Helm, Praxis.)
- The word "Aura" should feel premium: gradient text, subtle shimmer, soft glow.

---

## 4. The 7 core messages (the spine)

Every scene serves one of these. State each in plain English:

1. **An intelligent agent that sits in your meetings** — it doesn't just take notes, it *thinks* and *privately guides the person who invited it.*
2. **It remembers everything** — saves it to a shared memory and acts on it from then on.
3. **It generates the artifacts you need** — today: business cases, requirements documents, meeting tasks, and backlog items. And it can produce *any* document type once its rules are defined.
4. **It learns from every decision** — every human correction makes it smarter.
5. **It's secure** — your knowledge is your IP and stays protected and segmented.
6. **A human is always in the loop** — nothing is final without approval.
7. **You control who sees what** — role-based access across the organisation.

> Important nuance: In the meeting, Aura **privately guides the user who added it** (a discreet aside to its owner/host) — it does **not** "raise its hand" to the whole room.

---

## 5. Global design system

### Palette (dark, premium)
- Background: `#040b16` (near-black navy)
- Surface / glass: `rgba(11,20,36,.78)` with `backdrop-filter: blur(20px)`
- Text: `#f0f6ff`; muted: `#7a93b4`; hairline: `rgba(100,140,200,.12)`
- Accent (primary): `#6d7dfc` / light `#a5b4ff`
- Secondary accents: teal `#2dd4bf`, gold `#fbbf24`, rose `#fb7185`, green `#34d399`, sky `#60a5fa`, purple `#c084fc`, orange `#fb923c`
- Signature gradient: `linear-gradient(135deg,#a5b4ff,#6d7dfc,#2dd4bf)`

### Typography
- Font: **Inter** (Google Fonts), weights 300–900.
- Headlines: 900 weight, tight letter-spacing (`-.03em`), large.
- Body: 400–600, generous line-height (~1.5).

### Components
- **Glass cards:** rounded `16px`, hairline border, blur, soft hover lift + glow.
- **Eyebrow label:** small uppercase pill above each scene headline (icon + 1–2 words).
- **Icons:** use a clean line-icon set (Lucide recommended). Every concept gets an icon.
- **Particle/ambient background:** subtle drifting dots on a canvas, low opacity, plus soft radial glows. Keep it tasteful, not noisy.

### Motion principles
- Cinematic, sequenced entrances — elements reveal in a deliberate order (stagger 80–150ms).
- Animation vocabulary: `fadeUp`, `scaleIn`, `slideIn`, number **count-ups**, animated **progress bars**, flowing **connector dots** along paths, gentle float/parallax, shimmer on the brand.
- Each scene should feel like a "shot" in a film: establish → reveal detail → settle.
- Transitions between scenes: smooth crossfade + slight horizontal drift.

---

## 6. Scene-by-scene specification (15 scenes)

For each scene: **Message**, **Eyebrow**, **Headline**, **Sub-line**, **On-screen content**, **Key visual & animation**, **Narration** (voiceover script), **Duration**.

---

### Scene 1 — Hero
- **Message:** Brand reveal + positioning.
- **Eyebrow:** ⚡ Intelligence Platform · PRM
- **Headline:** **Aura**
- **Sub-line:** Your organisation's collective intelligence — every decision captured, validated, and compounding.
- **On-screen:** Brand name large with gradient + shimmer; "by PRM" beneath; 4 stat chips: `9 AI Assistants`, `1 Shared Memory`, `∞ Compounding`, `100% Human-Approved`.
- **Key visual & animation:** Two slow concentric orbit rings with traveling dots behind the wordmark; brand letters fade-up and the gradient shimmers; stat chips count up and stagger in.
- **Narration:** "Meet Aura — your organisation's collective intelligence. Every meeting, every decision, every document — captured, validated, and working for you. This is not another chatbot. This is the platform your organisation thinks with."
- **Duration:** ~9s

---

### Scene 2 — The Operating Loop
- **Message:** The whole story in one picture (the spine).
- **Eyebrow:** 🔄 How Aura Works
- **Headline:** One Continuous Loop of Intelligence.
- **Sub-line:** Aura sits in, thinks, remembers, acts, and learns — over and over, getting smarter each cycle.
- **On-screen:** A circular flow of 5 nodes:
  1. Sits in your meeting →
  2. Thinks & privately guides you →
  3. Saves to memory →
  4. Acts & generates artifacts →
  5. Learns from every decision → (back to 1)
  Plus a band beneath the loop: "Governed by: Secure · Human-Approved · Access-Controlled."
- **Key visual & animation:** A glowing dot travels the circular path; each node lights up in sequence as the dot passes; the governance band fades in last.
- **Narration:** "Everything Aura does flows through one loop. It sits in your meetings and guides you. It remembers what matters. It acts — producing the documents and decisions you need. And it learns from every correction. All of it secure, all of it human-approved, all of it access-controlled."
- **Duration:** ~11s

---

### Scene 3 — Intelligent Meeting Agent
- **Message:** Message 1 — thinks and privately guides the user who added it.
- **Eyebrow:** 🎥 In Your Meetings
- **Headline:** It Sits in Your Meeting. And Quietly Makes You Look Brilliant.
- **Sub-line:** Not a recorder. An intelligent teammate that thinks alongside you — and guides you privately, in real time.
- **On-screen:** A clean meeting-call mock (a few participant tiles + one distinct "Aura" tile). A **private guidance panel** addressed to the host (styled as a discreet aside, e.g. "Only you can see this"):
  > "Heads up — a similar decision last quarter slipped on timeline. Want me to pull the numbers before you commit?"
  Three small capability chips: *Live understanding · Private nudges · Action items captured.*
- **Key visual & animation:** The private guidance text **types in** like a live whisper; a soft "only you can see this" lock badge; the Aura tile glows gently.
- **Narration:** "Invite Aura to your meeting and it does far more than take notes. It understands the conversation as it happens — and privately guides you, the person who invited it. A quiet nudge only you can see: a risk to flag, a number to check, a question worth asking. It's like having your sharpest advisor whispering in your ear."
- **Duration:** ~12s

---

### Scene 4 — Living Memory
- **Message:** Message 2 — remembers everything, acts from then on.
- **Eyebrow:** 🧠 Living Memory
- **Headline:** It Never Forgets. So Your Organisation Never Loses Knowledge.
- **Sub-line:** Every meeting, document, and decision becomes searchable, reusable memory that compounds over time.
- **On-screen:** Left: a list of what gets captured (Every meeting · Every document · Every decision · Every person's context · Every metric · Every revision). Right: a "compounding" timeline (Day 1 → Month 1 → Month 6 → Year 1) with a short value statement at each step.
- **Key visual & animation:** Capture items slide in and "drop" into a central memory core that pulses; the timeline bar fills left to right.
- **Narration:** "Most organisations lose what they know the moment a meeting ends or a person leaves. Aura doesn't. Everything it touches becomes living memory — searchable, reusable, and always cited. And unlike people, it never forgets. The longer you use it, the more valuable it becomes."
- **Duration:** ~11s

---

### Scene 5 — Generates the Artifacts You Need
- **Message:** Message 3a — the live artifact examples.
- **Eyebrow:** 📄 From Conversation to Document
- **Headline:** Talk Through It Once. Get the Document That Matters.
- **Sub-line:** From a single conversation, Aura drafts the artifacts your team actually produces.
- **On-screen:** A simple left-to-right pipeline: **Meeting → Summary & Tasks → Business Case → Requirements Document → Human Review → Saved & Shareable.** Below, four "live now" example cards: **Business Cases**, **Requirements Documents (BRDs)**, **Meeting Tasks**, **Backlog Items.**
- **Key visual & animation:** The pipeline nodes light up in sequence with a connector dot; the four example cards cascade in and show a subtle "live" pulse dot.
- **Narration:** "One conversation becomes the work product you need. Today, Aura turns your meetings into business cases, requirements documents, action items, and prioritised backlog — drafted in minutes, with every claim traceable, and always reviewed by a human before it's final."
- **Duration:** ~11s

---

### Scene 6 — Many More Possible
- **Message:** Message 3b — extensibility to any document type.
- **Eyebrow:** ✨ Endless Possibilities
- **Headline:** And That's Just the Start. Define the Rules — Get Any Document.
- **Sub-line:** Anything your organisation writes repeatedly, Aura can produce. Set the template and rules once.
- **On-screen:** A wide grid of artifact types (icons + labels): SOPs, Onboarding Docs, Project Briefs, Proposals, Contracts, Audit Reports, Policy Documents, Decision Memos, Runbooks, Status Reports, Executive Summaries, Meeting Briefs, Risk Registers, Training Guides, RFP Responses, Vendor Comparisons. End the grid with a "+ Your custom artifact" tile and a small flow: **Define the rules → Aura produces it.**
- **Key visual & animation:** Cards cascade in as a storm (fast stagger). The "+ Your custom artifact" tile glows and the "Define the rules → produce it" mini-flow animates last.
- **Narration:** "And it doesn't stop at the documents you see here. Standard operating procedures, onboarding packs, project briefs, proposals, audit reports — anything your team produces repeatedly. Define the template and the rules once, and Aura produces it, on demand, in your standard. The possibilities are limited only by what you write."
- **Duration:** ~12s

---

### Scene 7 — Architecture (Under the Hood)
- **Message:** Technical credibility — conceptual only.
- **Eyebrow:** 🧩 Built to Be Trusted
- **Headline:** Intelligent Building Blocks, Working Together.
- **Sub-line:** Specialist nodes use the right tools, draw on one shared memory, and improve continuously.
- **On-screen:** A clean conceptual graph: a row of **specialist "nodes"** connected by edges, each node connected to a **Tools** layer and a central **Shared Memory** core, with a **Continuous Learning** arrow looping back. Four short captions: *Specialist nodes · Smart tools · Shared memory · Continuous learning.* Bottom strip headline: **"Every workflow is memory-based and learning-based."**
- **Key visual & animation:** Nodes appear, edges draw on, a pulse flows from nodes → tools → memory, then a learning arrow loops back and the bottom strip fades in.
- **Narration (kept high-level):** "Under the hood, Aura is built from intelligent building blocks — specialist nodes that each do one job well, the right tools at the right moment, and a single shared memory they all draw from. Every workflow is memory-based and learning-based, so the whole system gets smarter together. Powerful inside, simple to use."
- **Duration:** ~10s
- **Do NOT:** name any framework/library, internal tools, or functions.

---

### Scene 8 — Dashboards
- **Message:** Product proof — the surfaces (generic).
- **Eyebrow:** 📊 Everything in View
- **Headline:** Your Whole Operation, at a Glance.
- **Sub-line:** Clear dashboards keep everyone aligned — from the executive view to the day-to-day.
- **On-screen:** An animated montage of 4–5 stylised, generic dashboard mockups (use abstract bars/cards, not real screenshots): **Executive Overview**, **Work in Progress**, **Approval Queue**, **Planning**, **Automated Insight Reports.** Each as a tidy mini-panel.
- **Key visual & animation:** Mock panels slide/scale in as a montage; small bars and counters animate (count-up) inside them.
- **Narration:** "From the boardroom to the back office, everyone sees what matters. A clear executive overview. Work in progress at a glance. Approvals waiting on you. Planning and automated insight reports — all in one place, always current."
- **Duration:** ~10s
- **Do NOT:** use internal page names or jargon.

---

### Scene 9 — Knowledge Repository
- **Message:** Product proof — two libraries + version history.
- **Eyebrow:** 📚 One Source of Truth
- **Headline:** Every Document. Every Version. Instantly Findable.
- **Sub-line:** A knowledge library and a process library — searchable by meaning, with full version history.
- **On-screen:** Two side-by-side panels: **Knowledge Library** (every document Aura produces, versioned, smart search) and **Process Library** (your organisation's documented processes). A small **version history** strip showing v1 → v2 → v3 with a "Current" badge and a one-click "revert" affordance.
- **Key visual & animation:** Panels slide in from each side; the version chain animates left to right; "smart search" bar shows a typed query returning a result card.
- **Narration:** "Everything lives in one place. A knowledge library of every document Aura creates — fully versioned — and a process library of how your organisation actually works. Search by meaning, not just keywords. And every change is tracked, so you can always see what changed, when, and roll back in a click."
- **Duration:** ~10s

---

### Scene 10 — Chat With Citations
- **Message:** Product proof — cited answers.
- **Eyebrow:** 💬 Ask Anything
- **Headline:** Answers. With Proof. Not Just Links.
- **Sub-line:** Ask in plain English and get a real answer — with the exact source cited and linked.
- **On-screen:** A clean chat mock: a user question ("What did we decide about the new vendor, and why?") and an Aura answer paragraph, followed by **source chips** that link back to the underlying documents (label them generically, e.g. "Vendor Review – Sept", "Risk Assessment", "Board Notes"). A small note: "Scoped to what you're allowed to see."
- **Key visual & animation:** Question appears, then the answer **types in**, then source chips pop in one by one.
- **Narration:** "Ask Aura anything, in plain English. It doesn't hand you ten links — it gives you the answer, drawn from your organisation's own knowledge, with the exact source cited so you can verify in a click. And it only ever answers from what you're allowed to see."
- **Duration:** ~11s

---

### Scene 11 — Learns With Every Decision
- **Message:** Message 4 — learning from corrections.
- **Eyebrow:** 📈 Gets Smarter
- **Headline:** The More You Use It, the Smarter It Gets.
- **Sub-line:** Every correction you make becomes a lasting rule — approved by a human, applied forever.
- **On-screen:** A 5-step learning loop (Human edits → Aura proposes a rule → You approve → Rule applied going forward → Outputs need less editing). Plus a set of **animated bars** showing "editing needed" shrinking over time (Month 1: 30% → Month 3: 12% → Month 6: 5% → Year 1: minimal).
- **Key visual & animation:** Loop steps reveal in order; the bars animate down/right; a small "human-approved" lock sits on the loop.
- **Narration:** "Aura learns the way your best people do — by being corrected. Every edit you make becomes a proposed rule. You approve it, and from then on Aura follows your standard automatically. Within months, its output needs barely any editing — because it has learned how your organisation thinks."
- **Duration:** ~11s

---

### Scene 12 — Secure by Design
- **Message:** Message 5 — security & IP protection.
- **Eyebrow:** 🔒 Your IP, Protected
- **Headline:** Your Knowledge Is Your Advantage. We Guard It Like One.
- **Sub-line:** Segmented, encrypted, and never used to train anyone else's AI.
- **On-screen:** A central secured core with segmented "department" rings/chips around it (generic labels: Team A, Team B, Finance, People, etc. — keep generic). Pillar cards: *Segmented access · Encrypted end to end · Your data never trains external models · Full activity audit trail.*
- **Key visual & animation:** A shield core pulses; segment chips lock into place around it; pillar cards fade up.
- **Narration:** "Your organisation's knowledge is its competitive edge — and a real risk if mishandled. Aura keeps it segmented, so teams only reach what they should. It's encrypted end to end. Every action is logged. And your data is never used to train anyone else's AI. Your intelligence stays yours."
- **Duration:** ~11s

---

### Scene 13 — Human in the Loop
- **Message:** Message 6 — approval gates.
- **Eyebrow:** ✅ Always Approved
- **Headline:** Aura Drafts. A Human Decides. Always.
- **Sub-line:** Nothing becomes final — or enters memory — without a person signing off.
- **On-screen:** A simple gated flow: **Aura drafts → Sources attached → Human reviews → Approve / Edit / Reject → Only approved content is saved.** Pillar chips: *Zero silent changes · Named accountability · Full review trail.*
- **Key visual & animation:** The flow advances with a checkpoint "gate" that visibly holds until an "approve" stamp lands.
- **Narration:** "Aura is powerful, but it never acts alone. It drafts; a human decides. Every output passes through an approval gate, with its sources attached, before anything is finalised or remembered. No silent changes. Every decision owned by a named person. You stay in control, always."
- **Duration:** ~10s

---

### Scene 14 — You Control Who Sees What
- **Message:** Message 7 — access control.
- **Eyebrow:** 🛡️ Access Control
- **Headline:** Right People. Right Knowledge. Nothing More.
- **Sub-line:** Role-based access across the whole organisation — set once, enforced everywhere.
- **On-screen:** A simple matrix or tiered visual: roles (Org Admin · Department Admin · Member · Viewer) vs what each can see/do. Emphasise department isolation and explicit, approved sharing.
- **Key visual & animation:** Role rows reveal in sequence; access cells fill in; a "share requires approval" callout animates last.
- **Narration:** "You decide who sees what. Aura gives every person a clear role — from full administrator to read-only viewer — and enforces it everywhere, not just on the surface. Teams stay separated by default, and sharing across them always requires explicit approval. The right people, the right knowledge, nothing more."
- **Duration:** ~10s

---

### Scene 15 — Closing
- **Message:** Recap + call to action.
- **Eyebrow:** ⚡ PRM Intelligence Platform
- **Headline:** **Aura**
- **Sub-line:** The first AI platform built for how your organisation actually works.
- **On-screen:** Brand reveal again; a row of capability pills recapping the 7 messages: *Sits in your meetings · Remembers everything · Generates your documents · Learns your standards · Secures your IP · Human-approved · You control access.* A closing line / CTA.
- **Key visual & animation:** Orbit rings return; pills stagger in; brand shimmer; soft fade to a calm end frame.
- **Narration:** "Aura. An intelligent agent that sits in your meetings, remembers everything, produces the work that matters, and gets smarter every day — all secure, all human-approved, all under your control. Built for how your organisation actually works. Let's put it to work for yours."
- **Duration:** ~11s

---

## 7. Deck mechanics (behaviour spec)

- **Autoplay** on load; the first scene begins animating immediately.
- **Auto-advance:** when a scene's duration elapses (or its narration audio ends, when present), transition to the next scene.
- **Controls (minimal):** Play/Pause, Mute (voiceover-ready), Prev, Next. Show a small "Scene N / 15" counter. Optional tiny progress dots are OK but no scrubber.
- **Keyboard:** ← / → to move, Space to play/pause.
- **Captions:** a subtitle bar shows the current scene's narration line (so it reads as a video even before audio exists, and aids accessibility).
- **Loop or end card:** at the end, hold the closing scene (or offer a "Replay").
- **Voiceover hook (future):** structure narration as a per-scene map keyed by scene id, e.g. `NARRATION["scene-03"]`, so audio files `audio/scene-03.mp3` can be generated later (OpenAI TTS) and synced.

---

## 8. Acceptance checklist

- [ ] All 15 scenes present, in order, with the exact messages.
- [ ] Aura branding with swappable name + tagline constant.
- [ ] Autoplay + auto-advance + minimal controls + captions.
- [ ] Cinematic, sequenced animations on every scene; respects reduced-motion.
- [ ] Meeting scene shows **private guidance to the inviter** (not a hand raised to the room).
- [ ] Artifact scene lists **business cases, requirements documents, meeting tasks, backlog** as live; extensibility scene shows many more types + "define rules → any document".
- [ ] Architecture scene is **conceptual only** — no framework/library/internal names.
- [ ] **No internal references anywhere** (no Track 3, Dynamic Repository, D-04, department specifics, internal tool/function names, or citation id formats).
- [ ] Looks premium and modern; readable; works fullscreen and on a laptop.
- [ ] Voiceover-ready narration map keyed by scene id.

---

*Build brief for the Aura presentation — external, sales-facing. Single source of truth for generating the HTML deck.*
