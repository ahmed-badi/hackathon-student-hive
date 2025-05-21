
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-primary rounded-md p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M17 6.5a3 3 0 0 0-5.5-1.5 3 3 0 0 0-2.5 5 3 3 0 0 0 5.5 1.5 3 3 0 0 0 2.5-5Z" />
              <path d="M9 17.5a3 3 0 0 0-2.5 5 3 3 0 0 0 5.5-1.5 3 3 0 0 0 2.5-5 3 3 0 0 0-5.5 1.5Z" />
              <path d="M7.5 6.5a3 3 0 0 0-5 2.5 3 3 0 0 0 5 2.5 3 3 0 0 0 5-2.5 3 3 0 0 0-5-2.5Z" />
            </svg>
          </div>
          <div className="text-xl font-bold">Student Hive</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Découvrir</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                    <Link to="/about" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">À propos</div>
                      <div className="text-sm text-muted-foreground">En savoir plus sur le hackathon</div>
                    </Link>
                    <Link to="/faq" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">FAQ</div>
                      <div className="text-sm text-muted-foreground">Questions fréquemment posées</div>
                    </Link>
                    <Link to="/schedule" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Programme</div>
                      <div className="text-sm text-muted-foreground">Planning du hackathon</div>
                    </Link>
                    <Link to="/submission" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Soumettre</div>
                      <div className="text-sm text-muted-foreground">Soumettre votre projet</div>
                    </Link>
                    <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Contact</div>
                      <div className="text-sm text-muted-foreground">Nous contacter</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[300px]">
                    <Link to="/sponsors" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Sponsors</div>
                      <div className="text-sm text-muted-foreground">Nos partenaires</div>
                    </Link>
                    <Link to="/mentors" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Mentors</div>
                      <div className="text-sm text-muted-foreground">Ceux qui vous aideront</div>
                    </Link>
                    <Link to="/jury" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Jury</div>
                      <div className="text-sm text-muted-foreground">Les évaluateurs des projets</div>
                    </Link>
                    <Link to="/prizes" className="block select-none space-y-1 rounded-md p-3 hover:bg-accent hover:text-accent-foreground">
                      <div className="text-sm font-medium">Prix</div>
                      <div className="text-sm text-muted-foreground">Prix à gagner</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link to="/register">
            <Button>S'inscrire</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t animate-in slide-in-from-right">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-500">Découvrir</p>
              <Link to="/about" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                À propos
              </Link>
              <Link to="/faq" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                FAQ
              </Link>
              <Link to="/schedule" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Programme
              </Link>
              <Link to="/submission" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Soumettre
              </Link>
              <Link to="/contact" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Contact
              </Link>
            </div>
            
            <div className="space-y-3 pt-3 border-t">
              <p className="text-sm font-medium text-gray-500">Resources</p>
              <Link to="/sponsors" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Sponsors
              </Link>
              <Link to="/mentors" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Mentors
              </Link>
              <Link to="/jury" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Jury
              </Link>
              <Link to="/prizes" className="block py-2 hover:text-accent" onClick={toggleMenu}>
                Prix
              </Link>
            </div>
            
            <div className="pt-3">
              <Link to="/register" onClick={toggleMenu}>
                <Button className="w-full">S'inscrire</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
