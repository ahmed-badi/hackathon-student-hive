
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Clock, Mail, TrendingUp } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface MessageStatsProps {
  contactMessages: ContactMessage[];
}

export const MessageStats = ({ contactMessages }: MessageStatsProps) => {
  const totalMessages = contactMessages.length;
  
  // Messages in the last 24 hours
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  const recentMessages = contactMessages.filter(m => 
    new Date(m.created_at) > oneDayAgo
  ).length;
  
  // Average message length
  const avgLength = contactMessages.length > 0 
    ? Math.round(contactMessages.reduce((sum, msg) => sum + msg.message.length, 0) / contactMessages.length)
    : 0;
  
  // Unique senders
  const uniqueSenders = new Set(contactMessages.map(m => m.email)).size;

  const stats = [
    {
      title: "Total messages",
      value: totalMessages,
      icon: MessageSquare,
      description: "Messages reçus"
    },
    {
      title: "Dernières 24h",
      value: recentMessages,
      icon: Clock,
      description: "Nouveaux messages"
    },
    {
      title: "Expéditeurs uniques",
      value: uniqueSenders,
      icon: Mail,
      description: "Contacts différents"
    },
    {
      title: "Longueur moyenne",
      value: `${avgLength} car.`,
      icon: TrendingUp,
      description: "Caractères par message"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
