import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, Home } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">SPAM DETECT</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className="hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="ghost" 
                  className="hover:bg-accent/10 hover:text-accent transition-all duration-300 hover:scale-105"
                >
                  <Users className="h-4 w-4 mr-2" />
                  About Us
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold gradient-text animate-float">
                SPAM DETECT
              </h1>
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Protect yourself from spam messages and fraudulent phone numbers with our advanced AI-powered detection system.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Real-time analysis, comprehensive database checks, and intelligent threat detection keep you safe from scams.
                </p>
              </div>
              
              <div className="pt-8">
                <Link to="/dashboard">
                  <Button 
                    size="xl" 
                    className="text-lg px-12 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 animate-pulse-slow"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="glass-effect p-6 rounded-xl hover:shadow-card transition-all duration-300 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Protection</h3>
                  <p className="text-muted-foreground">Advanced machine learning algorithms detect spam patterns and threats</p>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl hover:shadow-card transition-all duration-300 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Instant Analysis</h3>
                  <p className="text-muted-foreground">Get real-time spam detection results in milliseconds</p>
                </div>
              </div>

              <div className="glass-effect p-6 rounded-xl hover:shadow-card transition-all duration-300 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-warning-orange/20 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-warning-orange" />
                  </div>
                  <h3 className="text-xl font-semibold">Comprehensive Database</h3>
                  <p className="text-muted-foreground">Check against thousands of known spam numbers and malicious patterns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Spam Detection AI
          </p>
        </div>
      </footer>
    </div>
  );
}