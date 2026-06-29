import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'public', 'audio');
const manifestPath = join(root, 'src', 'narration', 'slides.json');

const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts';
const voice = process.env.OPENAI_TTS_VOICE || 'alloy';
const force = process.argv.includes('--force');
const onlyArg = process.argv.find((arg) => arg.startsWith('--only='));
const onlyIds = onlyArg ? new Set(onlyArg.slice('--only='.length).split(',')) : null;

if (!apiKey) {
  console.error('Missing OPENAI_API_KEY. Export it locally before running this script.');
  process.exit(1);
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const slides = manifest.slides.filter((slide) => !onlyIds || onlyIds.has(slide.id));

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
