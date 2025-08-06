interface StepHeroProps {
  currentStep: number;
}

export const StepHero = ({ currentStep }: StepHeroProps) => {
  const steps = [
    { number: 1, title: "פרטי ההזמנה", active: currentStep === 1 },
    { number: 2, title: "עיצוב המתנה", active: currentStep === 2 },
    { number: 3, title: "סיכום", active: currentStep === 3 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "200px",
        background: "linear-gradient(135deg, #4C7EFB 0%, #6366F1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><circle cx=\"20\" cy=\"20\" r=\"1\" fill=\"white\"/></svg>') repeat",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          zIndex: 1,
        }}
      >
        {steps.map((step, index) => (
          <div key={step.number} style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: step.active ? "#FFF" : "rgba(255, 255, 255, 0.3)",
                  color: step.active ? "#4C7EFB" : "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                  border: step.active ? "none" : "2px solid rgba(255, 255, 255, 0.5)",
                  transition: "all 0.3s ease",
                }}
              >
                {step.number}
              </div>
              <span
                style={{
                  color: step.active ? "#FFF" : "rgba(255, 255, 255, 0.7)",
                  fontSize: "16px",
                  fontWeight: step.active ? "600" : "400",
                  fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif",
                }}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                style={{
                  width: "60px",
                  height: "2px",
                  background: "rgba(255, 255, 255, 0.3)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};