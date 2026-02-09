
## Fix: Remove Empty Gray Square at Bottom of Investor Page

### Problem
At the bottom of the page, after the footer, there is an empty `<div style={{ position: "relative" }}>` wrapper around the gift mascot image. This div creates a visible gray rectangle that takes up space and breaks the PDF export.

### Solution
Remove the wrapper `<div>` entirely and move the gift mascot's absolute positioning to be relative to the `.a4-page` container instead. This eliminates the empty block while keeping the mascot in place.

### Technical Details

**File:** `src/pages/InvestorPitch.tsx`

- Remove the `<div style={{ position: "relative" }}>` wrapper (lines ~233-247)
- Move the gift mascot `<img>` inside the `.a4-page` container as a direct child with absolute positioning relative to the page
- Add `position: "relative"` to the `.a4-page` container (if not already present) so the mascot anchors correctly
- Position the mascot at `bottom: 8px`, `right: 8px` within the page frame

This ensures zero extra space after the footer, clean PDF export, and the mascot stays in the bottom-right corner.
