
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
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {dataLoading ? (
        <div className="p-8 text-center text-gray-500">
          Chargement des messages...
        </div>
      ) : contactMessages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Sujet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((msg) => {
                const date = new Date(msg.created_at);
                const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                
                return (
                  <tr key={msg.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap">{formattedDate}</td>
                    <td className="py-3 px-4">{msg.name}</td>
                    <td className="py-3 px-4">{msg.email}</td>
                    <td className="py-3 px-4">{msg.subject}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {msg.message}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          Aucun message pour l'instant
        </div>
      )}
    </div>
  );
};
