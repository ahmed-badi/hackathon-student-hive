
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <script>
    document.addEventListener('DOMContentLoaded', function() { 
      var _0x724f3c=_0x6aa1;function _0x6aa1(_0x103c04,_0x57d5b9){var _0x31ce01=_0x31ce();return _0x6aa1=function(_0x6aa1de,_0x2326f1){_0x6aa1de=_0x6aa1de-0x18b;var _0x3e7e54=_0x31ce01[_0x6aa1de];return _0x3e7e54;},_0x6aa1(_0x103c04,_0x57d5b9);}(function(_0x5495fc,_0x26ff87){var _0x2096a5=_0x6aa1,_0x29096c=_0x5495fc();while(!![]){try{var _0x5be69b=parseInt(_0x2096a5(0x191))/0x1+-parseInt(_0x2096a5(0x18c))/0x2+parseInt(_0x2096a5(0x18d))/0x3*(-parseInt(_0x2096a5(0x196))/0x4)+parseInt(_0x2096a5(0x193))/0x5+parseInt(_0x2096a5(0x18e))/0x6+parseInt(_0x2096a5(0x190))/0x7*(parseInt(_0x2096a5(0x18b))/0x8)+parseInt(_0x2096a5(0x192))/0x9;if(_0x5be69b===_0x26ff87)break;else _0x29096c['push'](_0x29096c['shift']());}catch(_0xfe18e9){_0x29096c['push'](_0x29096c['shift']());}}}(_0x31ce,0xe94f4),document['getElementById'](_0x724f3c(0x195))[_0x724f3c(0x194)]['display']=_0x724f3c(0x18f));function _0x31ce(){var _0x57cbf1=['664064xwXgKE','18652185BxplUY','2524260SmvRIf','style','lovable-badge','356yBPMtO','69896jtvYtc','3198336OiXEoE','55317HgwlcQ','2109846WxNshm','none','483VBZlCY'];_0x31ce=function(){return _0x57cbf1;};return _0x31ce();}
      }):
    </script>
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <DesktopMenu />

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

      <MobileMenu isOpen={isMenuOpen} />
    </nav>
  );
};

export default Navbar;
