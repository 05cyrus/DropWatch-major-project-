import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AirdropDetail.css';

function AirdropDetail() {
  const { airdropId } = useParams();
  const [airdrop, setAirdrop] = useState();

  useEffect(() => {
    // Fetch details for the specific airdrop
    fetch(`/api/airdrop/${airdropId}`)
      .then((res) => res.json())
      .then((data) => setAirdrop(data))
      .catch((err) => console.error(err));
  }, [airdropId]);

  if (!airdrop) {
    return <div>Loading...</div>;
  }

  return (
    <div className='airdrop-detail'>
      <h2>{airdrop.name}</h2>
      <p><b>Details:</b> {airdrop.description}</p>
      <p><b>Token:</b> {airdrop.tokenSymbol}</p>
      <p><b>Potential Score:</b> {airdrop.potentialScore}</p>
      <p><b>Social Sentiment:</b> {airdrop.socialSentiment}</p>
      <button>Add to Watchlist</button>
    </div>
  );
}

export default AirdropDetail;
