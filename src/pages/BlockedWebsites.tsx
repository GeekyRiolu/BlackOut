import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Globe, 
  Calendar,
  Shield,
  AlertTriangle,
  Ban,
  ExternalLink,
  TrendingUp,
  Link2
} from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Blocked website data
interface BlockedWebsite {
  id: number;
  url: string;
  domain: string;
  date: string;
  year: number;
  reason: string;
  authority: string;
  status: "blocked" | "unblocked" | "partial";
  category: string;
}

const blockedWebsites: BlockedWebsite[] = [
  {
    id: 1,
    url: "example-pirate-site.com",
    domain: "example-pirate-site.com",
    date: "2024-01-15",
    year: 2024,
    reason: "Copyright infringement",
    authority: "Delhi High Court",
    status: "blocked",
    category: "Copyright"
  },
  {
    id: 2,
    url: "political-blog.org",
    domain: "political-blog.org",
    date: "2024-02-20",
    year: 2024,
    reason: "Defamatory content",
    authority: "Supreme Court",
    status: "blocked",
    category: "Defamation"
  },
  {
    id: 3,
    url: "news-site.net",
    domain: "news-site.net",
    date: "2023-11-10",
    year: 2023,
    reason: "Fake news",
    authority: "Ministry of Electronics and IT",
    status: "blocked",
    category: "Misinformation"
  },
  {
    id: 4,
    url: "social-media-platform.in",
    domain: "social-media-platform.in",
    date: "2023-09-05",
    year: 2023,
    reason: "Non-compliance with IT Rules",
    authority: "Ministry of Electronics and IT",
    status: "partial",
    category: "Compliance"
  },
  {
    id: 5,
    url: "torrent-site.io",
    domain: "torrent-site.io",
    date: "2024-03-12",
    year: 2024,
    reason: "Copyright violation",
    authority: "Bombay High Court",
    status: "blocked",
    category: "Copyright"
  },
  {
    id: 6,
    url: "gaming-platform.com",
    domain: "gaming-platform.com",
    date: "2022-07-18",
    year: 2022,
    reason: "Security concerns",
    authority: "Cybersecurity Agency",
    status: "blocked",
    category: "Security"
  },
  {
    id: 7,
    url: "file-sharing.net",
    domain: "file-sharing.net",
    date: "2023-05-22",
    year: 2023,
    reason: "Piracy facilitation",
    authority: "Copyright Office",
    status: "blocked",
    category: "Copyright"
  },
  {
    id: 8,
    url: "controversial-blog.co.in",
    domain: "controversial-blog.co.in",
    date: "2024-04-08",
    year: 2024,
    reason: "Hate speech",
    authority: "State Police",
    status: "blocked",
    category: "Hate Speech"
  },
];

// Year-wise blocking data
const yearlyBlockingData = [
  { year: 2020, blocked: 1245, unblocked: 45, partial: 12 },
  { year: 2021, blocked: 1567, unblocked: 67, partial: 18 },
  { year: 2022, blocked: 1834, unblocked: 89, partial: 23 },
  { year: 2023, blocked: 2156, unblocked: 112, partial: 34 },
  { year: 2024, blocked: 1890, unblocked: 98, partial: 28 },
];

// Category distribution
const categoryData = [
  { name: "Copyright", value: 2456, color: "hsl(var(--chart-1))" },
  { name: "Misinformation", value: 1834, color: "hsl(var(--chart-2))" },
  { name: "Defamation", value: 1234, color: "hsl(var(--chart-3))" },
  { name: "Hate Speech", value: 892, color: "hsl(var(--chart-4))" },
  { name: "Security", value: 678, color: "hsl(var(--chart-5))" },
  { name: "Compliance", value: 456, color: "hsl(var(--muted-foreground))" },
];

// Authority distribution
const authorityData = [
  { authority: "High Courts", count: 3421 },
  { authority: "MEITy", count: 2845 },
  { authority: "Supreme Court", count: 1123 },
  { authority: "State Police", count: 892 },
  { authority: "Other", count: 456 },
];

