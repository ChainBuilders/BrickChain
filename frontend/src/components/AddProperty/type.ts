export interface PropertyData {
  // Basic Info
  name: string;
  description: string;
  propertyType: string;
  constructionStatus: string;
  completionDate: string;
  address: string;
  city: string;
  state: string;

  // Property Details
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  yearBuilt: string;
  features: string[];
  landSize: string;

  // Land Borders
  northBorder: string;
  southBorder: string;
  eastBorder: string;
  westBorder: string;
  landTitle: string;
  surveyPlan: string;

  // Financial Info
  totalValue: string;
  totalTokens: string;
  minInvestment: string;
  expectedROI: string;

  // Geolocation
  latitude: string;
  longitude: string;
  accuracy: string;
  locationMethod: string;

  // Documents
  images: File[];
  documents: File[];
  documentTypes: string[];
}
