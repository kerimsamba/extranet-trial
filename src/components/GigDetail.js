import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const initialGigDetails = {
  1: {
    date: '2024-09-15',
    name: 'Summer Festival',
    time: '14:00',
    venue: 'City Park',
    signedUpMembers: [],
  },
  2: {
    date: '2024-10-31',
    name: 'Halloween Concert',
    time: '19:00',
    venue: 'Town Hall',
    signedUpMembers: [],
  },
  3: {
    date: '2024-12-24',
    name: 'Christmas Eve Show',
    time: '20:00',
    venue: 'Community Center',
    signedUpMembers: [],
  },
};

const instruments = [
  'I Cant Make This Gig', 'Surdo1', 'Surdo2', 'Surdo3', 'Repinique', 
  'Snare', 'Agogo', 'Tamborim', 'Ganza', 'Timba', 'Cuica', 'Horn'
];

function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gigDetails, setGigDetails] = useState(initialGigDetails);
  const [userInstrument, setUserInstrument] = useState('');

  useEffect(() => {
    const savedGigs = JSON.parse(localStorage.getItem('gigs'));
    if (savedGigs) {
      const currentGig = savedGigs.find(gig => gig.id === parseInt(id));
      if (currentGig) {
        setUserInstrument(currentGig.instrument);
        setGigDetails(prevDetails => ({
          ...prevDetails,
          [id]: {
            ...prevDetails[id],
            signedUpMembers: currentGig.instrument ? [{ name: 'User', instrument: currentGig.instrument }] : []
          }
        }));
      }
    }
  }, [id]);

  const handleInstrumentChange = (instrument) => {
    setUserInstrument(instrument);
    const updatedGigs = JSON.parse(localStorage.getItem('gigs'));
    const updatedGig = updatedGigs.find(gig => gig.id === parseInt(id));
    updatedGig.instrument = instrument;
    localStorage.setItem('gigs', JSON.stringify(updatedGigs));

    setGigDetails(prevDetails => ({
      ...prevDetails,
      [id]: {
        ...prevDetails[id],
        signedUpMembers: instrument ? [{ name: 'User', instrument: instrument }] : []
      }
    }));
  };

  const gig = gigDetails[id];

  if (!gig) {
    return (
      <div className="page-container">
        <div className="content">
          <h1>Gig not found</h1>
        </div>
        <button className="back-button" onClick={() => navigate('/gigs')}>Back to Gigs</button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content">
        <h1>{gig.name}</h1>
        <p>Date: {gig.date}</p>
        <p>Time: {gig.time}</p>
        <p>Venue: {gig.venue}</p>
        <p>Your instrument: {userInstrument || 'Not selected'}</p>
        <select 
          className="instrument-select"
          value={userInstrument} 
          onChange={(e) => handleInstrumentChange(e.target.value)}
        >
          <option value="">Select an instrument</option>
          {instruments.map((instrument, index) => (
            <option key={index} value={instrument}>{instrument}</option>
          ))}
        </select>
        <h2>Signed Up Members</h2>
        <ul>
          {gig.signedUpMembers.map((member, index) => (
            <li key={index}>{member.name} - {member.instrument}</li>
          ))}
        </ul>
      </div>
      <button className="back-button" onClick={() => navigate('/gigs')}>Back to Gigs</button>
    </div>
  );
}

export default GigDetail;