import React, { useState, useEffect } from 'react';
import './AirdropTracker.css';

function AirdropTracker() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [recentCoins, setRecentCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    txn_count: '',
    avg_gas_fee: '',
    tokens_held: '',
    wallet_age_days: '',
    positive_sentiment_ratio: '',
    activity_score: ''
  });
  const checkEligibility = ({
    txn_count,
    avg_gas_fee,
    tokens_held,
    wallet_age_days,
    positive_sentiment_ratio,
    activity_score
  }) => {
    // Define your logic
    const score =
      txn_count * 0.1 +
      avg_gas_fee * 0.05 +
      tokens_held * 0.2 +
      wallet_age_days * 0.1 +
      positive_sentiment_ratio * 0.25 +
      activity_score * 0.3;
  
    const threshold = 50; // you can tweak this based on what "eligible" means
  
    return {
      eligible: score >= threshold,
      confidence: `${Math.min(100, Math.round(score))}%`
    };
  };
  const [result, setResult] = useState(null);
  const [checkingEligibility, setCheckingEligibility] = useState(false);

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

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchTrendingCoins();
      await fetchRecentCoins();
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckingEligibility(true);
    setResult(null);
  
    try {
      const numericData = {
        txn_count: Number(formData.txn_count),
        avg_gas_fee: Number(formData.avg_gas_fee),
        tokens_held: Number(formData.tokens_held),
        wallet_age_days: Number(formData.wallet_age_days),
        positive_sentiment_ratio: Number(formData.positive_sentiment_ratio),
        activity_score: Number(formData.activity_score)
      };
  
      const eligibilityResult = checkEligibility(numericData);
      setResult(eligibilityResult);
    } catch (error) {
      console.error('Eligibility check error:', error);
    } finally {
      setCheckingEligibility(false);
    }
  };

  return (
    <div className="airdrop-tracker">
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

      <div className="airdrop-eligibility">
        <h2>Check Airdrop Eligibility</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <label>{key.replace(/_/g, ' ')}</label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                step="any"
                required
              />
            </div>
          ))}
          <button type="submit" disabled={checkingEligibility}>
            {checkingEligibility ? 'Checking...' : 'Check Eligibility'}
          </button>
        </form>

        {result && (
          <div className="result">
            <h3>Prediction Result:</h3>
            <p>Airdrop Potential: {result.eligible ? '✅ Eligible' : '❌ Not Eligible'}</p>
            <p>Confidence: {result.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AirdropTracker;