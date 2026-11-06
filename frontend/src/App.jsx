import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userCategory, setUserCategory] = useState('Tech');
  const [region, setRegion] = useState('Global'); // New state tracking location filter bounds
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Request appends both category and target region queries down the pipeline pipeline
    const url = `${import.meta.env.VITE_API_URL}/api/news?category=${userCategory.toLowerCase()}&region=${region.toLowerCase()}`;
    
    axios.get(url)
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading personalized news stream:", err);
        setLoading(false);
      });
  }, [userCategory, region]); // Re-fetches instantly whenever user drops or updates category or region dials

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.6rem', color: '#111827', marginBottom: '5px', letterSpacing: '-0.025em' }}>📰 PulseNews</h1>
        <p style={{ color: '#4b5563', fontSize: '1.1rem' }}>Personalized Hybrid Aggregator (Global + India Local)</p>
      </header>

      {/* Control Station Wrapper Block */}
      <div style={{ background: '#f3f4f6', padding: '24px', borderRadius: '16px', marginBottom: '35px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Row 1: Target Location Configuration Filter */}
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#374151', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>🌍 Select Geographic Scope:</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Global', 'India'].map((loc) => (
              <button
                key={loc}
                onClick={() => setRegion(loc)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: region === loc ? '#10b981' : '#ffffff', // Green theme accent for regional nodes
                  color: region === loc ? 'white' : '#374151',
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
              >
                {loc === 'India' ? '🇮🇳 India Edition' : '🌐 Global Edition'}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Category Filter Options */}
        <div>
          <h4 style={{ margin: '0 0 10px 0', color: '#374151', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' }}>🎯 Select Feed Interest Topic:</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['Tech', 'Business', 'Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setUserCategory(cat)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  background: userCategory === cat ? '#2563eb' : '#ffffff',
                  color: userCategory === cat ? 'white' : '#374151',
                  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat} Stream
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Render Feed Block Output container Layout */}
      <div>
        <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '20px' }}>
          Trending in {region} — {userCategory}
        </h2>
        
        {loading ? (
          <p style={{ color: '#6b7280' }}>Surgically querying matching regional streaming layouts via RSS rules...</p>
        ) : (
          <div style={{ display: 'grid', gap: '24px' }}>
            {articles.map((item, index) => (
              <div key={index} style={{ border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ background: item.category.includes('INDIA') ? '#ecfdf5' : '#eff6ff', color: item.category.includes('INDIA') ? '#047857' : '#1e40af', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {item.category}
                  </span>
                  <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                    📡 {item.source}
                  </span>
                </div>
                
                <h3 style={{ margin: '0 0 10px 0', color: '#111827', fontSize: '1.25rem' }}>{item.title}</h3>
                <p style={{ color: '#4b5563', margin: '0 0 16px 0', lineHeight: '1.6' }}>{item.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '14px' }}>
                  <small style={{ color: '#9ca3af' }}>Updated: {item.published_at}</small>
                  <a href={item.link} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Read Full Story ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
