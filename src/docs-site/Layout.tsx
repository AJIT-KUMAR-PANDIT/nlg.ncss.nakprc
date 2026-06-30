import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { componentsList } from './Registry';
import { AwesomeInput } from '@ncss/inputs';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredComponents = componentsList.filter(comp => 
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    comp.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#09090b', color: '#fafafa', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Navigation */}
      <header style={{ 
        position: 'sticky', top: 0, zIndex: 50, width: '100%', 
        borderBottom: '1px solid #27272a', backgroundColor: 'rgba(9, 9, 11, 0.8)', 
        backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', 
        height: '4rem', padding: '0 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
          <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
            NCSS UI
          </Link>
          <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>
            <Link to="/docs" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Documentation</Link>
            <Link to="/components" style={{ color: '#fafafa', textDecoration: 'none' }}>Components</Link>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search Bar */}
          <div ref={searchRef} style={{ position: 'relative', width: '300px' }}>
            <AwesomeInput 
              placeholder="Search components..." 
              icon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            
            {/* Search Dropdown */}
            {isSearchFocused && searchQuery && (
              <div style={{ 
                position: 'absolute', top: '110%', left: 0, width: '100%', 
                backgroundColor: '#18181b', border: '1px solid #27272a', 
                borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                zIndex: 100, maxHeight: '300px', overflowY: 'auto'
              }}>
                {filteredComponents.length > 0 ? (
                  filteredComponents.map(comp => (
                    <div 
                      key={comp.slug}
                      onClick={() => {
                        navigate(`/components/${comp.slug}`);
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                      style={{ 
                        padding: '0.75rem 1rem', borderBottom: '1px solid #27272a', 
                        cursor: 'pointer', transition: 'background 0.2s' 
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27272a'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#fafafa' }}>{comp.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#a1a1aa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{comp.description}</div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: '1rem', color: '#a1a1aa', fontSize: '0.875rem', textAlign: 'center' }}>No components found.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', padding: '0 2rem' }}>
        
        {/* Sidebar */}
        <aside style={{ 
          width: '240px', borderRight: '1px solid #27272a', 
          paddingTop: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' 
        }}>
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fafafa', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>Components</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {componentsList.map(comp => {
                const isActive = location.pathname === `/components/${comp.slug}`;
                return (
                  <Link 
                    key={comp.slug} 
                    to={`/components/${comp.slug}`}
                    style={{
                      padding: '0.375rem 0.5rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      color: isActive ? '#fafafa' : '#a1a1aa',
                      backgroundColor: isActive ? '#27272a' : 'transparent',
                      textDecoration: 'none',
                      transition: 'background-color 0.15s, color 0.15s'
                    }}
                  >
                    {comp.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

    </div>
  );
}
