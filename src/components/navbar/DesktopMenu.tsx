
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import NavigationDropdown from "./NavigationDropdown";
import { navigationSections } from "./navigationData";

const DesktopMenu = () => {
  return (
    <div className="hidden md:flex md:items-center md:space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link to="/feedback" className="px-4 py-2 text-gray-600 hover:text-primary transition-colors">
              Feedback
            </Link>
          </NavigationMenuItem>

          {navigationSections.map((section) => (
            <NavigationDropdown key={section.title} section={section} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopMenu;
