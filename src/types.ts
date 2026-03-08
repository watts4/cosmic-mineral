export interface Mineral {
  id: string;
  name: string;
  formula: string;
  mohs: number;
  color: string;
  bgGradient: string;
  emoji: string;
  property_name: string;
  key_property: string;
  scientific_fact: string;
  protocol_detail: string;
  warning_detail: string;
  mystical_association: string;
}

export interface AstronomyData {
  mercury: {
    eclipticLon: number;
    retrograde: boolean;
    velocity: number; // degrees/day — negative when retrograde
    distance: number; // AU
  };
  moon: {
    phase: number; // 0–360
    phaseName: string;
    illumination: number; // 0–100
    phaseEmoji: string;
  };
  venus: {
    magnitude: number;
    distance: number; // AU
  };
  mars: {
    distance: number; // AU
    magnitude: number;
  };
  computedAt: Date;
}

export interface AlignmentResult {
  mineral: Mineral;
  fortune_text: string;
  alignment_score: number;
  mineral_resonance_hz: number;
  primary_influence: string;
  data_points: DataPoint[];
  protocol: string;
  warning: string;
  optimal_window_hours: number;
  timestamp: Date;
}

export interface DataPoint {
  label: string;
  value: string;
  status: 'nominal' | 'elevated' | 'critical';
}
