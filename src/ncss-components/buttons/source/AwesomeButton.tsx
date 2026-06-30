import { LiquidGlass } from '@ncss/liquid-glass';

export const AwesomeButton = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => {
  return (
    <LiquidGlass 
      vortex={{ type: 'circle', intensity: 1.0 }} 
      distortion="glass" 
      style={{ borderRadius: '0.5rem', display: 'inline-block' }}
    >
      <button 
        onClick={onClick}
        style={{ 
          padding: '0.75rem 2rem', 
          borderRadius: '0.5rem', 
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))', 
          color: 'white', 
          border: '1px solid rgba(255,255,255,0.2)', 
          fontWeight: 600, 
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.2)'
        }}
      >
        {children}
      </button>
    </LiquidGlass>
  );
};
