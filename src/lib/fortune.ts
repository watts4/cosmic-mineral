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

// ─── Life cards ───────────────────────────────────────────────────────────────
function generateLifeCards(m: Mineral, a: AstronomyData): import('../types').LifeCard[] {
  const retro = a.mercury.retrograde;
  const fullMoon = a.moon.illumination > 80;
  const newMoon = a.moon.illumination < 12;
  const waningMoon = a.moon.phase > 180;
  const venusClose = a.venus.distance < 0.9;
  const marsClose = a.mars.distance < 1.0;

  // ── Work ────────────────────────────────────────────────────────────────────
  const workAdvice = retro
    ? pick([
        'Not the week to pitch a big idea or send that email to your boss. What feels brilliant right now might read very differently in a few days. Draft it, save it, come back to it.',
        'Avoid starting big new projects this week — finishing existing ones is where your energy is best spent. Mercury retrograde rewards wrapping things up, not launching.',
        'Double-check everything before you submit it. Contracts, emails, proposals — read it twice. Mercury retrograde loves finding the thing you missed.',
      ])
    : marsClose
    ? pick([
        'Mars is close and your ambition is loud right now. Use that drive on one focused thing instead of scattering it across ten. Momentum matters more than multitasking today.',
        'High-energy day for work. The confidence is real — use it to have the ask you\'ve been delaying. Raise, new project, the conversation you keep putting off.',
      ])
    : fullMoon
    ? pick([
        'Big emotions at work today — yours and your coworker\'s. If something bothers you, let it land before you respond. Full Moon energy makes reactions bigger than they need to be.',
        'Something at work has probably been brewing for a while and it\'s coming to a head. Address it directly and calmly — this is actually a good clearing moment.',
      ])
    : pick([
        'Steady, productive day. No big drama — just do the important thing you\'ve been avoiding. Future you will be genuinely grateful.',
        'Clear energy for focused work today. Pick the one task that actually moves the needle and commit to it before doing anything else.',
        'Good day to make a decision you\'ve been sitting on at work. The stars aren\'t telling you to wait any longer.',
      ]);

  // ── Communication ────────────────────────────────────────────────────────────
  const commAdvice = retro
    ? pick([
        'Read it twice before sending. Sleep on the hard conversation. Mercury retrograde is basically the universe\'s "are you SURE?" prompt on every important message.',
        'Misunderstandings are running high right now. If something someone said is bothering you, ask what they meant before assuming the worst.',
        'This is a terrible week to argue over text. If something needs to be resolved, do it in person or on a call — tone gets lost and things escalate fast right now.',
      ])
    : fullMoon
    ? pick([
        'Emotions are loud for everyone right now. Lead with "I feel" instead of "you always" and the conversation will go much better than you expect.',
        'Big feelings make for big conversations. If you\'ve got something important to say, this is actually a powerful time to say it — just come with compassion, not accusations.',
      ])
    : pick([
        'Clear skies for communication. Say what you mean, ask what you actually want to know, and don\'t soften everything to the point where the message disappears.',
        'Good day for the honest conversation. You\'ve probably been holding something back — Mercury direct means the words will land the way you intend them to.',
        'If you\'ve been waiting for the right moment to reach out to someone, this is it. Don\'t overthink the message. Just send it.',
      ]);

  // ── Friendship ───────────────────────────────────────────────────────────────
  const friendAdvice = venusClose
    ? pick([
        'Venus is pulling close and someone in your circle is thinking about you right now. Reach out first — you never know what that text could mean to someone today.',
        'High connection energy. Plans you make with friends this week are likely to actually happen. Don\'t cancel. Show up.',
      ])
    : retro
    ? pick([
        'Old friends might resurface during retrograde. Not all of them for good reasons. Trust your gut on who actually gets access to your time and energy.',
        'A friendship might be asking you to reevaluate it right now. Not dramatically — just honestly. Are you still growing together or just comfortable?',
      ])
    : newMoon
    ? pick([
        'Good time to notice who you actually want more of in your life. You don\'t have to do anything about it yet — just pay attention to how you feel around different people.',
      ])
    : pick([
        'Check in on the friend you haven\'t texted in a while. They probably won\'t reach out first, and you\'ve been thinking about them anyway.',
        'Good social energy today. Say yes to the thing you\'d normally talk yourself out of. Sometimes the unplanned stuff is the best stuff.',
        'One genuine conversation beats ten surface-level ones. You know which friend you can actually be real with. Call them.',
      ]);

  // ── Family ───────────────────────────────────────────────────────────────────
  const familyAdvice = fullMoon
    ? pick([
        'Family stuff runs louder right now. If there\'s tension, it\'s probably been there a while — the Full Moon just puts a spotlight on it. You don\'t have to fix everything today, but you can stop pretending it\'s not there.',
        'Emotions in the family are elevated. Someone might say something that lands harder than they intended. Give a little extra grace today — including to yourself.',
      ])
    : retro
    ? pick([
        'Don\'t get into a major family disagreement over text right now. If something needs to be said, say it in person — or wait until Mercury goes direct.',
        'Old family patterns are showing up. You don\'t have to keep playing the same role you\'ve always played. It\'s okay to respond differently.',
      ])
    : waningMoon
    ? pick([
        'Waning moon is a natural release phase. Old family dynamics that aren\'t serving you anymore? You\'re allowed to put them down. Gently, but for real.',
      ])
    : pick([
        'Reach out to someone in your family today — not because something is wrong, just because. Those are the messages that matter most.',
        'Good day for a real conversation with family. Not logistics — an actual "how are you doing" kind of conversation.',
        'Family energy is calm and stable today. If there\'s something you\'ve been meaning to do for a family member, today is a good day to do it.',
      ]);

  // ── Love & Romance ───────────────────────────────────────────────────────────
  const loveAdvice = venusClose
    ? pick([
        'Venus is closer than usual and the love energy is genuinely elevated. Someone is paying more attention to you than you realize right now. Stay open.',
        'This is a real window for romantic connection. If you\'ve been holding back with someone, consider that the timing is actually good right now — not an excuse, just a fact.',
      ])
    : retro
    ? pick([
        'That "hey stranger" text you\'re considering? Mercury retrograde is famous for bringing exes back around. Ask yourself if that\'s actually what you want, or if you\'re just bored and nostalgic.',
        'Don\'t start a new relationship or make a big romantic move this week if you can help it. Revisit it when Mercury goes direct — feelings will be clearer.',
      ])
    : fullMoon
    ? pick([
        'Full Moon has a way of making feelings impossible to ignore. If there\'s something you feel for someone, it\'s probably written all over your face right now anyway.',
        'Romantic energy is high but also a little intense. Keep it warm, not overwhelming. Say the thing — just don\'t say ALL the things at once.',
      ])
    : pick([
        'If there\'s something you\'ve wanted to say to someone romantically, the lane is clear right now. Don\'t let the moment keep passing.',
        'Good day to be present with the person you love. Not a grand gesture — just actual attention. Put the phone down.',
        'Love energy is quiet but steady today. The small things matter more than you think.',
      ]);

  // ── Money ────────────────────────────────────────────────────────────────────
  const moneyAdvice = retro
    ? pick([
        'Hold off on big financial moves this week. Mercury retrograde and money decisions are a bad combo — contracts get weird, fine print gets missed, and buyer\'s remorse hits hard.',
        'Not the time to invest, splurge, or sign anything financial. Use this week to review what you already have instead of adding more.',
      ])
    : fullMoon
    ? pick([
        'Don\'t make an emotional purchase at peak Full Moon. Sleep on it. If you still want it in three days, it\'s probably not just an impulse.',
        'Full Moon energy makes everything feel more urgent than it is — including spending. Pause before you buy anything over $50 today.',
      ])
    : marsClose
    ? pick([
        'Your ambition around money is running hot. Use it to negotiate, plan, or research — not to rush into something. The drive is good; the impatience is the thing to watch.',
      ])
    : pick([
        'Stable money energy today. Good time to look at the budget you\'ve been avoiding or make a small financial decision you\'ve been sitting on.',
        'If you\'ve been thinking about a financial goal, today is a good day to take one concrete step toward it. Not the whole thing — one step.',
        'Check your accounts today. Not anxiously — just intentionally. Awareness is the first step.',
      ]);

  // ── Self Care ────────────────────────────────────────────────────────────────
  const selfAdvice = newMoon
    ? pick([
        'New Moon is the universe\'s rest phase. You\'re not being lazy — you\'re being smart. What would you do today if productivity wasn\'t the metric?',
        'Quiet energy right now. Journaling, walking, doing nothing intentionally — all valid. Recharge before the cycle picks back up.',
      ])
    : fullMoon
    ? pick([
        'Your nervous system is working overtime. More water, less screen time, earlier to bed. You probably already know exactly what you need — just actually do it.',
        'Full Moon energy is a lot to carry. Give yourself permission to feel whatever is coming up without immediately trying to fix it.',
      ])
    : retro
    ? pick([
        'Your energy needs protecting right now. What\'s one thing on your calendar this week that you\'re dreading? See if you can cancel it.',
        'Mercury retrograde is exhausting in a subtle way. Lower your expectations for yourself a little this week — rest is productive too.',
      ])
    : pick([
        'Take a break today that actually feels like a break — not just scrolling. Go outside, eat slowly, do one thing with zero purpose.',
        'What has your body been asking for that you keep postponing? Sleep, movement, a real meal. Today\'s a good day to actually do it.',
        `Your ${m.name} is a reminder that the most powerful things often look quiet on the outside. Rest is not falling behind.`,
      ]);

  return [
    { topic: 'Work', icon: '💼', advice: workAdvice },
    { topic: 'Communication', icon: '💬', advice: commAdvice },
    { topic: 'Friendship', icon: '🤝', advice: friendAdvice },
    { topic: 'Family', icon: '🏡', advice: familyAdvice },
    { topic: 'Love', icon: '❤️', advice: loveAdvice },
    { topic: 'Money', icon: '💰', advice: moneyAdvice },
    { topic: 'Self Care', icon: '🧘', advice: selfAdvice },
  ];
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
    life_cards: generateLifeCards(mineral, astro),
    timestamp: new Date(),
  };
}
