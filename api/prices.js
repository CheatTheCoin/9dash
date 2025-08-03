import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const cg = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,pax-gold&vs_currencies=usd&include_24hr_change=true");
    const cgData = await cg.json();

    const finnhubKey = process.env.FINNHUB_API_KEY;

    const oil = await fetch(`https://finnhub.io/api/v1/quote?symbol=OANDA:BCO_USD&token=${finnhubKey}`);
    const oilData = await oil.json();

    const sp = await fetch(`https://finnhub.io/api/v1/quote?symbol=^GSPC&token=${finnhubKey}`);
    const spData = await sp.json();

    res.status(200).json({
      bitcoin: {
        price: cgData.bitcoin.usd,
        change: cgData.bitcoin.usd_24h_change,
      },
      paxg: {
        price: cgData["pax-gold"].usd,
        change: cgData["pax-gold"].usd_24h_change,
      },
      oil: {
        price: oilData.c || null,
        change: oilData.dp || 0,
      },
      sp500: {
        price: spData.c || null,
        change: spData.dp || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Villa við að sækja gögn", details: err.message });
  }
}
