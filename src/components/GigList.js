import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const initialGigs = [
  { id: 1, date: '2024-09-15', name: 'Summer Festival', instrument: '' },
  { id: 2, date: '2024-10-31', name: 'Halloween Concert', instrument: '' },
  { id: 3, date: '2024-12-24', name: 'Christmas Eve Show', instrument: '' },
  // Add more gigs...
];

const instruments = [
  'I Cant Make This Gig', 'Surdo1', 'Surdo2', 'Surdo3', 'Repinique', 
  'Snare', 'Agogo', 'Tamborim', 'Ganza', 'Timba', 'Cuica', 'Horn'
];

function GigList() {
  const navigate = useNavigate();
  const [gigs, setGigs] = useState(initialGigs);

  useEffect(() => {
    const savedGigs = JSON.parse(localStorage.getItem('gigs'));
    if (savedGigs) {
      setGigs(savedGigs);
    }
  }, []);

  const handleInstrumentChange = (id, instrument) => {
    const updatedGigs = gigs.map(gig => 
      gig.id === id ? { ...gig, instrument: instrument } : gig
    );
    setGigs(updatedGigs);
    localStorage.setItem('gigs', JSON.stringify(updatedGigs));
  };

  return (
    <div className="page-container">
      <div className="content">
        <h1>Upcoming Gigs</h1>
        {gigs.map(gig => (
          <div key={gig.id} className={`gig-item ${gig.instrument ? '' : 'not-signed-up'}`}>
            <div className="gig-item-header">
              <Link to={`/gigs/${gig.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>{gig.date}</span>
                <span style={{ marginLeft: '10px' }}>{gig.name}</span>
              </Link>
              {gig.instrument && <span>{gig.instrument === 'I Cant Make This Gig' ? '☠️' : gig.instrument}</span>}
            </div>
            <select 
              className="instrument-select"
              value={gig.instrument} 
              onChange={(e) => handleInstrumentChange(gig.id, e.target.value)}
            >
              <option value="">Select an instrument</option>
              {instruments.map((instrument, index) => (
                <option key={index} value={instrument}>{instrument}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
}

export default GigList;