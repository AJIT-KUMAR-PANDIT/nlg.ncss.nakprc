import React from 'react';

export interface AwesomeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AwesomeCard: React.FC<AwesomeCardProps> = ({ children, style, ...props }) => {
  return (
    <div 
      style={{
        background: 'rgba(24, 24, 27, 0.4)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        cursor: props.onClick ? 'pointer' : 'default',
        boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.2)',
        ...style
      }}
      onMouseEnter={(e) => {
        if (props.onClick) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 32px -4px rgba(139, 92, 246, 0.3)';
          e.currentTarget.style.background = 'rgba(24, 24, 27, 0.6)';
        }
      }}
      onMouseLeave={(e) => {
        if (props.onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 24px -1px rgba(0, 0, 0, 0.2)';
          e.currentTarget.style.background = 'rgba(24, 24, 27, 0.4)';
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};
