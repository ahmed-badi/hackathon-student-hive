
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const Prizes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Prix et Récompenses</h1>
          <p className="text-gray-600 mb-8">
            Les meilleures équipes seront récompensées ! Les prix seront dévoilés lors de l'événement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center">
                    <HelpCircle size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">1er Prix</h3>
                <p className="text-center text-gray-700">
                  Le grand prix sera dévoilé lors de l'événement !
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center">
                    <HelpCircle size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">2ème Prix</h3>
                <p className="text-center text-gray-700">
                  Une surprise pour l'équipe arrivée en seconde position !
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center">
                    <HelpCircle size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">3ème Prix</h3>
                <p className="text-center text-gray-700">
                  Une récompense spéciale pour compléter le podium !
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg italic">
              "Le plus grand prix est l'expérience et les compétences que vous développerez !"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
