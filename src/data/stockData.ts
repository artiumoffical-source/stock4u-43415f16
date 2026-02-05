import type { Stock } from "@/components/stock-selection/CompactStockCard";

// US Stocks
export const usStocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    description: "ענקית הטכנולוגיה, יצרנית האייפון, המק והשעון החכם.",
    logoUrl: "https://unavatar.io/apple.com",
  },
  {
    symbol: "MSFT",
    company: "Microsoft",
    description: "מובילה עולמית בתוכנה, ענן (Azure) ובינה מלאכותית.",
    logoUrl: "https://unavatar.io/microsoft.com",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet (Google)",
    description: "שולטת בחיפוש, פרסום דיגיטלי, יוטיוב ואנדרואיד.",
    logoUrl: "https://unavatar.io/google.com",
  },
  {
    symbol: "NVDA",
    company: "Nvidia",
    description: "החברה המובילה בעולם לייצור שבבים לבינה מלאכותית.",
    logoUrl: "https://unavatar.io/nvidia.com",
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    description: "חלוצת הרכב החשמלי והאנרגיה הירוקה.",
    logoUrl: "https://unavatar.io/tesla.com",
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    description: "ענקית המסחר האלקטרוני ושירותי הענן.",
    logoUrl: "https://unavatar.io/amazon.com",
  },
  {
    symbol: "META",
    company: "Meta",
    description: "פייסבוק, אינסטגרם ווואטסאפ.",
    logoUrl: "https://unavatar.io/meta.com",
  },
  {
    symbol: "NFLX",
    company: "Netflix",
    description: "ענקית הסטרימינג והתוכן המקורי.",
    logoUrl: "https://unavatar.io/netflix.com",
  },
  {
    symbol: "AMD",
    company: "AMD",
    description: "מייצרת מעבדים וכרטיסי גרפיקה מתקדמים.",
    logoUrl: "https://unavatar.io/amd.com",
  },
];

// Israel Stocks
export const israelStocks: Stock[] = [
  {
    symbol: "TEVA",
    company: "Teva Pharma",
    description: "חברת התרופות הגדולה בישראל.",
    logoUrl: "https://unavatar.io/teva.co.il",
  },
  {
    symbol: "ESLT",
    company: "Elbit Systems",
    description: "ענקית הטכנולוגיה הביטחונית.",
    logoUrl: "https://unavatar.io/elbitsystems.com",
  },
  {
    symbol: "NICE",
    company: "NICE Ltd.",
    description: "חברת תוכנה מובילה בפתרונות ענן.",
    logoUrl: "https://unavatar.io/nice.com",
  },
  {
    symbol: "CHKP",
    company: "Check Point",
    description: "חברת אבטחת מידע מובילה עולמית.",
    logoUrl: "https://unavatar.io/checkpoint.com",
  },
  {
    symbol: "WIX",
    company: "Wix.com",
    description: "פלטפורמה לבניית אתרי אינטרנט.",
    logoUrl: "https://unavatar.io/wix.com",
  },
  {
    symbol: "MNDY",
    company: "monday.com",
    description: "פלטפורמת ניהול עבודה ופרויקטים.",
    logoUrl: "https://unavatar.io/monday.com",
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
