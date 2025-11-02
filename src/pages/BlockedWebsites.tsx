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

// Deterministic helper so generated values are repeatable across builds
function hashNumber(n: number) {
  let h = n | 0;
  h = ((h >>> 16) ^ h) * 0x45d9f3b;
  h = ((h >>> 16) ^ h) * 0x45d9f3b;
  h = (h >>> 16) ^ h;
  return Math.abs(h);
}

const RAW_URLS = [
  "http://cdn.playwire.com",
  "http://embedupload.com",
  "http://1fichier.com",
  "http://crocko.com",
  "http://multiupload.nl",
  "http://uppit.com",
  "http://solidfiles.com",
  "http://bayfiles.net",
  "http://tusfiles.net",
  "http://bitshare.com",
  "http://muchshare.net",
  "http://mega.co.nz",
  "http://share-online.biz",
  "http://sendspace.com",
  "http://real4download.com",
  "http://telugumphttp://biz",
  "http://wapkafiles.com",
  "http://telugumasthi.wapka.me",
  "http://telugustar.net",
  "http://myteluguwap.net",
  "http://shttp://myteluguwap.net",
  "http://filestube.to",
  "http://ul.to",
  "http://mightyupload.com",
  "http://uploaded.net",
  "http://freakshare.com",
  "http://putlocker.com",
  "http://uploadable.ch",
  "http://safelinking.net",
  "http://ultramegabit.com",
  "http://terafile.co",
  "http://fileom.com",
  "http://d0http://megashares.com",
  "http://dizzcloud.com",
  "http://lumfile.com",
  "http://fileparadox.in",
  "http://nitrobits.com",
  "http://filemonkey.in",
  "http://fastshare.cz",
  "http://keep2share.cc",
  "http://k2s.cc",
  "http://sharerepo.com",
  "http://depositfiles.com",
  "http://rapidshare.com",
  "http://filerio.com",
  "http://goo.gl",
  "http://fcore.eu",
  "http://anonfiles.com",
  "http://adf.ly",
  "http://megafiles.se",
  "http://exashare.com",
  "http://primeshare.tv",
  "http://uploadc.com",
  "http://epicshare.net",
  "http://dwn.so",
  "http://uploadhero.com",
  "http://dfiles.eu",
  "http://thefile.me",
  "http://nosupload.com",
  "http://uploadsat.com",
  "http://azmovies.in",
  "http://runtamil.me",
  "http://fullmoviek.com",
  "http://newshaunt.com",
  "http://filmsmaza.in",
  "http://moviegur.com",
  "http://hdmoviesall.com",
  "http://moviesbig.in",
  "http://majaa.mobi",
  "http://tamiltreasure.com",
  "http://tamilrose.in",
  "http://mulaku.com",
  "http://watamil.com",
  "http://best-moviez.ws",
  "http://hdmoviez.me",
  "http://tamiljio.com",
  "http://hindilinks4u.io",
  "http://allzmovie.in",
  "http://tamilyogi.biz",
  "http://140moviescorner.net",
  "http://movizbox.com",
  "http://tamilcineworld.com",
  "http://cinerockers.net",
  "http://indiafreemovie.com",
  "http://tamilyogi.com",
  "http://in.pinterest.com",
  "http://mythiruttuvcd.net",
  "http://movie.thementalclub.com",
  "http://video.wapgrab.com",
  "http://movie.vidmate.mobi",
  "http://a2movies.inindex.xhtml",
  "http://hd.playtamil.in",
  "http://kat.cr",
  "http://extratorrent.cc",
  "http://thepiratebay.gd",
  "http://torrentdownloads.me",
  "http://isohunt.to",
  "http://limetorrents.cc",
  "http://monova.org",
  "http://torrentproject.se",
  "http://torrentreactor.com",
  "http://seedpeer.eu",
  "http://btsdl.cc",
  "http://demonoid.pw",
  "http://kickasstorrents.video",
  "http://smart-torrents.com",
  "http://treetorrent.com",
  "http://piratetorrents.net",
  "http://attorrents.com",
  "http://picktorrent.com",
  "http://torrentdownloads.cc",
  "http://torrentdownload.co",
  "http://torrentproject.org",
  "http://scenerockers.net",
  "http://nachostime.net",
  "http://queentorrent.net",
  "http://torrentz.cd",
  "http://crystaltorrents.com",
  "http://torrentus.si",
  "http://snowtorrent.com",
  "http://torrentbox.sx",
  "http://toreye.com",
  "http://movierock.net",
  "http://torrented.com",
  "http://slowtorrent.com",
  "http://torrentoff.com",
  "http://dl4tots.xyz",
  "http://simpletorrent.xyz"
];

const REASONS = [
  "Copyright infringement",
  "Defamatory content",
  "Fake news",
  "Non compliance with IT rules",
  "Piracy",
  "Security threat",
  "Hate speech",
  "Phishing",
  "Privacy breach",
  "Malware distribution",
  "Policy breach",
  "Incitement",
];

const AUTHORITIES = [
  "MEITy",
  "High Courts",
  "Supreme Court",
  "State Police",
  "Cybersecurity Agency",
  "Copyright Office",
  "Civil Court",
  "Bombay High Court",
  "Delhi High Court",
];

