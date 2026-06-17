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
    text: "Meet Aura, the intelligent agent for your meetings. Aura records the conversation, but it doesn't stop at recording. It understands what matters, guides people privately in the moment, captures approved knowledge into memory, and helps the organisation act on what was decided. From that memory, Aura can generate any artifact your team designs: a business case, checklist, brief, report, workflow, onboarding pack, analysis, or something custom to your organisation.",
  },
  {
    id: 'operating-loop',
    file: 'slide-02-operating-loop.mp3',
    text: 'Think of Aura as a loop, not a static tool. First, it records and understands the meeting. Then it gives private guidance when something important comes up, such as a risk, missing number, owner, or next step. After the meeting, approved decisions become memory. From there, Aura can call the right pipeline to create the artifact your team needs. That artifact is not limited to a document. It can be any repeatable output your organisation designs.',
  },
  {
    id: 'meeting-agent',
    file: 'slide-03-meeting-agent.mp3',
    text: 'Aura records the meeting, but recording is only the first layer. While the conversation is happening, Aura understands context, risks, numbers, owners, open questions, and decisions as they emerge. It can quietly guide the right person at the right time, without interrupting the room. Instead of everyone seeing the same generic note, each person can get private, role-aware guidance that helps the meeting move forward.',
  },
  {
    id: 'org-brain',
    file: 'slide-04-org-brain.mp3',
    text: 'The department brains shown here are illustrative. The number is not fixed. Every organisation can have different teams, functions, regions, projects, or operating units. The important idea is the structure: each team keeps private memory by default, approved knowledge can flow into the organisation brain, and sharing across teams requires explicit human approval. Aura gives you one organisational brain without flattening every department into the same shared bucket.',
  },
  {
    id: 'artifact-pipeline',
    file: 'slide-05-artifact-pipeline.mp3',
    text: 'Artifact pipelines are flexible. In chat, you describe the trigger, the inputs, the steps, the reviewers, and the output. After a meeting, Aura uses the recording, transcript, shared files, and memory, then calls the right pipeline. The result is not limited to a business case or requirements document. Aura can generate any kind of artifact your organisation has designed: a report, task plan, approval packet, operating checklist, client follow-up, research summary, or a custom workflow output.',
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
