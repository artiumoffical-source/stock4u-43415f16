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
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Title */}
        <h1 className="text-stock4u-black text-3xl font-bold mb-16 text-center">
          תשלום בכרטיס אשראי
        </h1>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Card Number */}
              <div>
                <label className="block text-stock4u-black text-lg font-medium mb-4">
                  מספר כרטיס
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg pr-6 pl-24 text-lg bg-white"
                    style={{ direction: "ltr" }}
                    required
                  />
                  {/* Credit Card Icons */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <div className="w-10 h-6 bg-[#EB5013] rounded flex items-center justify-center text-[10px] text-white font-bold">
                      MC
                    </div>
                    <div className="w-10 h-6 bg-[#1A1F71] rounded flex items-center justify-center text-[10px] text-white font-bold">
                      VISA
                    </div>
                    <div className="w-10 h-6 bg-[#0079BE] rounded flex items-center justify-center text-[10px] text-white font-bold">
                      D
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Holder Name */}
              <div>
                <label className="block text-stock4u-black text-lg font-medium mb-4">
                  שם בעל הכרטיס
                </label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="הכניסו שם כאן"
                  className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg px-6 text-lg bg-white"
                  required
                />
              </div>

              {/* Number of Installments */}
              <div>
                <label className="block text-stock4u-black text-lg font-medium mb-4">
                  מספר תשלומים
                </label>
                <div className="relative">
                  <select
                    name="installments"
                    value={formData.installments}
                    onChange={handleInputChange}
                    className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg px-6 text-lg bg-white appearance-none cursor-pointer"
                    required
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="12">12</option>
                  </select>
                  <ChevronDown className="absolute left-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* CVV */}
              <div>
                <label className="block text-stock4u-black text-lg font-medium mb-4">
                  CVV (3 ספרות בגב הכרטיס)
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="XXX"
                  maxLength={3}
                  className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg px-6 text-lg bg-white text-center"
                  required
                />
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-stock4u-black text-lg font-medium mb-4">
                  תאריך תוקף כרטיס
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {/* Month */}
                  <div className="relative">
                    <select
                      name="expiryMonth"
                      value={formData.expiryMonth}
                      onChange={handleInputChange}
                      className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg px-6 text-lg bg-white appearance-none cursor-pointer"
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
                    <ChevronDown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                  {/* Year */}
                  <div className="relative">
                    <select
                      name="expiryYear"
                      value={formData.expiryYear}
                      onChange={handleInputChange}
                      className="w-full h-16 border-2 border-stock4u-light-blue rounded-lg px-6 text-lg bg-white appearance-none cursor-pointer"
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
                    <ChevronDown className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-16">
            <h3 className="text-stock4u-black text-xl font-medium mb-8 text-center">
              אופציות נוספות לתשלום:
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-6 py-3 text-lg font-medium text-stock4u-black hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>שלמו עם -</span>
                <span className="text-blue-600 font-bold text-xl">bit</span>
              </button>
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-6 py-3 text-lg font-medium text-stock4u-black hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>שלמו עם -</span>
                <span className="text-black font-bold text-xl">🍎 Pay</span>
              </button>
              <button
                type="button"
                className="bg-white border-2 border-stock4u-light-blue rounded-lg px-6 py-3 text-lg font-medium text-stock4u-black hover:bg-gray-50 transition-colors flex items-center gap-3"
              >
                <span>שלמו עם -</span>
                <span className="text-blue-600 font-bold text-xl">G Pay</span>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-96 h-16 bg-stock4u-happy-blue text-white rounded-full text-xl font-bold hover:bg-opacity-90 transition-all"
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