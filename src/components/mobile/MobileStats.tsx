export default function MobileStats() {
  const stats = [
    { value: "24+", label: "מדינות שבהם אנו עובדים" },
    { value: "17M", label: "אנשים שהאמינו בנו" },
    { value: "+95%", label: "לקוחות מרוצים" },
  ];

  return (
    <section className="py-10 px-4 bg-white">
      <div className="flex flex-col items-center gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center"
          >
            <div className="text-5xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-1 english-font">
              {stat.value}
            </div>
            <p className="text-[hsl(var(--stock4u-grey))] text-base hebrew-font">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
