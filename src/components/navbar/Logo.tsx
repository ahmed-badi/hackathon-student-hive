
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src="/logos/hackaZZon-logo.png"
        alt="Logo Hackazzon" 
        className="h-10 w-auto"
      />
      <span className="font-bold text-lg text-blue">HackaZZon</span>
    </Link>
  );
};

export default Logo;
