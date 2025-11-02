import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Calendar, MapPin, Film, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Film censorship data for Lights-Camera-Action section
interface FilmCase {
  id: number;
  title: string;
  year: number;
  decision: "passed" | "passed_with_cuts" | "rejected";
  cuts: number;
}

const filmCensorshipCases: FilmCase[] = [
  { id: 1, title: "Udta Punjab", year: 2016, decision: "passed_with_cuts", cuts: 2 },
  { id: 2, title: "Padmaavat", year: 2018, decision: "passed_with_cuts", cuts: 1 },
  { id: 3, title: "Lipstick Under My Burkha", year: 2017, decision: "passed", cuts: 0 },
  { id: 4, title: "PK", year: 2014, decision: "passed_with_cuts", cuts: 1 },
  { id: 5, title: "Ae Dil Hai Mushkil", year: 2016, decision: "passed_with_cuts", cuts: 1 },
  { id: 6, title: "Bajirao Mastani", year: 2015, decision: "passed_with_cuts", cuts: 2 },
  { id: 7, title: "The Accidental Prime Minister", year: 2019, decision: "passed_with_cuts", cuts: 1 },
  { id: 8, title: "Article 15", year: 2019, decision: "passed", cuts: 0 },
  { id: 9, title: "Thappad", year: 2020, decision: "passed", cuts: 0 },
  { id: 10, title: "The Kashmir Files", year: 2022, decision: "passed", cuts: 0 },
];

const yearlyFilmData = [
  { year: 2014, total: 45, passed: 32, withCuts: 11, rejected: 2 },
  { year: 2015, total: 52, passed: 38, withCuts: 12, rejected: 2 },
  { year: 2016, total: 78, passed: 45, withCuts: 28, rejected: 5 },
  { year: 2017, total: 85, passed: 52, withCuts: 28, rejected: 5 },
  { year: 2018, total: 92, passed: 58, withCuts: 30, rejected: 4 },
  { year: 2019, total: 88, passed: 55, withCuts: 29, rejected: 4 },
  { year: 2020, total: 65, passed: 42, withCuts: 20, rejected: 3 },
  { year: 2021, total: 72, passed: 48, withCuts: 21, rejected: 3 },
  { year: 2022, total: 95, passed: 60, withCuts: 30, rejected: 5 },
  { year: 2023, total: 102, passed: 64, withCuts: 33, rejected: 5 },
  { year: 2024, total: 78, passed: 52, withCuts: 23, rejected: 3 },
];

// Sample data with more fields
interface IncidentData {
  id: number;
  date: string;
  title: string;
  platform: string;
  state: string;
  district?: string;
  authority: string;
  category: string;
  legalReason: string;
  contentType: "film" | "website" | "social_media" | "other";
  status: "Verified" | "Pending" | "Under Review";
  description?: string;
}

const incidents: IncidentData[] = [
  {
    id: 1,
    date: "2024-10-15",
    title: "Twitter posts removed citing misinformation",
    platform: "Twitter/X",
    state: "Maharashtra",
    district: "Mumbai",
    authority: "Ministry of Electronics and IT",
    category: "Misinformation",
    legalReason: "IT Act Section 69A",
    contentType: "social_media",
    status: "Verified",
    description: "Multiple Twitter posts removed for spreading false health information",
  },
  {
    id: 2,
    date: "2024-10-12",
    title: "YouTube videos blocked under IT Rules",
    platform: "YouTube",
    state: "Delhi",
    authority: "Ministry of Information & Broadcasting",
    category: "Political Content",
    legalReason: "IT Rules 2021",
    contentType: "social_media",
    status: "Verified",
    description: "Political commentary videos blocked",
  },
  {
    id: 3,
    date: "2024-10-08",
    title: "Website access restricted by court order",
    platform: "Website",
    state: "Karnataka",
    district: "Bangalore",
    authority: "High Court",
    category: "Legal Dispute",
    legalReason: "Court Order",
    contentType: "website",
    status: "Pending",
    description: "News website blocked pending court hearing",
  },
  {
    id: 4,
    date: "2024-10-05",
    title: "Facebook pages taken down for hate speech",
    platform: "Facebook",
    state: "Uttar Pradesh",
    district: "Lucknow",
    authority: "State Police",
    category: "Hate Speech",
    legalReason: "IT Act Section 69A",
    contentType: "social_media",
    status: "Verified",
    description: "Hate speech pages removed",
  },
  {
    id: 5,
    date: "2024-09-28",
    title: "Instagram accounts suspended",
    platform: "Instagram",
    state: "West Bengal",
    district: "Kolkata",
    authority: "Ministry of Electronics and IT",
    category: "National Security",
    legalReason: "National Security",
    contentType: "social_media",
    status: "Verified",
    description: "Accounts suspended for security reasons",
  },
  {
    id: 6,
    date: "2024-09-20",
    title: "Film censorship case - political content",
    platform: "Film",
    state: "Maharashtra",
    authority: "CBFC",
    category: "Political Content",
    legalReason: "Cinematography Act",
    contentType: "film",
    status: "Verified",
    description: "Film passed with cuts",
  },
  {
    id: 7,
    date: "2024-09-15",
    title: "Website blocked for defamation",
    platform: "Website",
    state: "Tamil Nadu",
    district: "Chennai",
    authority: "High Court",
    category: "Defamation",
    legalReason: "Defamation Act",
    contentType: "website",
    status: "Verified",
    description: "Blog blocked for defamatory content",
  },
];

