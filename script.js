async function fetchPrices() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?" +
    "ids=bitcoin,pax-gold,crude-oil-brent,sp500-token" +
    "&vs_currencies=usd&include_24hr_change=true";

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      bitcoin: { price: data.bitcoin?.usd, change: data.bitcoin?.usd_24h_change },
      paxg: { price: data["pax-gold"]?.usd, change: data["pax-gold"]?.usd_24h_change },
      oil: { price: data["crude-oil-brent"]?.usd, change: data["crude-oil-brent"]?.usd_24h_change },
      sp500: { price: data["sp500-token"]?.usd, change: data["sp500-token"]?.usd_24h_change },
    };
  } catch (err) {
    console.error("Villa við að sækja gögn:", err);
    return null;
  }
}

function updateElement(container, value) {
  const priceEl = container.querySelector(".price");
  const changeEl = container.querySelector(".change");

  if (!value || value.price == null) {
    priceEl.textContent = "N/A";
    changeEl.textContent = "";
    return;
  }

  priceEl.textContent = `$${value.price.toLocaleString()}`;
  changeEl.textContent = `${value.change.toFixed(2)}%`;
  changeEl.style.color = value.change >= 0 ? "#4caf50" : "#f44336";
}

async function updateDashboard() {
  const data = await fetchPrices();
  if (!data) return;

  const assets = document.querySelectorAll("#dashboard .asset");
  const keys = ["bitcoin", "paxg", "oil", "sp500"];

  keys.forEach((key, i) => updateElement(assets[i], data[key]));
}

updateDashboard();
setInterval(updateDashboard, 300000);
