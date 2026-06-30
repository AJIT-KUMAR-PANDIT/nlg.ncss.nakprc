import { LiquidGlass } from './source/LiquidGlass';

export default function LiquidGlassDemo() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '2rem 0' }}>
      <LiquidGlass 
        vortex={{ type: 'circle', intensity: 1.5 }} 
        distortion="glass"
        style={{ 
          width: '100%', 
          maxWidth: '500px',
          aspectRatio: '16/9',
          borderRadius: '1.5rem', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ 
          padding: '2rem', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center', 
          position: 'relative', 
          zIndex: 10, 
          color: 'white', 
          textShadow: '0 2px 10px rgba(0,0,0,0.8)' 
        }}>
          <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0' }}>Liquid Glass</h2>
          <p style={{ fontSize: '1rem', margin: 0, opacity: 0.9 }}>Interactive Refraction</p>
        </div>
      </LiquidGlass>
    </div>
  );
}
