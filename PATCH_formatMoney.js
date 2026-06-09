function formatMoney(value, currency) {
      const locale = currency === "CZK" ? "cs-CZ" : currency === "CHF" ? "de-CH" : currency === "EUR" ? "de-DE" : "en-US";
      const numericValue = Number(value || 0);
      const fractionDigits = Math.abs(numericValue) >= 1000 ? 0 : 2;

      const formatted = new Intl.NumberFormat(locale, {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
      }).format(numericValue);

      if (currency === "USD") return "$" + formatted;
      if (currency === "EUR") return "€" + formatted;
      if (currency === "CHF") return "CHF " + formatted;
      if (currency === "CZK") return formatted + " Kč";
      return formatted + " " + currency;
    }
