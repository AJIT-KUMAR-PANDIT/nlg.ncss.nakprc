import { VortexGenerator, VortexGeneratorParams, VortexGeneratorResult } from '../types';

export const CircularGenerator = (): VortexGenerator => {
  return (params: VortexGeneratorParams): VortexGeneratorResult => {
    return {
      radius: params.radius,
      pressure: 1.0,
    };
  };
};

export const SquareGenerator = (): VortexGenerator => {
  return (params: VortexGeneratorParams): VortexGeneratorResult => {
    // Basic superellipse/rounded square approximation
    const c = Math.cos(params.angle);
    const s = Math.sin(params.angle);
    const r = params.radius / Math.max(Math.abs(c), Math.abs(s));
    return {
      radius: r,
      pressure: 1.0,
    };
  };
};

export const PolygonGenerator = (sides: number): VortexGenerator => {
  return (params: VortexGeneratorParams): VortexGeneratorResult => {
    const a = params.angle + Math.PI / sides;
    const r = params.radius * Math.cos(Math.PI / sides) / Math.cos(a - (2 * Math.PI / sides) * Math.floor((sides * a) / (2 * Math.PI)));
    return {
      radius: r,
      pressure: 1.0,
    };
  };
};

export const SVGPathGenerator = (pathStr: string): VortexGenerator => {
  // In a full implementation, this would parse the SVG path and map distances.
  // For now, we fallback to a circle if path parsing is omitted in this demo.
  return CircularGenerator();
};

export const getBuiltInGenerator = (type: string, config: any = {}): VortexGenerator => {
  switch (type) {
    case 'square': return SquareGenerator();
    case 'polygon': return PolygonGenerator(config.sides || 6);
    case 'circle':
    default:
      return CircularGenerator();
  }
};
