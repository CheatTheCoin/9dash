async function fetchPrices() {
  try {
    const res = await fetch("/api/prices");
    const data = await res.json();

    const assets = ["bitcoin", "paxg", "oil", "sp500"];
    const dashboard = document.querySelectorAll("#dashboard .asset");

    assets.forEach((key, i) => {
      const priceEl = dashboard[i].querySelector(".price");
      const changeEl = dashboard[i].querySelector(".change");

      if (!data[key] || data[key].price === null) {
        priceEl.textContent = "N/A";
        changeEl.textContent = "";
        return;
      }

      priceEl.textContent = `$${data[key].price.toLocaleString()}`;
      changeEl.textContent = `${data[key].change.toFixed(2)}%`;
      changeEl.style.color = data[key].change >= 0 ? "#4caf50" : "#f44336";
    });
  } catch (err) {
    console.error("Villa að sækja gögn:", err);
  }
}

fetchPrices();
setInterval(fetchPrices, 300000);
