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
    <section className="py-8 px-4 bg-white">
      {/* Title */}
      <h2 className="text-2xl font-bold text-[hsl(var(--stock4u-dark-grey))] text-center mb-8 hebrew-font">
        רגע! איך זה עובד?
      </h2>

      {/* Steps */}
      <div className="flex flex-col gap-6 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connector Arrow (between cards) */}
            {index < steps.length - 1 && (
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[hsl(var(--stock4u-yellow))]">
                  <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}

            {/* Card */}
            <div className="relative bg-white rounded-3xl shadow-lg p-6 pt-10 border-2 border-gray-100">
              {/* Number Badge */}
              <div className="absolute -top-5 right-6 w-12 h-12 bg-[hsl(var(--stock4u-yellow))] rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold text-[hsl(var(--stock4u-dark-grey))] english-font">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-[hsl(var(--stock4u-happy-blue))] mb-2 hebrew-font">
                {step.title}
              </h3>
              <p className="text-sm text-[hsl(var(--stock4u-grey))] hebrew-font">
                {step.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
