export interface VortexConfig {
  type?: string; // Built-in types: 'circle', 'square', 'polygon', etc.
  generator?: VortexGenerator; // Custom plugin generator
  intensity?: number;
  speed?: number;
  viscosity?: number;
  rings?: number;
  rotation?: boolean | number;
  sides?: number; // For polygon
  path?: string; // For svg path
  text?: string; // For text
}

export interface VortexGeneratorParams {
  t: number;
  angle: number;
  radius: number;
  x: number;
  y: number;
}

export interface VortexGeneratorResult {
  radius: number;
  rotation?: number;
  opacity?: number;
  pressure?: number;
}

export type VortexGenerator = (params: VortexGeneratorParams) => VortexGeneratorResult;

export type PropagationMode = 'uniform' | 'elastic' | 'fluid' | 'shockwave' | 'magnetic' | 'gravity';
export type DistortionStyle = 'glass' | 'water' | 'gel' | 'mercury' | 'oil' | 'plasma';
export type PressureProfile = 'gaussian' | 'linear' | 'exponential' | 'custom';

export interface LiquidGlassProps {
  vortex?: VortexConfig;
  propagation?: PropagationMode;
  distortion?: DistortionStyle;
  pressure?: PressureProfile | ((d: number) => number);
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
