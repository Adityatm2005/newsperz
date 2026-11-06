import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Read the backend URL from the .env file and fetch data
    const url = import.meta.env.VITE_API_URL + '/api/status';
    
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not connect to Python backend.");
      });
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>🚀 React + Python Project Base</h1>
      <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
      
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      
      {data ? (
        <div style={{ background: '#f4f4f5', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
          <p style={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>⚡ {data.message}</p>
          <p><strong>Project Classification:</strong> {data.project_type}</p>
          <p><strong>System Status:</strong> Ready for Database Integration</p>
        </div>
      ) : (
        !error && <p>Connecting to backend API...</p>
      )}
    </div>
  );
}

export default App;
