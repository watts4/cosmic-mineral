import type { Mineral, AstronomyData, AlignmentResult, DataPoint } from '../types';

// ─── Mercury Retrograde openings ──────────────────────────────────────────────
const RETROGRADE_OPENINGS = [
  (m: Mineral) =>
    `Mercury is doing its whole backward thing right now, and you can probably already feel it. Plans falling apart. Weird texts from people you forgot existed. Tech acting up for no reason. This isn't bad luck — it's a shift, and your ${m.name} is already picking up on it. Here's the thing: ${m.scientific_fact} So yeah, this stone has receipts.`,

  (m: Mineral) =>
    `Okay, so Mercury retrograde is technically an optical illusion — Earth is just lapping Mercury on the inside track and it looks like it's going backward. But the energy is real, and ${m.name} is responding. ${m.scientific_fact} Your stone is basically a little antenna right now, and the signal is loud.`,

  (m: Mineral) =>
    `That uncomfortable, "nothing is working the way it's supposed to" feeling you've had lately? That's Mercury retrograde. And your ${m.name} has been vibrating since this started. Fun fact: ${m.scientific_fact} So when the planetary energy gets scrambled, your stone actually registers it.`,

  (m: Mineral) =>
    `Mercury's going backward and honestly, the chaos makes sense. Missed connections, delayed replies, that one person you ghosted showing back up — classic retrograde. Your ${m.name} is here for all of it. ${m.scientific_fact} Right now it's working overtime so you don't have to.`,
];

// ─── Mercury Direct openings ─────────────────────────────────────────────────
const DIRECT_OPENINGS = [
  (m: Mineral) =>
    `Mercury is moving forward and you can feel the fog starting to lift. Communication flows better, plans actually stick, and your brain feels less scrambled. Your ${m.name} is tuned in to all of it — ${m.scientific_fact} — which means it's absorbing the good energy too, not just the chaos.`,

  (m: Mineral) =>
    `Good energy today. Mercury is direct, the planets are cooperating, and your ${m.name} is in a great position to amplify it. Here's why this stone matters right now: ${m.scientific_fact} Think of it as a signal booster for what you're already putting out into the world.`,

  (m: Mineral) =>
    `Things are clicking into place right now — Mercury moving forward means the static clears and you can finally think straight. Your ${m.name} is aligned with that momentum. ${m.scientific_fact} It's basically running on full power today.`,
];

// ─── Moon phase modifiers (conversational) ────────────────────────────────────
const MOON_MODIFIERS: Record<string, (m: Mineral, illum: number) => string> = {
  'New Moon': (_m, illum) =>
    `The Moon is only ${illum}% lit right now — barely visible — and that's actually perfect for turning inward. New Moon energy is quiet. It's a reset. Don't make any big moves today; instead, get clear on what you actually want before the week picks up again.`,

  'Waxing Crescent': (_m, illum) =>
    `The Moon is at ${illum}% and growing. That's building energy — momentum is starting to gather. This is a good time to plant seeds, start that thing you've been putting off, or say the thing you've been holding back. Slow and steady right now, but things are moving.`,

  'First Quarter': (_m, illum) =>
    `First Quarter Moon at ${illum}% — and this phase is all about making decisions. If there's something you've been sitting on, this is your nudge to pick a direction. The energy supports action, not overthinking. Trust your gut today more than usual.`,

  'Waxing Gibbous': (_m, illum) =>
    `Almost full — ${illum}% lit and getting intense. You might feel restless or like things are taking too long. That's the Waxing Gibbous doing its thing. Stay patient. Refine rather than force. The payoff is almost here.`,

  'Full Moon': (_m, illum) =>
    `Full Moon at ${illum}% illumination, and yes — everything feels heightened right now. Emotions are louder. Sleep is weird. Old stuff is coming up to the surface. Hospitals actually log this (look it up). This is a release phase: let go of what isn't working instead of holding tighter.`,

  'Waning Gibbous': (_m, illum) =>
    `The Moon is past full and easing down at ${illum}%. The intense peak energy is releasing. This is a good time to reflect on what just happened and start wrapping things up. Less launching, more evaluating. What actually worked?`,

  'Last Quarter': (_m, illum) =>
    `Last Quarter at ${illum}% — you're in the clearing-out phase now. Old patterns, old habits, old conversations that need to end. The energy supports letting things go, not starting new things. Clean your space, clear your head.`,

  'Waning Crescent': (_m, illum) =>
    `The Moon is almost dark at ${illum}% — this is the quietest, most introspective phase of the whole cycle. Rest. Don't push. The universe is basically asking you to slow down before the new cycle starts. Honor it.`,
};

