import { AwesomeCard } from './source/AwesomeCard';

export default function CardDemo() {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '4rem', 
      backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '1rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <AwesomeCard onClick={() => {}} style={{ maxWidth: '300px' }}>
        <h3 style={{ margin: '0 0 1rem 0', color: '#fafafa', fontSize: '1.5rem' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: '#a1a1aa', lineHeight: 1.6 }}>Hover over this card to see the smooth interactive lift effect combined with glassmorphism.</p>
      </AwesomeCard>
    </div>
  );
}
