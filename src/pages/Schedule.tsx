import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, Coffee, Trophy, Lightbulb } from "lucide-react";

const Schedule = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Calendar size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Programme du Hackathon
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              48 heures d'innovation, de collaboration et de créativité. 
              Découvrez le programme détaillé du HackaZZon 2025.
            </p>
          </div>
        </div>
        
        {/* Jour 1 */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-lg"></div>

            <div className="mb-16 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200 p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Jour 1 - 12 juin
                  </h2>
                </div>
                
                {/* Timeline Items */}
                <div className="space-y-6">
                  {[
                    {
                      time: "08:30",
                      title: "Accueil et enregistrement",
                      description: "Accueil et enregistrement et formation des équipes",
                      icon: Users,
                      color: "from-green-500 to-emerald-600"
                    },
                    {
                      time: "09:00",
                      title: "Présentation du hackathon",
                      description: "Présentation du hackathon et des règles",
                      icon: Lightbulb,
                      color: "from-yellow-500 to-orange-600"
                    },
                    {
                      time: "11:00",
                      title: "Début du hackathon",
                      description: "Début du hackathon",
                      icon: Trophy,
                      color: "from-purple-500 to-indigo-600"
                    },
                    {
                      time: "11:30",
                      title: "Développement des projets",
                      description: "Développement des projets",
                      icon: Clock,
                      color: "from-blue-500 to-cyan-600"
                    },
                    {
                      time: "14:00",
                      title: "Mentorat",
                      description: "Sessions de mentorat individuel",
                      icon: Users,
                      color: "from-teal-500 to-green-600"
                    },
                    {
                      time: "21:00",
                      title: "Avancement des projets",
                      description: "Avancement des projets et tests",
                      icon: Clock,
                      color: "from-indigo-500 to-purple-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start group">
                      <div className="absolute left-1 w-12 md:w-16 text-right">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg px-2 py-1">
                          <span className="text-sm font-semibold text-blue-700">{item.time}</span>
                        </div>
                      </div>
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mt-2 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>

                      <div className="pl-14 md:pl-20">
                        <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm p-6 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-105">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                              <item.icon size={16} className="text-white" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Jour 2 */}
            <div className="animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 p-8 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Jour 2 - 13 juin
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {[
                    {
                      time: "08:00",
                      title: "Finalisation des projets",
                      description: "Dernières touches aux projets",
                      icon: Clock,
                      color: "from-rose-500 to-pink-600"
                    },
                    {
                      time: "10:30",
                      title: "Préparation des présentations",
                      description: "Préparation des présentations finales",
                      icon: Lightbulb,
                      color: "from-amber-500 to-yellow-600"
                    },
                    {
                      time: "15:00",
                      title: "Présentation finale",
                      description: "Présentation finale des projets devant jury",
                      icon: Trophy,
                      color: "from-purple-500 to-violet-600"
                    },
                    {
                      time: "17:00",
                      title: "Délibération et remise des prix",
                      description: "Délibération du jury et remise des prix",
                      icon: Trophy,
                      color: "from-gold-500 to-amber-600"
                    },
                    {
                      time: "17:30",
                      title: "Clôture",
                      description: "Clôture du hackathon",
                      icon: Users,
                      color: "from-indigo-500 to-blue-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="relative flex items-start group">
                      <div className="absolute left-1 w-12 md:w-16 text-right">
                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg px-2 py-1">
                          <span className="text-sm font-semibold text-purple-700">{item.time}</span>
                        </div>
                      </div>
                      <div className="absolute left-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mt-2 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>

                      <div className="pl-14 md:pl-20">
                        <div className="bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg group-hover:transform group-hover:scale-105">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                              <item.icon size={16} className="text-white" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-16 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-200 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Coffee size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Informations importantes
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: Coffee,
                  text: "Des espaces de repos sont disponibles pour ceux qui souhaitent faire une pause",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  icon: Clock,
                  text: "Wifi haut débit disponible dans tout le bâtiment",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  icon: Users,
                  text: "Les organisateurs sont disponibles tout au long de l'événement",
                  color: "from-purple-500 to-indigo-600"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/60 rounded-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
                  <div className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <item.icon size={12} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-gray-300 py-12 mt-auto">
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
            <p>&copy; {new Date().getFullYear()} HackaZZon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Schedule;