const BlockedWebsites = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedWebsite, setSelectedWebsite] = useState<BlockedWebsite | null>(null);
  const [selectedChartPoint, setSelectedChartPoint] = useState<string | null>(null);

  const filteredWebsites = blockedWebsites.filter((site) => {
    const matchesSearch = 
      site.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === "all" || site.year.toString() === selectedYear;
    const matchesCategory = selectedCategory === "all" || site.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || site.status === selectedStatus;
    
    return matchesSearch && matchesYear && matchesCategory && matchesStatus;
  });

  const totalBlocked = blockedWebsites.filter(s => s.status === "blocked").length;
  const totalUnblocked = blockedWebsites.filter(s => s.status === "unblocked").length;
  const totalPartial = blockedWebsites.filter(s => s.status === "partial").length;
  const totalSites = blockedWebsites.length;

  const handleChartClick = (data: any, chartType: string) => {
    if (chartType === "year") {
      setSelectedYear(data.year.toString());
    } else if (chartType === "category") {
      setSelectedCategory(data.name);
      setSelectedChartPoint(data.name);
    } else if (chartType === "authority") {
      setSelectedChartPoint(data.authority);
    }
  };

  // Get websites for selected chart point
  const getWebsitesForChartPoint = () => {
    if (selectedChartPoint) {
      if (selectedCategory !== "all") {
        return blockedWebsites.filter(s => s.category === selectedCategory);
      }
    }
    return filteredWebsites;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            404: Website-Not-Found Archive
          </h1>
          <p className="text-muted-foreground">
            Comprehensive database of blocked websites, takedowns, and access restrictions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Blocked"
            value={totalBlocked}
            icon={Ban}
            description="Fully blocked sites"
          />
          <StatsCard
            title="Partially Blocked"
            value={totalPartial}
            icon={AlertTriangle}
            description="Limited access"
          />
          <StatsCard
            title="Total Sites"
            value={totalSites}
            icon={Globe}
            description="Documented cases"
          />
          <StatsCard
            title="Unblocked"
            value={totalUnblocked}
            icon={Link2}
            description="Previously blocked"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Year-wise Blocking Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Blocking Trends Over Time</CardTitle>
              <CardDescription>Website blocks by year with linked data</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearlyBlockingData}>
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
                    dataKey="blocked" 
                    fill="hsl(var(--destructive))"
                    name="Blocked"
                    onClick={(data) => handleChartClick(data, "year")}
                    style={{ cursor: "pointer" }}
                  />
                  <Bar 
                    dataKey="unblocked" 
                    fill="hsl(var(--chart-2))"
                    name="Unblocked"
                    onClick={(data) => handleChartClick(data, "year")}
                    style={{ cursor: "pointer" }}
                  />
                  <Bar 
                    dataKey="partial" 
                    fill="hsl(var(--chart-3))"
                    name="Partial"
                    onClick={(data) => handleChartClick(data, "year")}
                    style={{ cursor: "pointer" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Blocking by Category</CardTitle>
              <CardDescription>Distribution of blocking reasons</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data) => handleChartClick(data, "category")}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Authority Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Blocking by Authority</CardTitle>
            <CardDescription>Number of blocks ordered by different authorities</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={authorityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="authority" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="hsl(var(--chart-1))"
                  name="Count"
                  onClick={(data) => handleChartClick(data, "authority")}
                  style={{ cursor: "pointer" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by URL, domain, or reason..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {[...new Set(blockedWebsites.map(s => s.year))].sort((a, b) => b - a).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Shield className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {[...new Set(blockedWebsites.map(s => s.category))].map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Linked Table - Shows data points from charts */}
        {(selectedChartPoint || selectedCategory !== "all") && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                Websites for {selectedCategory !== "all" ? selectedCategory : selectedChartPoint}
              </CardTitle>
              <CardDescription>
                Linked data from chart selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Authority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getWebsitesForChartPoint().map((site) => (
                      <TableRow key={site.id}>
                        <TableCell className="font-medium">{site.domain}</TableCell>
                        <TableCell>
                          {new Date(site.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{site.reason}</TableCell>
                        <TableCell>{site.authority}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              site.status === "blocked" ? "destructive" :
                              site.status === "unblocked" ? "default" :
                              "secondary"
                            }
                          >
                            {site.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedWebsite(site)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Blocked Websites Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Blocked Websites</CardTitle>
            <CardDescription>
              Showing {filteredWebsites.length} of {blockedWebsites.length} documented cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Authority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredWebsites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="font-medium">{site.domain}</TableCell>
                      <TableCell>
                        {new Date(site.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                      <TableCell>{site.year}</TableCell>
                      <TableCell>{site.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{site.category}</Badge>
                      </TableCell>
                      <TableCell>{site.authority}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            site.status === "blocked" ? "destructive" :
                            site.status === "unblocked" ? "default" :
                            "secondary"
                          }
                        >
                          {site.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedWebsite(site)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{selectedWebsite?.domain || site.domain}</DialogTitle>
                              <DialogDescription>
                                Detailed information about the website blocking
                              </DialogDescription>
                            </DialogHeader>
                            {selectedWebsite && (
                              <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">URL</p>
                                    <p className="text-base">{selectedWebsite.url}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Domain</p>
                                    <p className="text-base">{selectedWebsite.domain}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                                    <p className="text-base">
                                      {new Date(selectedWebsite.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                                    <Badge 
                                      variant={
                                        selectedWebsite.status === "blocked" ? "destructive" :
                                        selectedWebsite.status === "unblocked" ? "default" :
                                        "secondary"
                                      }
                                    >
                                      {selectedWebsite.status}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Reason</p>
                                    <p className="text-base">{selectedWebsite.reason}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                                    <Badge variant="outline">{selectedWebsite.category}</Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Authority</p>
                                    <p className="text-base">{selectedWebsite.authority}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                                    <p className="text-base">{selectedWebsite.year}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredWebsites.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No websites found matching your search criteria.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockedWebsites;

