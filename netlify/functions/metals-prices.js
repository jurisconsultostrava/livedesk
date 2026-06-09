// Netlify Function: metals-prices
// Path in production: /.netlify/functions/metals-prices
//
// Set environment variable:
// GOLDAPI_KEY=your_server_side_api_key
//
// This file is intentionally written as an adapter. If you use another provider,
// keep the output shape unchanged:
// {
//   mode: "live" | "demo",
//   timestamp: "...",
//   prices: { AU: { USD: 4325.10, EUR: ... }, AG: {...}, PT: {...}, PD: {...} }
// }

const DEMO_PRICES = {
  AU: { USD: 4325.10, EUR: 4018.80, CHF: 3775.40, CZK: 98120.00 },
  AG: { USD: 58.20, EUR: 54.15, CHF: 50.82, CZK: 1320.00 },
  PT: { USD: 1680.00, EUR: 1561.00, CHF: 1467.50, CZK: 38120.00 },
  PD: { USD: 1620.00, EUR: 1505.30, CHF: 1412.00, CZK: 36780.00 }
};

const SYMBOLS = ["XAU", "XAG", "XPT", "XPD"];
const METAL_MAP = { XAU: "AU", XAG: "AG", XPT: "PT", XPD: "PD" };
const CURRENCIES = ["USD", "EUR", "CHF", "CZK"];

exports.handler = async function handler() {
  const apiKey = process.env.GOLDAPI_KEY;

  if (!apiKey) {
    return jsonResponse(200, {
      mode: "demo",
      timestamp: new Date().toISOString(),
      warning: "Missing GOLDAPI_KEY environment variable. Returning demo prices.",
      prices: DEMO_PRICES
    });
  }

  try {
    const prices = {};

    for (const symbol of SYMBOLS) {
      const metal = METAL_MAP[symbol];
      prices[metal] = {};

      for (const currency of CURRENCIES) {
        const url = `https://www.goldapi.io/api/${symbol}/${currency}`;
        const response = await fetch(url, {
          headers: {
            "x-access-token": apiKey,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`${symbol}/${currency} failed: HTTP ${response.status}`);
        }

        const data = await response.json();

        // GoldAPI.io usually returns price per troy ounce in "price".
        // If your provider uses another field, normalize it here.
        const value = Number(data.price);

        if (!Number.isFinite(value) || value <= 0) {
          throw new Error(`${symbol}/${currency} returned invalid price`);
        }

        prices[metal][currency] = value;
      }
    }

    return jsonResponse(200, {
      mode: "live",
      timestamp: new Date().toISOString(),
      prices
    });
  } catch (error) {
    return jsonResponse(200, {
      mode: "demo",
      timestamp: new Date().toISOString(),
      warning: error.message,
      prices: DEMO_PRICES
    });
  }
};

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };
}
