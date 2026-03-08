import type { Mineral } from '../types';

export const MINERALS: Mineral[] = [
  {
    id: 'quartz',
    name: 'Clear Quartz',
    formula: 'SiO₂',
    mohs: 7,
    color: '#e0f2fe',
    bgGradient: 'from-sky-900/40 to-cyan-900/40',
    emoji: '💎',
    property_name: 'Piezoelectric Resonance',
    key_property: 'piezoelectric coefficient of 2.31 pC/N',
    scientific_fact:
      'Quartz generates real electricity when squeezed — which is literally why it\'s in every clock and phone on Earth.',
    protocol_detail:
      'Hold your Quartz in both hands for a few minutes before you make any important decisions today. Let it do its thing.',
    warning_detail:
      'avoid sending important texts or emails during Mercury retrograde',
    mystical_association: 'clarity, amplification, and universal energy',
  },
  {
    id: 'obsidian',
    name: 'Black Obsidian',
    formula: 'SiO₂ (volcanic glass)',
    mohs: 5.5,
    color: '#1e1e2e',
    bgGradient: 'from-gray-900/60 to-zinc-900/60',
    emoji: '🖤',
    property_name: 'Amorphous Protection Field',
    key_property: 'conchoidal fracture sharper than surgical steel',
    scientific_fact:
      'Obsidian is so sharp that surgeons actually still use it for some procedures — it cuts cleaner than metal at the microscopic level.',
    protocol_detail:
      'Keep Obsidian near your workspace today. If someone is pulling at your energy, physically hold the stone and breathe.',
    warning_detail:
      'avoid people who drain your energy right now',
    mystical_association: 'protection, truth, and shadow work',
  },
  {
    id: 'hematite',
    name: 'Hematite',
    formula: 'Fe₂O₃',
    mohs: 6,
    color: '#7f1d1d',
    bgGradient: 'from-red-900/40 to-rose-900/40',
    emoji: '🔴',
    property_name: 'Ferrimagnetic Grounding',
    key_property: 'ferrimagnetic and heavier than most rocks at 5.26 g/cm³',
    scientific_fact:
      'Hematite is an iron oxide — the same compound that makes your blood red and Mars red. It\'s measurably magnetic.',
    protocol_detail:
      'Carry Hematite in your pocket today — the weight of it is grounding on its own. When anxiety spikes, find it with your hand.',
    warning_detail:
      'avoid trying to control things that aren\'t yours to fix',
    mystical_association: 'grounding, strength, and stability',
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    formula: 'SiO₂ + Fe³⁺',
    mohs: 7,
    color: '#6b21a8',
    bgGradient: 'from-purple-900/40 to-violet-900/40',
    emoji: '🟣',
    property_name: 'Iron Chromatic Field',
    key_property: 'purple color from iron impurities, identical structure to Clear Quartz',
    scientific_fact:
      'Amethyst is literally just Quartz with iron in it — the purple comes from iron impurities, not a different mineral entirely.',
    protocol_detail:
      'Put Amethyst on your nightstand tonight. If your sleep has been off, this is the stone for it.',
    warning_detail:
      'avoid screens for at least 30 minutes before bed tonight',
    mystical_association: 'intuition, calm, and higher consciousness',
  },
  {
    id: 'lapis',
    name: 'Lapis Lazuli',
    formula: 'Lazurite + Calcite + Pyrite',
    mohs: 5.5,
    color: '#1e3a8a',
    bgGradient: 'from-blue-900/40 to-indigo-900/40',
    emoji: '🔵',
    property_name: 'Pyrite Micro-Current Field',
    key_property: 'contains real gold flecks (pyrite) that generate micro-electrical currents',
    scientific_fact:
      'Those gold flecks in Lapis Lazuli are actual pyrite — iron pyrite creates a tiny measurable electrical current when it contacts moisture.',
    protocol_detail:
      'Wear Lapis today if you have a hard conversation coming up. It\'s a truth-telling stone — and science backs the electricity part.',
    warning_detail:
      'don\'t make promises right now you\'re not sure you can keep',
    mystical_association: 'truth, wisdom, and communication',
  },
  {
    id: 'malachite',
    name: 'Malachite',
    formula: 'Cu₂CO₃(OH)₂',
    mohs: 4,
    color: '#14532d',
    bgGradient: 'from-green-900/40 to-emerald-900/40',
    emoji: '🟢',
    property_name: 'Copper Heart Resonance',
    key_property: '57% copper by mass — the same element in your neural pathways',
    scientific_fact:
      'Malachite is 57% copper — the same element that helps your nerves fire and your heart beat. That\'s not a coincidence.',
    protocol_detail:
      'Carry Malachite on your left side today, close to your heart. Let it do the heavy lifting on whatever emotional weight you\'re carrying.',
    warning_detail:
      'don\'t ignore what your body is trying to tell you today',
    mystical_association: 'heart healing, transformation, and abundance',
  },
  {
    id: 'selenite',
    name: 'Selenite',
    formula: 'CaSO₄·2H₂O',
    mohs: 2,
    color: '#fefce8',
    bgGradient: 'from-yellow-900/20 to-amber-900/20',
    emoji: '🤍',
    property_name: 'Clarity Transmission',
    key_property: 'softest stone in common use — crystals found up to 11 meters long in Mexico',
    scientific_fact:
      'Selenite is so soft you can scratch it with your fingernail, but in the Cave of Crystals in Mexico, they grow up to 11 meters long. Fragile doesn\'t mean weak.',
    protocol_detail:
      'Place Selenite somewhere you spend a lot of time. Clean energy in your space = clearer thinking. Simple.',
    warning_detail:
      'keep Selenite away from water — it literally dissolves',
    mystical_association: 'purity, clarity, and energetic cleansing',
  },
  {
    id: 'tourmaline',
    name: 'Black Tourmaline',
    formula: 'Boron Silicate (complex)',
    mohs: 7.5,
    color: '#0f0f0f',
    bgGradient: 'from-slate-900/60 to-gray-900/60',
    emoji: '⚫',
    property_name: 'Pyroelectric Protection Field',
    key_property: 'generates real electricity from body heat — pyroelectric and piezoelectric',
    scientific_fact:
      'Black Tourmaline generates actual electricity from heat and pressure — you can measure it. Your body heat alone activates it.',
    protocol_detail:
      'Wear Black Tourmaline against your skin today. It\'s generating a real electrical field just from your body heat.',
    warning_detail:
      'you\'re allowed to not absorb everyone else\'s chaos right now',
    mystical_association: 'protection, grounding, and energy shielding',
  },
  {
    id: 'citrine',
    name: 'Citrine',
    formula: 'SiO₂ + Fe³⁺ (oxidized)',
    mohs: 7,
    color: '#78350f',
    bgGradient: 'from-amber-900/40 to-orange-900/40',
    emoji: '🟡',
    property_name: 'Solar Iron Resonance',
    key_property: 'yellow color from oxidized iron — most "citrine" sold is heat-treated amethyst',
    scientific_fact:
      'Most Citrine you buy is actually Amethyst that was heated above 300°C — the heat oxidizes the iron and turns it yellow. The energy doesn\'t care either way.',
    protocol_detail:
      'Put Citrine somewhere visible to you today — on your desk, near a window. Let the color remind you what you\'re building toward.',
    warning_detail:
      'don\'t let self-doubt block a genuinely good opportunity right now',
    mystical_association: 'abundance, manifestation, and solar energy',
  },
  {
    id: 'labradorite',
    name: 'Labradorite',
    formula: '(Ca,Na)(Al,Si)₄O₈',
    mohs: 6.5,
    color: '#164e63',
    bgGradient: 'from-cyan-900/40 to-teal-900/40',
    emoji: '🪨',
    property_name: 'Thin-Film Light Interference',
    key_property: 'iridescent color from light waves interfering inside the stone — not pigment',
    scientific_fact:
      'Labradorite\'s shimmer isn\'t from any dye or pigment — it\'s light waves interfering with each other inside the stone. The color literally changes depending on your angle.',
    protocol_detail:
      'Hold Labradorite up to light today and watch it shift. Then ask yourself: what in your situation changes depending on how you look at it?',
    warning_detail:
      'don\'t make a fear-based decision today — check whether it\'s intuition or anxiety',
    mystical_association: 'magic, transformation, and seeing multiple perspectives',
  },
];

export function getRandomMineral(): Mineral {
  return MINERALS[Math.floor(Math.random() * MINERALS.length)];
}
