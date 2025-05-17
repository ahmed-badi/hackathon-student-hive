
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registrationStore } from "@/lib/registration-store";

interface Registration {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  university: string;
  track: string;
  teamPreference: string;
  teamName?: string;
}

const Admin = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState("all");

  useEffect(() => {
    // Load registrations
    const allRegistrations = registrationStore.getAllRegistrations();
    setRegistrations(allRegistrations);
    setFilteredRegistrations(allRegistrations);
  }, []);

  useEffect(() => {
    // Filter registrations based on search query and track filter
    let filtered = [...registrations];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.firstName?.toLowerCase().includes(query) || 
        reg.lastName?.toLowerCase().includes(query) || 
        reg.email?.toLowerCase().includes(query) ||
        reg.university?.toLowerCase().includes(query)
      );
    }
    
    if (trackFilter !== "all") {
      filtered = filtered.filter(reg => reg.track === trackFilter);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchQuery, trackFilter, registrations]);

  const getTrackName = (trackId: string): string => {
    const tracks: Record<string, string> = {
      "ai-ml": "AI & ML",
      "web3": "Web3",
      "healthtech": "HealthTech",
      "sustainability": "Sustainability",
      "edtech": "EdTech",
      "open": "Open Innovation"
    };
    return tracks[trackId] || trackId;
  };

  const trackCounts: Record<string, number> = registrations.reduce((acc: Record<string, number>, reg) => {
    if (reg.track) {
      acc[reg.track] = (acc[reg.track] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage hackathon registrations</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Total Registrations</div>
              <div className="text-3xl font-bold">{registrations.length}</div>
            </CardContent>
          </Card>
          
          {Object.entries(trackCounts).slice(0, 3).map(([track, count]) => (
            <Card key={track}>
              <CardContent className="p-6">
                <div className="text-sm font-medium text-gray-500 mb-1">{getTrackName(track)}</div>
                <div className="text-3xl font-bold">{count}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <Input
                placeholder="Search by name, email, university..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Track</label>
              <Select value={trackFilter} onValueChange={setTrackFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Tracks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tracks</SelectItem>
                  <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                  <SelectItem value="web3">Web3 & Blockchain</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="open">Open Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Registrations List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredRegistrations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">University</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Track</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg, index) => (
                    <tr key={reg.id || index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{reg.firstName} {reg.lastName}</td>
                      <td className="py-3 px-4">{reg.email}</td>
                      <td className="py-3 px-4">{reg.university}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{getTrackName(reg.track)}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        {reg.teamPreference === "solo" && "Solo"}
                        {reg.teamPreference === "join-team" && "Looking"}
                        {reg.teamPreference === "have-team" && (reg.teamName || "Team")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {registrations.length === 0 ? "No registrations yet" : "No matching registrations found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
