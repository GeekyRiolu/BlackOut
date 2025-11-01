import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Free Speech Tracker
            </h1>
            <p className="text-lg text-muted-foreground">
              India's comprehensive database for documenting online censorship and content takedowns
            </p>
          </div>

          {/* Mission */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The Free Speech Tracker is dedicated to promoting transparency and accountability 
                in how free expression is regulated in India's digital space. We document every 
                instance of online content takedown, website blocking, and censorship action 
                to create the most comprehensive public record of digital rights in the country.
              </p>
              <p>
                Our mission is to empower citizens, journalists, researchers, and policymakers 
                with accurate, accessible data about how, when, and why content is being restricted 
                or removed from online platforms.
              </p>
            </CardContent>
          </Card>

          {/* Methodology */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                Our Methodology
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We collect data from multiple verified sources including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Government transparency reports and official notifications</li>
                <li>Platform takedown reports from social media companies</li>
                <li>Court orders and legal filings</li>
                <li>Ministry of Electronics and IT announcements</li>
                <li>Verified media reports and investigations</li>
              </ul>
              <p className="mt-4">
                Every incident undergoes a rigorous verification process before being added to 
                our database. Our team cross-references multiple sources and validates the 
                information to ensure accuracy and reliability.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-chart-3" />
                  Verified Data
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                All incidents undergo human verification and are cross-referenced with 
                official sources to ensure accuracy and credibility.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-chart-4" />
                  Open Access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our database is freely accessible to the public. We believe transparency 
                is essential for a healthy democracy.
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Get Involved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We welcome contributions from journalists, researchers, and concerned citizens. 
                If you have information about a censorship incident or content takedown, please 
                reach out to us.
              </p>
              <div className="space-y-2">
                <p><strong className="text-foreground">Email:</strong> contact@freespeechtracker.in</p>
                <p><strong className="text-foreground">Submit Data:</strong> Use our secure submission form</p>
                <p><strong className="text-foreground">Support:</strong> help@freespeechtracker.in</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
