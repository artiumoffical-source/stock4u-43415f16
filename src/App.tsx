import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GiftProvider } from "./contexts/GiftContext";
import { CartProvider } from "./contexts/CartContext";

import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import StockSelection from "./pages/StockSelection";
import Cart from "./pages/Cart";
import OrderDetails from "./pages/OrderDetails";
import OrderSummary from "./pages/OrderSummary";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseError from "./pages/PurchaseError";
import About from "./pages/About";


import GiftRegistration from "./pages/GiftRegistration";
import RedeemGift from "./pages/RedeemGift";
import NotFound from "./pages/NotFound";
import InvestorPitch from "./pages/InvestorPitch";
import OnePager from "./pages/OnePager";
import Landing from "./pages/Landing";
import ClaimStockGift from "./pages/ClaimStockGift";
import GiftCelebration from "./pages/GiftCelebration";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
          <CartProvider>
            <GiftProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/stock-selection" element={<StockSelection />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-details" element={<OrderDetails />} />
                <Route path="/order-summary" element={<OrderSummary />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/purchase-success" element={<PurchaseSuccess />} />
                <Route path="/purchase-error" element={<PurchaseError />} />
                <Route path="/about" element={<About />} />
                
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gift-registration" element={<GiftRegistration />} />
                <Route path="/redeem" element={<RedeemGift />} />
                <Route path="/investor" element={<InvestorPitch />} />
                <Route path="/onepager" element={<OnePager />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/claim" element={<ClaimStockGift />} />
                <Route path="/gift-celebration" element={<GiftCelebration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </GiftProvider>
          </CartProvider>
        
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
