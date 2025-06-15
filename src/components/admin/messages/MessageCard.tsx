
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface MessageCardProps {
  message: ContactMessage;
  onReply?: (email: string, subject: string) => void;
}

export const MessageCard = ({ message, onReply }: MessageCardProps) => {
  const date = new Date(message.created_at);
  const formattedDate = `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR')}`;
  
  const handleReply = () => {
    if (onReply) {
      onReply(message.email, `Re: ${message.subject}`);
    } else {
      // Fallback to mailto
      window.location.href = `mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg">{message.subject}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {message.name}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {message.email}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReply}
            className="flex items-center gap-1"
          >
            <Mail className="h-4 w-4" />
            Répondre
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-gray-500" />
            <Badge variant="secondary" className="text-xs">
              {message.message.length} caractères
            </Badge>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
