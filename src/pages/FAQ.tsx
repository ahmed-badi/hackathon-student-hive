
import React from "react";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HelpCircle, Users, FileText } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Qui peut participer au hackathon ?",
      answer: "Le hackathon est ouvert à tous les étudiants inscrits dans un établissement d'enseignement supérieur. Les participants peuvent être de n'importe quel niveau d'études ou spécialité.",
      icon: "👥"
    },
    {
      question: "Comment former une équipe ?",
      answer: "Idéalement, les équipes sont composées de 4 personnes. Des équipes de 3 sont acceptées dans des cas exceptionnels (si le nombre total de participants n'est pas un multiple de 4). Vous pouvez former votre équipe à l'avance ou lors de l'événement.",
      icon: "🤝"
    },
    {
      question: "Quelles sont les technologies autorisées ?",
      answer: "Toutes les technologies sont autorisées! Vous êtes libre d'utiliser n'importe quel langage de programmation, framework, ou outil pour développer votre projet.",
      icon: "💻"
    },
    {
      question: "Comment les projets seront-ils évalués ?",
      answer: "Les projets seront évalués selon les critères suivants : innovation, faisabilité technique, impact potentiel, expérience utilisateur, et qualité de la présentation finale.",
      icon: "📊"
    },
    {
      question: "Y a-t-il des frais d'inscription ?",
      answer: "Non, la participation au hackathon est entièrement gratuite. Nous fournirons également des repas, des boissons et des collations pendant toute la durée de l'événement.",
      icon: "💰"
    },
    {
      question: "Dois-je apporter mon propre ordinateur ?",
      answer: "Oui, chaque participant doit apporter son propre ordinateur portable. Assurez-vous qu'il est chargé et que vous avez votre chargeur avec vous.",
      icon: "💻"
    },
    {
      question: "Comment soumettre notre projet final ?",
      answer: "Les projets finaux doivent être soumis via la page de soumission de notre plateforme. Vous devrez inclure une présentation, le code source et toute documentation pertinente. Rendez-vous sur la page de soumission pour plus de détails.",
      icon: "📤"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <HelpCircle size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions Fréquemment Posées
            </h1>
            <p className="text-gray-600 text-lg">
              Trouvez toutes les réponses à vos questions sur le hackathon
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-fade-in">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="group border-2 border-gray-100 rounded-xl px-6 py-2 hover:border-purple-200 transition-all duration-300 hover:shadow-md bg-gradient-to-r from-white to-purple-50/30"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{faq.icon}</span>
                      <span className="text-left group-hover:text-purple-700 transition-colors duration-300">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-4 pb-2 leading-relaxed">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center animate-fade-in">
            <div className="bg-gradient-to-r from-white/80 to-purple-50/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-200 shadow-xl">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Users className="text-purple-600" size={24} />
                <FileText className="text-blue-600" size={24} />
              </div>
              <p className="text-gray-600 mb-6 text-lg">Vous avez d'autres questions ?</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/submission">
                  <Button 
                    variant="default" 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Soumettre votre projet
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transform hover:scale-105 transition-all duration-300"
                  >
                    S'inscrire au Hackathon
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

export default FAQ;
