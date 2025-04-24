
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Schedule = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Programme du Hackathon</h1>
        
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            48 heures d'innovation, de collaboration et de créativité. 
            Découvrez le programme détaillé du Student Hive Hackathon 2025.
          </p>
        </div>
        
        {/* Jour 1 */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20 ml-6 md:ml-8"></div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 pl-14 md:pl-20 text-primary">Jour 1 - Vendredi 15 Mai</h2>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {[
                  {
                    time: "14:00",
                    title: "Accueil des participants",
                    description: "Enregistrement, distribution des badges et des kits de bienvenue"
                  },
                  {
                    time: "15:00",
                    title: "Cérémonie d'ouverture",
                    description: "Présentation des sponsors, des mentors et des règles du hackathon"
                  },
                  {
                    time: "16:00",
                    title: "Formation des équipes",
                    description: "Session de networking et formation des équipes pour ceux qui n'en ont pas encore"
                  },
                  {
                    time: "17:00",
                    title: "Début officiel du hackathon",
                    description: "Lancement des 48 heures de code"
                  },
                  {
                    time: "19:00",
                    title: "Dîner",
                    description: "Buffet et networking"
                  },
                  {
                    time: "20:00",
                    title: "Workshops techniques",
                    description: "Sessions parallèles sur différentes technologies"
                  },
                  {
                    time: "22:00",
                    title: "Coding Night",
                    description: "Continuez à coder avec des collations et boissons disponibles"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 w-12 md:w-16 text-right text-sm font-semibold text-gray-600">
                      {item.time}
                    </div>
                    <div className="absolute left-0 w-3 h-3 rounded-full bg-primary mt-1.5 ml-[18px] md:ml-[26px]"></div>
                    <div className="pl-14 md:pl-20">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Jour 2 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 pl-14 md:pl-20 text-primary">Jour 2 - Samedi 16 Mai</h2>
              
              <div className="space-y-8">
                {[
                  {
                    time: "08:00",
                    title: "Petit déjeuner",
                    description: "Café et viennoiseries pour bien commencer la journée"
                  },
                  {
                    time: "09:00",
                    title: "Stand-up Meeting",
                    description: "Point d'avancement rapide pour chaque équipe"
                  },
                  {
                    time: "10:00",
                    title: "Sessions de mentorat",
                    description: "Rencontres individuelles avec les mentors"
                  },
                  {
                    time: "12:30",
                    title: "Déjeuner",
                    description: "Buffet et networking"
                  },
                  {
                    time: "14:00",
                    title: "Workshop Design Thinking",
                    description: "Comment améliorer votre UX/UI"
                  },
                  {
                    time: "16:00",
                    title: "Checkpoint technique",
                    description: "Évaluation technique intermédiaire par les mentors"
                  },
                  {
                    time: "19:00",
                    title: "Dîner",
                    description: "Buffet et networking"
                  },
                  {
                    time: "20:00",
                    title: "Table ronde avec les sponsors",
                    description: "Discussion sur l'innovation et les opportunités de carrière"
                  },
                  {
                    time: "22:00",
                    title: "Coding Night",
                    description: "Continuez à coder avec des collations et boissons disponibles"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 w-12 md:w-16 text-right text-sm font-semibold text-gray-600">
                      {item.time}
                    </div>
                    <div className="absolute left-0 w-3 h-3 rounded-full bg-primary mt-1.5 ml-[18px] md:ml-[26px]"></div>
                    <div className="pl-14 md:pl-20">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Jour 3 */}
            <div>
              <h2 className="text-2xl font-bold mb-6 pl-14 md:pl-20 text-primary">Jour 3 - Dimanche 17 Mai</h2>
              
              <div className="space-y-8">
                {[
                  {
                    time: "08:00",
                    title: "Petit déjeuner",
                    description: "Dernier petit déjeuner ensemble"
                  },
                  {
                    time: "09:00",
                    title: "Préparation des présentations",
                    description: "Finalisez votre projet et préparez votre pitch"
                  },
                  {
                    time: "12:00",
                    title: "Code Freeze",
                    description: "Fin du développement et soumission des projets"
                  },
                  {
                    time: "12:30",
                    title: "Déjeuner",
                    description: "Dernier repas ensemble"
                  },
                  {
                    time: "14:00",
                    title: "Présentations des projets",
                    description: "Chaque équipe présente son projet devant le jury (5 min par équipe)"
                  },
                  {
                    time: "16:30",
                    title: "Délibération du jury",
                    description: "Le jury se retire pour délibérer"
                  },
                  {
                    time: "17:30",
                    title: "Remise des prix",
                    description: "Annonce des gagnants et remise des prix"
                  },
                  {
                    time: "18:30",
                    title: "Cérémonie de clôture",
                    description: "Remerciements et annonce des prochains événements"
                  },
                  {
                    time: "19:00",
                    title: "After-party",
                    description: "Célébration finale avec tous les participants"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 w-12 md:w-16 text-right text-sm font-semibold text-gray-600">
                      {item.time}
                    </div>
                    <div className="absolute left-0 w-3 h-3 rounded-full bg-primary mt-1.5 ml-[18px] md:ml-[26px]"></div>
                    <div className="pl-14 md:pl-20">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-16 bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Informations importantes</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>Les repas et collations sont fournis gratuitement</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>Des espaces de repos sont disponibles pour ceux qui souhaitent faire une pause</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>Wifi haut débit disponible dans tout le bâtiment</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span>Les mentors sont disponibles tout au long de l'événement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Footer */}
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
              <p className="text-sm text-gray-400 max-w-xs">The premier hackathon platform for students to collaborate, innovate, and build amazing projects.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-semibold mb-3">Event</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/about" className="hover:text-white">About</Link></li>
                  <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                  <li><Link to="/schedule" className="hover:text-white">Schedule</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Resources</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/sponsors" className="hover:text-white">Sponsors</Link></li>
                  <li><Link to="/mentors" className="hover:text-white">Mentors</Link></li>
                  <li><Link to="/prizes" className="hover:text-white">Prizes</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-3">Connect</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-500 text-center">
            <p>&copy; {new Date().getFullYear()} Student Hive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Schedule;
