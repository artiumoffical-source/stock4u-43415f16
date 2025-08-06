import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-stock4u-blue to-stock4u-dark-blue bg-clip-text text-transparent">
              Stock4U
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-stock4u-blue transition-colors">
              בית
            </Link>
            <Link to="/about" className="text-foreground hover:text-stock4u-blue transition-colors">
              אודות
            </Link>
            <Link to="/careers" className="text-foreground hover:text-stock4u-blue transition-colors">
              קריירה
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-stock4u-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-stock4u-blue text-stock4u-blue hover:bg-stock4u-blue hover:text-white">
                התחברות
              </Button>
            </Link>
            <Link to="/stock-selection">
              <Button className="bg-stock4u-blue hover:bg-stock4u-dark-blue text-white">
                מתנת מניות
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              <Link
                to="/"
                className="block text-foreground hover:text-stock4u-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                בית
              </Link>
              <Link
                to="/about"
                className="block text-foreground hover:text-stock4u-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                אודות
              </Link>
              <Link
                to="/careers"
                className="block text-foreground hover:text-stock4u-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                קריירה
              </Link>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-stock4u-blue text-stock4u-blue hover:bg-stock4u-blue hover:text-white">
                    התחברות
                  </Button>
                </Link>
                <Link to="/stock-selection" className="flex-1">
                  <Button className="w-full bg-stock4u-blue hover:bg-stock4u-dark-blue text-white">
                    מתנת מניות
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;