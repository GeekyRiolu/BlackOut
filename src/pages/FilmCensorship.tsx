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
  Film, 
  Calendar,
  User,
  Scissors,
  AlertCircle,
  FileText,
  TrendingUp,
  Scale
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Sample CBFC film data
interface FilmCensorshipCase {
  id: number;
  title: string;
  producer: string;
  director: string;
  year: number;
  date: string;
  cuts: string[];
  reasons: string[];
  appeals: {
    filed: boolean;
    date?: string;
    status?: "pending" | "approved" | "rejected";
  };
  finalDecision: "passed" | "passed_with_cuts" | "rejected";
  certificate: string;
}

const filmCases: FilmCensorshipCase[] = [
  {
    id: 1,
    title: "Udta Punjab",
    producer: "Phantom Films",
    director: "Abhishek Chaubey",
    year: 2016,
    date: "2016-05-15",
    cuts: ["Dialogues related to drug abuse", "Scene showing substance consumption"],
    reasons: ["Drug-related content", "Potential negative influence"],
    appeals: {
      filed: true,
      date: "2016-06-01",
      status: "approved"
    },
    finalDecision: "passed_with_cuts",
    certificate: "A"
  },
  {
    id: 2,
    title: "Padmaavat",
    producer: "Bhansali Productions",
    director: "Sanjay Leela Bhansali",
    year: 2018,
    date: "2017-11-20",
    cuts: ["Scene involving historical characters"],
    reasons: ["Historical representation concerns", "Community sentiments"],
    appeals: {
      filed: true,
      date: "2018-01-10",
      status: "approved"
    },
    finalDecision: "passed_with_cuts",
    certificate: "U/A"
  },
  {
    id: 3,
    title: "Lipstick Under My Burkha",
    producer: "Prakash Jha Productions",
    director: "Alankrita Shrivastava",
    year: 2017,
    date: "2017-01-20",
    cuts: [],
    reasons: ["Content deemed inappropriate", "Sexual content"],
    appeals: {
      filed: true,
      date: "2017-03-15",
      status: "approved"
    },
    finalDecision: "passed",
    certificate: "A"
  },
  {
    id: 4,
    title: "PK",
    producer: "Rajkumar Hirani Films",
    director: "Rajkumar Hirani",
    year: 2014,
    date: "2014-11-10",
    cuts: ["Religious references"],
    reasons: ["Religious sentiments"],
    appeals: {
      filed: false
    },
    finalDecision: "passed_with_cuts",
    certificate: "U/A"
  },
  {
    id: 5,
    title: "Ae Dil Hai Mushkil",
    producer: "Fox Star Studios",
    director: "Karan Johar",
    year: 2016,
    date: "2016-09-15",
    cuts: ["Cast member appearance"],
    reasons: ["Political considerations"],
    appeals: {
      filed: true,
      date: "2016-10-01",
      status: "approved"
    },
    finalDecision: "passed_with_cuts",
    certificate: "U/A"
  },
];

