import { Textarea } from "@/components/ui/textarea";

type CommentsSectionProps = {
  comments: string;
  suggestions: string;
  onCommentsChange: (value: string) => void;
  onSuggestionsChange: (value: string) => void;
  showError: boolean;
};

export const CommentsSection = ({ 
  comments, 
  suggestions, 
  onCommentsChange, 
  onSuggestionsChange,
  showError 
}: CommentsSectionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Commentaires détaillés</h2>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Ce que vous avez apprécié <span className="text-red-600">*</span>
        </label>
        <Textarea
          placeholder="Dites-nous ce que vous avez aimé dans cet événement..."
          value={comments}
          onChange={(e) => onCommentsChange(e.target.value)}
          className="min-h-[120px] border"
        />
        {showError && !comments.trim() && (
          <p className="text-red-500 text-sm mt-1">Ce champ est obligatoire.</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Comment pouvons-nous améliorer?</label>
        <Textarea
          placeholder="Vos suggestions pour rendre le prochain hackathon encore meilleur..."
          value={suggestions}
          onChange={(e) => onSuggestionsChange(e.target.value)}
          className="min-h-[120px]"
        />
      </div>
    </div>
  );
};
