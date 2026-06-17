import { ParticleField } from './ParticleField';

/** Fixed cinematic backdrop — aurora mesh + grid + particles. */
export function DeckBackground() {
  return (
    <>
      <div className="deck-bg" aria-hidden>
        <div className="deck-bg-base" />
        <div className="deck-bg-mesh" />
        <div className="deck-bg-orb deck-bg-orb-1" />
        <div className="deck-bg-orb deck-bg-orb-2" />
        <div className="deck-bg-orb deck-bg-orb-3" />
        <div className="deck-bg-orb deck-bg-orb-4" />
        <div className="deck-bg-grid" />
      </div>
      <ParticleField />
    </>
  );
}
