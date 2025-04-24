
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Inscription réussie !</h1>
          <p className="text-gray-600 mb-8">
            Merci pour votre inscription au Hackathon Student Hive. Nous avons reçu votre candidature et vous contacterons prochainement avec les prochaines étapes.
          </p>
          
          <Alert className="mb-6 text-left">
            <InfoIcon className="h-4 w-4 mr-2" />
            <AlertTitle>Information sur l'email</AlertTitle>
            <AlertDescription>
              Dans cette version de démonstration, les emails ne sont pas réellement envoyés. 
              Dans un environnement de production, vous recevriez un email de confirmation à l'adresse fournie.
            </AlertDescription>
          </Alert>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="font-medium mb-4">Prochaines étapes</h2>
            <ol className="text-left text-gray-600 space-y-3">
              <li className="flex gap-3">
                <div className="flex-none bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium text-sm">1</div>
                <div>Vérifier votre boîte de réception pour un message de confirmation</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-none bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium text-sm">2</div>
                <div>Rejoindre notre communauté Discord pour les mises à jour et la formation d'équipes</div>
              </li>
              <li className="flex gap-3">
                <div className="flex-none bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center font-medium text-sm">3</div>
                <div>Se préparer pour le hackathon en consultant les ressources et ateliers</div>
              </li>
            </ol>
          </div>
          
          <div className="space-y-4">
            <Link to="/submission">
              <Button className="w-full mb-3">
                Soumettre un projet
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
