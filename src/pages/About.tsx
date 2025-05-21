
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">À propos du Hackazzon</h1>
          
          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
            <p className="text-gray-600 mb-6">
              Le Hackazzon est conçu pour encourager l'innovation et la créativité chez les étudiants. 
              Pendant 48 heures intenses, vous aurez l'opportunité de transformer vos idées en projets concrets tout 
              en collaborant avec d'autres passionnés de technologie.
            </p>
          </div>
          
          {/* Timeline Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Déroulement</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-none w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">Jour 1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">12 juin</h3>
                  <p className="text-gray-600">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>08h30 - Accueil et enregistrement et formation des équipes</li>
                      <li>09h00 - Présentation du hackathon et des règles</li>
                      <li>11h00 - Début du hackathon, brainstorming</li>
                      <li>11h30 - Développement des projets</li>
                      <li>14h00 - Mentorat</li>
                      <li>21h00 - Avancement des projets et tests</li>
                    </ul>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-none w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">Jour 2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">13 juin</h3>
                  <p className="text-gray-600">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>08h00 - Finalisation des projets</li>
                      <li>10h30 - Préparation des présentations</li>
                      <li>15h00 - Présentation finale des projets devant jury</li>
                      <li>17h00 - Délibération et remise des prix</li>
                      <li>17h30 - Clôture</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Prizes Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Prix & Récompenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-b from-[#FFD700]/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-[#FFD700] mb-2">1er Prix</div>
                <div className="font-semibold mb-2">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-b from-[#C0C0C0]/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-[#C0C0C0] mb-2">2ème Prix</div>
                <div className="font-semibold mb-2">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-b from-[#CD7F32]/10 to-transparent rounded-lg">
                <div className="text-2xl font-bold text-[#CD7F32] mb-2">3ème Prix</div>
                <div className="font-semibold mb-2">?????</div>
                <p className="text-gray-600">Surprise</p>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Questions Fréquentes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Qui peut participer ?</h3>
                <p className="text-gray-600">Tous les étudiants inscrits dans un établissement d'enseignement supérieur sont éligibles.</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">De quoi ai-je besoin ?</h3>
                <p className="text-gray-600">Un ordinateur portable, votre créativité, et l'envie d'apprendre et de collaborer !</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Comment former une équipe ?</h3>
                <p className="text-gray-600">Idéalement, les équipes sont composées de 4 personnes. Des équipes de 3 sont acceptées dans des cas exceptionnels.</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Prêt à relever le défi ?</h2>
            <div className="flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  S'inscrire maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
