import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoIcon from "@/assets/logo-icon.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoIcon} alt="EduNabha" className="h-10 w-10" />
            <span className="text-xl font-bold text-primary">EduNabha</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/courses" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Courses
            </Link>
            <Link to="/features" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-4">
              <Link to="/courses" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Courses
              </Link>
              <Link to="/features" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Features
              </Link>
              <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                About Us
              </Link>
              <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Contact
              </Link>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