// ─── Venus modifier ───────────────────────────────────────────────────────────
function getVenusModifier(dist: number, mag: number): string {
  if (dist < 0.8) {
    return ` Venus is unusually close right now (magnitude ${mag}), which means relationship energy is at a peak. Expect unexpected feelings, someone reaching out, or a moment of real connection you didn't see coming. Don't overthink it — just be open.`;
  }
  if (dist > 1.5) {
    return ` Venus is far out right now (magnitude ${mag}), so this isn't the strongest moment for romance or social connection. Great time to focus on yourself instead of chasing anyone.`;
  }
  return ` Venus is in a neutral position today (magnitude ${mag}) — relationship energy is steady, nothing dramatic. A good day for calm, honest conversations.`;
}

// ─── Closing advice per mineral ───────────────────────────────────────────────
const MINERAL_ADVICE: Record<string, (retrograde: boolean) => string> = {
  quartz: (retro) =>
    retro
      ? `Keep your Clear Quartz close today and hold off on signing anything, sending important emails, or making big decisions. Wait 48 hours before hitting send on that message you've been drafting. The Quartz is literally absorbing the static — let it work.`
      : `Your Clear Quartz is amplifying your clarity today. This is a good day for conversations you've been avoiding, decisions you've been sitting on, and anything that requires honest communication. Say the thing.`,

  obsidian: (retro) =>
    retro
      ? `Black Obsidian is a boundary stone, and right now you need those boundaries. Someone in your circle is draining your energy — you probably know who. It's okay to not respond immediately. Your peace is worth more than their timeline.`
      : `Obsidian is showing you the truth today, even if it's a little uncomfortable. If something has felt "off" with a relationship or situation, you're probably right. Trust that instinct.`,

  hematite: (retro) =>
    retro
      ? `Hematite is an iron oxide — magnetically grounded in a literal sense — and right now it's keeping you from spiraling. When things feel chaotic, hold it. Breathe. The chaos is temporary; your foundation is not.`
      : `Your energy is grounded and focused today with Hematite working in your favor. This is a productive, stable day. Do the practical stuff — the budget, the plan, the conversation you've been avoiding. You're ready for it.`,

  amethyst: (retro) =>
    retro
      ? `Amethyst is a sleep and clarity stone, and if your sleep has been weird lately, that tracks with the current energy. Put your Amethyst on your nightstand tonight. The iron in the stone literally filters light differently — and apparently, your subconscious responds to that.`
      : `Your intuition is running hot right now. Amethyst is amplifying it. If something feels right, it probably is. If something feels off, don't talk yourself out of that feeling. You know more than you think.`,

  lapis: (retro) =>
    retro
      ? `Lapis Lazuli has actual gold (pyrite) in it — tiny flecks of it — and that's not just aesthetic. Right now, let it remind you that your words have weight. Don't say things you'll need to walk back. Think first, speak second.`
      : `This is a day for honesty and speaking your truth. Lapis carries the energy of communication done right — direct, clear, no passive-aggression. Whatever conversation you've been putting off? Today is the day.`,

  malachite: (retro) =>
    retro
      ? `Malachite is a heart stone — and right now it's working hard to protect yours. If old wounds are coming up or someone from your past is reappearing, that's the retrograde. You don't owe anyone a second chance just because Mercury is making them nostalgic.`
      : `Heart energy is open today. Malachite is pulling for connection, warmth, and generosity — give some of that to yourself too, not just to other people. You can't pour from an empty cup.`,

  selenite: (retro) =>
    retro
      ? `Selenite is one of the softest minerals on Earth — literally scratch-able with your fingernail — and that fragility is actually its power right now. It's asking you to be gentle: with yourself, with others, with the process. Not everything needs to be forced.`
      : `Your space is your energy, and Selenite is asking you to protect it. Clear out the clutter — physical and emotional. A clean environment creates mental clarity, and right now you need that clarity to make a good decision that's coming your way.`,

  tourmaline: (retro) =>
    retro
      ? `Black Tourmaline generates actual electricity from body heat — it's scientifically documented. Right now it's creating a literal protective field around you. You don't have to absorb everyone's chaos. You're allowed to step back and let their drama be their drama.`
      : `Your energy is protected and clear today. Tourmaline is giving you a strong perimeter — which means you can engage with difficult people or situations without taking on their energy. Go have the hard conversation. You're shielded.`,

  citrine: (retro) =>
    retro
      ? `Citrine is the "abundance" stone, but abundance takes many forms — and right now, the abundance you need is patience. Don't force money moves, big purchases, or major financial decisions during this retrograde. Let the energy settle first.`
      : `This is a genuinely good day for abundance thinking. Citrine is running high, Mercury is direct, and the energy supports putting yourself out there — asking for the raise, pitching the idea, investing in yourself. Don't wait for the "perfect moment." This is close enough.`,

  labradorite: (retro) =>
    retro
      ? `Labradorite shows different colors depending on the angle — it literally changes based on how you look at it. That's your lesson right now. The situation you're frustrated with looks completely different from another perspective. Try to see it that way before reacting.`
      : `Your magic is showing today — and yes, that's a real thing. Labradorite amplifies whatever intuitive, creative, or visionary energy you're carrying. If an idea keeps coming back to you, stop dismissing it. Write it down. Make the call. Take the step.`,
};

