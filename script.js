
async function fetchPrice(coinId, elementId, changeId) {
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true`);
  const data = await res.json();
  const price = data[coinId].usd;
  const change = data[coinId].usd_24h_change;
  document.getElementById(elementId).textContent = `$${price.toFixed(2)}`;
  document.getElementById(changeId).textContent = `${change.toFixed(2)}% 24h`;
  document.getElementById(changeId).style.color = change > 0 ? "lightgreen" : "red";
}

async function fetchATHContext(coinId, athId) {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
  const data = await res.json();
  const ath = data.market_data.ath.usd;
  const price = data.market_data.current_price.usd;
  const ratio = price / ath;
  let context = "";
  if (ratio < 0.5) context = "Far below previous peak – may be undervalued.";
  else if (ratio < 0.75) context = "Below ATH – room to grow.";
  else if (ratio < 0.9) context = "Approaching ATH – caution advised.";
  else context = "Near or at ATH – expect volatility.";
  document.getElementById(athId).textContent = `ATH Status: ${context}`;
}

function updateAll() {
  fetchPrice("bitcoin", "btc-price", "btc-change");
  fetchPrice("ethereum", "eth-price", "eth-change");
  fetchPrice("solana", "sol-price", "sol-change");
  fetchPrice("pax-gold", "gold-price", "gold-change");

  fetchATHContext("bitcoin", "bitcoin-ath-context");
  fetchATHContext("ethereum", "ethereum-ath-context");
  fetchATHContext("solana", "solana-ath-context");
  fetchATHContext("pax-gold", "pax-gold-ath-context");
}

updateAll();
setInterval(updateAll, 60000);
