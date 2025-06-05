
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Trophy, Award, Medal } from "lucide-react";

const Prizes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-yellow-50 to-orange-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent animate-fade-in">
            Prix et Récompenses
          </h1>
          <p className="text-gray-600 mb-12 text-center text-lg leading-relaxed animate-fade-in">
            Les meilleures équipes seront récompensées ! Les prix seront dévoilés lors de l'événement.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="group bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100 border-2 border-yellow-200 hover:border-yellow-400 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Trophy size={40} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-700 to-orange-700 bg-clip-text text-transparent">
                  1er Prix
                </h3>
                <div className="text-center p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                  <HelpCircle size={32} className="text-yellow-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">
                    Le grand prix sera dévoilé lors de l'événement !
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group bg-gradient-to-br from-gray-50 via-slate-50 to-gray-100 border-2 border-gray-200 hover:border-gray-400 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Award size={40} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gray-500 to-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-gray-700 to-slate-700 bg-clip-text text-transparent">
                  2ème Prix
                </h3>
                <div className="text-center p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                  <HelpCircle size={32} className="text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">
                    Une surprise pour l'équipe arrivée en seconde position !
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="group bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100 border-2 border-orange-200 hover:border-orange-400 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in">
              <CardContent className="pt-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Medal size={40} className="text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
                  3ème Prix
                </h3>
                <div className="text-center p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                  <HelpCircle size={32} className="text-orange-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">
                    Une récompense spéciale pour compléter le podium !
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-16 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-white/80 to-yellow-50/80 backdrop-blur-sm p-12 rounded-3xl border border-yellow-200 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <p className="text-2xl font-bold bg-gradient-to-r from-yellow-700 via-orange-700 to-red-700 bg-clip-text text-transparent leading-relaxed">
                "Le plus grand prix est l'expérience et les compétences que vous développerez !"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
