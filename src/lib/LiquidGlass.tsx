import React, { useEffect, useRef, useState } from 'react';
import { LiquidGlassProps } from './types';
import { Engine } from './engine/Engine';

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  vortex = { type: 'circle' },
  propagation = 'fluid',
  distortion = 'glass',
  pressure = 'gaussian',
  className = '',
  style = {},
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Initialize Engine
    const canvas = canvasRef.current;
    
    // Set initial size
    const rect = containerRef.current.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const engine = new Engine(canvas);
    engineRef.current = engine;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        engine.resize(width, height);
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      engine.destroy();
    };
  }, []);

  // Sync props to engine
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setVortex(vortex);
      engineRef.current.setDistortion(distortion);
    }
  }, [vortex, distortion, propagation, pressure]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`} 
      style={{ ...style, position: 'relative' }}
    >
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'auto',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        {children}
      </div>
    </div>
  );
};
