import "./index.css";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import App from "./App";
import { GlobalLoader } from "./components/ui/GlobalLoader";

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the app to be ready
    const handleLoad = () => {
      // Small delay to ensure all assets are rendered
      setTimeout(() => setIsLoading(false), 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      <GlobalLoader isLoading={isLoading} />
      <App />
    </>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);
