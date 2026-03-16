

## Step 3: Live Portfolio Dashboard

### 1. Create Edge Function `get-user-portfolio`

**File**: `supabase/functions/get-user-portfolio/index.ts`

- CORS headers (same pattern as other functions)
- Authenticate user via Authorization header → extract JWT → get user ID
- Query `profiles` table for `alpaca_account_id` where `user_id` matches
- If no profile or no `alpaca_account_id` → return `{ status: "pending" }`
- Call Alpaca Broker API (sandbox):
  - `GET /v1/trading/accounts/{id}/account` → equity, cash, buying_power
  - `GET /v1/trading/accounts/{id}/positions` → holdings array
- Fetch USD→ILS rate from `open.er-api.com` (fallback 3.10)
- Return structured JSON:
  ```json
  {
    "status": "active",
    "account": { "total_equity": 150.00, "cash": 50.00, "equity_ils": 465.00 },
    "positions": [
      { "symbol": "AAPL", "qty": "0.5", "market_value": "100.00", "unrealized_pl": "5.00", "current_price": "200.00", "cost_basis": "95.00" }
    ],
    "exchange_rate": 3.10
  }
  ```

**Config**: Add `[functions.get-user-portfolio] verify_jwt = false` to `supabase/config.toml`

### 2. Rewrite `src/pages/Dashboard.tsx`

Replace the placeholder with a state machine:

- **Loading**: Spinner while fetching
- **Pending** (`status: "pending"`): Friendly card — "חשבון ההשקעות שלך בהכנה. המתנה שלך תופיע כאן בקרוב." with a clock emoji
- **Active** (`status: "active"`): Full dashboard:
  - **Summary row** (3 cards): Total Value (USD + ILS), Cash Available, Daily P&L
  - **P&L color coding**: Green text + green background tint for profit, red for loss
  - **Holdings list**: Each position as a card with:
    - Logo from `stockData.ts` match (import `usStocks` + `israelStocks`, find by symbol)
    - Company name (Hebrew from stockData or fallback to symbol)
    - Quantity, market value, unrealized P&L (color-coded)
  - **Refresh button** at top
  - **Sign out** button at bottom

### 3. Logo Matching

Import all stock arrays from `stockData.ts`. Build a lookup map `symbol → { company, logoUrl }`. For positions not in our data, show the symbol text with a generic icon fallback.

### Files to Change

| Action | File |
|--------|------|
| Create | `supabase/functions/get-user-portfolio/index.ts` |
| Edit | `supabase/config.toml` — add function entry |
| Rewrite | `src/pages/Dashboard.tsx` |

