
# B2B Strategic Partnership One-Pager for Meitav Trade

## Overview
Create a new page at `/onepager` matching the exact visual style of the existing `/investor` page -- same A4 layout, navy hero, white body, green accents, Montserrat font, print-ready CSS, and private/noindex metadata. Content will be in Hebrew (RTL) with professional English financial terms.

## New File
**`src/pages/OnePager.tsx`** -- A single self-contained page component mirroring InvestorPitch.tsx structure.

### Page Sections

1. **Hero (Navy `#0B192E`)**
   - Badge: `STRATEGIC PARTNERSHIP . CONFIDENTIAL`
   - Title (Hebrew): "שותפות אסטרטגית: Stock4U & מיטב טרייד"
   - Subtitle: "הפיכת השקעות למתנות -- מנוע הצמיחה החדש של מיטב לדור הבא של המשקיעים."
   - CTA button placeholder: "הורד מפרט טכני" (styled green button, no real download)
   - Decorative mascots (reusing existing assets from `/assets/investor/`)

2. **Body Section - "The Opportunity" (2-column grid)**
   - Section label: "השוק משתנה"
   - Left card: Market validation -- mention Excellence & BuyMe move, Stock4U offers financial assets vs. simple consumption
   - Right card: Key differentiators

3. **Omnibus Infrastructure (Highlight box, gray background)**
   - Section label: "תשתית: פתרון ה-Omnibus"
   - 3-step numbered flow:
     1. Trust Pool -- funds into Meitav-hosted Omnibus account
     2. Seamless Onboarding -- digital KYC for recipients
     3. Execution -- automated transfer upon activation

4. **Compliance & Tech (2-column grid)**
   - Column 1: "מסגרת רגולטורית" -- Voucher Model, Active Activation
   - Column 2: "אינטגרציה דיגיטלית" -- API-first onboarding, automated execution

5. **Business Model (3-item row with icons)**
   - Section label: "שותפות מבוססת הצלחה"
   - Three value props: CPA per active account, Revenue Share on trading fees, Quality AUM at Zero CAC

6. **Footer (Navy)**
   - Confidential notice, year, Stock4U Ltd.
   - Decorative mascot

### Design Details
- RTL direction (`dir="rtl"`)
- Same color palette: `#0B192E` navy, `#10B981`/`#34D399` green accents, `#F8FAFC` highlight boxes
- Same inline-style approach for print fidelity
- Same A4 container with print CSS
- Reuses existing mascot images and Lucide icons (Shield, Scale, Cpu, Users, TrendingUp, etc.)
- `noindex, nofollow` meta tag
- Font sizes compact (10-12px body, 17-22px headings) to fit A4

## Route Registration
**`src/App.tsx`** -- Add import and route:
- `import OnePager from "./pages/OnePager";`
- `<Route path="/onepager" element={<OnePager />} />`

## Technical Notes
- No new dependencies needed
- No navigation links added (private page, direct-link access only)
- Sub-components (SectionLabel, DataCard, MoatRow-style) defined inline in the file, same pattern as InvestorPitch.tsx
- Print CSS included for A4 output
