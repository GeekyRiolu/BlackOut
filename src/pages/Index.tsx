import { Navigation } from "@/components/Navigation";
import { StatsCard } from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  TrendingUp, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  Database,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import IncidentForm from "@/components/IncidentForm";

// Use the source asset so Vite resolves it in dev and production.
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 to-primary/80" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Tracking Free Speech in India
            </h1>
            <p className="text-xl text-white/90 mb-8">
              A comprehensive database documenting online content takedowns, website blocking, 
              and censorship incidents across India. Transparent data for informed citizens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/archive">Browse Archive</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Incidents"
              value="12,847"
              icon={FileText}
              trend={{ value: "+23%", isPositive: false }}
            />
            <StatsCard
              title="Platforms Affected"
              value="18"
              description="Social media & websites"
              icon={Database}
            />
            <StatsCard
              title="Active Cases"
              value="342"
              description="Pending verification"
              icon={AlertTriangle}
            />
            <StatsCard
              title="This Year"
              value="2,456"
              icon={TrendingUp}
              trend={{ value: "+18%", isPositive: false }}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Transparency Tools
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore censorship data through multiple lenses with our powerful analysis and visualization tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Interactive Dashboard</CardTitle>
                <CardDescription>
                  Visualize trends across time, geography, and categories with dynamic charts and heat maps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link to="/dashboard">
                    Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Searchable Archive</CardTitle>
                <CardDescription>
                  Filter by date, state, platform, authority, and reason to find specific incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link to="/archive">
                    Browse Archive <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle>Verified Data</CardTitle>
                <CardDescription>
                  All incidents undergo human verification to ensure accuracy and reliability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" asChild className="p-0">
                  <Link to="/about">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Help Us Track Free Speech
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contribute data, report incidents, or support our mission to maintain transparency
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="secondary">Submit an Incident</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Submit an Incident</DialogTitle>
                </DialogHeader>
                <IncidentForm />
              </DialogContent>
            </Dialog>

            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
