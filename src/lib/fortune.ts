import type { Mineral, AstronomyData, AlignmentResult, DataPoint } from '../types';

// ─── Opening sentences (Mercury Retrograde) ───────────────────────────────────
const RETROGRADE_OPENINGS = [
  (m: Mineral, a: AstronomyData) =>
    `Mercury's apparent retrograde motion (geocentric ecliptic velocity: ${a.mercury.velocity.toFixed(3)}°/day; distance: ${a.mercury.distance} AU) has initiated a ${m.property_name} cascade within your ${m.name} specimen. The ${m.formula} molecular matrix is now acting as a primary absorption field for retrograde-induced electromagnetic flux.`,

  (m: Mineral, a: AstronomyData) =>
    `The optical illusion of Mercury's backward arc across the ecliptic (Δλ = ${a.mercury.velocity.toFixed(3)}°/day) is generating a measurable interference pattern at the ${m.formula} crystallographic scale. Your ${m.name} specimen's documented ${m.key_property} is now operating in a non-linear resonance regime.`,

  (m: Mineral, a: AstronomyData) =>
    `As Mercury decelerates to ${a.mercury.velocity.toFixed(3)}°/day — an artifact of Earth's outer orbital velocity exceeding Mercury's observed angular rate — the ${m.property_name} indices within your ${m.name} (${m.formula}) have entered a period of amplified instability. The crystal field is absorbing communicative dissonance at elevated rates.`,

  (m: Mineral, a: AstronomyData) =>
    `Mercury retrograde (current apparent velocity: ${a.mercury.velocity.toFixed(3)}°/day) is inducing a sector boundary crossing in the local interplanetary magnetic field. Your ${m.name} specimen, with its ${m.key_property}, is functioning as a natural IMF filter — actively mediating the resulting bioelectric field perturbation in your immediate 3-meter radius.`,
];

// ─── Opening sentences (Mercury Direct) ──────────────────────────────────────
const DIRECT_OPENINGS = [
  (m: Mineral, a: AstronomyData) =>
    `Mercury's direct prograde motion at ${a.mercury.velocity.toFixed(3)}°/day is generating a coherent electromagnetic wavefront that interacts constructively with the ${m.property_name} of your ${m.name} specimen (${m.formula}). Planetary and crystallographic vectors are aligned in a mutually reinforcing configuration.`,

  (m: Mineral, a: AstronomyData) =>
    `With Mercury advancing at a stable ${a.mercury.velocity.toFixed(3)}°/day (currently ${a.mercury.distance} AU from Earth), the coherent interplanetary magnetic field is positively polarizing the ${m.formula} lattice of your ${m.name}. ${m.property_name} indices are approaching a 72-hour local maximum.`,

  (m: Mineral, a: AstronomyData) =>
    `Mercury's current prograde velocity of ${a.mercury.velocity.toFixed(3)}°/day establishes a stable electromagnetic baseline that amplifies the ${m.key_property} of ${m.name}. The constructive interference between Mercury's heliocentrically coherent trajectory and the ${m.formula} crystal field creates an optimal alignment window.`,
];

// ─── Moon phase modifiers ─────────────────────────────────────────────────────
const MOON_MODIFIERS: Record<string, (m: Mineral, illum: number) => string> = {
  'New Moon': (m, illum) =>
    `The gravitational null-point created by the Moon's ${illum}% illumination has produced a scalar vacuum in your local bioelectric field, into which ${m.name}'s ${m.property_name} is expanding at maximum sensitivity. This tidal inflection point is the optimal window for crystallographic field calibration.`,

  'Waxing Crescent': (m, illum) =>
    `The waxing lunar gradient at ${illum}% illumination is inducing a positive pressure differential across ${m.name}'s crystallographic axes (${m.formula}), driving an increase in net ${m.property_name} that will peak in approximately 7 days.`,

  'First Quarter': (m, illum) =>
    `Lunar gravitational tension at the quadrature point (${illum}% illumination) has created a resonant harmonic with ${m.name}'s ${m.formula} structure. The ${m.property_name} is being drawn toward a 90° phase inflection — a rare configurational window.`,

  'Waxing Gibbous': (m, illum) =>
    `As the Moon approaches full illumination at ${illum}%, tidal forces on ${m.name}'s Mohs ${m.mohs} crystal structure are reaching a local maximum. The ${m.property_name} coefficient is scaling proportionally with the increasing gravitational gradient.`,

  'Full Moon': (m, illum) =>
    `Maximum lunar photon reflectance (${illum}% illumination) is driving a saturation event in ${m.name}'s ${m.formula} matrix. The tidal gravitational force at apogee (1.62 × 10⁻⁶ m/s²) measurably amplifies the ${m.property_name} effect — an event occurring only 12 times per Earth year.`,

  'Waning Gibbous': (m, illum) =>
    `Post-full-Moon deceleration of the lunar photon flux (now at ${illum}% illumination) is introducing a decreasing pressure gradient across ${m.name}'s ${m.formula} lattice. The ${m.property_name} is entering a controlled discharge phase.`,

  'Last Quarter': (m, illum) =>
    `The syzygy-to-quadrature transition at ${illum}% lunar illumination is generating a piezo-tidal interference pattern within your ${m.name} specimen. The opposing gravitational vectors at quadrature create ideal conditions for ${m.property_name} field restructuring.`,

  'Waning Crescent': (m, illum) =>
    `The Moon's declining albedo at ${illum}% illumination is withdrawing photon excitation from ${m.name}'s ${m.formula} matrix. This gravitational ebb represents the optimal phase for ${m.property_name} recalibration before the next lunar cycle initiates.`,
};

