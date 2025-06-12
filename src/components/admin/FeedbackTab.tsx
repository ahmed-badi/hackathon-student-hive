
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { Star, MessageCircle, TrendingUp, BarChart3 } from "lucide-react";

interface Feedback {
  id: string;
  name: string;
  email: string;
  organization_rating: number;
  content_rating: number;
  mentorship_rating: number;
  logistics_rating: number;
  overall_rating: number;
  comments: string;
  improvement_suggestions: string;
  created_at: string;
}

interface FeedbackTabProps {
  feedbacks: Feedback[];
  dataLoading: boolean;
}

export const FeedbackTab = ({ feedbacks, dataLoading }: FeedbackTabProps) => {
  const calculateFeedbackStats = () => {
    if (feedbacks.length === 0) return null;

    const ratings = {
      organization: feedbacks.reduce((sum, f) => sum + f.organization_rating, 0) / feedbacks.length,
      content: feedbacks.reduce((sum, f) => sum + f.content_rating, 0) / feedbacks.length,
      mentorship: feedbacks.reduce((sum, f) => sum + f.mentorship_rating, 0) / feedbacks.length,
      logistics: feedbacks.reduce((sum, f) => sum + f.logistics_rating, 0) / feedbacks.length,
      overall: feedbacks.reduce((sum, f) => sum + f.overall_rating, 0) / feedbacks.length,
    };

    return ratings;
  };

  const feedbackStats = calculateFeedbackStats();

  const ratingData = feedbackStats ? [
    { category: 'Organisation', note: Math.round(feedbackStats.organization * 10) / 10 },
    { category: 'Contenu', note: Math.round(feedbackStats.content * 10) / 10 },
    { category: 'Mentorat', note: Math.round(feedbackStats.mentorship * 10) / 10 },
    { category: 'Logistique', note: Math.round(feedbackStats.logistics * 10) / 10 },
    { category: 'Global', note: Math.round(feedbackStats.overall * 10) / 10 },
  ] : [];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const getRatingDistribution = (category: 'organization_rating' | 'content_rating' | 'mentorship_rating' | 'logistics_rating' | 'overall_rating') => {
    const distribution = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => ({
      note: rating,
      count: feedbacks.filter(f => f[category] === rating).length
    }));
    return distribution;
  };

  const getFeedbackTrends = () => {
    const dailyFeedbacks = feedbacks.reduce((acc: Record<string, any[]>, feedback) => {
      const date = new Date(feedback.created_at).toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(feedback);
      return acc;
    }, {});

    return Object.entries(dailyFeedbacks)
      .map(([date, dayFeedbacks]) => ({
        date: formatDate(date),
        'Note moyenne': Math.round((dayFeedbacks.reduce((sum, f) => sum + f.overall_rating, 0) / dayFeedbacks.length) * 10) / 10,
        'Nombre de feedbacks': dayFeedbacks.length
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const feedbackTrends = getFeedbackTrends();

  return (
    <div className="space-y-6">
      {/* Vue d'ensemble des feedbacks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{feedbacks.length}</div>
            <div className="text-sm text-gray-600">Feedbacks reçus</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {feedbackStats ? Math.round(feedbackStats.overall * 10) / 10 : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Note globale moyenne</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">
              {feedbackStats ? Math.round(feedbackStats.organization * 10) / 10 : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Meilleure note (Organisation)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">
              {feedbacks.filter(f => f.overall_rating >= 8).length}
            </div>
            <div className="text-sm text-gray-600">Notes ≥ 8/10</div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques des feedbacks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes moyennes par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Notes moyennes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ratingData.length > 0 ? (
              <BarChart
                data={ratingData}
                index="category"
                categories={["note"]}
                colors={["#f59e0b"]}
                valueFormatter={(value) => `${value}/10`}
                className="h-80"
              />
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune donnée de feedback disponible</p>
            )}
          </CardContent>
        </Card>

        {/* Évolution des notes dans le temps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Évolution des notes moyennes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackTrends.length > 0 ? (
              <LineChart
                data={feedbackTrends}
                index="date"
                categories={["Note moyenne"]}
                colors={["#3b82f6"]}
                valueFormatter={(value) => `${value}/10`}
                className="h-80"
              />
            ) : (
              <p className="text-center text-gray-500 py-8">Pas assez de données pour afficher l'évolution</p>
            )}
          </CardContent>
        </Card>

        {/* Distribution des notes globales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Distribution des notes globales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {feedbacks.length > 0 ? (
              <BarChart
                data={getRatingDistribution('overall_rating')}
                index="note"
                categories={["count"]}
                colors={["#10b981"]}
                valueFormatter={(value) => `${value} feedback(s)`}
                className="h-80"
              />
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>

        {/* Comparaison des catégories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-500" />
              Détail des notes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackStats ? (
              <div className="space-y-4">
                {[
                  { label: 'Organisation', value: feedbackStats.organization, color: 'bg-blue-500' },
                  { label: 'Contenu', value: feedbackStats.content, color: 'bg-green-500' },
                  { label: 'Mentorat', value: feedbackStats.mentorship, color: 'bg-yellow-500' },
                  { label: 'Logistique', value: feedbackStats.logistics, color: 'bg-red-500' },
                  { label: 'Global', value: feedbackStats.overall, color: 'bg-purple-500' }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.value / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold min-w-[3rem]">
                        {Math.round(item.value * 10) / 10}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">Aucune donnée disponible</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Commentaires récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            Commentaires récents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="p-8 text-center text-gray-500">
              Chargement des feedbacks...
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedbacks.slice(0, 5).map((feedback) => {
                const date = new Date(feedback.created_at);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                
                return (
                  <Card key={feedback.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">
                            {feedback.name || 'Anonyme'}
                          </h4>
                          {feedback.email && (
                            <p className="text-sm text-gray-500">{feedback.email}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{feedback.overall_rating}/10</span>
                          </div>
                          <p className="text-xs text-gray-500">{formattedDate}</p>
                        </div>
                      </div>
                      
                      {feedback.comments && (
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {feedback.comments}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {feedbacks.length > 5 && (
                <p className="text-center text-gray-500 text-sm">
                  ... et {feedbacks.length - 5} autre(s) feedback(s)
                </p>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Aucun feedback pour l'instant</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
