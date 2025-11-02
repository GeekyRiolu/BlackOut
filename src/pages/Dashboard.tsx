import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Globe,
  MapPin,
  X,
  Filter
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from "recharts";

// Incident data structure
interface Incident {
  id: number;
  title: string;
  date: string;
  year: number;
  state: string;
  district?: string;
  platform: string;
  authority: string;
  category: string;
  reason: string;
}

const yearlyData = [
  { year: "2019", incidents: 1842 },
  { year: "2020", incidents: 2156 },
  { year: "2021", incidents: 2834 },
  { year: "2022", incidents: 3124 },
  { year: "2023", incidents: 2891 },
  { year: "2024", incidents: 2456 },
];

const categoryData = [
  { name: "Misinformation", value: 4523, color: "hsl(var(--chart-1))" },
  { name: "Political Content", value: 3214, color: "hsl(var(--chart-2))" },
  { name: "Hate Speech", value: 2156, color: "hsl(var(--chart-3))" },
  { name: "National Security", value: 1834, color: "hsl(var(--chart-4))" },
  { name: "Defamation", value: 1456, color: "hsl(var(--chart-5))" },
  { name: "Copyright", value: 1120, color: "hsl(var(--muted-foreground))" },
];

const platformData = [
  { platform: "Twitter/X", count: 4234 },
  { platform: "Facebook", count: 3456 },
  { platform: "YouTube", count: 2134 },
  { platform: "Instagram", count: 1678 },
  { platform: "Websites", count: 1345 },
];

// State-wise data for geo-mapping
const stateData = [
  { state: "Maharashtra", incidents: 2845, x: 10, y: 15 },
  { state: "Delhi", incidents: 2456, x: 8, y: 8 },
  { state: "Karnataka", incidents: 2134, x: 7, y: 12 },
  { state: "Tamil Nadu", incidents: 1987, x: 9, y: 18 },
  { state: "West Bengal", incidents: 1876, x: 10, y: 11 },
  { state: "Uttar Pradesh", incidents: 1756, x: 9, y: 9 },
  { state: "Gujarat", incidents: 1645, x: 7, y: 13 },
  { state: "Kerala", incidents: 1543, x: 8, y: 17 },
  { state: "Rajasthan", incidents: 1432, x: 7, y: 10 },
  { state: "Telangana", incidents: 1321, x: 8, y: 14 },
];

