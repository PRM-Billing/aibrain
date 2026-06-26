import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'audio');

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const voice = process.env.OPENAI_TTS_VOICE || 'alloy';
const force = process.argv.includes('--force');

const slides = [
  {
    id: 'hero',
    file: 'slide-01-hero.mp3',
    text: "Meet Aura — the intelligent agent for your organisation. It joins your meetings, guides the right people privately, remembers what gets approved, and turns decisions into the artifacts your teams need. Over the next few scenes, you'll see exactly how that works.",
  },
  {
    id: 'operating-loop',
    file: 'slide-02-operating-loop.mp3',
    text: 'Everything Aura does runs through one continuous loop. It joins your meeting and listens to the full conversation. It guides you privately when something important comes up. It saves approved decisions to memory. It generates the documents and outputs your team actually produces. And it learns your standards with every edit — so the next cycle is smarter. Secure, human-approved, and access-controlled, every time around.',
  },
  {
    id: 'meeting-agent',
    file: 'slide-03-meeting-agent.mp3',
    text: "Let's step inside the meeting. Aura is not a passive recorder — it's an intelligent teammate thinking alongside you. While the conversation unfolds, it understands context, risks, numbers, and open questions. Then it quietly nudges the right person with guidance only they can see — a risk to flag, data to check, or a better question to ask. Like your sharpest advisor whispering in your ear.",
  },
  {
    id: 'org-brain',
    file: 'slide-04-org-brain.mp3',
    text: "Step back from one meeting and picture your whole organisation. In the centre, one shared brain — around it, department brains for Finance, Operations, IT, Legal, HR, Claims. What you see here is illustrative; your teams and structure will look different. Each department keeps private memory by default. What a team approves to share flows up to the organisation brain. Knowledge routes back down where it's needed. And anything crossing team lines waits on explicit human approval — one intelligence, without flattening every department into the same bucket.",
  },
  {
    id: 'artifact-pipeline',
    file: 'slide-05-artifact-pipeline.mp3',
    text: "When memory is ready, artifact pipelines turn conversation into work. In chat, you describe the trigger, inputs, steps, reviewers, and output. After a meeting, Aura draws on the transcript, shared files, and memory, then routes to the right pipeline. The result isn't limited to one document type — business cases, checklists, approval packets, client follow-ups, or any repeatable output your organisation has designed.",
  },
  {
    id: 'knowledge-repository',
    file: 'slide-06-knowledge-repository.mp3',
    text: "Once pipelines produce your artifacts, they land in Aura's knowledge repository. Every document is structured in folders — by team, project, or type — so nothing gets lost in a flat list. Open any file in the interactive editor to refine it yourself, or use the chat interface to describe what you want changed. Aura finds the right document, drafts the update, and leaves it ready for your review.",
  },
  {
    id: 'learning-opportunities',
    file: 'slide-07-learning-opportunities.mp3',
    text: 'As you refine documents in the repository or adjust pipelines in chat, Aura is always listening for learning opportunities. When you repeat a preference, make the same correction twice, or describe a standard you want enforced, Aura flags it and proposes a rule for the future. Approve it once — and the next document, the next pipeline run, already reflects what you expect.',
  },
];

if (!apiKey) {
  console.error('Missing OPENAI_API_KEY. Export it locally before running this script.');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

for (const slide of slides) {
  const output = join(outDir, slide.file);
  const tempOutput = `${output}.part`;

  if (!force) {
    const exists = await fileExists(output);
    if (exists) {
      console.log(`Skipping ${slide.file} (already exists; use --force to regenerate)`);
      continue;
    }
  }

  console.log(`Generating ${slide.file} (${slide.id})...`);
  const body = {
    model,
    voice,
    input: slide.text,
    response_format: 'mp3',
  };

  if (model.startsWith('gpt-4o')) {
    body.instructions = 'Warm, confident product-demo narration. Natural pace, clear pronunciation, cinematic but not theatrical.';
  }

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI TTS failed for ${slide.id}: ${response.status} ${errorText}`);
  }

  const audio = Buffer.from(await response.arrayBuffer());
  await writeFile(tempOutput, audio);
  await rename(tempOutput, output);
  console.log(`Wrote public/audio/${slide.file}`);
}

async function fileExists(path) {
  try {
    const { access } = await import('node:fs/promises');
    await access(path);
    return true;
  } catch {
    return false;
  }
}
