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
      'Quartz generates measurable voltage when mechanically stressed — this property is why it controls oscillation in virtually every clock and electronic device on Earth.',
    protocol_detail:
      'Orient your Quartz specimen at 45° to geomagnetic north for a minimum of 7 hours. The hexagonal crystal lattice will achieve maximum piezoelectric discharge during this retrograde window.',
    warning_detail:
      'avoid initiating digital contracts or text communications during peak Mercury velocity suppression',
    mystical_association: 'clarity, amplification, and universal energy',
  },
  {
    id: 'obsidian',
    name: 'Black Obsidian',
    formula: 'SiO₂ (amorphous)',
    mohs: 5.5,
    color: '#1e1e2e',
    bgGradient: 'from-gray-900/60 to-zinc-900/60',
    emoji: '🖤',
    property_name: 'Amorphous Silicate Absorption',
    key_property:
      'conchoidal fracture edge sharper than surgical steel at 3nm thickness',
    scientific_fact:
      'Obsidian\'s amorphous (non-crystalline) structure means it fractures along arbitrary planes, producing cutting edges so fine that obsidian scalpels are still used in modern microsurgery.',
    protocol_detail:
      'Position Obsidian within 30cm of any active electromagnetic device. The disordered silicate matrix has no crystal lattice to saturate and will absorb excess digital interference indefinitely.',
    warning_detail:
      'avoid rapid emotional decisions while Obsidian\'s amorphous matrix is at saturation capacity — additional interpersonal inputs risk cascading silicate overflow',
    mystical_association: 'protection, truth, and shadow integration',
  },
  {
    id: 'hematite',
    name: 'Hematite',
    formula: 'Fe₂O₃',
    mohs: 6,
    color: '#7f1d1d',
    bgGradient: 'from-red-900/40 to-rose-900/40',
    emoji: '🔴',
    property_name: 'Ferrimagnetic Field Alignment',
    key_property:
      'specific gravity of 5.26 and ferrimagnetic susceptibility of 3.7 × 10⁻³ SI units',
    scientific_fact:
      'Hematite is an iron oxide mineral with measurable ferrimagnetism. Its high density (5.26 g/cm³) and iron content make it one of the primary terrestrial ores used in steel production.',
    protocol_detail:
      'Hold Hematite in your dominant hand while facing geomagnetic north (not true north — account for your local magnetic declination) for exactly 3 minutes per day until resonance normalizes.',
    warning_detail:
      'avoid proximity to strong permanent magnets above 0.5 Tesla — Hematite\'s ferrimagnetic matrix will become temporarily saturated, disrupting your bioelectric grounding field',
    mystical_association: 'grounding, strength, and electromagnetic shielding',
  },
  {
    id: 'amethyst',
    name: 'Amethyst',
    formula: 'SiO₂ + Fe³⁺',
    mohs: 7,
    color: '#6b21a8',
    bgGradient: 'from-purple-900/40 to-violet-900/40',
    emoji: '🟣',
    property_name: 'Iron Chromatic Bioelectric Filtration',
    key_property:
      'color-center absorption peak at 550nm driven by Fe³⁺ charge transfer',
    scientific_fact:
      'Amethyst is structurally identical to Clear Quartz (SiO₂) — the purple color is caused entirely by trace iron impurities (Fe³⁺) and irradiation-induced color centers at a specific optical absorption wavelength.',
    protocol_detail:
      'Sleep with Amethyst within 50cm of your cranium. The Fe³⁺ ions act as chromatic bioelectric filters during theta-wave sleep states, enabling overnight auric field recalibration at 550nm wavelength.',
    warning_detail:
      'avoid exposing Amethyst to sustained temperatures above 200°C — thermal excitation will permanently destabilize the Fe³⁺ color centers, rendering the bioelectric filter inoperative',
    mystical_association: 'intuition, calm, and higher consciousness',
  },
  {
    id: 'lapis',
    name: 'Lapis Lazuli',
    formula: '(Na,Ca)₈(AlSiO₄)₆(SO₄,S,Cl)₂ + FeS₂',
    mohs: 5.5,
    color: '#1e3a8a',
    bgGradient: 'from-blue-900/40 to-indigo-900/40',
    emoji: '🔵',
    property_name: 'Pyrite Micro-Galvanic Current Generation',
    key_property:
      'native FeS₂ (pyrite) inclusions generating micro-galvanic potentials of 0.05–0.4 mV',
    scientific_fact:
      'Lapis Lazuli contains visible flecks of iron pyrite (FeS₂). When lazurite and pyrite are in contact in a moisture-present environment, they form a natural galvanic cell — a microscopic, mineral-based battery.',
    protocol_detail:
      'Wear Lapis Lazuli in contact with skin. Trace moisture from perspiration will activate the pyrite-lazurite galvanic interface, generating a low-level Faradaic field around your bioelectric perimeter for 6–8 hours.',
    warning_detail:
      'avoid exposing Lapis to acidic environments — sulfuric acid produced by pyrite oxidation will degrade the lazurite lattice and permanently neutralize the galvanic micro-current field',
    mystical_association: 'wisdom, truth, and celestial connection',
  },
  {
    id: 'malachite',
    name: 'Malachite',
    formula: 'Cu₂CO₃(OH)₂',
    mohs: 4,
    color: '#14532d',
    bgGradient: 'from-green-900/40 to-emerald-900/40',
    emoji: '🟢',
    property_name: 'Copper Electromagnetic Conductance Bridge',
    key_property: '57.5% copper by mass with thermal conductivity of 390 W/(m·K)',
    scientific_fact:
      'Malachite is a copper carbonate hydroxide mineral containing approximately 57.5% copper by mass. Its distinctive green color comes from copper\'s d-orbital electron transitions — the same reason copper pipes turn green when oxidized.',
    protocol_detail:
      'Carry Malachite on your left (receptive) side, closest to your heart. The 57.5% copper content creates a conductive bridge between your cardiovascular bioelectric field and the current Venusian electromagnetic flux. Do not ingest or inhale powdered form.',
    warning_detail:
      'do not consume or inhale powdered Malachite — copper carbonate is genuinely toxic and causes systemic copper poisoning; the stone works through resonance, not ingestion',
    mystical_association: 'transformation, heart opening, and abundance',
  },
  {
    id: 'selenite',
    name: 'Selenite',
    formula: 'CaSO₄·2H₂O',
    mohs: 2,
    color: '#fefce8',
    bgGradient: 'from-yellow-900/20 to-amber-900/20',
    emoji: '🤍',
    property_name: 'Scalar Wave Transparency Modulation',
    key_property:
      'optical transparency to 95% of visible wavelengths with perfect monoclinic cleavage',
    scientific_fact:
      'Selenite is a form of gypsum so soft (Mohs 2) it can be scratched with a fingernail. The Cave of Crystals in Naica, Mexico contains Selenite crystals up to 11 meters long — the largest natural crystals ever discovered on Earth.',
    protocol_detail:
      'Place Selenite between yourself and any Wi-Fi router or active screen. Its near-perfect optical transparency (95% visible light transmission) means it processes scalar electromagnetic fields without absorption saturation.',
    warning_detail:
      'keep Selenite away from water — the CaSO₄·2H₂O lattice will dissolve in prolonged moisture contact, releasing the stored scalar wave field prematurely and disrupting your local harmonic environment',
    mystical_association: 'purity, divine light, and energetic cleansing',
  },
  {
    id: 'tourmaline',
    name: 'Black Tourmaline',
    formula: 'NaFe₃(Al,Fe)₆(BO₃)₃Si₆O₁₈(OH)₄',
    mohs: 7.5,
    color: '#0f0f0f',
    bgGradient: 'from-slate-900/60 to-gray-900/60',
    emoji: '⚫',
    property_name: 'Pyroelectric Bioelectric Perimeter Generation',
    key_property:
      'pyroelectric coefficient of 4 μC/(m²·K) and simultaneous piezoelectricity',
    scientific_fact:
      'Black Tourmaline is one of very few minerals that is simultaneously piezoelectric AND pyroelectric — it generates voltage from both mechanical pressure AND temperature change. It spontaneously acquires static charge just from handling.',
    protocol_detail:
      'Wear Black Tourmaline directly against your skin. Body heat (ΔT ≈ 0.04°C above ambient) continuously drives the pyroelectric effect, generating a sustained bioelectric perimeter field of measurable voltage differential.',
    warning_detail:
      'avoid placing near synthetic electromagnetic emitters above 2.4 GHz — the pyroelectric field inversion at these frequencies temporarily reverses the protective polarity of the tourmaline perimeter',
    mystical_association: 'psychic protection, grounding, and EMF shielding',
  },
  {
    id: 'citrine',
    name: 'Citrine',
    formula: 'SiO₂ + Fe³⁺ (oxidized)',
    mohs: 7,
    color: '#78350f',
    bgGradient: 'from-amber-900/40 to-orange-900/40',
    emoji: '🟡',
    property_name: 'Oxidized Iron Vibrational Frequency Elevation',
    key_property:
      'Fe³⁺ ions in high-spin d⁵ configuration producing absorption peak at 430nm',
    scientific_fact:
      'Natural Citrine\'s yellow color is caused by Fe³⁺ ions in a specific oxidized valence state — distinct from Amethyst\'s Fe³⁺. Most commercial "Citrine" is actually heat-treated Amethyst: heating Amethyst above 300°C converts its iron from the reduced to the oxidized state, permanently changing the color.',
    protocol_detail:
      'Face Citrine toward the primary light source in your environment. The Fe³⁺ high-spin d⁵ electron configuration absorbs at 430nm and re-emits in the yellow spectrum, elevating the ambient vibrational frequency index of your space by a calculated 3.7%.',
    warning_detail:
      'avoid extended storage in complete darkness — the Fe³⁺ high-spin configuration gradually reverts toward Fe²⁺ without photon excitation, reducing the vibrational frequency emission rate',
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
    property_name: 'Thin-Film Optical Interference Amplification',
    key_property:
      'labradorescence from internal lamellae spaced 100–300nm apart producing structural color',
    scientific_fact:
      'Labradorite\'s iridescent "schiller" effect (labradorescence) is not caused by pigment but by thin-film optical interference: internal layers of alternating feldspar composition spaced exactly 100–300 nanometers apart cause light waves to interfere constructively and destructively, producing the characteristic play of color.',
    protocol_detail:
      'Orient Labradorite to catch light at dawn. Maximum labradorescence occurs when incoming photons align with the internal lamellae angle (optimal at 15°–30° from horizontal) — this is when the thin-film interference pattern achieves peak coherence with ambient photon field frequencies.',
    warning_detail:
      'avoid exposing to ultrasonic cleaning — mechanical vibration above 40 kHz disrupts the nanometer-scale lamellae spacing that produces labradorescence, permanently detuning the optical interference resonance',
    mystical_association: 'magic, transformation, and interdimensional awareness',
  },
];

export function getRandomMineral(): Mineral {
  return MINERALS[Math.floor(Math.random() * MINERALS.length)];
}
