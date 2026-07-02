import currencyToCountry from 'currency-to-country';

// Currencies where the package's first result isn't the right flag
const PRIORITY = {
  EUR: 'eu', // EU flag — no single home country
  GBP: 'gb', // UK comes 2nd in the package (South Georgia is 1st)
};

export function getFlagCode(currencyCode) {
  if (PRIORITY[currencyCode]) return PRIORITY[currencyCode];
  const results = currencyToCountry(currencyCode);
  if (results?.length) {
    const match = results.find((r) => r.countryCode.length === 2);
    if (match) return match.countryCode.toLowerCase();
  }
  return null;
}
