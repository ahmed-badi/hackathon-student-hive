
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionMark } from "lucide-react";

const Prizes = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Prix du Hackathon</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Les gagnants du hackathon recevront des prix exceptionnels. Restez à l'écoute pour la grande révélation lors de l'événement !
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* 1er Prix */}
          <Card className="border-2 border-yellow-400 bg-gradient-to-b from-yellow-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-yellow-600">1</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Premier Prix</h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <QuestionMark className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <p className="text-gray-600">
                Une surprise exceptionnelle attend l'équipe gagnante ! Restez jusqu'à la fin de l'événement pour découvrir ce premier prix incroyable.
              </p>
            </CardContent>
          </Card>
          
          {/* 2ème Prix */}
          <Card className="border-2 border-gray-300 bg-gradient-to-b from-gray-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-gray-600">2</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Deuxième Prix</h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <QuestionMark className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <p className="text-gray-600">
                Une récompense mystère sera révélée pour l'équipe arrivant en deuxième position. Anticipation garantie !
              </p>
            </CardContent>
          </Card>
          
          {/* 3ème Prix */}
          <Card className="border-2 border-amber-700 bg-gradient-to-b from-amber-50 to-white">
            <CardContent className="p-6 text-center">
              <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-amber-600">3</span>
              </div>
              <h2 className="text-xl font-bold mb-4">Troisième Prix</h2>
              <div className="bg-gray-100 rounded-lg p-6 mb-4 flex items-center justify-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <QuestionMark className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <p className="text-gray-600">
                Une surprise attend également les troisièmes du classement. Suspense jusqu'à la cérémonie de remise des prix !
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Prix spéciaux */}
        <h2 className="text-2xl font-bold mb-6">Prix Spéciaux</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Prix Innovation",
              description: "Pour la solution la plus innovante"
            },
            {
              title: "Prix Impact Social",
              description: "Pour le projet à plus fort impact sociétal"
            },
            {
              title: "Prix Design",
              description: "Pour l'interface utilisateur la plus élégante"
            },
            {
              title: "Prix du Public",
              description: "Voté par tous les participants"
            }
          ].map((prize, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QuestionMark className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{prize.title}</h3>
                <p className="text-sm text-gray-600">{prize.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Important</h3>
          <p className="text-gray-600 mb-2">
            Tous les prix seront annoncés et remis lors de la cérémonie de clôture le 13 juin à 17h00.
          </p>
          <p className="text-gray-600">
            Les gagnants devront être présents lors de la cérémonie pour recevoir leurs prix.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
