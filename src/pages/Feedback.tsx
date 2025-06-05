
import Navbar from "@/components/Navbar";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { MessageSquare, Heart } from "lucide-react";

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <MessageSquare size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Donnez-nous votre Feedback
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="text-red-500" size={20} />
              <p className="text-gray-600 text-lg">Aidez-nous à améliorer notre hackathon pour les prochaines éditions</p>
              <Heart className="text-red-500" size={20} />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <h2 className="text-xl font-semibold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent">
                  Partagez votre expérience
                </h2>
              </div>
            </div>
            
            <div className="p-6">
              <FeedbackForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
