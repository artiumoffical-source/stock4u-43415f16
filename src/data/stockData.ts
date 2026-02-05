import type { Stock } from "@/components/stock-selection/CompactStockCard";

// US Stocks
export const usStocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    description: "ענקית הטכנולוגיה, יצרנית האייפון, המק והשעון החכם.",
    logoUrl: "https://logo.clearbit.com/apple.com",
  },
  {
    symbol: "NVDA",
    company: "Nvidia",
    description: "החברה המובילה בעולם לייצור שבבים לבינה מלאכותית וגיימינג.",
    logoUrl: "https://logo.clearbit.com/nvidia.com",
  },
  {
    symbol: "MSFT",
    company: "Microsoft",
    description: "מובילה עולמית בתוכנה, ענן (Azure) ובינה מלאכותית.",
    logoUrl: "https://logo.clearbit.com/microsoft.com",
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    description: "חלוצת הרכב החשמלי והאנרגיה הירוקה בהובלת אילון מאסק.",
    logoUrl: "https://logo.clearbit.com/tesla.com",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet (Google)",
    description: "שולטת בחיפוש, פרסום דיגיטלי, יוטיוב ואנדרואיד.",
    logoUrl: "https://logo.clearbit.com/google.com",
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    description: "ענקית המסחר האלקטרוני ושירותי הענן (AWS).",
    logoUrl: "https://logo.clearbit.com/amazon.com",
  },
  {
    symbol: "META",
    company: "Meta Platforms",
    description: "הבעלים של פייסבוק, אינסטגרם, וואטסאפ ועולמות המטאוורס.",
    logoUrl: "https://logo.clearbit.com/meta.com",
  },
  {
    symbol: "AMD",
    company: "Advanced Micro Devices",
    description: "מייצרת מעבדים וכרטיסי גרפיקה מתקדמים למחשבים ושרתים.",
    logoUrl: "https://logo.clearbit.com/amd.com",
  },
  {
    symbol: "NFLX",
    company: "Netflix",
    description: "חלוצת שירותי הסטרימינג והתוכן המקורי.",
    logoUrl: "https://logo.clearbit.com/netflix.com",
  },
];

// Israel Stocks - Using NASDAQ-listed Israeli companies with valid Yahoo Finance symbols
export const israelStocks: Stock[] = [
  {
    symbol: "TEVA",
    company: "Teva Pharma",
    description: "חברת התרופות הגדולה בישראל ומובילה עולמית בתרופות גנריות.",
    logoUrl: "https://logo.clearbit.com/teva.co.il",
  },
  {
    symbol: "ESLT",
    company: "Elbit Systems",
    description: "ענקית הטכנולוגיה הביטחונית, מל''טים ומערכות לחימה מתקדמות.",
    logoUrl: "https://logo.clearbit.com/elbitsystems.com",
  },
  {
    symbol: "NICE",
    company: "NICE Ltd.",
    description: "חברת תוכנה ישראלית מובילה בפתרונות ענן לניהול חווית לקוח.",
    logoUrl: "https://logo.clearbit.com/nice.com",
  },
  {
    symbol: "CHKP",
    company: "Check Point Software",
    description: "חברת אבטחת מידע ישראלית מובילה עולמית.",
    logoUrl: "https://logo.clearbit.com/checkpoint.com",
  },
  {
    symbol: "WIX",
    company: "Wix.com Ltd.",
    description: "פלטפורמה לבניית אתרי אינטרנט עם מיליוני משתמשים בעולם.",
    logoUrl: "https://logo.clearbit.com/wix.com",
  },
  {
    symbol: "MNDY",
    company: "monday.com",
    description: "פלטפורמת ניהול עבודה ופרויקטים בענן, אחת הצומחות בעולם.",
    logoUrl: "https://logo.clearbit.com/monday.com",
  },
];

// ETFs
export const usETFs: Stock[] = [
  {
    symbol: "SPY",
    company: "SPDR S&P 500 ETF Trust",
    description:
      'תעודת הסל הפופולרית ביותר בעולם העוקבת אחרי מדד S&P 500. כוללת את 500 החברות הגדולות בארה"ב ומציעה חשיפה רחבה לכלכלה האמריקנית.',
    logoUrl: "https://logo.clearbit.com/ssga.com",
  },
  {
    symbol: "QQQ",
    company: "Invesco QQQ Trust (NASDAQ-100)",
    description:
      'תעודת סל העוקבת אחרי מדד נאסד"ק 100, המתמקדת בחברות הטכנולוגיה הגדולות והחדשניות ביותר כמו אפל, מיקרוסופט וגוגל.',
    logoUrl: "https://logo.clearbit.com/invesco.com",
  },
  {
    symbol: "VOO",
    company: "Vanguard S&P 500 ETF",
    description:
      "תעודת סל של ואנגארד העוקבת אחרי מדד S&P 500. מציעה עמלות ניהול נמוכות וחשיפה רחבה לשוק האמריקני.",
    logoUrl: "https://logo.clearbit.com/vanguard.com",
  },
  {
    symbol: "VTI",
    company: "Vanguard Total Stock Market ETF",
    description:
      "תעודת סל המספקת חשיפה לכל שוק המניות האמריקני, כולל חברות גדולות, בינוניות וקטנות.",
    logoUrl: "https://logo.clearbit.com/vanguard.com",
  },
];

// Israel ETFs - Using US-listed Israel-focused ETFs with valid Yahoo Finance symbols
export const israelETFs: Stock[] = [
  {
    symbol: "EIS",
    company: "iShares MSCI Israel ETF",
    description:
      "תעודת סל של iShares העוקבת אחרי מדד MSCI Israel, המספקת חשיפה רחבה לשוק המניות הישראלי.",
    logoUrl: "https://logo.clearbit.com/ishares.com",
  },
  {
    symbol: "ISRA",
    company: "VanEck Israel ETF",
    description:
      "תעודת סל של VanEck המתמקדת בחברות ישראליות. מספקת חשיפה למגוון סקטורים בכלכלה הישראלית.",
    logoUrl: "https://logo.clearbit.com/vaneck.com",
  },
];

// Tech Sector
export const usTechStocks: Stock[] = [
  usStocks.find((s) => s.symbol === "AAPL")!,
  usStocks.find((s) => s.symbol === "NVDA")!,
  usStocks.find((s) => s.symbol === "MSFT")!,
  usStocks.find((s) => s.symbol === "GOOGL")!,
  usStocks.find((s) => s.symbol === "META")!,
  usStocks.find((s) => s.symbol === "AMD")!,
  usStocks.find((s) => s.symbol === "NFLX")!,
];

export const israelTechStocks: Stock[] = [
  israelStocks.find((s) => s.symbol === "NICE")!,
  israelStocks.find((s) => s.symbol === "CHKP")!,
  israelStocks.find((s) => s.symbol === "WIX")!,
  israelStocks.find((s) => s.symbol === "MNDY")!,
];
