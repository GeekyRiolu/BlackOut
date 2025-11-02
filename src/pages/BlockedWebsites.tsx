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
import { useState, useEffect } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  // Existing examples (kept)
  { id: 1, url: "example-pirate-site.com", domain: "example-pirate-site.com", date: "2024-01-15", year: 2024, reason: "Copyright infringement", authority: "Delhi High Court", status: "blocked", category: "Copyright" },
  { id: 2, url: "political-blog.org", domain: "political-blog.org", date: "2024-02-20", year: 2024, reason: "Defamatory content", authority: "Supreme Court", status: "blocked", category: "Defamation" },
  { id: 3, url: "news-site.net", domain: "news-site.net", date: "2023-11-10", year: 2023, reason: "Fake news", authority: "Ministry of Electronics and IT", status: "blocked", category: "Misinformation" },
  { id: 4, url: "social-media-platform.in", domain: "social-media-platform.in", date: "2023-09-05", year: 2023, reason: "Non-compliance with IT Rules", authority: "Ministry of Electronics and IT", status: "partial", category: "Compliance" },
  { id: 5, url: "torrent-site.io", domain: "torrent-site.io", date: "2024-03-12", year: 2024, reason: "Copyright violation", authority: "Bombay High Court", status: "blocked", category: "Copyright" },
  { id: 6, url: "gaming-platform.com", domain: "gaming-platform.com", date: "2022-07-18", year: 2022, reason: "Security concerns", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 7, url: "file-sharing.net", domain: "file-sharing.net", date: "2023-05-22", year: 2023, reason: "Piracy facilitation", authority: "Copyright Office", status: "blocked", category: "Copyright" },
  { id: 8, url: "controversial-blog.co.in", domain: "controversial-blog.co.in", date: "2024-04-08", year: 2024, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },

  // Additional generated entries (fill to ~55)
  { id: 9, url: "archive-press.com", domain: "archive-press.com", date: "2019-02-11", year: 2019, reason: "Misinformation", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 10, url: "piratebay-copy.org", domain: "piratebay-copy.org", date: "2019-03-05", year: 2019, reason: "Piracy", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 11, url: "radical-opinion.in", domain: "radical-opinion.in", date: "2019-06-21", year: 2019, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 12, url: "leak-site.net", domain: "leak-site.net", date: "2019-08-14", year: 2019, reason: "Data leak", authority: "Cybersecurity Agency", status: "partial", category: "Security" },
  { id: 13, url: "fake-news-hub.com", domain: "fake-news-hub.com", date: "2020-01-30", year: 2020, reason: "Fake news", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 14, url: "defame-now.org", domain: "defame-now.org", date: "2020-02-18", year: 2020, reason: "Defamatory content", authority: "Civil Court", status: "blocked", category: "Defamation" },
  { id: 15, url: "stream-steal.io", domain: "stream-steal.io", date: "2020-05-26", year: 2020, reason: "Piracy", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 16, url: "malware-drop.com", domain: "malware-drop.com", date: "2020-07-12", year: 2020, reason: "Security threat", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 17, url: "provocateur.in", domain: "provocateur.in", date: "2020-09-01", year: 2020, reason: "Incitement", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 18, url: "forum-shutdown.net", domain: "forum-shutdown.net", date: "2021-03-10", year: 2021, reason: "Non-compliance", authority: "MEITy", status: "partial", category: "Compliance" },
  { id: 19, url: "copyright-claim.org", domain: "copyright-claim.org", date: "2021-04-22", year: 2021, reason: "Copyright", authority: "Copyright Office", status: "blocked", category: "Copyright" },
  { id: 20, url: "hoax-portal.com", domain: "hoax-portal.com", date: "2021-06-30", year: 2021, reason: "Misinformation", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 21, url: "anon-share.io", domain: "anon-share.io", date: "2021-08-14", year: 2021, reason: "Piracy", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 22, url: "phish-zone.com", domain: "phish-zone.com", date: "2021-10-19", year: 2021, reason: "Phishing", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 23, url: "state-hate.org", domain: "state-hate.org", date: "2022-01-05", year: 2022, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 24, url: "unverified-news.net", domain: "unverified-news.net", date: "2022-02-11", year: 2022, reason: "Fake news", authority: "MEITy", status: "partial", category: "Misinformation" },
  { id: 25, url: "leaked-docs.io", domain: "leaked-docs.io", date: "2022-03-22", year: 2022, reason: "Privacy breach", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 26, url: "copycat-streams.com", domain: "copycat-streams.com", date: "2022-05-08", year: 2022, reason: "Piracy", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 27, url: "offensive-posts.org", domain: "offensive-posts.org", date: "2022-07-19", year: 2022, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 28, url: "untruths.com", domain: "untruths.com", date: "2022-09-25", year: 2022, reason: "Misinformation", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 29, url: "forum-breach.net", domain: "forum-breach.net", date: "2023-01-02", year: 2023, reason: "Security vulnerability", authority: "Cybersecurity Agency", status: "partial", category: "Security" },
  { id: 30, url: "libel-now.com", domain: "libel-now.com", date: "2023-02-14", year: 2023, reason: "Defamation", authority: "Civil Court", status: "blocked", category: "Defamation" },
  { id: 31, url: "old-archive.org", domain: "old-archive.org", date: "2023-03-28", year: 2023, reason: "Copyright complaint", authority: "Copyright Office", status: "blocked", category: "Copyright" },
  { id: 32, url: "danger-file.com", domain: "danger-file.com", date: "2023-04-18", year: 2023, reason: "Malware distribution", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 33, url: "rumor-mill.co", domain: "rumor-mill.co", date: "2023-06-04", year: 2023, reason: "Misinformation", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 34, url: "provocative-views.in", domain: "provocative-views.in", date: "2023-07-21", year: 2023, reason: "Incitement", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 35, url: "copy-lawyers.com", domain: "copy-lawyers.com", date: "2023-08-30", year: 2023, reason: "Copyright", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 36, url: "neutral-news.org", domain: "neutral-news.org", date: "2024-01-11", year: 2024, reason: "Policy breach", authority: "MEITy", status: "partial", category: "Compliance" },
  { id: 37, url: "attack-vector.net", domain: "attack-vector.net", date: "2024-02-25", year: 2024, reason: "DDoS tools", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 38, url: "celebrity-gossip.com", domain: "celebrity-gossip.com", date: "2024-03-05", year: 2024, reason: "Defamation", authority: "Civil Court", status: "blocked", category: "Defamation" },
  { id: 39, url: "pirate-links.org", domain: "pirate-links.org", date: "2024-04-17", year: 2024, reason: "Piracy", authority: "Copyright Office", status: "blocked", category: "Copyright" },
  { id: 40, url: "hate-camp.in", domain: "hate-camp.in", date: "2024-05-29", year: 2024, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 41, url: "malicious-tools.io", domain: "malicious-tools.io", date: "2024-06-18", year: 2024, reason: "Malware", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 42, url: "policy-evade.co", domain: "policy-evade.co", date: "2024-07-09", year: 2024, reason: "Non-compliance", authority: "MEITy", status: "partial", category: "Compliance" },
  { id: 43, url: "deepfake-videos.com", domain: "deepfake-videos.com", date: "2025-01-12", year: 2025, reason: "Synthetic misinformation", authority: "MEITy", status: "blocked", category: "Misinformation" },
  { id: 44, url: "stolen-data.net", domain: "stolen-data.net", date: "2025-02-20", year: 2025, reason: "Data leak", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 45, url: "copyright-claim2.org", domain: "copyright-claim2.org", date: "2025-03-30", year: 2025, reason: "Piracy", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 46, url: "defame-again.com", domain: "defame-again.com", date: "2025-04-15", year: 2025, reason: "Defamation", authority: "Civil Court", status: "blocked", category: "Defamation" },
  { id: 47, url: "old-rumors.co", domain: "old-rumors.co", date: "2025-05-06", year: 2025, reason: "Misinformation", authority: "MEITy", status: "partial", category: "Misinformation" },
  { id: 48, url: "pirate-haven.io", domain: "pirate-haven.io", date: "2025-06-22", year: 2025, reason: "Piracy", authority: "Copyright Office", status: "blocked", category: "Copyright" },
  { id: 49, url: "spam-network.com", domain: "spam-network.com", date: "2025-07-18", year: 2025, reason: "Spam/phishing", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 50, url: "controversy-blog.in", domain: "controversy-blog.in", date: "2025-08-09", year: 2025, reason: "Hate speech", authority: "State Police", status: "blocked", category: "Hate Speech" },
  { id: 51, url: "policy-issue.net", domain: "policy-issue.net", date: "2025-09-02", year: 2025, reason: "Non-compliance", authority: "MEITy", status: "partial", category: "Compliance" },
  { id: 52, url: "mirror-site.org", domain: "mirror-site.org", date: "2025-09-28", year: 2025, reason: "Mirror of infringing content", authority: "High Courts", status: "blocked", category: "Copyright" },
  { id: 53, url: "attack-kit.io", domain: "attack-kit.io", date: "2025-10-11", year: 2025, reason: "Tools for attacks", authority: "Cybersecurity Agency", status: "blocked", category: "Security" },
  { id: 54, url: "celebrity-smear.com", domain: "celebrity-smear.com", date: "2025-10-30", year: 2025, reason: "Defamation", authority: "Civil Court", status: "blocked", category: "Defamation" },
  { id: 55, url: "legacy-pirate.net", domain: "legacy-pirate.net", date: "2025-11-01", year: 2025, reason: "Piracy", authority: "Copyright Office", status: "blocked", category: "Copyright" },
];

