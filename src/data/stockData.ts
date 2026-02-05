import type { Stock } from "@/components/stock-selection/CompactStockCard";

// US Stocks - Direct Wikimedia SVG links
export const usStocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    description: "ענקית הטכנולוגיה, יצרנית האייפון, המק והשעון החכם.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    symbol: "MSFT",
    company: "Microsoft",
    description: "מובילה עולמית בתוכנה, ענן (Azure) ובינה מלאכותית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet (Google)",
    description: "שולטת בחיפוש, פרסום דיגיטלי, יוטיוב ואנדרואיד.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
  },
  {
    symbol: "NVDA",
    company: "Nvidia",
    description: "החברה המובילה בעולם לייצור שבבים לבינה מלאכותית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    description: "חלוצת הרכב החשמלי והאנרגיה הירוקה.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    description: "ענקית המסחר האלקטרוני ושירותי הענן.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    symbol: "META",
    company: "Meta",
    description: "פייסבוק, אינסטגרם ווואטסאפ.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    symbol: "NFLX",
    company: "Netflix",
    description: "ענקית הסטרימינג והתוכן המקורי.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    symbol: "AMD",
    company: "AMD",
    description: "מייצרת מעבדים וכרטיסי גרפיקה מתקדמים.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
  },
];

// Israel Stocks - Direct Wikimedia SVG links
export const israelStocks: Stock[] = [
  {
    symbol: "TEVA",
    company: "Teva Pharma",
    description: "חברת התרופות הגדולה בישראל.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Teva_Pharmaceutical_Industries_logo.svg",
  },
  {
    symbol: "ESLT",
    company: "Elbit Systems",
    description: "ענקית הטכנולוגיה הביטחונית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Elbit_Systems_Logo.svg",
  },
  {
    symbol: "NICE",
    company: "NICE Ltd.",
    description: "חברת תוכנה מובילה בפתרונות ענן.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/NICE_Systems_logo.svg",
  },
  {
    symbol: "CHKP",
    company: "Check Point",
    description: "חברת אבטחת מידע מובילה עולמית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Check_Point_logo_2022.svg",
  },
  {
    symbol: "WIX",
    company: "Wix.com",
    description: "פלטפורמה לבניית אתרי אינטרנט.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg",
  },
  {
    symbol: "MNDY",
    company: "monday.com",
    description: "פלטפורמת ניהול עבודה ופרויקטים.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Monday_logo.svg",
  },
];

// ETFs - Using text fallback since ETF providers don't have iconic logos
export const usETFs: Stock[] = [
  {
    symbol: "SPY",
    company: "SPDR S&P 500 ETF",
    description: "תעודת הסל הפופולרית ביותר בעולם העוקבת אחרי מדד S&P 500.",
  },
  {
    symbol: "QQQ",
    company: "Invesco QQQ (NASDAQ-100)",
    description: "תעודת סל העוקבת אחרי מדד נאסד\"ק 100.",
  },
  {
    symbol: "VOO",
    company: "Vanguard S&P 500 ETF",
    description: "תעודת סל של ואנגארד העוקבת אחרי S&P 500.",
  },
  {
    symbol: "VTI",
    company: "Vanguard Total Stock Market",
    description: "תעודת סל המספקת חשיפה לכל שוק המניות האמריקני.",
  },
];

// Israel ETFs
export const israelETFs: Stock[] = [
  {
    symbol: "EIS",
    company: "iShares MSCI Israel ETF",
    description: "תעודת סל העוקבת אחרי מדד MSCI Israel.",
  },
  {
    symbol: "ISRA",
    company: "VanEck Israel ETF",
    description: "תעודת סל המתמקדת בחברות ישראליות.",
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
