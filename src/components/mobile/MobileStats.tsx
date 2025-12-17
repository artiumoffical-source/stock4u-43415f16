export default function MobileStats() {
  const stats = [
    { value: "24+", label: "מדינות שבהם אנו עובדים" },
    { value: "17M", label: "אנשים שהאמינו בנו" },
    { value: "+95%", label: "לקוחות מרוצים" },
  ];

  return (
    <section className="py-8 px-4">
      <div className="flex flex-col gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[hsl(var(--stock4u-light-blue))]/40 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl font-bold text-[hsl(var(--stock4u-dark-grey))] mb-2 english-font">
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
