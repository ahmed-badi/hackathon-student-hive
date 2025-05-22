
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-md p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M17 6.5a3 3 0 0 0-5.5-1.5 3 3 0 0 0-2.5 5 3 3 0 0 0 5.5 1.5 3 3 0 0 0 2.5-5Z" />
                <path d="M9 17.5a3 3 0 0 0-2.5 5 3 3 0 0 0 5.5-1.5 3 3 0 0 0 2.5-5 3 3 0 0 0-5-2.5Z" />
                <path d="M7.5 6.5a3 3 0 0 0-5 2.5 3 3 0 0 0 5 2.5 3 3 0 0 0 5-2.5 3 3 0 0 0-5-2.5Z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">Student Hive</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">Accueil</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">À propos</Link>
            <Link to="/schedule" className="text-gray-600 hover:text-primary transition-colors">Programme</Link>
            <Link to="/sponsors" className="text-gray-600 hover:text-primary transition-colors">Sponsors</Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
            <Link to="/presentations" className="text-gray-600 hover:text-primary transition-colors">Présentations</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">Contact</Link>
            <Link to="/mentors" className="text-gray-600 hover:text-primary transition-colors">Mentors</Link>
            <Link to="/prizes" className="text-gray-600 hover:text-primary transition-colors">Prix</Link>
          </div>

          {/* Register button (desktop) */}
          <div className="hidden md:block">
            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md transition-colors">
              S'inscrire
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-gray-50">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors py-2">Accueil</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors py-2">À propos</Link>
            <Link to="/schedule" className="text-gray-600 hover:text-primary transition-colors py-2">Programme</Link>
            <Link to="/sponsors" className="text-gray-600 hover:text-primary transition-colors py-2">Sponsors</Link>
            <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors py-2">FAQ</Link>
            <Link to="/presentations" className="text-gray-600 hover:text-primary transition-colors py-2">Présentations</Link>
            <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors py-2">Contact</Link>
            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors inline-block w-full text-center">
            <Link to="/mentors" className="text-gray-600 hover:text-primary transition-colors py-2">Mentors</Link>
            <Link to="/prizes" className="text-gray-600 hover:text-primary transition-colors py-2">Prix</Link>
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
