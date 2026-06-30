import { useNavigate } from 'react-router-dom';
import { AwesomeButton } from '@ncss/buttons';
import { AwesomeCard } from '@ncss/cards';
import { Zap, Puzzle, LayoutTemplate } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', marginBottom: '2rem', boxShadow: '0 20px 40px -10px rgba(139, 92, 246, 0.5)' }} />
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.05em', margin: '0 0 1rem 0', color: '#fafafa' }}>
        NCSS UI
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '600px', margin: '0 0 3rem 0', lineHeight: 1.6 }}>
        A premium, programmable component registry for React. Drop components into the registry and instantly get documentation, previews, and installation codes.
      </p>
      
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem' }}>
        <AwesomeButton onClick={() => navigate('/components/liquid-glass')}>
          Browse Components
        </AwesomeButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', marginBottom: '6rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#a1a1aa', marginBottom: '0.75rem', fontWeight: 500 }}>Universal Setup Command:</p>
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '0.5rem', 
          padding: '1rem 1.5rem', fontFamily: 'monospace', fontSize: '1rem', width: '100%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
        }}>
          <span style={{ color: '#e4e4e7' }}>npm i @ncss/liquid-glass</span>
          <button 
            onClick={() => navigator.clipboard.writeText('npm i @ncss/liquid-glass')}
            style={{ 
              background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            title="Copy to clipboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px', padding: '0 2rem' }}>
        <AwesomeCard style={{ textAlign: 'left', minHeight: '220px' }} onClick={() => navigate('/components/inputs')}>
          <div style={{ backgroundColor: '#27272a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#3b82f6' }}>
            <Zap size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fafafa', margin: '0 0 0.5rem 0' }}>Blazing Fast</h3>
          <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>Powered by raw WebGL shaders and React concurrency for 60fps liquid interactions.</p>
        </AwesomeCard>

        <AwesomeCard style={{ textAlign: 'left', minHeight: '220px' }} onClick={() => navigate('/components/cards')}>
          <div style={{ backgroundColor: '#27272a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#8b5cf6' }}>
            <Puzzle size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fafafa', margin: '0 0 0.5rem 0' }}>Composable</h3>
          <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>Wrap any component in liquid glass and automatically inherit beautiful refractions.</p>
        </AwesomeCard>

        <AwesomeCard style={{ textAlign: 'left', minHeight: '220px' }} onClick={() => navigate('/components/buttons')}>
          <div style={{ backgroundColor: '#27272a', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#10b981' }}>
            <LayoutTemplate size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fafafa', margin: '0 0 0.5rem 0' }}>Auto Docs</h3>
          <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>Zero configuration. Drop your components into the registry and let Vite build your docs.</p>
        </AwesomeCard>
      </div>

    </div>
  );
}
