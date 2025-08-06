import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      <div className="min-h-[80vh] flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">אופס! הדף לא נמצא</p>
          <a href="/" className="text-stock4u-blue hover:text-stock4u-dark-blue underline">
            חזור לעמוד הבית
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
