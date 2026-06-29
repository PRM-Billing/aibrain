import slideManifest from './slides.json';

type SlideEntry = { id: string; text: string };

export const NARRATION: Record<string, string> = Object.fromEntries(
  slideManifest.slides.map((slide: SlideEntry) => [slide.id, slide.text]),
);
