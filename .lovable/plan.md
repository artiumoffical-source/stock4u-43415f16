

# Enhanced Print CSS and Print Button for One-Pager

## Changes to `src/pages/OnePager.tsx`

### 1. Enhanced Print CSS (`@media print`)
Update the existing print styles (lines 27-31) to include:
- White background for the outer container
- Black text color as default
- `break-inside: avoid` on all card-like elements (InfoCard, StepCard, MoatRow, ValueCard, and the Omnibus highlight box) to prevent cards from being split across pages
- Hide the print button itself during printing
- Hide decorative mascot images during print for cleaner output
- Preserve colored headings and green accents with `print-color-adjust: exact`

### 2. Print Button
Add a floating print button (using `Printer` icon from lucide-react) positioned fixed at bottom-left of the screen:
- Only visible on screen (hidden via `print:hidden` class)
- Styled as a small circular green button matching the page palette
- Calls `window.print()` on click
- Semi-transparent until hovered for a subtle, non-intrusive look

### 3. Card `break-inside: avoid`
Add a shared CSS class `.print-card` to the inline `<style>` block with `break-inside: avoid` rule, and apply it to all card sub-components (InfoCard, StepCard, MoatRow, ValueCard) and the infrastructure highlight box.

## Technical Details

**File**: `src/pages/OnePager.tsx`

- **Line 2**: Add `Printer` to lucide-react imports
- **Lines 26-32**: Expand the `<style>` block with enhanced print rules:
  - `.print-card { break-inside: avoid; }` 
  - `.print-btn { display: none !important; }`
  - Body/page background white, text black
- **After line 251** (before closing `</div>` of outer container): Add the floating print button
- **Sub-components**: Add `className="print-card"` to the outer `<div>` of InfoCard, StepCard, MoatRow, and ValueCard

