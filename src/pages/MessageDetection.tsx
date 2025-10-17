import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { SpamBadge } from "@/components/SpamBadge";
import { predictMessage, MessagePredictionResult } from "@/lib/mockApi";
import { ArrowLeft, Search, AlertTriangle, ExternalLink, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MessageDetection() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<MessagePredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDetection = async () => {
    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message to analyze",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prediction = await predictMessage(message);
      setResult(prediction);
      
      toast({
        title: "Analysis Complete",
        description: `Message classified as ${prediction.prediction}`,
        variant: prediction.prediction === "Spam" ? "destructive" : "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-bold gradient-text">Message Spam Detector</h1>
            <p className="text-muted-foreground">Analyze text messages for spam content and security threats</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Message Analysis
              </CardTitle>
              <CardDescription>
                Paste or type a message to check for spam content, suspicious URLs, and phone numbers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter the message you want to analyze..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[200px] resize-none"
              />
              
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleDetection}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing Message...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Detect Spam
                  </>
                )}
              </Button>
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

                  {/* Explanation */}
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Analysis Details
                    </h3>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                      {result.explanation}
                    </p>
                  </div>

                  {/* URLs Detected */}
                  {result.urls && result.urls.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2 text-warning-orange">
                        <ExternalLink className="h-4 w-4" />
                        Suspicious URLs Detected ({result.urls.length})
                      </h3>
                      <div className="space-y-1">
                        {result.urls.map((url, index) => (
                          <div key={index} className="text-sm bg-warning-orange/10 p-2 rounded border-l-2 border-warning-orange">
                            <code className="text-warning-orange break-all">{url}</code>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ⚠️ Be cautious with these links. They may lead to phishing or malware sites.
                      </p>
                    </div>
                  )}

                  {/* Phone Numbers Detected */}
                  {result.phones && result.phones.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone Numbers Detected ({result.phones.length})
                      </h3>
                      <div className="space-y-1">
                        {result.phones.map((phone, index) => (
                          <div key={index} className="text-sm bg-muted/50 p-2 rounded">
                            <code>{phone}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Risk Factors */}
                  {result.details?.riskFactors && result.details.riskFactors.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold">Risk Factors</h3>
                      <ul className="text-sm space-y-1">
                        {result.details.riskFactors.map((factor, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full" />
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a message and click "Detect Spam" to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}