// ─── Warnings (simple and personal) ─────────────────────────────────────────
function getWarning(m: Mineral, a: AstronomyData): string {
  const retro = a.mercury.retrograde;
  const warnings = {
    quartz: retro
      ? `Don't make any major tech purchases right now. Retrograde + electronics = regret.`
      : `Don't second-guess the clear decision you already made. Your Quartz already processed that for you.`,
    obsidian: `Avoid people who consistently drain your energy right now. You'll know exactly who that is.`,
    hematite: retro
      ? `Don't try to control everything. Some of the chaos isn't yours to fix.`
      : `Don't let practicality keep you from also feeling things. Logic alone isn't enough today.`,
    amethyst: `Avoid scrolling your phone right before bed tonight. Your sleep needs protecting.`,
    lapis: retro
      ? `Don't make promises right now that you're not 100% sure you can keep.`
      : `Don't stay quiet when you have something important to say. This is not the moment for that.`,
    malachite: `Don't ignore your body's signals today. If you're tired, rest. The grind can wait.`,
    selenite: `Keep your energy away from overly negative conversations today. Selenite's protection has limits.`,
    tourmaline: retro
      ? `Don't take on anyone else's emotional baggage right now. You have enough going on.`
      : `Don't let your protected energy make you closed off — stay warm, just stay boundaried.`,
    citrine: retro
      ? `Hold off on any big financial moves until Mercury goes direct. Seriously.`
      : `Don't let self-doubt talk you out of something that's genuinely a good opportunity.`,
    labradorite: `Avoid making decisions based on fear today. That's not your intuition — that's anxiety. There's a difference.`,
  };
  return warnings[m.id as keyof typeof warnings] ?? `Trust what your ${m.name} is showing you today, and don't ignore the signs.`;
}

