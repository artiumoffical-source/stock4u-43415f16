import { ReactNode } from "react";
import Header from "./Header";
import MobileHeader from "./mobile/MobileHeader";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export default function Layout({ children, hideHeader = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white hebrew-font" dir="rtl">
      {!hideHeader && (
        <>
          {/* Desktop Header */}
          <div className="hidden md:block">
            <Header />
          </div>
          {/* Mobile Header */}
          <div className="block md:hidden">
            <MobileHeader />
          </div>
        </>
      )}
      {children}
    </div>
  );
}
