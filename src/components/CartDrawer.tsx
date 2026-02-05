import { useNavigate } from "react-router-dom";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, clearCart, cartCount } = useCart();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.amount, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/order-details");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[350px] sm:w-[400px] p-0" dir="rtl">
        <SheetHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-bold text-[#486284]">
              העגלה שלי ({cartCount})
            </SheetTitle>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-6">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-sm">העגלה ריקה</p>
              <p className="text-xs mt-1">הוסף מניות להתחלה</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.symbol}
                  className="bg-gray-50 rounded-xl p-3 flex items-center gap-3"
                >
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    {item.logo ? (
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-contain bg-white p-1"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500">
                          {item.symbol.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#486284]">
                      {item.symbol}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {item.name}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#4F86F9]">
                      ₪{item.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.symbol)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">סה"כ:</span>
              <span className="text-lg font-bold text-[#486284]">
                ₪{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="flex-1 text-gray-500 hover:text-red-500 hover:border-red-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                נקה
              </Button>
              <Button
                onClick={handleCheckout}
                className="flex-1 bg-[#4F86F9] hover:bg-[#3d6fd9] text-white"
              >
                המשך לתשלום
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
