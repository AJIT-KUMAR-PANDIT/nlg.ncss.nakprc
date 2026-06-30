import { AwesomeButton } from './source/AwesomeButton';

export default function ButtonDemo() {
  return (
    <div style={{ 
      display: 'flex', gap: '2rem', padding: '4rem', 
      backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      borderRadius: '1rem',
      justifyContent: 'center'
    }}>
      <AwesomeButton onClick={() => console.log('Primary clicked!')}>Primary Action</AwesomeButton>
      <AwesomeButton onClick={() => console.log('Secondary clicked!')}>Secondary Action</AwesomeButton>
    </div>
  );
}
