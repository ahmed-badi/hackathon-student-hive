import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { RatingsSection } from "./RatingsSection";
import { CommentsSection } from "./CommentsSection";

type FeedbackFormData = {
  name: string;
  email: string;
  organization: number;
  content: number;
  mentorship: number;
  logistics: number;
  overall: number;
  comments: string;
  suggestions: string;
};

export const FeedbackForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommentsError, setShowCommentsError] = useState(false);
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    organization: 10,
    content: 10,
    mentorship: 10,
    logistics: 10,
    overall: 10,
    comments: "",
    suggestions: ""
  });

  const handleChange = (field: keyof FeedbackFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
    if (field === "comments" && value.trim()) {
      setShowCommentsError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.comments.trim()) {
      setShowCommentsError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            organization_rating: formData.organization,
            content_rating: formData.content,
            mentorship_rating: formData.mentorship,
            logistics_rating: formData.logistics,
            overall_rating: formData.overall,
            comments: formData.comments,
            improvement_suggestions: formData.suggestions
          }
        ]);

      if (error) {
        console.error("Erreur lors de la soumission du feedback:", error);
        toast.error("Erreur lors de la soumission. Veuillez réessayer.");
      } else {
        toast.success("Merci pour votre feedback!");
        navigate("/");
      }
    } catch (error) {
      console.error("Exception lors de la soumission du feedback:", error);
      toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg mb-10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <PersonalInfoSection
              name={formData.name}
              email={formData.email}
              onNameChange={(value) => handleChange("name", value)}
              onEmailChange={(value) => handleChange("email", value)}
            />
            
            <RatingsSection
              ratings={{
                organization: formData.organization,
                content: formData.content,
                mentorship: formData.mentorship,
                logistics: formData.logistics,
                overall: formData.overall
              }}
              onRatingChange={handleChange}
            />
            
            <CommentsSection
              comments={formData.comments}
              suggestions={formData.suggestions}
              onCommentsChange={(value) => handleChange("comments", value)}
              onSuggestionsChange={(value) => handleChange("suggestions", value)}
              showError={showCommentsError}
            />
            
            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer mon feedback"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
