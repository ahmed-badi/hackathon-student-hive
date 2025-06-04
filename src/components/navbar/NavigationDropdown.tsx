
import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavigationSection } from "./navigationData";

interface NavigationDropdownProps {
  section: NavigationSection;
}

const NavigationDropdown = ({ section }: NavigationDropdownProps) => {
  const contentWidth = section.items.length > 2 ? "w-[400px]" : "w-[300px]";

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-gray-600 hover:text-primary">
        {section.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent className="!mt-0">
        <div className={`grid gap-3 p-4 ${contentWidth} bg-white border shadow-lg rounded-md`}>
          {section.items.map((item) => (
            <NavigationMenuLink key={item.href} asChild>
              <Link
                to={item.href}
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="text-sm font-medium leading-none">{item.title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavigationDropdown;