// Year-wise data for timeline
const yearlyCensorshipData = [
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

const FilmCensorship = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedDecision, setSelectedDecision] = useState("all");
  const [selectedCase, setSelectedCase] = useState<FilmCensorshipCase | null>(null);

  const filteredCases = filmCases.filter((film) => {
    const matchesSearch = 
      film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      film.reasons.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesYear = selectedYear === "all" || film.year.toString() === selectedYear;
    const matchesDecision = selectedDecision === "all" || film.finalDecision === selectedDecision;
    
    return matchesSearch && matchesYear && matchesDecision;
  });

  const totalFilms = filmCases.length;
  const withCuts = filmCases.filter(f => f.finalDecision === "passed_with_cuts").length;
  const passed = filmCases.filter(f => f.finalDecision === "passed").length;
  const appeals = filmCases.filter(f => f.appeals.filed).length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Film Censorship Module
          </h1>
          <p className="text-muted-foreground">
            Comprehensive database of CBFC interventions, cuts, appeals, and final decisions
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Films"
            value={totalFilms}
            icon={Film}
            description="Documented cases"
          />
          <StatsCard
            title="With Cuts"
            value={withCuts}
            icon={Scissors}
            description="Modified before release"
          />
          <StatsCard
            title="Appeals Filed"
            value={appeals}
            icon={Scale}
            description="Challenged decisions"
          />
          <StatsCard
            title="Cleared Films"
            value={passed}
            icon={FileText}
            description="Passed without cuts"
          />
        </div>

        {/* Timeline Visualization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>CBFC Interventions Over Time</CardTitle>
            <CardDescription>
              Timeline visualization showing censorship trends, cuts, and decisions by year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={yearlyCensorshipData}>
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
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--chart-1))" 
                  strokeWidth={3}
                  name="Total Films"
                />
                <Line 
                  type="monotone" 
                  dataKey="passed" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={2}
                  name="Passed"
                />
                <Line 
                  type="monotone" 
                  dataKey="withCuts" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={2}
                  name="With Cuts"
                />
                <Line 
                  type="monotone" 
                  dataKey="rejected" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name="Rejected"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative md:col-span-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, producer, or reason..."
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
                  {[...new Set(filmCases.map(f => f.year))].sort((a, b) => b - a).map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDecision} onValueChange={setSelectedDecision}>
                <SelectTrigger>
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Decisions</SelectItem>
                  <SelectItem value="passed">Passed</SelectItem>
                  <SelectItem value="passed_with_cuts">Passed with Cuts</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Film Cases Table */}
        <Card>
          <CardHeader>
            <CardTitle>CBFC Cases</CardTitle>
            <CardDescription>
              Showing {filteredCases.length} of {filmCases.length} documented cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Film Title</TableHead>
                    <TableHead>Producer</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Cuts</TableHead>
                    <TableHead>Reasons</TableHead>
                    <TableHead>Appeal</TableHead>
                    <TableHead>Decision</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((film) => (
                    <TableRow key={film.id}>
                      <TableCell className="font-medium">{film.title}</TableCell>
                      <TableCell>{film.producer}</TableCell>
                      <TableCell>{film.year}</TableCell>
                      <TableCell>
                        {film.cuts.length > 0 ? (
                          <Badge variant="outline">{film.cuts.length} cut(s)</Badge>
                        ) : (
                          <span className="text-muted-foreground">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {film.reasons.slice(0, 2).map((reason, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                          {film.reasons.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{film.reasons.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {film.appeals.filed ? (
                          <Badge 
                            variant={
                              film.appeals.status === "approved" ? "default" :
                              film.appeals.status === "rejected" ? "destructive" :
                              "secondary"
                            }
                          >
                            {film.appeals.status || "Pending"}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            film.finalDecision === "passed" ? "default" :
                            film.finalDecision === "passed_with_cuts" ? "secondary" :
                            "destructive"
                          }
                        >
                          {film.finalDecision === "passed_with_cuts" ? "With Cuts" :
                           film.finalDecision === "passed" ? "Passed" : "Rejected"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedCase(film)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>{selectedCase?.title || film.title}</DialogTitle>
                              <DialogDescription>
                                Detailed information about CBFC intervention
                              </DialogDescription>
                            </DialogHeader>
                            {selectedCase && (
                              <div className="space-y-6 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Producer</p>
                                    <p className="text-base">{selectedCase.producer}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Director</p>
                                    <p className="text-base">{selectedCase.director}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Year</p>
                                    <p className="text-base">{selectedCase.year}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Certificate</p>
                                    <Badge>{selectedCase.certificate}</Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Date</p>
                                    <p className="text-base">
                                      {new Date(selectedCase.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Final Decision</p>
                                    <Badge 
                                      variant={
                                        selectedCase.finalDecision === "passed" ? "default" :
                                        selectedCase.finalDecision === "passed_with_cuts" ? "secondary" :
                                        "destructive"
                                      }
                                    >
                                      {selectedCase.finalDecision === "passed_with_cuts" ? "Passed with Cuts" :
                                       selectedCase.finalDecision === "passed" ? "Passed" : "Rejected"}
                                    </Badge>
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Cuts Requested</p>
                                  {selectedCase.cuts.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-1">
                                      {selectedCase.cuts.map((cut, idx) => (
                                        <li key={idx} className="text-base">{cut}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    <p className="text-base text-muted-foreground">No cuts requested</p>
                                  )}
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Reasons for Intervention</p>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedCase.reasons.map((reason, idx) => (
                                      <Badge key={idx} variant="secondary">{reason}</Badge>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium text-muted-foreground mb-2">Appeal Status</p>
                                  {selectedCase.appeals.filed ? (
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Badge 
                                          variant={
                                            selectedCase.appeals.status === "approved" ? "default" :
                                            selectedCase.appeals.status === "rejected" ? "destructive" :
                                            "secondary"
                                          }
                                        >
                                          {selectedCase.appeals.status || "Pending"}
                                        </Badge>
                                        {selectedCase.appeals.date && (
                                          <span className="text-sm text-muted-foreground">
                                            Filed: {new Date(selectedCase.appeals.date).toLocaleDateString()}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="text-base text-muted-foreground">No appeal filed</p>
                                  )}
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
              {filteredCases.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-muted-foreground">
                    No cases found matching your search criteria.
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

export default FilmCensorship;

