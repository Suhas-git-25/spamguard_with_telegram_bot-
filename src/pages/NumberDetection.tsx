import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SpamBadge } from "@/components/SpamBadge";
import { predictNumber, NumberPredictionResult } from "@/lib/mockApi";
import { ArrowLeft, Search, Database, Brain, Loader2, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NumberDetection() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<NumberPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDetection = async () => {
    if (!number.trim()) {
      toast({
        title: "Error",
        description: "Please enter a phone number to analyze",
        variant: "destructive",
      });
      return;
    }

    // Basic validation for phone number format
    const cleanNumber = number.replace(/[^\d]/g, "");
    if (cleanNumber.length < 10) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prediction = await predictNumber(number);
      setResult(prediction);
      
      toast({
        title: "Analysis Complete",
        description: `Number classified as ${prediction.prediction}`,
        variant: prediction.prediction === "Spam" ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze number. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers, spaces, dashes, and plus signs
    const value = e.target.value.replace(/[^0-9\s\-\+]/g, "");
    setNumber(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold gradient-text">Phone Number Spam Detector</h1>
            <p className="text-muted-foreground">Check phone numbers against our spam database and AI models</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Number Analysis
              </CardTitle>
              <CardDescription>
                Enter a phone number to check against our spam database and ML models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="Enter phone number (e.g., +91 9876543210 or 9876543210)"
                  value={number}
                  onChange={handleNumberChange}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Supports Indian (+91) and international formats
                </p>
              </div>
              
              <Button 
                variant="success" 
                size="lg" 
                onClick={handleDetection}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Number...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Detect Spam
                  </>
                )}
              </Button>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="text-center p-3 bg-primary/10 rounded-lg">
                  <Database className="h-6 w-6 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-medium">5,500+</p>
                  <p className="text-xs text-muted-foreground">Numbers in DB</p>
                </div>
                <div className="text-center p-3 bg-accent/10 rounded-lg">
                  <Brain className="h-6 w-6 mx-auto mb-1 text-accent" />
                  <p className="text-xs font-medium">AI Powered</p>
                  <p className="text-xs text-muted-foreground">ML Detection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle>Detection Results</CardTitle>
              <CardDescription>
                {result ? "Analysis complete" : "Results will appear here after analysis"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div className="text-center">
                    <SpamBadge 
                      isSpam={result.prediction === "Spam"} 
                      confidence={result.confidence}
                      className="text-lg px-6 py-3"
                    />
                  </div>

                  {/* Number Info */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Analyzed Number</h3>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <code className="text-lg">{result.number}</code>
                    </div>
                  </div>

                  {/* Detection Source */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      {result.source === "database" ? (
                        <Database className="h-4 w-4 text-primary" />
                      ) : (
                        <Brain className="h-4 w-4 text-accent" />
                      )}
                      Detection Source
                    </h3>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium">
                        {result.source === "database" ? "📊 Spam Database" : "🤖 Machine Learning Model"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.source === "database" 
                          ? "Number found in our curated spam database"
                          : "Analyzed using advanced ML algorithms"
                        }
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Analysis Details</h3>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {result.explanation}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <h3 className="font-semibold">Recommendations</h3>
                    <div className="space-y-2">
                      {result.prediction === "Spam" ? (
                        <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-destructive">⚠️ High Risk Number</p>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            <li>• Do not answer calls from this number</li>
                            <li>• Block this number if possible</li>
                            <li>• Report to authorities if received spam calls</li>
                            <li>• Never share personal information</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="bg-accent/10 border border-accent/20 p-3 rounded-lg">
                          <p className="text-sm font-medium text-accent">✅ Appears Safe</p>
                          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                            <li>• Number appears to be legitimate</li>
                            <li>• Still exercise normal caution</li>
                            <li>• Verify caller identity for sensitive matters</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a phone number and click "Detect Spam" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}