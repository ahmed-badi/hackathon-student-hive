
import { RatingItem } from "./RatingItem";

type RatingData = {
  organization: number;
  content: number;
  mentorship: number;
  logistics: number;
  overall: number;
};

type RatingsSectionProps = {
  ratings: RatingData;
  onRatingChange: (field: keyof RatingData, value: number) => void;
};

export const RatingsSection = ({ ratings, onRatingChange }: RatingsSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Évaluation de l'événement</h2>
      <p className="text-sm text-gray-500">Évaluez chaque aspect de l'événement sur une échelle de 1 à 10 (10 étant excellent)</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RatingItem 
          label="Organisation générale" 
          value={ratings.organization} 
          onChange={(value) => onRatingChange('organization', value)} 
        />
        
        <RatingItem 
          label="Qualité du contenu" 
          value={ratings.content} 
          onChange={(value) => onRatingChange('content', value)} 
        />
        
        <RatingItem 
          label="Qualité du mentorat" 
          value={ratings.mentorship} 
          onChange={(value) => onRatingChange('mentorship', value)} 
        />
        
        <RatingItem 
          label="Logistique (lieu, WIFI, Prises etc.)" 
          value={ratings.logistics} 
          onChange={(value) => onRatingChange('logistics', value)} 
        />
      </div>
      
      <RatingItem 
        label="Évaluation globale de l'événement" 
        value={ratings.overall} 
        onChange={(value) => onRatingChange('overall', value)} 
      />
    </div>
  );
};
