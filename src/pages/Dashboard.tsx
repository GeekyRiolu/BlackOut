import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Globe
} from "lucide-react";
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
  ResponsiveContainer
} from "recharts";

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
  { name: "Other", value: 1120, color: "hsl(var(--chart-5))" },
];

const platformData = [
  { platform: "Twitter/X", count: 4234 },
  { platform: "Facebook", count: 3456 },
  { platform: "YouTube", count: 2134 },
  { platform: "Instagram", count: 1678 },
  { platform: "Websites", count: 1345 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Visual analysis of censorship trends and patterns across India
          </p>
        </div>

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
                <LineChart data={yearlyData}>
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
                    dataKey="incidents" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={3}
                    name="Incidents"
                  />
                </LineChart>
              </ResponsiveContainer>
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
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Reason Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Incident Categories</CardTitle>
            <CardDescription>Distribution of incidents by stated reason</CardDescription>
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
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
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
      </div>
    </div>
  );
};

export default Dashboard;
