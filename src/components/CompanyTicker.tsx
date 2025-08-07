import React from 'react';

const CompanyTicker = () => {
  const companies = [
    "GOOG", "AMZN", "NASDAQ", "AAPL", "AAN", 
    "NVDA", "MSFT", "META", "SONY", "CRM"
  ];

  return (
    <div style={{
      padding: "40px 0",
      background: "#F9FAFC",
      overflow: "hidden"
    }}>
      <h3 style={{
        fontSize: "20px",
        color: "#486284",
        textAlign: "center",
        margin: "0 0 40px",
        fontFamily: "Poppins, -apple-system, Roboto, Helvetica, sans-serif"
      }}>
        חברות פופולאריות להשקעה
      </h3>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "44px",
        opacity: "0.6",
        animation: "scroll 30s linear infinite",
        whiteSpace: "nowrap"
      }}>
        {companies.map((symbol, index) => (
          <div key={`${symbol}-${index}`} style={{
            fontSize: "52px",
            fontWeight: "700",
            color: "#486284",
            fontFamily: "'Hanken Grotesk', -apple-system, Roboto, Helvetica, sans-serif"
          }}>
            {symbol}
          </div>
        ))}
        {/* Duplicate for seamless loop */}
        {companies.map((symbol, index) => (
          <div key={`${symbol}-duplicate-${index}`} style={{
            fontSize: "52px",
            fontWeight: "700",
            color: "#486284",
            fontFamily: "'Hanken Grotesk', -apple-system, Roboto, Helvetica, sans-serif"
          }}>
            {symbol}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default CompanyTicker;