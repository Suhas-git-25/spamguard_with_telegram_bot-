import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TelegramWidget } from "@/components/TelegramWidget";
import { MessageSquare, Phone, Shield, Zap, Eye, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold gradient-text animate-float">
                Spam Detection
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Check whether a message or phone number is spam instantly with AI-powered detection
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="glass-effect hover:shadow-card transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Message Detection</CardTitle>
                  <CardDescription className="text-base">
                    Analyze text messages for spam content, suspicious URLs, and phishing attempts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/message-detection">
                    <Button variant="hero" size="lg" className="w-full">
                      📩 Go to Message Detection
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="glass-effect hover:shadow-card transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Phone className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Phone Number Detection</CardTitle>
                  <CardDescription className="text-base">
                    Check phone numbers against our spam database and ML models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/number-detection">
                    <Button variant="success" size="lg" className="w-full">
                      📞 Go to Number Detection
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">AI Protection</h3>
                <p className="text-sm text-muted-foreground">Advanced machine learning models detect spam patterns</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold">Instant Results</h3>
                <p className="text-sm text-muted-foreground">Get spam detection results in milliseconds</p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="mx-auto w-12 h-12 bg-warning-orange/20 rounded-full flex items-center justify-center">
                  <Eye className="h-6 w-6 text-warning-orange" />
                </div>
                <h3 className="font-semibold">URL Scanning</h3>
                <p className="text-sm text-muted-foreground">Detect malicious links and phishing attempts</p>
              </div>
            </div>

            {/* Telegram Integration */}
            <div className="max-w-md mx-auto mt-16">
              <Card className="glass-effect">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Globe className="h-5 w-5 text-telegram-blue" />
                    Telegram Integration
                  </CardTitle>
                  <CardDescription>
                    Connect with our Telegram bot for instant spam detection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TelegramWidget />
                </CardContent>
              </Card>
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