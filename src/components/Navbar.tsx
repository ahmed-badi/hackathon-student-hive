
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
        {/* Remplacement du SVG par votre logo */}
        <img 
          src="/logos/hackaZZon-logo.png" // Chemin d'accès à votre logo dans le dossier public/
          alt="Logo Hackazzon" 
          className="h-10 w-auto" // Ajustez la hauteur selon besoin
        />
        <span className="font-bold text-lg text-blue">HackaZZon</span> {/* Changement de couleur du texte en blanc */}
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
            <Link to="/submission" className="text-gray-600 hover:text-primary transition-colors">Soumettre</Link>
            <Link to="/feedback" className="text-gray-600 hover:text-primary transition-colors">Feedback</Link>
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
            <Link to="/mentors" className="text-gray-600 hover:text-primary transition-colors py-2">Mentors</Link>
            <Link to="/prizes" className="text-gray-600 hover:text-primary transition-colors py-2">Prix</Link>
            <Link to="/submission" className="text-gray-600 hover:text-primary transition-colors py-2">Soumettre</Link>
            <Link to="/feedback" className="text-gray-600 hover:text-primary transition-colors py-2">Feedback</Link>
            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors inline-block w-full text-center">
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
