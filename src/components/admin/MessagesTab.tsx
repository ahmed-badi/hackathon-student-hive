
import { useState, useEffect } from "react";
import { MessageStats } from "./messages/MessageStats";
import { MessageFilters } from "./messages/MessageFilters";
import { MessageCard } from "./messages/MessageCard";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface MessagesTabProps {
  contactMessages: ContactMessage[];
  dataLoading: boolean;
}

export const MessagesTab = ({ contactMessages, dataLoading }: MessagesTabProps) => {
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    let filtered = [...contactMessages];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(msg => 
        msg.name?.toLowerCase().includes(query) || 
        msg.email?.toLowerCase().includes(query) ||
        msg.subject?.toLowerCase().includes(query) ||
        msg.message?.toLowerCase().includes(query)
      );
    }
    
    // Sort messages
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "date-asc":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "subject":
          return a.subject.localeCompare(b.subject);
        default:
          return 0;
      }
    });
    
    setFilteredMessages(filtered);
  }, [searchQuery, sortBy, contactMessages]);

  const handleReset = () => {
    setSearchQuery("");
    setSortBy("date-desc");
  };

  const handleExport = () => {
    const csvData = [
      ["Nom", "Email", "Sujet", "Message", "Date"],
      ...filteredMessages.map(msg => [
        msg.name,
        msg.email,
        msg.subject,
        msg.message.replace(/\n/g, " ").replace(/,/g, ";"),
        new Date(msg.created_at).toLocaleDateString('fr-FR')
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "messages.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReply = (email: string, subject: string) => {
    // You can implement custom reply logic here or use the default mailto
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  if (dataLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement des messages...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MessageStats contactMessages={contactMessages} />
      
      <MessageFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filteredCount={filteredMessages.length}
        totalCount={contactMessages.length}
        onReset={handleReset}
        onExport={handleExport}
      />
      
      <div className="space-y-4">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <MessageCard 
              key={message.id} 
              message={message} 
              onReply={handleReply}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            {contactMessages.length === 0 
              ? "Aucun message pour l'instant" 
              : "Aucun message correspondant aux critères"
            }
          </div>
        )}
      </div>
    </div>
  );
};
