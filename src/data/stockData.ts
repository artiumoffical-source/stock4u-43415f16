import type { Stock } from "@/components/stock-selection/CompactStockCard";

// US Stocks
export const usStocks: Stock[] = [
  {
    symbol: "AAPL",
    company: "Apple Inc.",
    description:
      "אפל היא חברת הטכנולוגיה הגדולה והמוכרת בעולם. מייצרת iPhone, iPad, Mac, Apple Watch ושירותים דיגיטליים. החברה מפורסמת בחדשנות ואיכות בנייה.",
    logoUrl: "https://logo.clearbit.com/apple.com",
  },
  {
    symbol: "NVDA",
    company: "NVIDIA Corporation",
    description:
      "NVIDIA מובילה עולמית בתחום עיבוד גרפי ובינה מלאכותית. החברה מייצרת כרטיסי גרפיקה מתקדמים, מעבדי AI וחומרה לרכב אוטונומי.",
    logoUrl: "https://logo.clearbit.com/nvidia.com",
  },
  {
    symbol: "MSFT",
    company: "Microsoft Corporation",
    description:
      "מיקרוסופט היא ענקית תוכנה וטכנולוגיה עם התמחות במחשוב בענן, פרודוקטיביות עסקית ובינה מלאכותית. החברה מפעילה את Azure, Office 365, Windows.",
    logoUrl: "https://logo.clearbit.com/microsoft.com",
  },
  {
    symbol: "TSLA",
    company: "Tesla Inc.",
    description:
      "טסלה היא יצרנית רכבים חשמליים ואנרגיה נקייה מובילה בעולם. החברה מייצרת רכבים חשמליים, סוללות ופתרונות אנרגיה סולארית.",
    logoUrl: "https://logo.clearbit.com/tesla.com",
  },
  {
    symbol: "GOOGL",
    company: "Alphabet Inc. (Google)",
    description:
      "אלפבית היא החברה האם של גוגל, המובילה בתחום החיפוש, פרסום דיגיטלי וטכנולוגיות חדשניות. החברה מפתחת Android, YouTube, Google Cloud.",
    logoUrl: "https://logo.clearbit.com/google.com",
  },
  {
    symbol: "AMZN",
    company: "Amazon.com Inc.",
    description:
      "אמזון היא ענקית המסחר האלקטרוני והענן החישובי בעולם. החברה מפעילה את פלטפורמת הקניות הגדולה ביותר ושירותי AWS.",
    logoUrl: "https://logo.clearbit.com/amazon.com",
  },
  {
    symbol: "META",
    company: "Meta Platforms Inc.",
    description:
      "מטא (פייסבוק לשעבר) היא ענקית הרשתות החברתיות. החברה מפעילה את Facebook, Instagram, WhatsApp ומשקיעה במטאוורס.",
    logoUrl: "https://logo.clearbit.com/meta.com",
  },
  {
    symbol: "AMD",
    company: "Advanced Micro Devices",
    description:
      "AMD מייצרת מעבדים וכרטיסי גרפיקה מתקדמים למחשבים, שרתים וקונסולות משחקים. מתחרה ישירה של Intel ו-NVIDIA.",
    logoUrl: "https://logo.clearbit.com/amd.com",
  },
  {
    symbol: "NFLX",
    company: "Netflix Inc.",
    description:
      "נטפליקס היא פלטפורמת הסטרימינג הגדולה בעולם. החברה מייצרת ומפיצה תכנים מקוריים וסדרות טלוויזיה לעשרות מיליוני מנויים.",
    logoUrl: "https://logo.clearbit.com/netflix.com",
  },
];

// Israel Stocks - Using NASDAQ-listed Israeli companies with valid Yahoo Finance symbols
export const israelStocks: Stock[] = [
  {
    symbol: "TEVA",
    company: "Teva Pharmaceutical",
    description:
      "טבע היא חברת התרופות הגדולה בישראל ואחת המובילות בעולם בתחום התרופות הגנריות. החברה מפתחת ומייצרת תרופות מגוונות.",
    logoUrl: "https://logo.clearbit.com/tevapharm.com",
  },
  {
    symbol: "ESLT",
    company: "Elbit Systems",
    description:
      "אלביט מערכות היא חברת הביטחון הגדולה בישראל. מפתחת מערכות אלקטרוניות צבאיות, מל\"טים, ומערכות תקשורת מתקדמות.",
    logoUrl: "https://logo.clearbit.com/elbitsystems.com",
  },
  {
    symbol: "NICE",
    company: "NICE Ltd.",
    description:
      "נייס היא חברת תוכנה ישראלית המתמחה בפתרונות ענן לניהול חווית לקוח, מניעת הונאות ואנליטיקה עסקית.",
    logoUrl: "https://logo.clearbit.com/nice.com",
  },
  {
    symbol: "CHKP",
    company: "Check Point Software",
    description:
      "צ'ק פוינט היא חברת אבטחת מידע ישראלית מובילה. מפתחת פתרונות אבטחה לרשתות, ענן ומכשירים ניידים.",
    logoUrl: "https://logo.clearbit.com/checkpoint.com",
  },
  {
    symbol: "WIX",
    company: "Wix.com Ltd.",
    description:
      "וויקס היא חברת טכנולוגיה ישראלית המפתחת פלטפורמה לבניית אתרי אינטרנט. משרתת מיליוני משתמשים ועסקים ברחבי העולם.",
    logoUrl: "https://logo.clearbit.com/wix.com",
  },
  {
    symbol: "MNDY",
    company: "monday.com Ltd.",
    description:
      "מאנדיי היא חברת תוכנה ישראלית המפתחת פלטפורמת ניהול עבודה ופרויקטים בענן. אחת החברות הצומחות ביותר בתחום.",
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
