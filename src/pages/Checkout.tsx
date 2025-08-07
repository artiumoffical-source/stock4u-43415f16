import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StepHero } from "@/components/StepHero";
import { useGift } from "@/contexts/GiftContext";
import { ChevronDown } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { giftData } = useGift();
  
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    installments: "1"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment-success");
  };

  return (
    <div className="w-full min-h-screen bg-white" dir="rtl">
      <Header />
      <StepHero currentStep={3} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Title */}
        <h2 className="text-stock4u-black text-2xl font-semibold mb-12 text-center">
          תשלום בכרטיס אשראי
        </h2>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Top Row - Card Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card Number */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                מספר כרטיס
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="הכניסו מספר כרטיס"
                  className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg pr-4 pl-20 text-base bg-white"
                  style={{ direction: "ltr" }}
                  required
                />
                {/* Credit Card Icons */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <div className="w-8 h-5 bg-[#EB5013] rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
                    MC
                  </div>
                  <div className="w-8 h-5 bg-[#1A1F71] rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
                    VISA
                  </div>
                  <div className="w-8 h-5 bg-[#0079BE] rounded-sm flex items-center justify-center text-[10px] text-white font-bold">
                    D
                  </div>
                </div>
              </div>
            </div>

            {/* Card Holder Name */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                שם בעל הכרטיס
              </label>
              <input
                type="text"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="הכניסו שם כאן"
                className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white"
                required
              />
            </div>

            {/* Card Validity */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                תוקף זהות מהיר כרטיס
              </label>
              <input
                type="text"
                placeholder="הכניסו מספר תוקף זהות"
                className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white"
              />
            </div>
          </div>

          {/* Bottom Row - Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Number of Installments */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                מספר תשלומים
              </label>
              <div className="relative">
                <select
                  name="installments"
                  value={formData.installments}
                  onChange={handleInputChange}
                  className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* CVV */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                CVV (3 ספרות גגב הכרטיס)
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="XXX"
                maxLength={3}
                className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white text-center"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-stock4u-black text-sm font-medium mb-3">
                תאריך תוקף כרטיס
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Month */}
                <div className="relative">
                  <select
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleInputChange}
                    className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">חודש</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                {/* Year */}
                <div className="relative">
                  <select
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleInputChange}
                    className="w-full h-14 border-2 border-stock4u-light-blue rounded-lg px-4 text-base bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="">YYYY</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-16">
            <p className="text-stock4u-black text-lg font-medium mb-8 text-center">
              אופציות נוספות לתשלום:
            </p>
            <div className="flex gap-6 justify-center">
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-8 py-4 text-base font-medium text-stock4u-black cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span className="text-blue-600 font-bold">bit</span>
                <span>שלמו עם -</span>
              </button>
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-8 py-4 text-base font-medium text-stock4u-black cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span className="text-black font-bold">🍎 Pay</span>
                <span>שלמו עם -</span>
              </button>
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-8 py-4 text-base font-medium text-stock4u-black cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span className="text-blue-600 font-bold">Pay G</span>
                <span>שלמו עם -</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-16">
            <button
              type="submit"
              className="w-80 h-14 bg-stock4u-happy-blue text-white border-none rounded-full text-lg font-semibold cursor-pointer hover:bg-opacity-90 transition-all"
            >
              מעבר לתשלום
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;