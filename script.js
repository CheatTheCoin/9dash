async function fetchPrices() {
  try {
    const res = await fetch("/api/prices");
    const data = await res.json();

    const keys = ["bitcoin", "paxg", "oil", "sp500"];
    const assets = document.querySelectorAll("#dashboard .asset");

    keys.forEach((key, i) => {
      const priceEl = assets[i].querySelector(".price");
      const changeEl = assets[i].querySelector(".change");
      const item = data[key];

      if (!item || item.price === null) {
        priceEl.textContent = "N/A";
        changeEl.textContent = "";
        return;
      }

      priceEl.textContent = `$${item.price.toLocaleString()}`;
      changeEl.textContent = `${item.change.toFixed(2)}%`;
      changeEl.style.color = item.change >= 0 ? "#4caf50" : "#f44336";
    });
  } catch (err) {
    console.error("Villa við að sækja gögn:", err);
  }
}

fetchPrices();
setInterval(fetchPrices, 300000);
