import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">FS</span>
            </div>
            <span className="font-semibold text-lg text-foreground">Free Speech Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/archive">Archive</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/film-censorship">Film Censorship</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/blocked-websites">Blocked Websites</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/about">About</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/archive" onClick={() => setIsOpen(false)}>Archive</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/film-censorship" onClick={() => setIsOpen(false)}>Film Censorship</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/blocked-websites" onClick={() => setIsOpen(false)}>Blocked Websites</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
