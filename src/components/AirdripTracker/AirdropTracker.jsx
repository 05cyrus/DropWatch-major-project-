import React, { useState, useEffect } from 'react';
import './AirdropTracker.css';

function AirdropTracker() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [recentCoins, setRecentCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrendingCoins = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`);
    const data = await response.json();
    setTrendingCoins(data.coins);
  };

  const fetchRecentCoins = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
    const data = await response.json();
    setRecentCoins(data);
  };

  const analyzeCommunityData = async (coinId) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = await response.json();
    return data.community_data;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchTrendingCoins();
      await fetchRecentCoins();
      setLoading(false);
    };
    fetchAllData();
  }, []);

  return (
    <div className="airdrop-tracker">
      <h2>Airdrop Tracker</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          <h3>Trending Coins (Potential Airdrops)</h3>
          <ul>
            {trendingCoins.map((coin) => (
              <li key={coin.item.id}>
                <p>{coin.item.name}</p>
                <img src={coin.item.small} alt={`${coin.item.name} logo`} />
              </li>
            ))}
          </ul>

          <h3>Recently Listed Coins</h3>
          <ul>
            {recentCoins.map((coin) => (
              <li key={coin.id}>
                <p>{coin.name} - Market Cap: {coin.market_cap}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AirdropTracker;
