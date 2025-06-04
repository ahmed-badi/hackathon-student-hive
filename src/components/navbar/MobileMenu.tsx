
import { Link } from "react-router-dom";
import { navigationSections } from "./navigationData";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden p-4 bg-gray-50">
      <div className="flex flex-col space-y-3">
        <Link to="/" className="text-gray-600 hover:text-primary transition-colors py-2">
          Accueil
        </Link>
        
        {navigationSections.map((section) => (
          <div key={section.title} className="border-t pt-2">
            <p className="font-medium text-gray-800 mb-2">{section.title}</p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-600 hover:text-primary transition-colors py-1 pl-4 block"
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
        
        <Link to="/register" className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors inline-block w-full text-center mt-4">
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
