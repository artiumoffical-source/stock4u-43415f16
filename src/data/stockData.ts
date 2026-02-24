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

// Israel Stocks - TASE Top 35 by Market Cap
export const israelStocks: Stock[] = [
  { symbol: "LUMI.TA", company: "בנק לאומי", description: "אחד הבנקים הגדולים בישראל עם פעילות בינלאומית.", logoUrl: "https://logo.clearbit.com/leumi.co.il", category: "בנקאות 🏦" },
  { symbol: "POLI.TA", company: "בנק הפועלים", description: "הבנק הגדול בישראל עם מגוון שירותים פיננסיים.", logoUrl: "https://logo.clearbit.com/bankhapoalim.co.il", category: "בנקאות 🏦" },
  { symbol: "NICE.TA", company: "נייס", description: "חברת תוכנה מובילה בפתרונות ענן ובינה מלאכותית.", logoUrl: "https://logo.clearbit.com/nice.com", category: "טכנולוגיה 💻" },
  { symbol: "TEVA.TA", company: "טבע", description: "חברת התרופות הגדולה בישראל ומהגדולות בעולם.", logoUrl: "https://logo.clearbit.com/tevapharm.com", category: "רפואה 💊" },
  { symbol: "DSCT.TA", company: "בנק דיסקונט", description: "בנק מוביל בישראל עם שירותים לפרטיים ועסקיים.", logoUrl: "https://logo.clearbit.com/discountbank.co.il", category: "בנקאות 🏦" },
  { symbol: "MZTF.TA", company: "מזרחי טפחות", description: "בנק מוביל בתחום המשכנתאות והבנקאות הקמעונאית.", logoUrl: "https://logo.clearbit.com/mizrahi-tefahot.co.il", category: "בנקאות 🏦" },
  { symbol: "ESLT.TA", company: "אלביט מערכות", description: "ענקית הטכנולוגיה הביטחונית הישראלית.", logoUrl: "https://logo.clearbit.com/elbitsystems.com", category: "ביטחון 🛡️" },
  { symbol: "ICL.TA", company: "איי.סי.אל (ICL)", description: "חברה גלובלית לכימיקלים מיוחדים ודשנים.", logoUrl: "https://logo.clearbit.com/icl-group.com", category: "תעשייה ⚙️" },
  { symbol: "NVMI.TA", company: "נובה", description: "חברת מכשור למדידה ובקרה בתעשיית השבבים.", logoUrl: "https://logo.clearbit.com/novami.com", category: "טכנולוגיה 💻" },
  { symbol: "TSEM.TA", company: "טאואר", description: "יצרנית שבבים מובילה עם מפעלים בארץ ובעולם.", logoUrl: "https://logo.clearbit.com/towersemi.com", category: "שבבים 🧠" },
  { symbol: "AZRG.TA", company: "קבוצת עזריאלי", description: "קבוצת נדל\"ן מובילה בישראל – קניונים, משרדים ומגורים.", logoUrl: "https://logo.clearbit.com/azrieligroup.com", category: "נדל\"ן 🏗️" },
  { symbol: "BEZQ.TA", company: "בזק", description: "חברת התקשורת הגדולה בישראל.", logoUrl: "https://logo.clearbit.com/bezeq.co.il", category: "תקשורת 📡" },
  { symbol: "FIBI.TA", company: "הבינלאומי", description: "הבנק הבינלאומי הראשון לישראל.", logoUrl: "https://logo.clearbit.com/fibi.co.il", category: "בנקאות 🏦" },
  { symbol: "PHOE.TA", company: "הפניקס", description: "קבוצת ביטוח ופיננסים מהמובילות בישראל.", logoUrl: "https://logo.clearbit.com/fnx.co.il", category: "ביטוח 🛡️" },
  { symbol: "HARL.TA", company: "הראל השקעות", description: "קבוצת ביטוח, פיננסים והשקעות מובילה.", logoUrl: "https://logo.clearbit.com/harel-group.co.il", category: "ביטוח 🛡️" },
  { symbol: "MLSR.TA", company: "מליסרון", description: "חברת נדל\"ן מניב מובילה – קניונים ומרכזי מסחר.", logoUrl: "https://logo.clearbit.com/melisron.co.il", category: "נדל\"ן 🏗️" },
  { symbol: "STRS.TA", company: "שטראוס גרופ", description: "קבוצת מזון ומשקאות מובילה בישראל.", logoUrl: "https://logo.clearbit.com/strauss-group.co.il", category: "מזון 🍽️" },
  { symbol: "SPEN.TA", company: "שפיר הנדסה", description: "חברת תשתיות, בנייה והנדסה מובילה.", logoUrl: "https://logo.clearbit.com/shapir.co.il", category: "תשתיות 🏗️" },
  { symbol: "ENRG.TA", company: "אנרג'יקס", description: "חברת אנרגיה מתחדשת – רוח, סולארי ואגירה.", logoUrl: "https://logo.clearbit.com/energix-group.com", category: "אנרגיה ⚡" },
  { symbol: "DLEKG.TA", company: "קבוצת דלק", description: "קבוצת אנרגיה ותשתיות עם פעילות בינלאומית.", logoUrl: "https://logo.clearbit.com/delek-group.com", category: "אנרגיה ⚡" },
  { symbol: "AMOT.TA", company: "אמות", description: "חברת נדל\"ן מניב – משרדים, מסחר ולוגיסטיקה.", logoUrl: "https://logo.clearbit.com/amot.co.il", category: "נדל\"ן 🏗️" },
  { symbol: "ARPT.TA", company: "איירפורט סיטי", description: "חברת נדל\"ן מניב סמוך לנתב\"ג.", logoUrl: "https://logo.clearbit.com/airport-city.co.il", category: "נדל\"ן 🏗️" },
  { symbol: "SAE.TA", company: "שופרסל", description: "רשת הסופרמרקטים הגדולה בישראל.", logoUrl: "https://logo.clearbit.com/shufersal.co.il", category: "קמעונאות 🛒" },
  { symbol: "BIG.TA", company: "ביג", description: "חברת נדל\"ן מסחרי – מרכזי קניות ופאוור סנטרס.", logoUrl: "https://logo.clearbit.com/bigcenters.co.il", category: "נדל\"ן 🏗️" },
  { symbol: "FTAL.TA", company: "פתאל החזקות", description: "רשת מלונות בינלאומית מובילה.", logoUrl: "https://logo.clearbit.com/fattal.co.il", category: "תיירות 🏨" },
  { symbol: "PZOL.TA", company: "פז נפט", description: "חברת אנרגיה, דלק ושירותי תחנות.", logoUrl: "https://logo.clearbit.com/paz.co.il", category: "אנרגיה ⚡" },
  { symbol: "SKBN.TA", company: "שיכון ובינוי", description: "קבוצת בנייה, תשתיות ונדל\"ן מובילה.", logoUrl: "https://logo.clearbit.com/shikunbinui.com", category: "תשתיות 🏗️" },
  { symbol: "MTRX.TA", company: "מטריקס", description: "חברת IT ושירותי טכנולוגיה מובילה בישראל.", logoUrl: "https://logo.clearbit.com/matrix.co.il", category: "טכנולוגיה 💻" },
  { symbol: "ELTR.TA", company: "אלקטרה", description: "קבוצת תשתיות, מיזוג אוויר ומעליות.", logoUrl: "https://logo.clearbit.com/electra.co.il", category: "תשתיות 🏗️" },
  { symbol: "MTRN.TA", company: "מיטרוניקס", description: "יצרנית רובוטים לניקוי בריכות – מובילה עולמית.", logoUrl: "https://logo.clearbit.com/maytronics.com", category: "טכנולוגיה 💻" },
  { symbol: "SPNS.TA", company: "סאפיינס", description: "חברת תוכנה לתעשיית הביטוח והפיננסים.", logoUrl: "https://logo.clearbit.com/sapiens.com", category: "טכנולוגיה 💻" },
  { symbol: "CAMT.TA", company: "קמטק", description: "חברת מכשור אופטי לתעשיית השבבים.", logoUrl: "https://logo.clearbit.com/camtek.com", category: "טכנולוגיה 💻" },
  { symbol: "MMHD.TA", company: "מנורה מבטחים", description: "קבוצת ביטוח ופנסיה מהגדולות בישראל.", logoUrl: "https://logo.clearbit.com/menoramivt.co.il", category: "ביטוח 🛡️" },
  { symbol: "KEN.TA", company: "קנון הולדינגס", description: "חברת החזקות בינלאומית בתחומי אנרגיה וספנות.", logoUrl: "https://logo.clearbit.com/kenon-holdings.com", category: "אנרגיה ⚡" },
  { symbol: "HLAN.TA", company: "חילן", description: "חברת טכנולוגיה – שכר, משאבי אנוש ומחשוב.", logoUrl: "https://logo.clearbit.com/hilan.co.il", category: "טכנולוגיה 💻" },
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

// Israel ETFs - TASE local ETFs
export const israelETFs: Stock[] = [
  { symbol: "KSM.TA35", company: 'קסם ת"א 35', description: 'תעודת סל העוקבת אחרי מדד ת"א 35.', category: "מדדים 📈" },
  { symbol: "TCH.TA125", company: 'תכלית ת"א 125', description: 'תעודת סל העוקבת אחרי מדד ת"א 125.', category: "מדדים 📈" },
  { symbol: "HRL.BANKS", company: 'הראל סל ת"א בנקים', description: 'תעודת סל העוקבת אחרי מדד הבנקים.', category: "סקטור 🏦" },
  { symbol: "MGD.NDLN", company: 'מגדל סל ת"א נדל"ן', description: 'תעודת סל העוקבת אחרי מדד הנדל"ן.', category: "סקטור 🏗️" },
  { symbol: "TCH.DIV", company: "תכלית תל-דיב", description: "תעודת סל העוקבת אחרי מדד תל-דיב – מניות דיבידנד.", category: "מדדים 📈" },
  { symbol: "KSM.TECH", company: 'קסם ת"א טכנולוגיה', description: "תעודת סל העוקבת אחרי מדד הטכנולוגיה.", category: "סקטור 💻" },
  { symbol: "HRL.GOV", company: 'הראל אג"ח ממשלתי', description: 'תעודת סל העוקבת אחרי אג"ח ממשלתי.', category: "אג\"ח 📊" },
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
  israelStocks.find((s) => s.symbol === "NICE.TA")!,
  israelStocks.find((s) => s.symbol === "NVMI.TA")!,
  israelStocks.find((s) => s.symbol === "TSEM.TA")!,
  israelStocks.find((s) => s.symbol === "SPNS.TA")!,
  israelStocks.find((s) => s.symbol === "CAMT.TA")!,
  israelStocks.find((s) => s.symbol === "MTRX.TA")!,
  israelStocks.find((s) => s.symbol === "HLAN.TA")!,
  israelStocks.find((s) => s.symbol === "MTRN.TA")!,
];