// ─── Venus modifier ───────────────────────────────────────────────────────────
function getVenusModifier(m: Mineral, venusMag: number, venusDist: number): string {
  if (venusDist < 0.8) {
    return ` Venus, currently at peak proximity (${venusDist} AU, apparent magnitude ${venusMag}), is exerting maximum photon pressure on ${m.name}'s ${m.formula} matrix — an interpersonally significant electromagnetic convergence.`;
  }
  if (venusDist > 1.5) {
    return ` Venus's current apogee position (${venusDist} AU, magnitude ${venusMag}) reduces photon pressure on ${m.name} to a baseline state, redirecting available electromagnetic energy inward.`;
  }
  return ` Venus at ${venusDist} AU (magnitude ${venusMag}) is contributing a secondary harmonic to ${m.name}'s ${m.property_name} field.`;
}

// ─── Closing sentences (action) ───────────────────────────────────────────────
const CLOSINGS = [
  (m: Mineral) =>
    `Your current ${m.property_name} index reads at ${(Math.random() * 30 + 65).toFixed(1)}% of theoretical maximum. ${m.protocol_detail}`,

  (m: Mineral) =>
    `Field analysis indicates your ${m.name} specimen is operating within measurable resonance parameters. Recommended protocol: ${m.protocol_detail}`,

  (m: Mineral) =>
    `The combined planetary-crystallographic data indicates an actionable configuration window of ${Math.floor(Math.random() * 36 + 12)} hours. ${m.protocol_detail}`,
];

// ─── Warnings ────────────────────────────────────────────────────────────────
function getWarning(m: Mineral, a: AstronomyData): string {
  const base = `During this alignment period, ${m.warning_detail}.`;
  if (a.mercury.retrograde) {
    return base + ` Mercury retrograde suppression compounds this risk — the ${m.formula} lattice has reduced fault tolerance until direct motion resumes.`;
  }
  return base;
}

// ─── Data points ─────────────────────────────────────────────────────────────
function buildDataPoints(m: Mineral, a: AstronomyData): DataPoint[] {
  return [
    {
      label: 'Mercury Ecliptic Velocity',
      value: `${a.mercury.velocity > 0 ? '+' : ''}${a.mercury.velocity.toFixed(3)}°/day`,
      status: a.mercury.retrograde ? 'critical' : 'nominal',
    },
    {
      label: 'Mercury Distance',
      value: `${a.mercury.distance} AU`,
      status: a.mercury.distance < 0.7 ? 'elevated' : 'nominal',
    },
    {
      label: 'Lunar Illumination',
      value: `${a.moon.illumination}% (${a.moon.phaseName})`,
      status:
        a.moon.illumination > 80 || a.moon.illumination < 10 ? 'elevated' : 'nominal',
    },
    {
      label: 'Venus Apparent Magnitude',
      value: `${a.venus.magnitude}`,
      status: a.venus.magnitude < -4.0 ? 'elevated' : 'nominal',
    },
    {
      label: `${m.name} ${m.property_name} Index`,
      value: `${(Math.random() * 30 + 65).toFixed(2)}%`,
      status: a.mercury.retrograde ? 'critical' : 'elevated',
    },
    {
      label: 'Crystallographic Coherence',
      value: `${m.mohs * 10 + Math.floor(Math.random() * 8)}.${Math.floor(Math.random() * 99)} Å`,
      status: 'nominal',
    },
  ];
}

// ─── Alignment score ─────────────────────────────────────────────────────────
function computeAlignmentScore(a: AstronomyData): number {
  // Completely fake but sounds plausible
  let score = 72;
  if (a.mercury.retrograde) score -= 8;
  if (a.moon.illumination > 80) score += 6;
  if (a.moon.illumination < 15) score -= 4;
  if (a.venus.magnitude < -4.0) score += 5;
  if (a.venus.distance < 0.8) score += 4;
  // Add some randomness so it changes each reading
  score += Math.floor(Math.random() * 10) - 3;
  return Math.min(99, Math.max(51, score));
}

// ─── Mineral resonance frequency (100% made up but sounds scientific) ─────────
function computeResonanceHz(m: Mineral, a: AstronomyData): number {
  const base = m.mohs * 1234.567 + a.mercury.eclipticLon * 7.3;
  const lunar = a.moon.phase * 0.413;
  return parseFloat((base + lunar).toFixed(3));
}

// ─── Primary influence label ──────────────────────────────────────────────────
function getPrimaryInfluence(a: AstronomyData): string {
  if (a.mercury.retrograde) return 'Mercury Retrograde';
  if (a.moon.illumination > 85) return 'Full Moon Tidal Maximum';
  if (a.moon.illumination < 10) return 'New Moon Scalar Vacuum';
  if (a.venus.distance < 0.8) return 'Venus Close Approach';
  return 'Mercury Direct / Balanced Field';
}

// ─── Main generator ───────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateAlignment(mineral: Mineral, astro: AstronomyData): AlignmentResult {
  const openings = astro.mercury.retrograde ? RETROGRADE_OPENINGS : DIRECT_OPENINGS;
  const opening = pick(openings)(mineral, astro);

  const moonMod =
    MOON_MODIFIERS[astro.moon.phaseName]?.(mineral, astro.moon.illumination) ??
    MOON_MODIFIERS['Waxing Crescent'](mineral, astro.moon.illumination);

  const venusMod = getVenusModifier(mineral, astro.venus.magnitude, astro.venus.distance);

  const closing = pick(CLOSINGS)(mineral);

  const fortune_text = `${opening} ${moonMod}${venusMod} ${closing}`;

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
