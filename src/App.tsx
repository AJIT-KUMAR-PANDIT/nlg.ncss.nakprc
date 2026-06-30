import { LiquidGlass } from './lib';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#111', color: '#fff', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>NCSS Native WEB Liquid Glass</h1>
      
      <LiquidGlass 
        vortex={{ type: 'circle', intensity: 1.5 }} 
        distortion="glass"
        style={{ 
          width: '400px', 
          height: '250px', 
          borderRadius: '2rem', 
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
          <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>Liquid Glass</h2>
          <p style={{ fontSize: '1.2rem', margin: 0, opacity: 0.9 }}>Interactive Circular Refraction</p>
        </div>
      </LiquidGlass>
    </div>
  );
}

export default App;
