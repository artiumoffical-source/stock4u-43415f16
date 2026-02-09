

## Mobile-Responsive Investor Page

### Problem
The investor page uses fixed A4 dimensions and inline styles that don't adapt to mobile screens, causing horizontal overflow and unreadable content.

### Technical Changes in `src/pages/InvestorPitch.tsx`

**1. Main container - responsive width**
- Change `width: "210mm"` to `width: "100%"`, add `maxWidth: "210mm"`
- The print CSS already forces `width: 210mm` so PDF export is unaffected

**2. Padding - reduce on mobile**
- Use CSS classes instead of fixed inline padding where possible
- Hero: `padding: "28px 32px 24px"` --> add responsive class `px-4 sm:px-8`
- Body: `padding: "20px 32px 16px"` --> `px-4 sm:px-8`
- Footer: `padding: "8px 32px"` --> `px-4 sm:px-8`

**3. Two-column grids to single-column on mobile**
- Market + Moat grid: `gridTemplateColumns: "1fr 1fr"` --> use className `grid grid-cols-1 sm:grid-cols-2` instead of inline style
- Funding items grid: same approach, single column on mobile

**4. Dollar mascot in hero**
- Add `hidden sm:block` class so it hides on small screens (prevents text overlap)

**5. Percent mascot on funding section**
- Hide on mobile with `hidden sm:block`

**6. Font sizes**
- Hero title: bump from `22px` to responsive (`18px` mobile, `22px` desktop)
- Ensure body text stays readable (minimum `11px` on mobile)

**7. Hero text max-width**
- Change `maxWidth: "75%"` to `maxWidth: "100%"` on mobile so text uses full width when mascot is hidden

**8. Founder contact links**
- Change from horizontal `flex` row to `flex-wrap` so links wrap on narrow screens

**9. Print styles unchanged**
- All `@media print` rules stay exactly as they are, preserving A4 PDF layout

### What stays the same
- All content, colors, mascots (just repositioned/hidden on small screens)
- Desktop appearance identical to current
- Print/PDF export unchanged
- Page remains noindex/nofollow

