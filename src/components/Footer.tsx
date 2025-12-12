import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoIcon} alt="EduNabha" className="h-10 w-10" />
              <span className="text-xl font-bold">EduNabha</span>
            </Link>
            <p className="text-background/70 text-sm">
              Empowering rural students in Nabha with quality digital education, accessible anytime, anywhere.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="font-bold text-lg mb-4">Portals</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Teacher Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-background/70 hover:text-secondary transition-colors text-sm">
                  Parent Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">
                  GL Bajaj Institute, Knowledge Park III, Greater Noida, UP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-background/70 text-sm">+91 7992472668</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-background/70 text-sm">apriyaranjan9@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-background/50 text-sm">
          <p>&copy; 2025 EduNabha. All rights reserved. A project by GL Bajaj Institute.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
