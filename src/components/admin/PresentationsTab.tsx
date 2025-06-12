
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PresentationsTab = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-medium mb-4">Gestion des présentations</h3>
      <p className="mb-4 text-gray-600">
        Cette section est réservée aux organisateurs. Ici, vous pouvez gérer les présentations qui seront projetées lors du hackathon.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h4 className="font-medium mb-2">Administration des présentations</h4>
          <p className="text-gray-600 mb-4">
            Téléchargez, modifiez ou supprimez les présentations pour le hackathon :
          </p>
          <div>
            <Link to="/organizer-presentation" className="text-primary hover:underline">
              <Button variant="default" className="w-full md:w-auto">Gérer les présentations</Button>
            </Link>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h4 className="font-medium mb-2">Vue publique des présentations</h4>
          <p className="text-gray-600 mb-4">
            Consultez la page de présentation telle que les participants la verront :
          </p>
          <div>
            <Link to="/presentations" className="text-primary hover:underline">
              <Button variant="outline" className="w-full md:w-auto">Voir la page publique</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-6">
        <p className="text-amber-800 text-sm">
          Note : Les participants peuvent consulter les présentations, mais seuls les organisateurs peuvent les modifier.
        </p>
      </div>
    </div>
  );
};
