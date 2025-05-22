
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
              <h2 className="text-2xl font-bold mb-6 pl-14 md:pl-20 text-primary">Jour 1 - 12 juin</h2>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {[
                  {
                    time: "08:30",
                    title: "Accueil et enregistrement",
                    description: "Accueil et enregistrement et formation des équipes"
                  },
                  {
                    time: "09:00",
                    title: "Présentation du hackathon",
                    description: "Présentation du hackathon et des règles"
                  },
                  {
                    time: "11:00",
                    title: "Début du hackathon",
                    description: "Début du hackathon"
                  },
                  {
                    time: "11:30",
                    title: "Développement des projets",
                    description: "Développement des projets"
                  },
                  {
                    time: "14:00",
                    title: "Mentorat",
                    description: "Sessions de mentorat individuel"
                  },
                  {
                    time: "21:00",
                    title: "Avancement des projets",
                    description: "Avancement des projets et tests"
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
            <div>
              <h2 className="text-2xl font-bold mb-6 pl-14 md:pl-20 text-primary">Jour 2 - 13 juin</h2>
              
              <div className="space-y-8">
                {[
                  {
                    time: "08:00",
                    title: "Finalisation des projets",
                    description: "Dernières touches aux projets"
                  },
                  {
                    time: "10:30",
                    title: "Préparation des présentations",
                    description: "Préparation des présentations finales"
                  },
                  {
                    time: "15:00",
                    title: "Présentation finale",
                    description: "Présentation finale des projets devant jury"
                  },
                  {
                    time: "17:00",
                    title: "Délibération et remise des prix",
                    description: "Délibération du jury et remise des prix"
                  },
                  {
                    time: "17:30",
                    title: "Clôture",
                    description: "Clôture du hackathon"
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
              <p className="text-sm text-gray-400 max-w-xs">Hackathon organisé dans le cadre d'un projet de management de l'ISIMA. Une occasion unique d'innovation et de collaboration entre étudiants.</p>
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
