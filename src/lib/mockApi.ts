// Mock API functions for spam detection
// In a real app, these would connect to your Python backend

export interface MessagePredictionResult {
  prediction: 'Spam' | 'Not Spam';
  confidence: number;
  explanation: string;
  urls?: string[];
  phones?: string[];
  details?: {
    urlsDetected: number;
    phonesDetected: number;
    riskFactors: string[];
  };
}

export interface NumberPredictionResult {
  prediction: 'Spam' | 'Not Spam';
  confidence: number;
  explanation: string;
  source: 'database' | 'ml_model';
  number: string;
}

// Mock spam keywords for demonstration
const SPAM_KEYWORDS = [
  'free', 'winner', 'urgent', 'claim', 'prize', 'cash', 'offer', 'limited time',
  'click here', 'act now', 'congratulations', 'selected', 'bonus', 'reward'
];

// Mock function to simulate message spam detection
export async function predictMessage(message: string): Promise<MessagePredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const lowerMessage = message.toLowerCase();
  
  // URL detection
  const urlPattern = /https?:\/\/\S+/g;
  const urls = message.match(urlPattern) || [];
  
  // Phone number detection  
  const phonePattern = /\b(?:\+91[\s-]?)?[6-9]\d{9}\b/g;
  const phones = message.match(phonePattern) || [];
  
  // Basic spam detection based on keywords
  const spamKeywordCount = SPAM_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword)
  ).length;
  
  const hasUrls = urls.length > 0;
  const hasPhones = phones.length > 0;
  const hasSpamKeywords = spamKeywordCount > 0;
  
  // Calculate spam probability
  let spamScore = 0;
  spamScore += spamKeywordCount * 0.3;
  spamScore += hasUrls ? 0.4 : 0;
  spamScore += hasPhones ? 0.2 : 0;
  spamScore += message.includes('!!!') ? 0.1 : 0;
  
  const isSpam = spamScore > 0.5;
  const confidence = Math.min(0.95, Math.max(0.6, spamScore));
  
  const riskFactors = [];
  if (hasSpamKeywords) riskFactors.push(`${spamKeywordCount} spam keyword(s) detected`);
  if (hasUrls) riskFactors.push('Suspicious URLs found');
  if (hasPhones) riskFactors.push('Phone numbers detected');
  if (message.includes('!!!')) riskFactors.push('Excessive punctuation');
  
  return {
    prediction: isSpam ? 'Spam' : 'Not Spam',
    confidence: confidence,
    explanation: isSpam 
      ? `High spam probability detected. ${riskFactors.join(', ')}.`
      : riskFactors.length > 0
        ? `Low spam probability but some risk factors found: ${riskFactors.join(', ')}.`
        : 'No significant spam indicators detected.',
    urls,
    phones,
    details: {
      urlsDetected: urls.length,
      phonesDetected: phones.length,
      riskFactors
    }
  };
}

// Mock function to simulate phone number spam detection
export async function predictNumber(number: string): Promise<NumberPredictionResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Normalize number
  const normalizedNumber = number.replace(/[^\d]/g, '');
  
  // Mock database lookup (simulate some known spam numbers)
  const knownSpamNumbers = [
    '7596755829', '8327195532', '8724312970', '6568285023', '8142651196',
    '6520532744', '7488494989', '8356437284', '9009669044', '8216285980'
  ];
  
  const isInDatabase = knownSpamNumbers.includes(normalizedNumber);
  
  if (isInDatabase) {
    return {
      prediction: 'Spam',
      confidence: 0.95,
      explanation: 'Number found in spam database with high confidence.',
      source: 'database',
      number: normalizedNumber
    };
  }
  
  // Mock ML prediction for unknown numbers
  // Simple heuristic: numbers ending in certain patterns might be more likely spam
  const lastDigits = normalizedNumber.slice(-3);
  const suspiciousPatterns = ['000', '111', '999', '123', '456'];
  const hasSuspiciousPattern = suspiciousPatterns.some(pattern => lastDigits.includes(pattern));
  
  const isSpam = Math.random() > 0.7 || hasSuspiciousPattern;
  const confidence = hasSuspiciousPattern ? 0.75 : Math.random() * 0.4 + 0.6;
  
  return {
    prediction: isSpam ? 'Spam' : 'Not Spam',
    confidence: confidence,
    explanation: isSpam 
      ? hasSuspiciousPattern 
        ? `ML model detected suspicious number pattern. Confidence: ${(confidence * 100).toFixed(1)}%`
        : `ML model classified as spam based on behavioral patterns. Confidence: ${(confidence * 100).toFixed(1)}%`
      : `ML model classified as legitimate number. Confidence: ${(confidence * 100).toFixed(1)}%`,
    source: 'ml_model',
    number: normalizedNumber
  };
}