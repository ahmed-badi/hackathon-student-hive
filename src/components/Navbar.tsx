
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-sm text-gray-600 hover:text-accent hidden md:block">
            À propos
          </Link>
          <Link to="/faq" className="text-sm text-gray-600 hover:text-accent hidden md:block">
            FAQ
          </Link>
          <Link to="/submission" className="text-sm text-gray-600 hover:text-accent hidden md:block">
            Soumettre
          </Link>
          <Link to="/register">
            <Button>S'inscrire</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
