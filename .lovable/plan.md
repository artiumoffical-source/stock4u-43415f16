

## Fix Investor Page Website Link

### Problem
The link to stock4u.co.il at the bottom of the investor page doesn't work. The current URL is `https://www.stock4u.co.il` -- need to change it to `https://stock4u.co.il/`.

### Technical Change

**File: `src/pages/InvestorPitch.tsx` (line 219)**

Change the `href` from `https://www.stock4u.co.il` to `https://stock4u.co.il/`

Before:
```
<a href="https://www.stock4u.co.il" target="_blank" rel="noopener noreferrer" ...>
```

After:
```
<a href="https://stock4u.co.il/" target="_blank" rel="noopener noreferrer" ...>
```

The `target="_blank"` and `rel="noopener noreferrer"` attributes are already in place, so the link will open in a new tab correctly. Note: in the Lovable preview iframe, external links may still be blocked -- the fix should be verified on the published site.

