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
      <div className="flex flex-col justify-center items-center max-w-[600px] mx-auto px-10 py-15">
        {/* Title */}
        <h2 className="text-stock4u-black text-2xl font-semibold font-['Poppins'] mb-10 text-center">
          תשלום בכרטיס אשראי
        </h2>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-stock4u-black text-sm font-['Poppins'] mb-2 font-medium">
              מספר כרטיס
            </label>
            <div className="relative">
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="הכניסו מספר כרטיס"
                className="w-full h-[50px] border-2 border-stock4u-light-blue rounded-lg pl-[60px] pr-4 text-base font-['Poppins'] text-left"
                style={{ direction: "ltr" }}
                required
              />
              {/* Credit Card Icons */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                <div className="w-6 h-4 bg-[#EB5013] rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
                  MC
                </div>
                <div className="w-6 h-4 bg-[#1A1F71] rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
                  VISA
                </div>
                <div className="w-6 h-4 bg-[#0079BE] rounded-sm flex items-center justify-center text-[8px] text-white font-bold">
                  D
                </div>
              </div>
            </div>
          </div>

          {/* Card Holder Name */}
          <div>
            <label className="block text-stock4u-black text-sm font-['Poppins'] mb-2 font-medium">
              שם בעל הכרטיס
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              placeholder="הכניסו שם בעל הכרטיס"
              className="w-full h-[50px] border-2 border-stock4u-light-blue rounded-lg px-4 text-base font-['Poppins']"
              required
            />
          </div>

          {/* Expiry and CVV */}
          <div>
            <label className="block text-stock4u-black text-sm font-['Poppins'] mb-2 font-medium">
              תוקף זיהוי מהיר הכרטיס
            </label>
            <div className="grid grid-cols-[1fr_120px_120px] gap-3">
              {/* Month Dropdown */}
              <div className="relative">
                <select
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  className="w-full h-[50px] border-2 border-stock4u-light-blue rounded-lg px-4 text-base font-['Poppins'] bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">בחירה</option>
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
                <ChevronDown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* CVV */}
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="XXX"
                maxLength={3}
                className="w-full h-[50px] border-2 border-stock4u-light-blue rounded-lg px-4 text-base font-['Poppins'] text-center"
                required
              />

              {/* Year Dropdown */}
              <div className="relative">
                <select
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  className="w-full h-[50px] border-2 border-stock4u-light-blue rounded-lg px-4 text-base font-['Poppins'] bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="">שנה</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-10">
            <p className="text-stock4u-black text-sm font-['Poppins'] mb-4 font-medium">
              אופציות נוספות לתשלום:
            </p>
            <div className="flex gap-3 justify-center">
              <div className="bg-gray-50 border border-stock4u-light-blue rounded-lg px-5 py-3 text-sm font-['Poppins'] text-stock4u-dark-grey cursor-pointer hover:bg-gray-100 transition-colors">
                💳 Bit - ביט
              </div>
              <div className="bg-gray-50 border border-stock4u-light-blue rounded-lg px-5 py-3 text-sm font-['Poppins'] text-stock4u-dark-grey cursor-pointer hover:bg-gray-100 transition-colors">
                🍎 Apple Pay - אפל פיי
              </div>
              <div className="bg-gray-50 border border-stock4u-light-blue rounded-lg px-5 py-3 text-sm font-['Poppins'] text-stock4u-dark-grey cursor-pointer hover:bg-gray-100 transition-colors">
                🎯 Google Pay - גוגל פיי
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[50px] bg-stock4u-happy-blue text-white border-none rounded-[25px] text-base font-['Poppins'] cursor-pointer font-semibold hover:bg-opacity-90 transition-all"
          >
            מעבר לתשלום
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;