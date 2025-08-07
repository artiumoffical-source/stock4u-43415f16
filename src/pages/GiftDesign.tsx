import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGift } from "@/contexts/GiftContext";
import { Palette, Type, Upload, Sparkles, Save, ArrowLeft } from "lucide-react";

const GiftDesign = () => {
  const navigate = useNavigate();
  const { giftData, updateGiftData } = useGift();
  
  const [selectedTemplate, setSelectedTemplate] = useState(giftData.selectedCard || "template1");
  const [selectedColor, setSelectedColor] = useState("#C6A96F");
  const [selectedFont, setSelectedFont] = useState("poppins");
  const [customMessage, setCustomMessage] = useState(giftData.greetingMessage || "");
  const [selectedAnimation, setSelectedAnimation] = useState("fade");

  const templates = [
    {
      id: "template1",
      name: "קלאסי",
      preview: "bg-gradient-to-br from-[hsl(var(--stock4u-blue))] to-[hsl(var(--stock4u-blue-light))]"
    },
    {
      id: "template2", 
      name: "זהב מלכותי",
      preview: "bg-gradient-to-br from-[hsl(var(--stock4u-gold))] to-[hsl(var(--stock4u-gold-light))]"
    },
    {
      id: "template3",
      name: "מינימליסטי",
      preview: "bg-gradient-to-br from-gray-100 to-gray-200"
    },
    {
      id: "template4",
      name: "אלגנטי",
      preview: "bg-gradient-to-br from-purple-600 to-pink-500"
    }
  ];

  const colors = [
    "#C6A96F", "#102A43", "#FF6B6B", "#4ECDC4", 
    "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"
  ];

  const fonts = [
    { id: "poppins", name: "Poppins", style: "font-sans" },
    { id: "serif", name: "Serif", style: "font-serif" },
    { id: "mono", name: "Monospace", style: "font-mono" },
    { id: "cursive", name: "כתב יד", style: "font-serif italic" }
  ];

  const animations = [
    { id: "fade", name: "דהייה" },
    { id: "slide", name: "החלקה" },
    { id: "zoom", name: "זום" },
    { id: "bounce", name: "קפיצה" }
  ];

  const handleSave = () => {
    updateGiftData({
      selectedCard: selectedTemplate,
      greetingMessage: customMessage
    });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background hebrew-font" dir="rtl">
      <Header />
      
      {/* Hero Section */}
      <div className="relative w-full h-80 bg-gradient-to-r from-[hsl(var(--stock4u-blue))] to-[hsl(var(--stock4u-blue-light))] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[hsl(var(--stock4u-gold))]">
            עיצוב המתנה
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl leading-relaxed">
            עצב את כרטיס המתנה שלך בצורה אישית ומיוחדת
          </p>
          <div className="mt-6 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="w-16 h-1 bg-white/20"></div>
            <div className="w-8 h-8 rounded-full bg-[hsl(var(--stock4u-gold))] flex items-center justify-center text-[hsl(var(--stock4u-blue))] font-bold">
              2
            </div>
            <div className="w-16 h-1 bg-[hsl(var(--stock4u-gold))] opacity-50"></div>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              3
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Design Controls */}
          <div className="space-y-6">
            
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  בחירת תבנית
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`relative h-24 rounded-lg cursor-pointer border-2 transition-all ${
                        selectedTemplate === template.id 
                          ? "border-[hsl(var(--stock4u-gold))] ring-2 ring-[hsl(var(--stock4u-gold))]/20" 
                          : "border-gray-200 hover:border-[hsl(var(--stock4u-blue))]"
                      }`}
                    >
                      <div className={`w-full h-full rounded-lg ${template.preview}`}></div>
                      <div className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                        {template.name}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  בחירת צבע
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color 
                          ? "border-[hsl(var(--stock4u-blue))] ring-2 ring-[hsl(var(--stock4u-blue))]/20" 
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  בחירת גופן
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-3 text-center border rounded-lg transition-all ${
                        selectedFont === font.id 
                          ? "border-[hsl(var(--stock4u-gold))] bg-[hsl(var(--stock4u-gold))]/10" 
                          : "border-gray-200 hover:border-[hsl(var(--stock4u-blue))]"
                      } ${font.style}`}
                    >
                      {font.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Animation Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  אפקטי אנימציה
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {animations.map((animation) => (
                    <button
                      key={animation.id}
                      onClick={() => setSelectedAnimation(animation.id)}
                      className={`p-3 text-center border rounded-lg transition-all ${
                        selectedAnimation === animation.id 
                          ? "border-[hsl(var(--stock4u-gold))] bg-[hsl(var(--stock4u-gold))]/10" 
                          : "border-gray-200 hover:border-[hsl(var(--stock4u-blue))]"
                      }`}
                    >
                      {animation.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Message */}
            <Card>
              <CardHeader>
                <CardTitle>הודעה אישית</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="כתוב כאן את ההודעה האישית שלך..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="min-h-24 resize-none"
                />
              </CardContent>
            </Card>

            {/* Upload Custom Image */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[hsl(var(--stock4u-gold))]" />
                  העלאת תמונה מותאמת אישית
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">גרור ושחרר תמונה כאן או לחץ לבחירה</p>
                  <input type="file" className="hidden" accept="image/*" />
                  <Button variant="outline" className="mt-2">
                    בחר תמונה
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:sticky lg:top-8">
            <Card>
              <CardHeader>
                <CardTitle>תצוגה מקדימה</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] w-full max-w-md mx-auto">
                  <div 
                    className={`w-full h-full rounded-xl shadow-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden ${
                      templates.find(t => t.id === selectedTemplate)?.preview
                    }`}
                    style={{ borderColor: selectedColor }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className={`text-xl font-bold mb-2 ${fonts.find(f => f.id === selectedFont)?.style}`}>
                        מתנת מניות Stock4U
                      </h3>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      {customMessage && (
                        <p className={`text-sm mb-4 ${fonts.find(f => f.id === selectedFont)?.style}`}>
                          {customMessage}
                        </p>
                      )}
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-xs opacity-90">סכום המתנה</p>
                        <p className="text-lg font-bold">
                          ₪{giftData.selectedStocks.reduce((sum, stock) => sum + stock.amount, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => navigate("/order-details")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            חזור
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              שמור טיוטה
            </Button>
            
            <Button 
              onClick={handleSave}
              className="bg-[hsl(var(--stock4u-gold))] hover:bg-[hsl(var(--stock4u-gold-dark))] text-white px-8"
            >
              המשך לתשלום
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GiftDesign;