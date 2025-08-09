import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GiftProvider } from "./contexts/GiftContext";
import { AdminAuthProvider } from "./hooks/useAdminAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SMSVerification from "./pages/SMSVerification";
import StockSelection from "./pages/StockSelection";
import Cart from "./pages/Cart";
import GiftDesign from "./pages/GiftDesign";
import OrderDetails from "./pages/OrderDetails";
import OrderSummary from "./pages/OrderSummary";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseError from "./pages/PurchaseError";
import About from "./pages/About";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <GiftProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sms-verification" element={<SMSVerification />} />
              <Route path="/stock-selection" element={<StockSelection />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/gift-design" element={<GiftDesign />} />
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/order-summary" element={<OrderSummary />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/purchase-success" element={<PurchaseSuccess />} />
              <Route path="/purchase-error" element={<PurchaseError />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/admin-portal-s4u" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </GiftProvider>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
