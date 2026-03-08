import {
  Body,
  EclipticLongitude,
  MoonPhase,
  Illumination,
  GeoVector,
} from 'astronomy-engine';
import type { AstronomyData } from '../types';

function getMoonPhaseName(angle: number): { name: string; emoji: string } {
  // angle: 0 = New Moon, 90 = First Quarter, 180 = Full Moon, 270 = Last Quarter
  if (angle < 22.5 || angle >= 337.5) return { name: 'New Moon', emoji: '🌑' };
  if (angle < 67.5) return { name: 'Waxing Crescent', emoji: '🌒' };
  if (angle < 112.5) return { name: 'First Quarter', emoji: '🌓' };
  if (angle < 157.5) return { name: 'Waxing Gibbous', emoji: '🌔' };
  if (angle < 202.5) return { name: 'Full Moon', emoji: '🌕' };
  if (angle < 247.5) return { name: 'Waning Gibbous', emoji: '🌖' };
  if (angle < 292.5) return { name: 'Last Quarter', emoji: '🌗' };
  return { name: 'Waning Crescent', emoji: '🌘' };
}

function getMoonIllumination(phaseAngle: number): number {
  // Illumination fraction: 0 at new moon, 100 at full moon
  return Math.round(50 * (1 - Math.cos((phaseAngle * Math.PI) / 180)));
}

export function computeAstronomy(): AstronomyData {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86_400_000);

  // Mercury ecliptic longitude today vs yesterday to detect retrograde
  const mercLonToday = EclipticLongitude(Body.Mercury, now);
  const mercLonYesterday = EclipticLongitude(Body.Mercury, yesterday);

  let mercVelocity = mercLonToday - mercLonYesterday;
  // Handle 360° wrap-around
  if (mercVelocity > 180) mercVelocity -= 360;
  if (mercVelocity < -180) mercVelocity += 360;

  // Distance: use GeoVector magnitude (AU from Earth)
  const mercVec = GeoVector(Body.Mercury, now, true);
  const mercDist = Math.sqrt(mercVec.x ** 2 + mercVec.y ** 2 + mercVec.z ** 2);

  // Moon
  const moonPhaseAngle = MoonPhase(now);
  const { name: phaseName, emoji: phaseEmoji } = getMoonPhaseName(moonPhaseAngle);

  // Venus
  const venusIllum = Illumination(Body.Venus, now);
  const venusVec = GeoVector(Body.Venus, now, true);
  const venusDist = Math.sqrt(venusVec.x ** 2 + venusVec.y ** 2 + venusVec.z ** 2);

  // Mars
  const marsIllum = Illumination(Body.Mars, now);
  const marsVec = GeoVector(Body.Mars, now, true);
  const marsDist = Math.sqrt(marsVec.x ** 2 + marsVec.y ** 2 + marsVec.z ** 2);

  return {
    mercury: {
      eclipticLon: mercLonToday,
      retrograde: mercVelocity < 0,
      velocity: parseFloat(mercVelocity.toFixed(4)),
      distance: parseFloat(mercDist.toFixed(4)),
    },
    moon: {
      phase: parseFloat(moonPhaseAngle.toFixed(2)),
      phaseName,
      illumination: getMoonIllumination(moonPhaseAngle),
      phaseEmoji,
    },
    venus: {
      magnitude: parseFloat(venusIllum.mag.toFixed(2)),
      distance: parseFloat(venusDist.toFixed(4)),
    },
    mars: {
      magnitude: parseFloat(marsIllum.mag.toFixed(2)),
      distance: parseFloat(marsDist.toFixed(4)),
    },
    computedAt: now,
  };
}
