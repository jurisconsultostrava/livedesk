# Swiss Gold Market Board — Table Meister Style

Tato verze vrací rozložení k původní logice order boardu ve stylu tabulky a kombinuje jej s tmavým prémiovým vizuálem.

## Hlavní změny
- primární výchozí pohled = Order Board (tabulka),
- tmavý Meister Gold styl,
- pozadí použito z URL dodané uživatelem,
- CZ/EN přepínání,
- Admin Console zachována,
- Live price feed přes Netlify Function.

## Soubory
- index.html
- netlify.toml
- netlify/functions/metals-prices.js

## Produkce
Nastavte:
GOLDAPI_KEY=your_key
