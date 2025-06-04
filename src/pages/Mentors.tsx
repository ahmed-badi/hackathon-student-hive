
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Mentors = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Nos Mentors</h1>
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-lg text-gray-600">
            Nos mentors, issus de Michelin, vous accompagneront tout au long du hackathon 
            pour vous aider à réaliser votre projet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Ahmed BADI",
              role: "Data Scientist @ Michelin",
              expertise: "Machine Learning",
              image: null
            },
            {
              name: "Ayoub BAHEND",
              role: "DevOps Engineer @ Michelin",
              expertise: "Développement",
              image: null
            },
            {
              name: "Aymane AMALLAH",
              role: "Security Analyste @ Michelin",
              expertise: "Sécurité",
              image: null
            },
            {
              name: "Hiba BARY",
              role: "Data Engineer @ Michelin",
              expertise: "Analyse de Données",
              image: null
            }
          ].map((mentor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-400">{mentor.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
              <p className="text-gray-600 mb-2">{mentor.role}</p>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {mentor.expertise}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
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

export default Mentors;
