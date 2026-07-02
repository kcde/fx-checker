import currencyToCountry from 'currency-to-country';

// Currencies where the package's first result isn't the right flag
const PRIORITY = {
  EUR: 'eu', // EU flag — no single home country
  GBP: 'gb', // UK comes 2nd in the package (South Georgia is 1st)
};

export function getFlagCode(currencyCode) {
  if (PRIORITY[currencyCode]) return PRIORITY[currencyCode];
  // the package throws (not returns empty) for codes it doesn't know — e.g. metals
  // (XAU), IMF SDR (XDR), and ~20 other Frankfurter currencies. Swallow and fall
  // back to no flag so a single unknown code can't crash a full currency list.
  let results;
  try {
    results = currencyToCountry(currencyCode);
  } catch {
    return null;
  }
  if (results?.length) {
    const match = results.find((r) => r.countryCode.length === 2);
    if (match) return match.countryCode.toLowerCase();
  }
  return null;
}
