export default function MobileHowItWorks() {
  const steps = [
    {
      number: "1",
      title: "מוסיפים מניות לעגלת הקניות",
      subtitle: "ניתן גם לבחור חבילות מוכנות או ליצור משלכם",
    },
    {
      number: "2",
      title: "כותבים ברכה משקעת",
      subtitle: "אל תדאגו, נעזור לכם אם צריך",
    },
    {
      number: "3",
      title: "שולחים למי שאוהבים",
      subtitle: "המתנה תגיע ישירות למייל או לנייד",
    },
  ];

  // Curved arrow SVG pointing downward
  const CurvedArrow = () => (
    <svg
      width="40"
      height="50"
      viewBox="0 0 40 50"
      fill="none"
      className="text-[hsl(var(--stock4u-yellow))]"
    >
      <path
        d="M20 0 C20 20, 35 25, 35 35 C35 45, 20 50, 20 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15 44 L20 50 L25 44"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );

  return (
    <section className="py-10 px-4 bg-white">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-8 hebrew-font">
        רגע! איך זה עובד?
      </h2>

      {/* Steps - Vertical Stack with Curved Arrows */}
      <div className="flex flex-col items-center gap-2 max-w-sm mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="w-full flex flex-col items-center">
            {/* Step Card */}
            <div className="relative w-full bg-[hsl(var(--stock4u-light-blue))]/30 rounded-2xl p-5 text-center">
              {/* Number Badge - Positioned at top center */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-[hsl(var(--stock4u-yellow))] rounded-full flex items-center justify-center shadow-md z-10">
                <span className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-[hsl(var(--stock4u-happy-blue))] mb-1 hebrew-font">
                  {step.title}
                </h3>
                <p className="text-sm text-[hsl(var(--stock4u-grey))] hebrew-font leading-relaxed">
                  {step.subtitle}
                </p>
              </div>
            </div>

            {/* Curved Arrow (between cards) */}
            {index < steps.length - 1 && (
              <div className="my-1">
                <CurvedArrow />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
