
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
            <img 
              src="/logos/hackaZZon-logo.png"
              alt="Logo Hackazzon" 
              className="h-10 w-auto"
            />
            <span className="font-bold text-lg text-blue">HackaZZon</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
                    Accueil
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary">
                    Événement
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">À propos</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Découvrez HackaZZon et ses objectifs
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/schedule" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Programme</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Planning détaillé de l'événement
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">FAQ</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Questions fréquemment posées
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary">
                    Participants
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink asChild>
                        <Link to="/presentations" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Présentations</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Découvrez les projets présentés
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/submission" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Soumettre</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Soumettez votre projet
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary">
                    Partenaires
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <NavigationMenuLink asChild>
                        <Link to="/sponsors" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Sponsors</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Nos sponsors et partenaires
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/prizes" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Prix</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Récompenses et prix à gagner
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-primary">
                    Support
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <NavigationMenuLink asChild>
                        <Link to="/mentors" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Mentors</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Rencontrez nos mentors experts
                          </p>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Contact</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Contactez l'équipe organisatrice
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/feedback" className="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
                    Feedback
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            
            <div className="border-t pt-2">
              <p className="font-medium text-gray-800 mb-2">Événement</p>
              <Link to="/about" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">À propos</Link>
              <Link to="/schedule" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Programme</Link>
              <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">FAQ</Link>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium text-gray-800 mb-2">Présentations</p>
              <Link to="/presentations" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Présentations</Link>
              <Link to="/submission" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Soumettre</Link>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium text-gray-800 mb-2">Partenaires</p>
              <Link to="/sponsors" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Sponsors</Link>
              <Link to="/prizes" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Prix</Link>
            </div>
            
            <div className="border-t pt-2">
              <p className="font-medium text-gray-800 mb-2">Support</p>
              <Link to="/mentors" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Mentors</Link>
              <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block">Contact</Link>
            </div>
            
            <div className="border-t pt-2">
              <Link to="/feedback" className="text-gray-600 hover:text-primary transition-colors py-2">Feedback</Link>
            </div>
            
            <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors inline-block w-full text-center mt-4">
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
