# Swiss Gold Market Board – Live Order Board

Tato verze je interaktivní a připravená na live cenu.

## Co obsahuje

- `index.html` – frontend order boardu
- `netlify/functions/metals-prices.js` – bezpečný backend proxy endpoint pro ceny kovů
- `netlify.toml` – nastavení pro Netlify

## Live ceny

Frontend volá:

```text
/.netlify/functions/metals-prices
```

nebo přes redirect:

```text
/api/metals-prices
```

## Nastavení API klíče

V Netlify nastavte environment variable:

```text
GOLDAPI_KEY=váš_klíč
```

API klíč nikdy nedávejte přímo do HTML/JS ve frontendu.

## Výstup endpointu

Frontend očekává JSON:

```json
{
  "mode": "live",
  "timestamp": "2026-06-09T12:00:00.000Z",
  "prices": {
    "AU": {"USD": 4325.10, "EUR": 4018.80, "CHF": 3775.40, "CZK": 98120.00},
    "AG": {"USD": 58.20, "EUR": 54.15, "CHF": 50.82, "CZK": 1320.00},
    "PT": {"USD": 1680.00, "EUR": 1561.00, "CHF": 1467.50, "CZK": 38120.00},
    "PD": {"USD": 1620.00, "EUR": 1505.30, "CHF": 1412.00, "CZK": 36780.00}
  }
}
```

## Produkční doplnění

Před ostrým spuštěním doplňte:

1. login klienta,
2. klientské peněžní a kovové zůstatky,
3. kontrolu krytí objednávky,
4. AML/KYC limity,
5. auditní stopu,
6. dvoukrokové potvrzení objednávky,
7. databázi pokynů,
8. jasné VOP a rizikové upozornění,
9. backend matching nebo interní dealing režim.
