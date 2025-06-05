
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
            À propos du Hackazzon
          </h1>
          
          {/* Mission Section */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Notre Mission</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Le Hackazzon est conçu pour encourager l'innovation et la créativité chez les étudiants. 
              Pendant 48 heures intenses, vous aurez l'opportunité de transformer vos idées en projets concrets tout 
              en collaborant avec d'autres passionnés de technologie.
            </p>
          </div>
          
          {/* Timeline Section */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Déroulement</h2>
            </div>
            <div className="space-y-8">
              <div className="flex gap-6 group/item">
                <div className="flex-none w-20 h-20 bg-gradient-to-br from-primary/20 to-blue-100 rounded-2xl flex items-center justify-center border-2 border-primary/20 group-hover/item:scale-110 group-hover/item:border-primary/40 transition-all duration-300">
                  <span className="text-primary font-bold text-lg">Jour 1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 text-gray-800">12 juin</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>08h30 - Accueil et enregistrement et formation des équipes</li>
                      <li>09h00 - Présentation du hackathon et des règles</li>
                      <li>11h00 - Début du hackathon</li>
                      <li>11h30 - Développement des projets</li>
                      <li>14h00 - Mentorat</li>
                      <li>21h00 - Avancement des projets et tests</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6 group/item">
                <div className="flex-none w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-purple-200 group-hover/item:scale-110 group-hover/item:border-purple-400 transition-all duration-300">
                  <span className="text-purple-600 font-bold text-lg">Jour 2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 text-gray-800">13 juin</h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>08h00 - Finalisation des projets</li>
                      <li>10h30 - Préparation des présentations</li>
                      <li>15h00 - Présentation finale des projets devant jury</li>
                      <li>17h00 - Délibération et remise des prix</li>
                      <li>17h30 - Clôture</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Prizes Section */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Prix & Récompenses</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group/prize text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover/prize:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">1er Prix</div>
                <div className="font-semibold mb-2 text-gray-700">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
              
              <div className="group/prize text-center p-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full mx-auto mb-4 flex items-center justify-center group-hover/prize:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">2</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent mb-2">2ème Prix</div>
                <div className="font-semibold mb-2 text-gray-700">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
              
              <div className="group/prize text-center p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover/prize:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">3ème Prix</div>
                <div className="font-semibold mb-2 text-gray-700">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Questions Fréquentes</h2>
            </div>
            <div className="space-y-6">
              <div className="group/faq p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover/faq:text-blue-700 transition-colors duration-300">Qui peut participer ?</h3>
                <p className="text-gray-600 leading-relaxed">Tous les étudiants inscrits dans un établissement d'enseignement supérieur sont éligibles.</p>
              </div>
              
              <div className="group/faq p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-md">
                <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover/faq:text-green-700 transition-colors duration-300">De quoi ai-je besoin ?</h3>
                <p className="text-gray-600 leading-relaxed">Un ordinateur portable, votre créativité, et l'envie d'apprendre et de collaborer !</p>
              </div>
              
              <div className="group/faq p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-md">
                <h3 className="font-bold text-lg mb-3 text-gray-800 group-hover/faq:text-purple-700 transition-colors duration-300">Comment former une équipe ?</h3>
                <p className="text-gray-600 leading-relaxed">Idéalement, les équipes sont composées de 4 personnes. Des équipes de 3 sont acceptées dans des cas exceptionnels.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center animate-fade-in">
            <div className="bg-gradient-to-r from-primary/10 via-blue-50 to-purple-50 p-8 rounded-2xl border border-primary/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">Prêt à relever le défi ?</h2>
              <div className="flex justify-center gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-600/90 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    S'inscrire maintenant
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
