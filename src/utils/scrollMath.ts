/**
 * Math and interpolation utilities for scroll-driven cinematic animations
 */

export function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp: boolean = true
): number {
  if (inMax === inMin) return outMin;
  const progress = (value - inMin) / (inMax - inMin);
  const normalized = shouldClamp ? clamp(progress, 0, 1) : progress;
  return outMin + (outMax - outMin) * normalized;
}

export function smoothstep(min: number, max: number, value: number): number {
  const x = clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

export interface KineticTransform {
  opacity: number;
  translateX: number;
  translateY: number;
  scale: number;
  rotateZ: number;
}

export interface CubeAnimationState {
  opacity: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  positionZ: number;
  activeStageIndex: number;
  phaseLabel: string;
}

/**
 * Calculates the exact 3D cube rotation, scale, position, and stage based on scroll progress (0.0 to 1.0)
 * Stage A (Hero): 0.00 - 0.20
 * Stage B (Kinetic Typography): 0.15 - 0.50
 * Stage C (3D Cube Sequence across 3-4 increments): 0.45 - 0.92
 * Stage D (Transition to Website): 0.90 - 1.00
 */
export function calculateCubeState(progress: number): CubeAnimationState {
  const p = clamp(progress, 0, 1);

  // Cube opacity starts rising at 0.35, peaks between 0.45 and 0.90, fades/shrinks down smoothly towards 1.0
  let opacity = 0;
  if (p < 0.35) {
    opacity = 0;
  } else if (p < 0.45) {
    opacity = smoothstep(0.35, 0.45, p);
  } else if (p <= 0.88) {
    opacity = 1;
  } else {
    opacity = 1 - smoothstep(0.88, 0.98, p);
  }

  // 3-4 deliberate scroll increments for the Cube:
  // Increment 1 (0.40 - 0.55): Introduction and Materialization
  // Increment 2 (0.55 - 0.70): Multi-axis Complex Orbital Rotation
  // Increment 3 (0.70 - 0.85): Perspective Zoom & Core Alignment
  // Increment 4 (0.85 - 0.95): Unlocking Transition & Services Handover
  let scale = 1.0;
  let rotX = 0;
  let rotY = 0;
  let rotZ = 0;
  let positionZ = 0;
  let activeStageIndex = 0;
  let phaseLabel = 'Inactive';

  if (p < 0.40) {
    scale = 0.5;
    rotX = p * 2;
    rotY = p * 3;
    rotZ = p * 1.5;
    positionZ = -8;
    activeStageIndex = 0;
    phaseLabel = 'Hero Typography';
  } else if (p < 0.55) {
    // Increment 1: Materialization & initial tumble
    const t = (p - 0.40) / 0.15;
    scale = lerp(0.6, 1.1, smoothstep(0, 1, t));
    rotX = lerp(0.8, 2.2, t);
    rotY = lerp(1.2, 3.8, t);
    rotZ = lerp(0.4, 1.2, t);
    positionZ = lerp(-8, -1, smoothstep(0, 1, t));
    activeStageIndex = 1;
    phaseLabel = 'Cube Initialization';
  } else if (p < 0.70) {
    // Increment 2: Multi-axis dynamic tumbling & inspection
    const t = (p - 0.55) / 0.15;
    scale = lerp(1.1, 1.35, smoothstep(0, 1, t));
    rotX = lerp(2.2, 4.8, t);
    rotY = lerp(3.8, 7.6, t);
    rotZ = lerp(1.2, 3.0, t);
    positionZ = lerp(-1, 0.8, smoothstep(0, 1, t));
    activeStageIndex = 2;
    phaseLabel = 'Multi-Axis Rotation';
  } else if (p < 0.85) {
    // Increment 3: Deep perspective magnification & holographic core focus
    const t = (p - 0.70) / 0.15;
    scale = lerp(1.35, 1.6, smoothstep(0, 1, t));
    rotX = lerp(4.8, 6.28, t); // 2pi full revolution
    rotY = lerp(7.6, 9.42, t); // 3pi
    rotZ = lerp(3.0, 4.2, t);
    positionZ = lerp(0.8, 1.6, smoothstep(0, 1, t));
    activeStageIndex = 3;
    phaseLabel = 'Perspective Expansion';
  } else {
    // Increment 4: Final settling & handoff to services
    const t = (p - 0.85) / 0.15;
    scale = lerp(1.6, 0.9, smoothstep(0, 1, t));
    rotX = lerp(6.28, 6.8, t);
    rotY = lerp(9.42, 10.5, t);
    rotZ = lerp(4.2, 4.6, t);
    positionZ = lerp(1.6, -3, smoothstep(0, 1, t));
    activeStageIndex = 4;
    phaseLabel = 'Service Transition';
  }

  return {
    opacity,
    scale,
    rotX,
    rotY,
    rotZ,
    positionZ,
    activeStageIndex,
    phaseLabel,
  };
}
