
import React from "react";
import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FAQ = () => {
  const faqs = [
    {
      question: "Qui peut participer au hackathon ?",
      answer: "Le hackathon est ouvert à tous les étudiants inscrits dans un établissement d'enseignement supérieur. Les participants peuvent être de n'importe quel niveau d'études ou spécialité."
    },
    {
      question: "Comment former une équipe ?",
      answer: "Vous pouvez former votre équipe à l'avance ou lors de l'événement. Les équipes doivent être composées de 2 à 5 personnes. Nous organiserons une session de formation d'équipe au début de l'événement pour ceux qui cherchent des coéquipiers."
    },
    {
      question: "Quelles sont les technologies autorisées ?",
      answer: "Toutes les technologies sont autorisées! Vous êtes libre d'utiliser n'importe quel langage de programmation, framework, ou outil pour développer votre projet."
    },
    {
      question: "Comment les projets seront-ils évalués ?",
      answer: "Les projets seront évalués selon les critères suivants : innovation, faisabilité technique, impact potentiel, expérience utilisateur, et qualité de la présentation finale."
    },
    {
      question: "Y a-t-il des frais d'inscription ?",
      answer: "Non, la participation au hackathon est entièrement gratuite. Nous fournirons également des repas, des boissons et des collations pendant toute la durée de l'événement."
    },
    {
      question: "Dois-je apporter mon propre ordinateur ?",
      answer: "Oui, chaque participant doit apporter son propre ordinateur portable. Assurez-vous qu'il est chargé et que vous avez votre chargeur avec vous."
    },
    {
      question: "Comment soumettre notre projet final ?",
      answer: "Les projets finaux doivent être soumis via la page de soumission de notre plateforme. Vous devrez inclure une présentation, le code source et toute documentation pertinente. Rendez-vous sur la page de soumission pour plus de détails."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Questions Fréquemment Posées</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
            <div className="flex justify-center gap-4">
              <Link to="/submission">
                <Button variant="default">Soumettre votre projet</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">S'inscrire au Hackathon</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