const Archive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedAuthority, setSelectedAuthority] = useState("all");
  const [selectedContentType, setSelectedContentType] = useState("all");
  const [selectedLegalReason, setSelectedLegalReason] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Full-text search across all fields
  const fullTextSearch = (text: string, incident: IncidentData): boolean => {
    const searchLower = text.toLowerCase();
    return (
      incident.title.toLowerCase().includes(searchLower) ||
      incident.state.toLowerCase().includes(searchLower) ||
      (incident.district && incident.district.toLowerCase().includes(searchLower)) ||
      incident.platform.toLowerCase().includes(searchLower) ||
      incident.authority.toLowerCase().includes(searchLower) ||
      incident.category.toLowerCase().includes(searchLower) ||
      incident.legalReason.toLowerCase().includes(searchLower) ||
      (incident.description && incident.description.toLowerCase().includes(searchLower))
    );
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = !searchQuery || fullTextSearch(searchQuery, incident);
    const matchesPlatform = selectedPlatform === "all" || incident.platform === selectedPlatform;
    const matchesCategory = selectedCategory === "all" || incident.category === selectedCategory;
    const matchesState = selectedState === "all" || incident.state === selectedState;
    const matchesAuthority = selectedAuthority === "all" || incident.authority === selectedAuthority;
    const matchesContentType = selectedContentType === "all" || incident.contentType === selectedContentType;
    const matchesLegalReason = selectedLegalReason === "all" || incident.legalReason === selectedLegalReason;
    const matchesStatus = selectedStatus === "all" || incident.status === selectedStatus;
    
    // Date range filtering
    let matchesDate = true;
    if (dateFrom) {
      matchesDate = matchesDate && new Date(incident.date) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDate = matchesDate && new Date(incident.date) <= new Date(dateTo);
    }
    
    return matchesSearch && matchesPlatform && matchesCategory && matchesState && 
           matchesAuthority && matchesContentType && matchesLegalReason && matchesStatus && matchesDate;
  });

  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const handleYearClick = (year: number) => {
    setSelectedYear(year.toString());
    // Filter cases by year
    const yearCases = filmCensorshipCases.filter(c => c.year === year);
    // In a real app, you'd navigate or show details
    console.log(`Cases for ${year}:`, yearCases);
  };

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

        <Tabs defaultValue="general" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Archive</TabsTrigger>
            <TabsTrigger value="films">Lights-Camera-Action</TabsTrigger>
          </TabsList>

          <TabsContent value="films" className="space-y-6">
            {/* Lights-Camera-Action Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Film Censorship Archive
                </CardTitle>
                <CardDescription>
                  Enhanced year-wise graphical display for film censorship data with direct links to case details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Click on any bar in the chart to view detailed cases for that year
                  </p>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={yearlyFilmData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="year" 
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="passed" 
                        fill="hsl(var(--chart-2))"
                        name="Passed"
                        onClick={(data) => handleYearClick(data.year)}
                        style={{ cursor: "pointer" }}
                      />
                      <Bar 
                        dataKey="withCuts" 
                        fill="hsl(var(--chart-3))"
                        name="With Cuts"
                        onClick={(data) => handleYearClick(data.year)}
                        style={{ cursor: "pointer" }}
                      />
                      <Bar 
                        dataKey="rejected" 
                        fill="hsl(var(--destructive))"
                        name="Rejected"
                        onClick={(data) => handleYearClick(data.year)}
                        style={{ cursor: "pointer" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Year-wise case listing */}
                {selectedYear && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Cases for {selectedYear}</CardTitle>
                      <CardDescription>
                        Film censorship cases from {selectedYear}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {filmCensorshipCases
                          .filter(c => c.year.toString() === selectedYear)
                          .map((film) => (
                            <Card key={film.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-foreground">{film.title}</h4>
                                    <div className="flex gap-2 mt-2">
                                      <Badge 
                                        variant={
                                          film.decision === "passed" ? "default" :
                                          film.decision === "passed_with_cuts" ? "secondary" :
                                          "destructive"
                                        }
                                      >
                                        {film.decision === "passed_with_cuts" ? "With Cuts" :
                                         film.decision === "passed" ? "Passed" : "Rejected"}
                                      </Badge>
                                      {film.cuts > 0 && (
                                        <Badge variant="outline">{film.cuts} cut(s)</Badge>
                                      )}
                                    </div>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    asChild
                                  >
                                    <Link to={`/film-censorship?year=${film.year}&case=${film.id}`}>
                                      View Details
                                      <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        {filmCensorshipCases.filter(c => c.year.toString() === selectedYear).length === 0 && (
                          <p className="text-muted-foreground text-center py-4">
                            No cases available for {selectedYear}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* All cases table */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">All Film Cases</h3>
                  <div className="space-y-2">
                    {filmCensorshipCases.map((film) => (
                      <Card key={film.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">{film.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">Year: {film.year}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant={
                                  film.decision === "passed" ? "default" :
                                  film.decision === "passed_with_cuts" ? "secondary" :
                                  "destructive"
                                }
                              >
                                {film.decision === "passed_with_cuts" ? "With Cuts" :
                                 film.decision === "passed" ? "Passed" : "Rejected"}
                              </Badge>
                              <Button 
                                variant="outline" 
                                size="sm"
                                asChild
                              >
                                <Link to={`/film-censorship?case=${film.id}`}>
                                  View
                                  <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-6">
        {/* Advanced Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Smart Filters</CardTitle>
            <CardDescription>
              Full-text search and combined filters for granular research (e.g., 'all film censorship cases in Maharashtra in 2024')
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Full-text Search */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Full-text search across all fields (title, state, authority, reason, description...)"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date From</label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date To</label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
            </div>

            {/* Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Film">Film</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedContentType} onValueChange={setSelectedContentType}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {[...new Set(incidents.map(i => i.state))].sort().map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
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
                  <SelectItem value="Defamation">Defamation</SelectItem>
                  <SelectItem value="Legal Dispute">Legal Dispute</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAuthority} onValueChange={setSelectedAuthority}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Authority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authorities</SelectItem>
                  {[...new Set(incidents.map(i => i.authority))].sort().map(auth => (
                    <SelectItem key={auth} value={auth}>{auth}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLegalReason} onValueChange={setSelectedLegalReason}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Legal Basis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Legal Reasons</SelectItem>
                  {[...new Set(incidents.map(i => i.legalReason))].sort().map(reason => (
                    <SelectItem key={reason} value={reason}>{reason}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Verified">Verified</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedPlatform("all");
                  setSelectedCategory("all");
                  setSelectedState("all");
                  setSelectedAuthority("all");
                  setSelectedContentType("all");
                  setSelectedLegalReason("all");
                  setSelectedStatus("all");
                  setDateFrom("");
                  setDateTo("");
                }}
              >
                Clear All Filters
              </Button>
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
                      <div>
                        <span className="text-muted-foreground">Content Type: </span>
                        <Badge variant="outline" className="ml-1">
                          {incident.contentType.replace("_", " ")}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Legal Basis: </span>
                        <span className="font-medium text-foreground">{incident.legalReason}</span>
                      </div>
                    </div>
                    {incident.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {incident.description}
                      </p>
                    )}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Archive;