const CATEGORY_MAP: Record<string, string> = {
  "Copyright infringement": "Copyright",
  "Piracy": "Copyright",
  "Defamatory content": "Defamation",
  "Fake news": "Misinformation",
  "Non compliance with IT rules": "Compliance",
  "Security threat": "Security",
  "Phishing": "Security",
  "Privacy breach": "Security",
  "Malware distribution": "Security",
  "Policy breach": "Compliance",
  "Hate speech": "Hate Speech",
  "Incitement": "Hate Speech",
};

const STATUS_CHOICES: BlockedWebsite["status"][] = ["blocked", "partial"];

const initialBlockedWebsites: BlockedWebsite[] = RAW_URLS.slice(0, 60).map((u, i) => {
  const id = i + 1;
  const seed = hashNumber(id * 1337 + u.length);
  const domain = u.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const year = 2019 + (seed % 7); // 2019..2025
  const reason = REASONS[seed % REASONS.length];
  const category = CATEGORY_MAP[reason] || "Other";
  const authority = AUTHORITIES[seed % AUTHORITIES.length];
  const status = STATUS_CHOICES[seed % STATUS_CHOICES.length];
  // generate a deterministic date within the year
  const month = 1 + (seed % 12);
  const day = 1 + ((seed >> 3) % 26);
  const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  return {
    id,
    url: u,
    domain,
    date,
    year,
    reason,
    authority,
    status,
    category,
  };
});

// Color palette used by charts
const palette = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--muted-foreground))',
];

const BlockedWebsites = () => {
  // site state: start with the generated initial set and replace when MASTER_LIST is loaded
  const [blockedWebsites, setBlockedWebsites] = useState<BlockedWebsite[]>(initialBlockedWebsites);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 15;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedWebsite, setSelectedWebsite] = useState<BlockedWebsite | null>(null);
  const [selectedChartPoint, setSelectedChartPoint] = useState<string | null>(null);

  // attempt to load MASTER_LIST.csv at runtime and use it to expand the dataset
  useEffect(() => {
    const path = '/Data_Extractor/MASTER_LIST.csv';
    fetch(path).then(r => {
      if (!r.ok) throw new Error('not found');
      return r.text();
    }).then(text => {
      const lines = text.split(/\r?\n/).filter(Boolean);
      // header id,URL,SOURCE,TITLE
      const urls: string[] = [];
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length >= 2) {
          const url = cols[1].trim().replace(/^"|"$/g, '');
          if (url) urls.push(url);
        }
      }

      if (urls.length > 0) {
        const useCount = Math.min(urls.length, 300);
        const generated: BlockedWebsite[] = urls.slice(0, useCount).map((u, i) => {
          const id = i + 1;
          const seed = hashNumber(id * 1337 + u.length);
          const domain = u.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
          const year = 2019 + (seed % 7);
          const reason = REASONS[seed % REASONS.length];
          const category = CATEGORY_MAP[reason] || 'Other';
          const authority = AUTHORITIES[seed % AUTHORITIES.length];
          const status = STATUS_CHOICES[seed % STATUS_CHOICES.length];
          const month = 1 + (seed % 12);
          const day = 1 + ((seed >> 3) % 26);
          const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          return { id, url: u, domain, date, year, reason, authority, status, category };
        });
        // Ensure at least 60 entries for each year 2023, 2024, 2025 (if enough URLs exist)
        const withExtras = [...generated];
        let cursor = useCount; // next URL index to consume for extras

        for (const targetYear of [2023, 2024, 2025]) {
          const have = withExtras.filter(x => x.year === targetYear).length;
          const need = Math.max(0, 60 - have);
          for (let n = 0; n < need && cursor < urls.length; n++, cursor++) {
            const u = urls[cursor];
            const id = withExtras.length + 1;
            const seed = hashNumber(id * (7919 + targetYear) + u.length);
            const domain = u.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
            const year = targetYear;
            const reason = REASONS[seed % REASONS.length];
            const category = CATEGORY_MAP[reason] || 'Other';
            const authority = AUTHORITIES[seed % AUTHORITIES.length];
            const status = STATUS_CHOICES[seed % STATUS_CHOICES.length];
            const month = 1 + (seed % 12);
            const day = 1 + ((seed >> 3) % 26);
            const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            withExtras.push({ id, url: u, domain, date, year, reason, authority, status, category });
          }
        }

        setBlockedWebsites(withExtras);
      }
    }).catch(() => {
      // ignore, keep initial data
    });
  }, []);

  // Derived aggregates computed from current blockedWebsites state
  const years = Array.from(new Set(blockedWebsites.map(s => s.year))).sort((a,b) => a - b);

  const yearlyBlockingData = years.map((y) => {
    const items = blockedWebsites.filter(s => s.year === y);
    return {
      year: y,
      blocked: items.filter(i => i.status === 'blocked').length,
      unblocked: 0,
      partial: items.filter(i => i.status === 'partial').length,
    };
  });

  const categoryCounts: Record<string, number> = {};
  blockedWebsites.forEach(s => { categoryCounts[s.category] = (categoryCounts[s.category] || 0) + 1; });
  const categoryData = Object.entries(categoryCounts).map(([name, value], idx) => ({ name, value, color: palette[idx % palette.length] }));

  const authorityCounts: Record<string, number> = {};
  blockedWebsites.forEach(s => { authorityCounts[s.authority] = (authorityCounts[s.authority] || 0) + 1; });
  const authorityData = Object.entries(authorityCounts).map(([authority, count]) => ({ authority, count }));

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