// Compute aggregates from the dataset so charts/filters always match the data
const years = Array.from(new Set(blockedWebsites.map(s => s.year))).sort((a,b) => a - b);

const yearlyBlockingData = years.map((y) => {
  const items = blockedWebsites.filter(s => s.year === y);
  return {
    year: y,
    blocked: items.filter(i => i.status === 'blocked').length,
    unblocked: items.filter(i => i.status === 'unblocked').length,
    partial: items.filter(i => i.status === 'partial').length,
  };
});

// Category distribution (name, value, color)
const palette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--muted-foreground))',
];

const categoryCounts: Record<string, number> = {};
blockedWebsites.forEach(s => { categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1; });
const categoryData = Object.entries(categoryCounts).map(([name, value], idx) => ({ name, value, color: palette[idx % palette.length] }));

// Authority distribution
const authorityCounts: Record<string, number> = {};
blockedWebsites.forEach(s => { authorityCounts[s.authority] = (authorityCounts[s.authority] || 0) + 1; });
const authorityData = Object.entries(authorityCounts).map(([authority, count]) => ({ authority, count }));

const BlockedWebsites = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedCategory, selectedStatus]);

  const totalFiltered = filteredWebsites.length;
  const pageCount = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));
  const pagedWebsites = filteredWebsites.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
                    {pagedWebsites.map((site) => (
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
              {/* Pagination controls for main table */}
              {filteredWebsites.length > 0 && (
                <div className="flex items-center justify-end mt-4">
                  <Pagination>
                    <PaginationPrevious onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                    <PaginationContent className="mx-4">
                      {Array.from({ length: pageCount }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                    <PaginationNext onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))} />
                  </Pagination>
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

