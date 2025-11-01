import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Calendar, MapPin } from "lucide-react";
import { useState } from "react";

// Sample data
const incidents = [
  {
    id: 1,
    date: "2024-10-15",
    title: "Twitter posts removed citing misinformation",
    platform: "Twitter/X",
    state: "Maharashtra",
    authority: "Ministry of Electronics and IT",
    category: "Misinformation",
    status: "Verified",
  },
  {
    id: 2,
    date: "2024-10-12",
    title: "YouTube videos blocked under IT Rules",
    platform: "YouTube",
    state: "Delhi",
    authority: "Ministry of Information & Broadcasting",
    category: "Political Content",
    status: "Verified",
  },
  {
    id: 3,
    date: "2024-10-08",
    title: "Website access restricted by court order",
    platform: "Website",
    state: "Karnataka",
    authority: "High Court",
    category: "Legal Dispute",
    status: "Pending",
  },
  {
    id: 4,
    date: "2024-10-05",
    title: "Facebook pages taken down for hate speech",
    platform: "Facebook",
    state: "Uttar Pradesh",
    authority: "State Police",
    category: "Hate Speech",
    status: "Verified",
  },
  {
    id: 5,
    date: "2024-09-28",
    title: "Instagram accounts suspended",
    platform: "Instagram",
    state: "West Bengal",
    authority: "Ministry of Electronics and IT",
    category: "National Security",
    status: "Verified",
  },
];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         incident.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === "all" || incident.platform === selectedPlatform;
    const matchesCategory = selectedCategory === "all" || incident.category === selectedCategory;
    
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Incident Archive
          </h1>
          <p className="text-muted-foreground">
            Searchable database of {incidents.length.toLocaleString()} documented censorship incidents
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, state, or authority..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="Twitter/X">Twitter/X</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Website">Websites</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Misinformation">Misinformation</SelectItem>
                  <SelectItem value="Political Content">Political Content</SelectItem>
                  <SelectItem value="Hate Speech">Hate Speech</SelectItem>
                  <SelectItem value="National Security">National Security</SelectItem>
                  <SelectItem value="Legal Dispute">Legal Dispute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing {filteredIncidents.length} of {incidents.length} incidents
            </p>
          </div>

          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={incident.status === "Verified" ? "default" : "secondary"}>
                        {incident.status}
                      </Badge>
                      <Badge variant="outline">{incident.category}</Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-foreground">
                      {incident.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(incident.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {incident.state}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Platform: </span>
                        <span className="font-medium text-foreground">{incident.platform}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Authority: </span>
                        <span className="font-medium text-foreground">{incident.authority}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredIncidents.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No incidents found matching your filters. Try adjusting your search criteria.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
