import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const marketstackKey = process.env.MARKETSTACK_KEY;

    // Bitcoin og PAXG frá CoinGecko
    const cgRes = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,pax-gold&vs_currencies=usd&include_24hr_change=true"
    );
    const cgData = await cgRes.json();

    // Brent Oil (núverandi og daginn áður)
    const oilPrevRes = await fetch(
      `https://api.marketstack.com/v1/eod?access_key=${marketstackKey}&symbols=OIL&limit=2`
    );
    const oilPrevData = await oilPrevRes.json();

    // S&P 500 (núverandi og daginn áður)
    const spPrevRes = await fetch(
      `https://api.marketstack.com/v1/eod?access_key=${marketstackKey}&symbols=SPX&limit=2`
    );
    const spPrevData = await spPrevRes.json();

    // Reikna breytingu
    const oilToday = oilPrevData.data?.[0]?.close ?? null;
    const oilYesterday = oilPrevData.data?.[1]?.close ?? null;
    const oilChange =
      oilToday && oilYesterday
        ? ((oilToday - oilYesterday) / oilYesterday) * 100
        : 0;

    const spToday = spPrevData.data?.[0]?.close ?? null;
    const spYesterday = spPrevData.data?.[1]?.close ?? null;
    const spChange =
      spToday && spYesterday
        ? ((spToday - spYesterday) / spYesterday) * 100
        : 0;

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
        price: oilToday,
        change: oilChange,
      },
      sp500: {
        price: spToday,
        change: spChange,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Villa í að sækja gögn" });
  }
}
