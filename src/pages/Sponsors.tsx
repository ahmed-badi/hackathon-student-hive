import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Award, Building2 } from "lucide-react";

const Sponsors = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Nos Sponsors
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Merci à nos partenaires qui rendent cet événement possible
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {/* Gold Sponsors */}
          <div className="col-span-full animate-fade-in">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Sponsors Or
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Michelin */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-100 hover:border-blue-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 w-48 h-48 rounded-2xl flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-lg border-2 border-gray-100 group-hover:border-blue-200">
                    <img src="/logos/Michelin-Logo.png" alt="Logo Michelin" className="object-contain h-full w-full p-4" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                  Michelin
                </h3>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 group-hover:border-blue-200 transition-all duration-300">
                  <p className="text-gray-700 text-center leading-relaxed">
                    Leader mondial dans la fabrication de pneumatiques, engagé dans la mobilité durable et l'innovation technologique.
                  </p>
                </div>
              </div>

              {/* Red Bull */}
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center border border-gray-100 hover:border-red-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-red-50 w-48 h-48 rounded-2xl flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-500 shadow-lg border-2 border-gray-100 group-hover:border-red-200">
                    <img src="/logos/Red-Bull-Logo.png" alt="Logo Red Bull" className="object-contain h-full w-full p-4" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-red-800 bg-clip-text text-transparent group-hover:from-red-600 group-hover:to-blue-600 transition-all duration-300">
                  RedBull
                </h3>
                
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl border border-red-100 group-hover:border-red-200 transition-all duration-300">
                  <p className="text-gray-700 text-center leading-relaxed">
                    Marque emblématique de boissons énergisantes, Red Bull est également un acteur majeur dans le sport, les médias et les technologies de contenu immersif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm p-8 rounded-2xl border border-blue-200 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Merci à nos sponsors !
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Grâce à leur soutien, nous pouvons organiser cet événement exceptionnel et offrir une expérience unique aux participants.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-slate-900 text-gray-300 py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-primary rounded-md p-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M17 6.5a3 3 0 0 0-5.5-1.5 3 3 0 0 0-2.5 5 3 3 0 0 0 5.5 1.5 3 3 0 0 0 2.5-5Z" />
                    <path d="M9 17.5a3 3 0 0 0-2.5 5 3 3 0 0 0 5.5-1.5 3 3 0 0 0 2.5-5 3 3 0 0 0-5.5 1.5Z" />
                    <path d="M7.5 6.5a3 3 0 0 0-5 2.5 3 3 0 0 0 5 2.5 3 3 0 0 0 5-2.5 3 3 0 0 0-5-2.5Z" />
                  </svg>
                </div>
                <div className="text-lg font-bold text-white">HackaZZon</div>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">La première plateforme de hackathon pour les étudiants, où collaboration, innovation et projets extraordinaires se rencontrent.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Événement</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-white">À propos</Link></li>
                  <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link to="/schedule" className="hover:text-white">Programme</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Ressources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/sponsors" className="hover:text-white">Sponsors</Link></li>
                  <li><Link to="/mentors" className="hover:text-white">Mentors</Link></li>
                  <li><Link to="/prizes" className="hover:text-white">Prix</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/jury" className="hover:text-white">Jury</Link></li>
                  <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link to="/mentors" className="hover:text-white">Mentors</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} HackaZZon. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sponsors;
