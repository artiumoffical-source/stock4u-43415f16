import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
  hideHeader?: boolean;
}

export default function Layout({ children, hideHeader = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white hebrew-font overflow-x-hidden" dir="rtl">
      {!hideHeader && <Header />}
      {children}
    </div>
  );
}
