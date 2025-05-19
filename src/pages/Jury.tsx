
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Jury = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Notre Jury</h1>
        
        <div className="max-w-3xl mx-auto mb-8 text-center">
          <p className="text-lg text-gray-600">
            Notre jury d'experts évaluera vos projets et sélectionnera les meilleurs
            pour les récompenses finales du hackathon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Marie Dupont",
              role: "Directrice de l'Innovation @ BigTech",
              expertise: "IA & Stratégie",
              image: null
            },
            {
              name: "Jean Martin",
              role: "CTO @ StartupInnovante",
              expertise: "Architecture Logicielle",
              image: null
            },
            {
              name: "Sarah Lemoine",
              role: "Responsable R&D @ TechCorp",
              expertise: "Expérience Utilisateur",
              image: null
            },
            {
              name: "Paul Dubois",
              role: "Directeur Technique @ DataFirm",
              expertise: "Machine Learning",
              image: null
            },
            {
              name: "Émilie Rousseau",
              role: "VP Engineering @ CloudCo",
              expertise: "Cloud & DevOps",
              image: null
            },
            {
              name: "Thomas Bernard",
              role: "Investisseur @ VentureCap",
              expertise: "Business Model",
              image: null
            }
          ].map((juror, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-400">{juror.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{juror.name}</h3>
              <p className="text-gray-600 mb-2">{juror.role}</p>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {juror.expertise}
              </span>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Critères d'Évaluation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Innovation</h3>
              <p className="text-gray-600">Originalité de la solution et approche innovante</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Impact</h3>
              <p className="text-gray-600">Potentiel d'impact positif sur l'industrie ou la société</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Faisabilité</h3>
              <p className="text-gray-600">Viabilité technique et potentiel de mise en œuvre</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Design</h3>
              <p className="text-gray-600">Expérience utilisateur et qualité de l'interface</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Présentation</h3>
              <p className="text-gray-600">Clarté et efficacité de la présentation du projet</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2 text-primary">Travail d'Équipe</h3>
              <p className="text-gray-600">Collaboration et complémentarité des compétences</p>
            </div>
          </div>
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
                <div className="text-lg font-bold text-white">Student Hive</div>
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
                  <li><Link to="/jury" className="hover:text-white">Jury</Link></li>
                  <li><Link to="/prizes" className="hover:text-white">Prix</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Connexion</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} Student Hive. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Jury;
