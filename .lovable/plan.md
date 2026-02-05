
# Implementation Plan: Pixel-Perfect "How It Works" Component

## Overview
Replace the current HowItWorksSteps component with the exact code structure provided by the user to achieve pixel-perfect matching with the reference design.

## Changes Required

### 1. Update Font Import (src/index.css)
- Add "Titan One" font import alongside or instead of "Fredoka One"
- Both fonts work, but Titan One has a bolder, more "cartoony" appearance

```css
@import url('https://fonts.googleapis.com/css2?family=Titan+One&display=swap');
```

### 2. Rewrite HowItWorksSteps Component (src/components/HowItWorksSteps.tsx)

**Structure Changes:**
- Replace the StepCard component with direct JSX matching the user's template
- Use exact styling values from the provided code
- Keep the floating currency stickers (already working well)

**Key Styling Details:**

| Element | Style |
|---------|-------|
| Numbers | font-family: 'Titan One', font-size: 80px, color: #FFC845, stroke: 7px white |
| Title Text | color: #4F86F9, font-weight: 600, font-size: lg |
| Subtitle Text | color: #9CA3AF, font-size: sm |
| Cards | bg-white, rounded-2xl, shadow-lg, w-[160px] h-[150px] |
| Container | flex-row-reverse, gap-0 |
| Arrows | SVG with cubic bezier curve, color: #4F86F9, positioned between cards |

**Arrow SVGs (from user's code):**
- Arrow 1: Curved down-left path `M 0 0 C 20 15, 40 25, 55 30`
- Arrow 2: Curved up-left path (flipped) `M 0 30 C 20 15, 40 5, 55 0`

**RTL Layout Verification:**
- `flex-row-reverse` ensures DOM order (Step1, Arrow, Step2, Arrow, Step3) renders visually as:
  - [Step 3] <-- [Step 2] <-- [Step 1]
- This matches the reference image exactly

### 3. Component Code Structure

```text
+--------------------------------------------------+
|              זה כלכך פשוט!                        |
|                                                  |
|  [Step 3]  <--Arrow--  [Step 2]  <--Arrow--  [Step 1] |
|                                                  |
|   Currency stickers floating around              |
+--------------------------------------------------+
```

## Files to Modify

| File | Action |
|------|--------|
| src/index.css | Add Titan One font import |
| src/components/HowItWorksSteps.tsx | Complete rewrite with exact code |

## Technical Details

### Number Styling (Critical)
```jsx
style={{
  fontFamily: "'Titan One', cursive",
  fontSize: "80px",
  color: "#FFC845",
  WebkitTextStroke: "7px white",
  paintOrder: "stroke fill",
  filter: "drop-shadow(0px 4px 0px rgba(0,0,0,0.1))"
}}
```

### Arrow Positioning
- Arrows use negative margins (`mx-[-8px]`) to overlap slightly with cards
- Vertical offset (`mt-10` or `mt-12`) to position below the numbers

### Floating Currency Stickers
- Keep the existing PNG imports (shekel, pound, euro, yen, dollar, coin)
- Positioned absolutely around the component
- Responsive sizing with `md:` breakpoints

## Expected Result
After implementation, the component will render identically to the reference image with:
- Step 1 on the far RIGHT
- Step 3 on the far LEFT
- Bold, rounded yellow numbers with thick white strokes
- Blue curved arrows connecting the steps
- Floating currency stickers creating a playful atmosphere
