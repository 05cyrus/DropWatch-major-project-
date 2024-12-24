import React, { useEffect, useState } from 'react';
import './AirdropList.css';
import { Link } from 'react-router-dom';

function AirdropList() {
  const [airdrops, setAirdrops] = useState([]);

  useEffect(() => {
    // Placeholder API call for airdrops (replace with real data source)
    fetch('/api/airdrops')
      .then((res) => res.json())
      .then((data) => setAirdrops(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='airdrop-list'>
      <h1>Available Airdrops</h1>
      {airdrops.map((airdrop) => (
        <Link to={`/airdrop/${airdrop.id}`} key={airdrop.id}>
          <div className='airdrop-card'>
            <h3>{airdrop.name}</h3>
            <p>Potential Score: {airdrop.potentialScore}</p>
            <p>Social Sentiment: {airdrop.socialSentiment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default AirdropList;
