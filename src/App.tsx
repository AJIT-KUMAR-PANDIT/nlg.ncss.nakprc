import { useState } from 'react';
import { LiquidGlass } from './lib';
import { VortexConfig, DistortionStyle } from './lib/types';
import './App.css';

function App() {
  const [vortexType, setVortexType] = useState<string>('circle');
  const [distortion, setDistortion] = useState<DistortionStyle>('glass');
  
  const vortex: VortexConfig = {
    type: vortexType,
    intensity: 1.5,
    sides: vortexType === 'polygon' ? 6 : undefined,
  };

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#111', color: '#fff', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>NCSS Native WEB Liquid Glass</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        <div>
          <h3>Vortex Shape</h3>
          <select value={vortexType} onChange={(e) => setVortexType(e.target.value)} style={{ padding: '0.5rem' }}>
            <option value="circle">Circle</option>
            <option value="square">Square</option>
            <option value="polygon">Hexagon</option>
          </select>
        </div>
        <div>
          <h3>Distortion Style</h3>
          <select value={distortion} onChange={(e) => setDistortion(e.target.value as DistortionStyle)} style={{ padding: '0.5rem' }}>
            <option value="glass">Glass (Refraction)</option>
            <option value="water">Water</option>
            <option value="mercury">Mercury (Metallic)</option>
            <option value="plasma">Plasma (Emissive)</option>
            <option value="oil">Oil (Interference)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        <LiquidGlass 
          vortex={vortex} 
          distortion={distortion}
          style={{ width: '300px', height: '200px', borderRadius: '1rem', backgroundColor: '#333' }}
        >
          <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <h2>Interact Here</h2>
            <p>Click and drag to generate liquid vortices.</p>
          </div>
        </LiquidGlass>

        <LiquidGlass 
          vortex={{ type: 'polygon', sides: 3 }} 
          distortion={distortion}
          style={{ width: '300px', height: '200px', borderRadius: '1rem', backgroundImage: 'url("https://images.unsplash.com/photo-1557683311-eac922347aa1?auto=format&fit=crop&w=400&q=80")', backgroundSize: 'cover' }}
        >
          <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 10, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            <h2>Triangle Generator</h2>
            <p>Background refraction enabled.</p>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
}

export default App;
