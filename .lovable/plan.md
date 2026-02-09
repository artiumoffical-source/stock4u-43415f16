

## Make Investor Page Mobile-Responsive

### Problem
The investor page uses a fixed A4 width (`210mm`) with inline styles optimized for print/PDF layout. On mobile screens, the content overflows horizontally and is unreadable.

### Approach
Keep the A4 print layout intact (via `@media print`) but make the page responsive on screen. On mobile, the content will flow naturally and adapt to the screen width.

### Technical Changes

**File: `src/pages/InvestorPitch.tsx`**

1. **Container**: Change fixed `width: 210mm` to `max-width: 210mm` with `width: 100%` so it shrinks on small screens
2. **Hero section**: Reduce padding on mobile, allow mascot text overlap to be handled gracefully
3. **Grid layouts**: Change the two-column grids (Market + Moat, Funding items) to single-column on mobile using responsive styles
4. **Typography**: Slightly increase font sizes on mobile for readability (the 9-10px text is too small on phones)
5. **Padding**: Reduce horizontal padding from `32px` to `16px` on mobile
6. **Dollar mascot in hero**: Hide or shrink on mobile to avoid overlap
7. **Print styles**: Keep existing `@media print` rules unchanged so A4 PDF export still works perfectly

### What stays the same
- All content, colors, branding, and mascots
- Print/PDF layout (A4 dimensions preserved in print media query)
- Desktop appearance (identical to current)
- Page remains hidden from search engines (noindex, robots.txt)

