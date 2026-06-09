# Swiss Gold Market Board — Meister Style + Admin Console

## Co je nové

Tato verze převádí Live Order Board do prémiového katalogového stylu:

- tmavý švýcarský vizuál,
- hero s horským pozadím,
- levý filtrovací sidebar,
- karty trhů podobné produktovým kartám,
- order board, market depth a spreads,
- order ticket jako pravý drawer,
- admin console pro uživatele, objednávky, pricing, audit log a systémové kontroly.

## Soubory

```text
index.html
netlify.toml
netlify/functions/metals-prices.js
ADMIN_SCHEMA.sql
README_DEPLOY.md
```

## Live ceny

Frontend volá:

```text
/.netlify/functions/metals-prices
```

Nastavte v Netlify environment variable:

```text
GOLDAPI_KEY=váš_api_klíč
```

Pokud klíč chybí nebo API selže, systém použije demo fallback.

## Admin Console

V prototypu jsou data uložena v `localStorage`.

Funkce:

- správa uživatelů,
- KYC status,
- objednávky,
- schválení / matching / odmítnutí / zrušení objednávek,
- export objednávek do CSV,
- nastavení spreadů a commission bps,
- audit log,
- systémová kontrola.

## Produkční doplnění

Před ostrým spuštěním doplnit:

1. serverovou autentizaci,
2. role-based access control,
3. databázi,
4. auditní log na serveru,
5. AML/KYC workflow,
6. kontrolu zůstatků,
7. blokaci prostředků/kovu při zadání pokynu,
8. schvalování změn marží,
9. VOP a riziková upozornění,
10. rozhodnutí, zda jde o interní dealing nebo matching klient-klient.


## Dvojjazyčnost CZ/EN

Doplněn přepínač jazyka CZ / EN.

Výchozí jazyk je čeština. Stav se ukládá do:

```text
localStorage.sgmb_lang_v1
```

Přeložené jsou zejména order-board pojmy:

| EN | CZ |
|---|---|
| Market | Trh |
| Currency | Měna |
| Best bid | Nejlepší poptávka |
| Best offer | Nejlepší nabídka |
| Bid quantity | Množství v poptávce |
| Offer quantity | Množství v nabídce |
| Indicative liquidity | Orientační likvidita |
| Market depth | Hloubka trhu |
| Spreads | Spready |
| Order Ticket | Order Ticket / pokynový lístek |

Poznámka: termín „Order Ticket“ jsem ponechal jako obchodní název modulu, ale v textu je vysvětlen jako zadání pokynu.
