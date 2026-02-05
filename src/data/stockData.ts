import type { Stock } from "@/components/stock-selection/CompactStockCard";

// US Stocks - Direct Wikimedia SVG links
export const usStocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    description: "ענקית הטכנולוגיה, יצרנית האייפון, המק והשעון החכם.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    category: "טכנולוגיה 📱",
  },
  {
    symbol: "MSFT",
    company: "Microsoft",
    description: "מובילה עולמית בתוכנה, ענן (Azure) ובינה מלאכותית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    category: "טכנולוגיה 💻",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    description: "שולטת בחיפוש, פרסום דיגיטלי, יוטיוב ואנדרואיד.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
    category: "טכנולוגיה 🔍",
  },
  {
    symbol: "NVDA",
    company: "Nvidia",
    description: "החברה המובילה בעולם לייצור שבבים לבינה מלאכותית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg",
    category: "שבבים 🧠",
  },
  {
    symbol: "TSLA",
    company: "Tesla",
    description: "חלוצת הרכב החשמלי והאנרגיה הירוקה.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    category: "רכב 🚗",
  },
  {
    symbol: "AMZN",
    company: "Amazon",
    description: "ענקית המסחר האלקטרוני ושירותי הענן.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    category: "מסחר 📦",
  },
  {
    symbol: "META",
    company: "Meta",
    description: "פייסבוק, אינסטגרם ווואטסאפ.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    category: "תקשורת 📡",
  },
  {
    symbol: "NFLX",
    company: "Netflix",
    description: "ענקית הסטרימינג והתוכן המקורי.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    category: "בידור 🎬",
  },
  {
    symbol: "AMD",
    company: "AMD",
    description: "מייצרת מעבדים וכרטיסי גרפיקה מתקדמים.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
    category: "שבבים 🧠",
  },
];

// Israel Stocks - Direct Wikimedia SVG links
export const israelStocks: Stock[] = [
  {
    symbol: "TEVA",
    company: "Teva Pharma",
    description: "חברת התרופות הגדולה בישראל.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Teva_Pharmaceutical_Industries_logo.svg",
    category: "רפואה 💊",
  },
  {
    symbol: "ESLT",
    company: "Elbit Systems",
    description: "ענקית הטכנולוגיה הביטחונית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Elbit_Systems_Logo.svg",
    category: "ביטחון 🛡️",
  },
  {
    symbol: "NICE",
    company: "NICE Ltd.",
    description: "חברת תוכנה מובילה בפתרונות ענן.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/NICE_Systems_logo.svg",
    category: "טכנולוגיה 💻",
  },
  {
    symbol: "CHKP",
    company: "Check Point",
    description: "חברת אבטחת מידע מובילה עולמית.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Check_Point_logo_2022.svg",
    category: "אבטחה 🔒",
  },
  {
    symbol: "WIX",
    company: "Wix.com",
    description: "פלטפורמה לבניית אתרי אינטרנט.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Wix.com_website_logo.svg",
    category: "טכנולוגיה 🌐",
  },
  {
    symbol: "MNDY",
    company: "monday.com",
    description: "פלטפורמת ניהול עבודה ופרויקטים.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/90/Monday_logo.svg",
    category: "טכנולוגיה 📊",
  },
];

// ETFs - Using text fallback since ETF providers don't have iconic logos
export const usETFs: Stock[] = [
  {
    symbol: "SPY",
    company: "SPDR S&P 500 ETF",
    description: "תעודת הסל הפופולרית ביותר בעולם העוקבת אחרי מדד S&P 500.",
    category: "מדדים 📈",
  },
  {
    symbol: "QQQ",
    company: "Invesco QQQ (NASDAQ-100)",
    description: "תעודת סל העוקבת אחרי מדד נאסד\"ק 100.",
    category: "מדדים 📈",
  },
  {
    symbol: "VOO",
    company: "Vanguard S&P 500 ETF",
    description: "תעודת סל של ואנגארד העוקבת אחרי S&P 500.",
    category: "מדדים 📈",
  },
  {
    symbol: "VTI",
    company: "Vanguard Total Stock Market",
    description: "תעודת סל המספקת חשיפה לכל שוק המניות האמריקני.",
    category: "מדדים 📈",
  },
];

// Israel ETFs
export const israelETFs: Stock[] = [
  {
    symbol: "EIS",
    company: "iShares MSCI Israel ETF",
    description: "תעודת סל העוקבת אחרי מדד MSCI Israel.",
    category: "מדדים 📈",
  },
  {
    symbol: "ISRA",
    company: "VanEck Israel ETF",
    description: "תעודת סל המתמקדת בחברות ישראליות.",
    category: "מדדים 📈",
  },
];

// Crypto ETFs
export const cryptoETFs: Stock[] = [
  {
    symbol: "IBIT",
    company: "BlackRock Bitcoin ETF",
    description: "תעודת סל העוקבת אחר מחיר הביטקוין (Bitcoin), המטבע הדיגיטלי הגדול בעולם.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg",
    category: "קריפטו ₿",
  },
  {
    symbol: "ETHE",
    company: "Grayscale Ethereum ETF",
    description: "תעודת סל העוקבת אחר מחיר האתריום (Ethereum), הפלטפורמה המובילה לחוזים חכמים.",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
    category: "קריפטו Ξ",
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
