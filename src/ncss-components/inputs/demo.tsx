import { AwesomeInput } from './source/AwesomeInput';
import { Search } from 'lucide-react';

export default function InputDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem', width: '100%', maxWidth: '400px' }}>
      <AwesomeInput placeholder="Standard Input..." />
      <AwesomeInput placeholder="Search components..." icon={<Search size={16} />} />
    </div>
  );
}
