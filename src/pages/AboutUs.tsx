import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Database, Zap, Home, Users, MessageSquare, Phone, Globe } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">SPAM DETECT</span>
            </Link>
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

      {/* About Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto space-y-16">
            
            {/* Header */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text">
                About Our Technology
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn how our advanced spam detection system works to protect you from unwanted messages and fraudulent calls
              </p>
            </div>

            {/* How It Works */}
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-center">How Our Detection System Works</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="glass-effect hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Message Detection Logic</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">1. Database Lookup</h4>
                      <p className="text-sm text-muted-foreground">
                        First, we extract phone numbers from the message and check them against our comprehensive spam number database containing thousands of known spam numbers.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">2. Machine Learning Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        If no match is found, we use a Naive Bayes classifier trained on spam/ham message patterns to analyze the text content and determine spam probability.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-accent">3. URL & Pattern Detection</h4>
                      <p className="text-sm text-muted-foreground">
                        We scan for suspicious URLs, common spam phrases, and fraudulent patterns to provide comprehensive protection against phishing attempts.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl">Number Detection Logic</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">1. Number Normalization</h4>
                      <p className="text-sm text-muted-foreground">
                        We normalize the input phone number by removing all non-digit characters and standardizing the format for accurate comparison.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">2. Database Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        The normalized number is checked against our spam number database using fuzzy matching to catch variations and partial matches.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-primary">3. Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground">
                        If no exact match is found, we perform pattern analysis and provide safety recommendations based on number format and regional spam trends.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Technology Stack */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-center">Our Technology Stack</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">Machine Learning</h3>
                  <p className="text-sm text-muted-foreground">Naive Bayes classifier with CountVectorizer for text analysis</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                    <Database className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold">Database</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive spam number database with 5500+ entries</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-warning-orange/20 rounded-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-warning-orange" />
                  </div>
                  <h3 className="font-semibold">Real-time Processing</h3>
                  <p className="text-sm text-muted-foreground">Instant analysis with millisecond response times</p>
                </div>

                <div className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-telegram-blue/20 rounded-full flex items-center justify-center">
                    <Globe className="h-8 w-8 text-telegram-blue" />
                  </div>
                  <h3 className="font-semibold">API Integration</h3>
                  <p className="text-sm text-muted-foreground">Telegram bot integration for seamless detection</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center space-y-6 pt-12">
              <h2 className="text-3xl font-bold">Ready to Get Protected?</h2>
              <p className="text-xl text-muted-foreground">
                Start using our spam detection system today
              </p>
              <Link to="/dashboard">
                <Button 
                  size="xl" 
                  className="text-lg px-12 py-6 bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105"
                >
                  Try Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Spam Detection AI
          </p>
        </div>
      </footer>
    </div>
  );
}