// Sample incident data
const allIncidents: Incident[] = [
  { id: 1, title: "Twitter posts removed in Maharashtra", date: "2024-10-15", year: 2024, state: "Maharashtra", district: "Mumbai", platform: "Twitter/X", authority: "MEITy", category: "Misinformation", reason: "False information about health" },
  { id: 2, title: "YouTube channel blocked in Delhi", date: "2024-10-12", year: 2024, state: "Delhi", platform: "YouTube", authority: "Ministry of I&B", category: "Political Content", reason: "Political misinformation" },
  { id: 3, title: "Facebook page removed in Karnataka", date: "2024-10-08", year: 2024, state: "Karnataka", district: "Bangalore", platform: "Facebook", authority: "State Police", category: "Hate Speech", reason: "Hate speech allegations" },
  { id: 4, title: "Website blocked in Tamil Nadu", date: "2024-10-05", year: 2024, state: "Tamil Nadu", district: "Chennai", platform: "Website", authority: "High Court", category: "Defamation", reason: "Defamatory content" },
  { id: 5, title: "Instagram account suspended in West Bengal", date: "2024-09-28", year: 2024, state: "West Bengal", platform: "Instagram", authority: "MEITy", category: "National Security", reason: "Security concerns" },
  { id: 6, title: "Social media posts removed in UP", date: "2024-09-20", year: 2024, state: "Uttar Pradesh", district: "Lucknow", platform: "Twitter/X", authority: "State Police", category: "Misinformation", reason: "False news" },
];

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const filteredIncidents = allIncidents.filter((incident) => {
    const matchesYear = !selectedYear || incident.year.toString() === selectedYear;
    const matchesCategory = !selectedCategory || incident.category === selectedCategory;
    const matchesPlatform = !selectedPlatform || incident.platform === selectedPlatform;
    const matchesState = !selectedState || incident.state === selectedState;
    return matchesYear && matchesCategory && matchesPlatform && matchesState;
  });

  const handleChartClick = (data: any, chartType: string) => {
    if (chartType === "year") {
      setSelectedYear(data.year === selectedYear ? null : data.year);
    } else if (chartType === "category") {
      setSelectedCategory(data.name === selectedCategory ? null : data.name);
    } else if (chartType === "platform") {
      setSelectedPlatform(data.platform === selectedPlatform ? null : data.platform);
    } else if (chartType === "state") {
      setSelectedState(data.state === selectedState ? null : data.state);
    }
  };

  const clearFilters = () => {
    setSelectedYear(null);
    setSelectedCategory(null);
    setSelectedPlatform(null);
    setSelectedState(null);
  };

  const activeFilters = [
    selectedYear && `Year: ${selectedYear}`,
    selectedCategory && `Category: ${selectedCategory}`,
    selectedPlatform && `Platform: ${selectedPlatform}`,
    selectedState && `State: ${selectedState}`,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Graphical Trend Dashboard
          </h1>
          <p className="text-muted-foreground">
            Interactive visualizations - click charts to filter data table. Click again to clear.
          </p>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Active Filters:</span>
                  {activeFilters.map((filter, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      {filter}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => {
                          if (filter?.startsWith("Year:")) setSelectedYear(null);
                          if (filter?.startsWith("Category:")) setSelectedCategory(null);
                          if (filter?.startsWith("Platform:")) setSelectedPlatform(null);
                          if (filter?.startsWith("State:")) setSelectedState(null);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Incidents"
            value="12,847"
            icon={FileText}
            trend={{ value: "+23%", isPositive: false }}
          />
          <StatsCard
            title="This Year"
            value="2,456"
            icon={TrendingUp}
          />
          <StatsCard
            title="Active Cases"
            value="342"
            icon={AlertTriangle}
          />
          <StatsCard
            title="States Affected"
            value="28"
            icon={Globe}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Yearly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Yearly Incident Trends</CardTitle>
              <CardDescription>Number of documented incidents per year</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearlyData}>
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
                    dataKey="incidents" 
                    fill="hsl(var(--chart-1))"
                    name="Incidents"
                    onClick={(data) => handleChartClick(data, "year")}
                    style={{ cursor: "pointer" }}
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click bars to filter by year
              </p>
            </CardContent>
          </Card>

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Incidents by platform/medium</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="platform" 
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
                    fill="hsl(var(--chart-2))"
                    name="Count"
                    onClick={(data) => handleChartClick(data, "platform")}
                    style={{ cursor: "pointer" }}
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Click bars to filter by platform
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Reasons Visualization - Pie Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reasons for Takedowns</CardTitle>
            <CardDescription>Distribution of incidents by stated reason - Click slices to filter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
              
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedCategory === category.name 
                        ? "bg-primary/10 border-2 border-primary" 
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    onClick={() => handleChartClick({ name: category.name }, "category")}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {category.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Geo-Mapping - State Hotspots */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>State-wise incident hotspots - Click points to filter by state</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bubble Chart representing states */}
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Longitude"
                    stroke="hsl(var(--muted-foreground))"
                    hide
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Latitude"
                    stroke="hsl(var(--muted-foreground))"
                    hide
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload[0]) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                            <p className="font-semibold">{data.state}</p>
                            <p className="text-sm text-muted-foreground">
                              {data.incidents.toLocaleString()} incidents
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    data={stateData} 
                    fill="hsl(var(--chart-1))"
                    onClick={(data) => handleChartClick(data, "state")}
                  >
                    {stateData.map((entry, index) => {
                      const size = Math.sqrt(entry.incidents / 10);
                      return (
                        <Cell 
                          key={`cell-${index}`}
                          style={{ cursor: "pointer" }}
                        />
                      );
                    })}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              {/* State list with incident counts */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  Click states to filter data
                </p>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {stateData
                    .sort((a, b) => b.incidents - a.incidents)
                    .map((state, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer ${
                          selectedState === state.state
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-muted/50 hover:bg-muted"
                        }`}
                        onClick={() => handleChartClick({ state: state.state }, "state")}
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">{state.state}</span>
                        </div>
                        <Badge variant="secondary">{state.incidents.toLocaleString()}</Badge>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtered Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Filtered Incidents</CardTitle>
            <CardDescription>
              {filteredIncidents.length} incident(s) matching current filters. Click charts above to filter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Authority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.length > 0 ? (
                    filteredIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-medium">{incident.title}</TableCell>
                        <TableCell>
                          {new Date(incident.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{incident.state}</TableCell>
                        <TableCell>{incident.platform}</TableCell>
                        <TableCell>{incident.authority}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{incident.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{incident.reason}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No incidents match the current filters. Click on charts above to apply filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
