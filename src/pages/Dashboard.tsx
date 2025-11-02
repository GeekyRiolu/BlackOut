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
import { useState, useMemo } from "react";
import {
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
import OSMMap from "@/components/OSMMap";

const IndiaMapWrapper = (props: any) => <OSMMap {...props} />;
import { incidents, filmCensorshipCases } from "@/data";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Calculate statistics from real data
  const stats = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;
    
    // Get years from dates
    const incidentsThisYear = incidents.filter(inc => {
      const year = new Date(inc.date).getFullYear();
      return year === currentYear;
    }).length;
    
    const incidentsLastYear = incidents.filter(inc => {
      const year = new Date(inc.date).getFullYear();
      return year === lastYear;
    }).length;
    
    const totalIncidents = incidents.length;
    const activeCases = incidents.filter(inc => inc.status === "Pending" || inc.status === "Under Review").length;
    const uniqueStates = new Set(incidents.map(inc => inc.state)).size;
    
    const yearOverYearChange = lastYear > 0 
      ? Math.round(((incidentsThisYear - incidentsLastYear) / incidentsLastYear) * 100)
      : 0;
    
    return {
      total: totalIncidents,
      thisYear: incidentsThisYear,
      activeCases,
      statesAffected: uniqueStates,
      yearOverYearChange,
    };
  }, []);

  // Calculate yearly trends
  const yearlyData = useMemo(() => {
    const yearMap = new Map<string, number>();
    
    incidents.forEach(inc => {
      const year = new Date(inc.date).getFullYear().toString();
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });
    
    // Include film censorship years if they have data
    filmCensorshipCases.forEach(film => {
      const year = film.year.toString();
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });
    
    return Array.from(yearMap.entries())
      .map(([year, incidents]) => ({ year, incidents }))
      .sort((a, b) => a.year.localeCompare(b.year));
  }, []);

  // Calculate platform distribution
  const platformData = useMemo(() => {
    const platformMap = new Map<string, number>();
    
    incidents.forEach(inc => {
      const platform = inc.platform === "Website" ? "Websites" : inc.platform;
      platformMap.set(platform, (platformMap.get(platform) || 0) + 1);
    });
    
    return Array.from(platformMap.entries())
      .map(([platform, count]) => ({ platform, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Calculate category distribution (for pie chart)
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    incidents.forEach((inc) => {
      categoryMap.set(inc.category, (categoryMap.get(inc.category) || 0) + 1);
    });

    // split small categories (<5) into an "Other" bucket
    const major: Array<{ name: string; value: number }> = [];
    let otherTotal = 0;
    Array.from(categoryMap.entries()).forEach(([name, value]) => {
      if (value < 5) otherTotal += value;
      else major.push({ name, value });
    });

    // Sort majors
    major.sort((a, b) => b.value - a.value);

    const colors = [
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "hsl(var(--muted-foreground))",
    ];

    const result: Array<{ name: string; value: number; color: string }> = major.map((m, i) => ({ name: m.name, value: m.value, color: colors[i % colors.length] }));
    if (otherTotal > 0) {
      result.push({ name: "Other", value: otherTotal, color: "hsl(var(--muted-foreground))" });
    }

    return result;
  }, []);

  // Calculate state distribution
  const stateData = useMemo(() => {
    const stateMap = new Map<string, number>();
    
    incidents.forEach(inc => {
      stateMap.set(inc.state, (stateMap.get(inc.state) || 0) + 1);
    });
    
    // Simple x,y coordinates for scatter plot (approximate positions)
    const stateCoords: { [key: string]: { x: number; y: number } } = {
      "Maharashtra": { x: 10, y: 15 },
      "Delhi": { x: 8, y: 8 },
      "Karnataka": { x: 7, y: 12 },
      "Tamil Nadu": { x: 9, y: 18 },
      "West Bengal": { x: 10, y: 11 },
      "Uttar Pradesh": { x: 9, y: 9 },
      "Gujarat": { x: 7, y: 13 },
      "Kerala": { x: 8, y: 17 },
      "Rajasthan": { x: 7, y: 10 },
      "Telangana": { x: 8, y: 14 },
      "Andhra Pradesh": { x: 8, y: 15 },
      "Assam": { x: 11, y: 10 },
      "Bihar": { x: 9, y: 10 },
      "Haryana": { x: 8, y: 9 },
      "Himachal Pradesh": { x: 7, y: 7 },
      "Jammu and Kashmir": { x: 7, y: 6 },
      "Jharkhand": { x: 9, y: 11 },
      "Madhya Pradesh": { x: 8, y: 11 },
      "Manipur": { x: 11, y: 9 },
      "Nagaland": { x: 12, y: 9 },
      "Odisha": { x: 9, y: 13 },
      "Punjab": { x: 7, y: 8 },
      "Uttarakhand": { x: 8, y: 8 },
      "All India": { x: 8, y: 10 },
    };
    
    return Array.from(stateMap.entries())
      .map(([state, incidents]) => {
        const coords = stateCoords[state] || { x: 8, y: 10 };
        return { 
          state, 
          incidents, 
          x: coords.x, 
          y: coords.y 
        };
      })
      .sort((a, b) => b.incidents - a.incidents);
  }, []);

  // Filter incidents based on selections
  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const year = new Date(incident.date).getFullYear().toString();
      const matchesYear = !selectedYear || year === selectedYear;
    const matchesCategory = !selectedCategory || incident.category === selectedCategory;
      const matchesPlatform = !selectedPlatform || 
        (selectedPlatform === "Websites" && incident.platform === "Website") ||
        incident.platform === selectedPlatform;
    const matchesState = !selectedState || incident.state === selectedState;
    return matchesYear && matchesCategory && matchesPlatform && matchesState;
  });
  }, [selectedYear, selectedCategory, selectedPlatform, selectedState]);

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
            value={stats.total.toLocaleString()}
            icon={FileText}
            trend={{ 
              value: `${stats.yearOverYearChange > 0 ? '+' : ''}${stats.yearOverYearChange}%`, 
              isPositive: stats.yearOverYearChange < 0 
            }}
          />
          <StatsCard
            title="This Year"
            value={stats.thisYear.toLocaleString()}
            icon={TrendingUp}
          />
          <StatsCard
            title="Active Cases"
            value={stats.activeCases.toLocaleString()}
            icon={AlertTriangle}
          />
          <StatsCard
            title="States Affected"
            value={stats.statesAffected.toLocaleString()}
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
                {/* Small bar chart to complement pie */}
                <div style={{ width: "100%", height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                      <YAxis type="category" dataKey="name" width={140} stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }}
                      />
                      <Bar dataKey="value" isAnimationActive={false} onClick={(d) => handleChartClick(d, "category")}>
                        {categoryData.map((entry, i) => (
                          <Cell key={`bar-${i}`} fill={entry.color} style={{ cursor: 'pointer' }} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Detailed list (clickable) */}
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
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
              {/* India map with clickable state hotspots */}
              <div className="w-full">
                {/* Lazy import component to keep bundle small if needed later */}
                {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
                {/* @ts-ignore */}
                <IndiaMapWrapper
                  states={stateData}
                  selectedState={selectedState}
                  onSelectState={(st: string | null) => handleChartClick({ state: st }, 'state')}
                />
              </div>

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
                      <TableRow
                        key={incident.id}
                        className={`cursor-pointer ${selectedState === incident.state ? 'bg-primary/10 border-2 border-primary' : ''}`}
                        onClick={() => setSelectedState(incident.state)}
                      >
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
                        <TableCell className="max-w-xs truncate">{incident.legalReason}</TableCell>
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
