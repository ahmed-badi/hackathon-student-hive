
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { Star, MessageCircle, TrendingUp, BarChart3, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

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

  const getDetailedStats = () => {
    if (feedbacks.length === 0) return null;

    const positiveCount = feedbacks.filter(f => f.overall_rating >= 8).length;
    const neutralCount = feedbacks.filter(f => f.overall_rating >= 6 && f.overall_rating < 8).length;
    const negativeCount = feedbacks.filter(f => f.overall_rating < 6).length;
    const withCommentsCount = feedbacks.filter(f => f.comments && f.comments.trim().length > 0).length;
    const withSuggestionsCount = feedbacks.filter(f => f.improvement_suggestions && f.improvement_suggestions.trim().length > 0).length;

    return {
      positive: positiveCount,
      neutral: neutralCount,
      negative: negativeCount,
      withComments: withCommentsCount,
      withSuggestions: withSuggestionsCount,
      responseRate: Math.round((withCommentsCount / feedbacks.length) * 100)
    };
  };

  const detailedStats = getDetailedStats();

  return (
    <div className="space-y-6">
      {/* Statistiques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{feedbacks.length}</div>
            <div className="text-sm text-gray-600">Total feedbacks</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {feedbackStats ? Math.round(feedbackStats.overall * 10) / 10 : 'N/A'}
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">
              {detailedStats ? detailedStats.positive : 0}
            </div>
            <div className="text-sm text-gray-600">Notes positives (≥8)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold text-orange-600">
              {detailedStats ? detailedStats.neutral : 0}
            </div>
            <div className="text-sm text-gray-600">Notes neutres (6-7)</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">
              {detailedStats ? detailedStats.withComments : 0}
            </div>
            <div className="text-sm text-gray-600">Avec commentaires</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-bold">%</span>
            </div>
            <div className="text-2xl font-bold">
              {detailedStats ? detailedStats.responseRate : 0}%
            </div>
            <div className="text-sm text-gray-600">Taux de réponse</div>
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

      {/* Tous les feedbacks détaillés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" />
            Tous les feedbacks détaillés ({feedbacks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dataLoading ? (
            <div className="p-8 text-center text-gray-500">
              Chargement des feedbacks...
            </div>
          ) : feedbacks.length > 0 ? (
            <div className="space-y-4">
              {feedbacks.map((feedback) => {
                const date = new Date(feedback.created_at);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                
                return (
                  <Card key={feedback.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-medium text-lg">
                            {feedback.name || 'Anonyme'}
                          </h4>
                          {feedback.email && (
                            <p className="text-sm text-gray-500">{feedback.email}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-lg">{feedback.overall_rating}/10</span>
                          </div>
                          <p className="text-xs text-gray-500">{formattedDate}</p>
                        </div>
                      </div>

                      {/* Notes détaillées */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-xs text-gray-600">Organisation</div>
                          <div className="font-semibold">{feedback.organization_rating}/10</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-xs text-gray-600">Contenu</div>
                          <div className="font-semibold">{feedback.content_rating}/10</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="text-xs text-gray-600">Mentorat</div>
                          <div className="font-semibold">{feedback.mentorship_rating}/10</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="text-xs text-gray-600">Logistique</div>
                          <div className="font-semibold">{feedback.logistics_rating}/10</div>
                        </div>
                      </div>
                      
                      {/* Commentaires complets */}
                      {feedback.comments && (
                        <div className="mb-4">
                          <h5 className="font-medium mb-2 text-green-700">Ce qui a été apprécié :</h5>
                          <div className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                            {feedback.comments}
                          </div>
                        </div>
                      )}

                      {/* Suggestions d'amélioration */}
                      {feedback.improvement_suggestions && (
                        <div>
                          <h5 className="font-medium mb-2 text-orange-700">Suggestions d'amélioration :</h5>
                          <div className="text-sm text-gray-700 bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                            {feedback.improvement_suggestions}
                          </div>
                        </div>
                      )}

                      {/* Badge de sentiment */}
                      <div className="mt-3 flex gap-2">
                        {feedback.overall_rating >= 8 && (
                          <Badge className="bg-green-100 text-green-800">Très satisfait</Badge>
                        )}
                        {feedback.overall_rating >= 6 && feedback.overall_rating < 8 && (
                          <Badge className="bg-orange-100 text-orange-800">Satisfait</Badge>
                        )}
                        {feedback.overall_rating < 6 && (
                          <Badge className="bg-red-100 text-red-800">Insatisfait</Badge>
                        )}
                        {feedback.comments && (
                          <Badge variant="outline">Avec commentaires</Badge>
                        )}
                        {feedback.improvement_suggestions && (
                          <Badge variant="outline">Avec suggestions</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
