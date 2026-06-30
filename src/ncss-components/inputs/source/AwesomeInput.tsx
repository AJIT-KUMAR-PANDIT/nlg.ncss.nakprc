import React from 'react';

export interface AwesomeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const AwesomeInput = React.forwardRef<HTMLInputElement, AwesomeInputProps>(
  ({ icon, style, ...props }, ref) => {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        {icon && (
          <div style={{ 
            position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', 
            color: '#a1a1aa', pointerEvents: 'none', display: 'flex' 
          }}>
            {icon}
          </div>
        )}
        <input 
          ref={ref}
          style={{ 
            width: '100%',
            padding: `0.5rem 1rem 0.5rem ${icon ? '2.5rem' : '1rem'}`,
            borderRadius: '0.5rem',
            border: '1px solid #27272a',
            backgroundColor: '#18181b',
            color: '#fafafa',
            fontSize: '0.875rem',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxSizing: 'border-box',
            ...style
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#8b5cf6';
            e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.2)';
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#27272a';
            e.target.style.boxShadow = 'none';
            if (props.onBlur) props.onBlur(e);
          }}
          {...props}
        />
      </div>
    );
  }
);

AwesomeInput.displayName = 'AwesomeInput';
