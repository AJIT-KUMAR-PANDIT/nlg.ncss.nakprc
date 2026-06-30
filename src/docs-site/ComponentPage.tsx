import { useParams, Navigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { registry } from './Registry';
import { Copy, Check } from 'lucide-react';

export default function ComponentPage() {
  const { slug } = useParams();
  const component = slug ? registry[slug] : null;
  
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  if (!component) {
    return <Navigate to="/" replace />;
  }

  const { meta, Demo, files } = component;

  const handleCopy = (text: string, type: 'code' | 'install') => {
    navigator.clipboard.writeText(text);
    if (type === 'install') {
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } else {
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, margin: '0 0 1rem 0', letterSpacing: '-0.025em' }}>{meta.name}</h1>
        <p style={{ fontSize: '1.125rem', color: '#a1a1aa', margin: 0, lineHeight: 1.6 }}>{meta.description}</p>
      </div>

      {/* Installation */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '0.5rem' }}>Installation</h2>
        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
          backgroundColor: '#000', border: '1px solid #27272a', borderRadius: '0.5rem', 
          padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' 
        }}>
          <span style={{ color: '#e4e4e7' }}>{meta.installation}</span>
          <button 
            onClick={() => handleCopy(meta.installation, 'install')}
            style={{ 
              background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {copiedInstall ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Usage Tabs */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '0.5rem' }}>Usage</h2>
        
        <div style={{ border: '1px solid #27272a', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #27272a', backgroundColor: '#18181b' }}>
            <button 
              onClick={() => setActiveTab('preview')}
              style={{ 
                padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', 
                color: activeTab === 'preview' ? '#fafafa' : '#a1a1aa',
                borderBottom: activeTab === 'preview' ? '2px solid #fafafa' : '2px solid transparent',
                cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem'
              }}
            >
              Preview
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              style={{ 
                padding: '0.75rem 1.5rem', background: 'transparent', border: 'none', 
                color: activeTab === 'code' ? '#fafafa' : '#a1a1aa',
                borderBottom: activeTab === 'code' ? '2px solid #fafafa' : '2px solid transparent',
                cursor: 'pointer', fontWeight: 500, fontSize: '0.875rem'
              }}
            >
              Code
            </button>
          </div>

          <div style={{ backgroundColor: activeTab === 'preview' ? 'transparent' : '#000', minHeight: '300px' }}>
            {activeTab === 'preview' && (
              <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '350px' }}>
                <Suspense fallback={<div style={{ color: '#a1a1aa' }}>Loading preview...</div>}>
                  <Demo />
                </Suspense>
              </div>
            )}
            
            {activeTab === 'code' && (
              <div style={{ padding: '1rem', overflowX: 'auto' }}>
                {files.map((file, i) => (
                  <div key={i} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#a1a1aa', fontWeight: 600 }}>{file.filename}</span>
                      <button 
                        onClick={() => handleCopy(file.code, 'code')}
                        style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
                      >
                        {copiedCode === file.code ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                      </button>
                    </div>
                    <pre style={{ margin: 0, padding: '1rem', backgroundColor: '#18181b', borderRadius: '0.5rem', fontSize: '0.875rem', overflowX: 'auto', color: '#e4e4e7' }}>
                      <code>{file.code}</code>
                    </pre>
                  </div>
                ))}
                {files.length === 0 && <div style={{ color: '#a1a1aa', padding: '1rem' }}>No source code available.</div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '0.5rem' }}>API Reference</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #27272a' }}>
                <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Prop</th>
                <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Type</th>
                <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Default</th>
                <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {meta.props.map((prop, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #27272a' }}>
                  <td style={{ padding: '1rem', fontWeight: 500, color: '#3b82f6' }}>{prop.name}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#e4e4e7' }}>{prop.type}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', color: '#a1a1aa' }}>{prop.default}</td>
                  <td style={{ padding: '1rem', color: '#a1a1aa' }}>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
