

## Plan: Replace Israeli Stocks & ETFs with TASE Top 35

### What Changes

**Single file edit: `src/data/stockData.ts`**

Replace the `israelStocks` array (currently 6 items) with 35 TASE companies, and replace `israelETFs` (currently 2 items) with 7 local ETFs. Also update `israelTechStocks` to reference the tech companies from the new list (NICE, Tower, Nova, Sapiens, Camtek, Matrix, Hilan, Maytronics).

### Logo Strategy

Use Clearbit logo API: `https://logo.clearbit.com/{domain}` for each company. The `CompactStockCard` component already has a fallback (shows first letter of symbol) when `logoUrl` fails to load or is missing, so no UI breakage risk.

### Data Mapping

Each entry maps to the existing `Stock` interface:
- `symbol` → the `.TA` ticker (e.g., `"LUMI.TA"`)
- `company` → Hebrew name (e.g., `"בנק לאומי"`)
- `description` → Short Hebrew description of the company
- `logoUrl` → `https://logo.clearbit.com/{domain}`
- `category` → Sector category with emoji (בנקאות 🏦, תעשייה ⚙️, טכנולוגיה 💻, etc.)

### What is NOT touched
- `usStocks`, `usETFs`, `cryptoETFs`, `usTechStocks` arrays — completely untouched
- `CompactStockCard.tsx`, `StockFilterBar.tsx`, `StockSelection.tsx` — no changes needed
- All routing, contexts, and other pages — untouched

### Technical Details

The `israelTechStocks` derived array at the bottom of the file will be updated to reference tech companies from the new `israelStocks` list (NICE, Nova, Tower, Sapiens, Camtek, Matrix, Hilan, Maytronics).

ETFs will not have `logoUrl` set (no iconic logos for index funds), so they'll use the letter fallback — consistent with how US ETFs already work.