// ─── Data points (keep these semi-scientific for the "receipts" feel) ─────────
function buildDataPoints(m: Mineral, a: AstronomyData): DataPoint[] {
  return [
    {
      label: 'Mercury Status',
      value: a.mercury.retrograde ? 'RETROGRADE' : 'DIRECT',
      status: a.mercury.retrograde ? 'critical' : 'nominal',
    },
    {
      label: 'Mercury Velocity',
      value: `${a.mercury.velocity > 0 ? '+' : ''}${a.mercury.velocity.toFixed(3)}°/day`,
      status: a.mercury.retrograde ? 'elevated' : 'nominal',
    },
    {
      label: 'Moon Phase',
      value: `${a.moon.phaseEmoji} ${a.moon.phaseName} (${a.moon.illumination}%)`,
      status: a.moon.illumination > 85 || a.moon.illumination < 10 ? 'elevated' : 'nominal',
    },
    {
      label: 'Venus Distance',
      value: `${a.venus.distance} AU`,
      status: a.venus.distance < 0.8 ? 'elevated' : 'nominal',
    },
    {
      label: `${m.name} Resonance`,
      value: a.mercury.retrograde ? 'ACTIVE — ABSORBING' : 'ACTIVE — AMPLIFYING',
      status: a.mercury.retrograde ? 'critical' : 'elevated',
    },
    {
      label: 'Field Alignment',
      value: `${(Math.random() * 20 + 75).toFixed(1)}%`,
      status: 'nominal',
    },
  ];
}

// ─── Alignment score ──────────────────────────────────────────────────────────
function computeAlignmentScore(a: AstronomyData): number {
  let score = 72;
  if (a.mercury.retrograde) score -= 8;
  if (a.moon.illumination > 80) score += 6;
  if (a.moon.illumination < 15) score -= 4;
  if (a.venus.magnitude < -4.0) score += 5;
  if (a.venus.distance < 0.8) score += 4;
  score += Math.floor(Math.random() * 10) - 3;
  return Math.min(99, Math.max(51, score));
}

function computeResonanceHz(m: Mineral, a: AstronomyData): number {
  const base = m.mohs * 1234.567 + a.mercury.eclipticLon * 7.3;
  return parseFloat((base + a.moon.phase * 0.413).toFixed(3));
}

function getPrimaryInfluence(a: AstronomyData): string {
  if (a.mercury.retrograde) return 'Mercury Retrograde';
  if (a.moon.illumination > 85) return 'Full Moon';
  if (a.moon.illumination < 10) return 'New Moon';
  if (a.venus.distance < 0.8) return 'Venus Close Approach';
  return 'Mercury Direct';
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ─── Main generator ───────────────────────────────────────────────────────────
export function generateAlignment(mineral: Mineral, astro: AstronomyData): AlignmentResult {
  const openings = astro.mercury.retrograde ? RETROGRADE_OPENINGS : DIRECT_OPENINGS;
  const opening = pick(openings)(mineral);

  const moonMod =
    MOON_MODIFIERS[astro.moon.phaseName]?.(mineral, astro.moon.illumination) ??
    MOON_MODIFIERS['Waxing Crescent'](mineral, astro.moon.illumination);

  const venusMod = getVenusModifier(astro.venus.distance, astro.venus.magnitude);

  const advice =
    MINERAL_ADVICE[mineral.id]?.(astro.mercury.retrograde) ??
    `Your ${mineral.name} is aligned. Trust what it's showing you today.`;

  const fortune_text = `${opening}\n\n${moonMod}${venusMod}\n\n${advice}`;

  return {
    mineral,
    fortune_text,
    alignment_score: computeAlignmentScore(astro),
    mineral_resonance_hz: computeResonanceHz(mineral, astro),
    primary_influence: getPrimaryInfluence(astro),
    data_points: buildDataPoints(mineral, astro),
    protocol: mineral.protocol_detail,
    warning: getWarning(mineral, astro),
    optimal_window_hours: Math.floor(Math.random() * 36) + 12,
    timestamp: new Date(),
  };
}
