

## Change Investor Page Route to `/investor`

### What will change
The investor page URL will be simplified from `/investor-deck-private-access` to `/investor`. The page will continue to be hidden from search engines and not linked anywhere on the site.

### Technical Details

**File: `src/App.tsx`**
- Change the route path from `/investor-deck-private-access` to `/investor`

**File: `public/robots.txt`**
- Update the `Disallow` line from `/investor-deck-private-access` to `/investor`

After publishing, the page will be accessible at:
`https://stock4u.lovable.app/investor`

