import React, { useState, useEffect } from 'react';
import './Watchlist.css';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch user's watchlist
    fetch('/api/watchlist')
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='watchlist'>
      <h1>Your Watchlist</h1>
      {watchlist.map((airdrop) => (
        <div className='watchlist-item' key={airdrop.id}>
          <h3>{airdrop.name}</h3>
          <p>Potential Score: {airdrop.potentialScore}</p>
          <p>Social Sentiment: {airdrop.socialSentiment}</p>
        </div>
      ))}
    </div>
  );
}

export default Watchlist;
