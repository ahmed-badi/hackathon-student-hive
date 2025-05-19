
import Navbar from "@/components/Navbar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Donnez-nous votre Feedback</h1>
            <p className="text-gray-600">Aidez-nous à améliorer notre hackathon pour les prochaines éditions</p>
          </div>
          
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
};

export default Feedback;
