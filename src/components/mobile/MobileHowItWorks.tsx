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

  return (
    <section className="py-8 px-4 bg-[hsl(var(--stock4u-light-blue))]/20">
      {/* Title */}
      <h2 className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-6 hebrew-font">
        רגע! איך זה עובד?
      </h2>

      {/* Steps - Vertical Stack */}
      <div className="flex flex-col gap-8 relative max-w-sm mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Card */}
            <div className="relative bg-white rounded-2xl shadow-lg p-5 pt-8 border border-gray-100">
              {/* Number Badge */}
              <div className="absolute -top-4 right-4 w-10 h-10 bg-[hsl(var(--stock4u-yellow))] rounded-full flex items-center justify-center shadow-md">
                <span className="text-xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-bold text-[hsl(var(--stock4u-happy-blue))] mb-1 hebrew-font">
                {step.title}
              </h3>
              <p className="text-sm text-[hsl(var(--stock4u-grey))] hebrew-font leading-relaxed">
                {step.subtitle}
              </p>
            </div>

            {/* Connector Arrow (between cards) */}
            {index < steps.length - 1 && (
              <div className="flex justify-center mt-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--stock4u-yellow))]">
                  <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
