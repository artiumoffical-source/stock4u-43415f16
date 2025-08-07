import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PurchaseSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      {/* Main Success Section */}
      <div className="relative min-h-[80vh] bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200 overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Stars */}
          <div className="absolute top-20 left-20 text-yellow-400 text-4xl animate-pulse">✨</div>
          <div className="absolute top-32 right-32 text-yellow-400 text-3xl animate-pulse delay-200">⭐</div>
          <div className="absolute bottom-40 left-40 text-yellow-400 text-5xl animate-pulse delay-700">✨</div>
          <div className="absolute bottom-20 right-20 text-yellow-400 text-3xl animate-pulse delay-500">⭐</div>
          
          {/* Currency symbols */}
          <div className="absolute top-40 left-1/4 text-green-500 text-6xl animate-bounce delay-300">€</div>
          <div className="absolute top-60 right-1/4 text-green-500 text-5xl animate-bounce delay-1000">$</div>
          <div className="absolute bottom-60 left-1/3 text-green-500 text-4xl animate-bounce delay-700">£</div>
          <div className="absolute bottom-32 right-1/3 text-green-500 text-6xl animate-bounce delay-200">€</div>
          <div className="absolute top-80 left-1/6 text-green-500 text-5xl animate-bounce delay-500">¥</div>
          <div className="absolute bottom-80 right-1/6 text-green-500 text-4xl animate-bounce delay-900">$</div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4">
          {/* Shopping Cart Character */}
          <div className="mb-8 relative">
            {/* Cart Body */}
            <div className="relative">
              <div className="w-32 h-24 bg-orange-500 rounded-lg relative shadow-lg">
                {/* Cart Face */}
                <div className="absolute top-4 left-8">
                  {/* Eyes */}
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  {/* Mouth */}
                  <div className="mt-2 w-8 h-4 bg-blue-600 rounded-full"></div>
                </div>
                
                {/* Shopping bags in cart */}
                <div className="absolute -top-2 left-2">
                  <div className="w-6 h-8 bg-yellow-400 rounded-sm transform -rotate-12"></div>
                </div>
                <div className="absolute -top-3 right-2">
                  <div className="w-6 h-8 bg-blue-400 rounded-sm transform rotate-12"></div>
                </div>
              </div>
              
              {/* Cart Handle */}
              <div className="absolute -right-4 top-0 w-6 h-16 border-4 border-blue-600 rounded-r-lg"></div>
              
              {/* Cart Wheels */}
              <div className="absolute -bottom-4 left-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
              <div className="absolute -bottom-4 right-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl">
            <h1 className="text-4xl font-bold text-orange-600 mb-4">
              הרכישה בוצעה
            </h1>
            <h2 className="text-4xl font-bold text-orange-600 mb-6">
              בהצלחה!
            </h2>
            
            <p className="text-xl text-blue-600 mb-8">
              המוצר נישלח אל המייל כבי יד
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">קבלה נישלחה</h3>
              <div className="text-center">
                <input 
                  type="text" 
                  placeholder="קבלה נישלחה - לא צוין"
                  className="w-full max-w-sm bg-white border border-gray-300 rounded-lg px-4 py-2 text-center text-gray-500"
                  disabled
                />
              </div>
            </div>

            {/* Action Button */}
            <Button 
              onClick={() => navigate('/')}
              className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white px-12 py-3 text-xl rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              חזור לעמוד הבית
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PurchaseSuccess;