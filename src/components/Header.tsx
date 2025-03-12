
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-bold tracking-tight">
          Narrate<span className="text-primary">Ninja</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary">Sign Up</Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden md:hidden",
          isMenuOpen ? "max-h-screen py-6" : "max-h-0 py-0"
        )}
      >
        <div className="flex flex-col space-y-4 px-6">
          <a
            href="#features"
            className="font-medium text-foreground/80 hover:text-foreground py-2"
            onClick={toggleMenu}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="font-medium text-foreground/80 hover:text-foreground py-2"
            onClick={toggleMenu}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="font-medium text-foreground/80 hover:text-foreground py-2"
            onClick={toggleMenu}
          >
            Pricing
          </a>
          <Link to="/login" onClick={toggleMenu}>
            <Button variant="secondary" fullWidth className="mt-2">
              Login
            </Button>
          </Link>
          <Link to="/signup" onClick={toggleMenu}>
            <Button variant="primary" fullWidth className="mt-2">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
