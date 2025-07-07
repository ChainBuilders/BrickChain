import { z } from "zod";

export const basicSchema = z.object({
  name: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "Property name is required",
    })
    .refine((val) => val.trim().length >= 5, {
      message: "Property name must be at least 5 characters",
    }),
  description: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "Property description is required",
    })
    .refine((val) => val.trim().length >= 30, {
      message: "Description must be at least 30 characters long",
    }),
  propertyType: z.string().min(1, "Property type is required"),
  constructionStatus: z.string().optional(),
  // .min(1, "Construction status is required"),

  completionDate: z.string().optional(),

  address: z
    .string()
    .refine((err) => err.trim().length > 0, {
      message: "Address is requied",
    })
    .refine((err) => err.trim().length >= 10, {
      message: "Address must be at least 10 characters",
    }),
  city: z.string().refine((val) => val.trim().length > 0, {
    message: "City is requied",
  }),
  state: z.string().refine((val) => val.trim().length > 0, {
    message: "State is requied",
  }),
});

export const propertyDetailSchema = z.object({
  bedrooms: z
    .string()
    .min(1, "Bedrooms is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Bedrooms must be a number",
    }),

  bathrooms: z
    .string()
    .min(1, "Bethrooms is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Bethrooms must be a number",
    }),

  squareFootage: z
    .string()
    .min(1, "SquareFootage is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "squareFootage must be a number",
    }),
  yearBuilt: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "YearBuilt is required",
    })
    .refine((val) => val.trim().length > 4, {
      message: "YearBuilt must be at least 4",
    })
    .refine((val) => !isNaN(Number(val)), {
      message: "YearBuilt must be a number",
    }),

  landSize: z
    .string()
    .refine((val) => val.trim().length > 0, {
      message: "LandSize is required",
    })
    .refine((val) => !isNaN(Number(val)), {
      message: "LandSize must be a number",
    }),

  features: z
    .array(
      z
        .string()
        .min(3, "Feature must be at least 3 characters")
        .max(20, "Feature must not exceed 50 characters")
    )
    .max(5, "You can only add up to 5 features")
    .refine((arr) => arr.length > 0, {
      message: "features is required",
    })
    .refine((arr) => arr.length > 4, {
      message: "At least 4 features is required",
    }),

  northBorder: z
    .string()
    .min(1, "NorthBorder is required")
    .min(6, "NorthBorder must be at least 6 characters"),

  southBorder: z
    .string()
    .min(1, "SouthBorder is required")
    .min(6, "SouthBorder must be at least 6 characters"),
  eastBorder: z
    .string()
    .min(1, "EastBorder is required")
    .min(6, "EastBorder must be at least 6 characters"),
  westBorder: z
    .string()
    .min(1, "WestBorder is required")
    .min(6, "WestBorder must be at least 6 characters"),

  landTitle: z.string().min(1, "LandTitle is required"),
  surveyPlan: z
    .string()
    .min(1, "SurveyPlan is required")
    .min(15, "SurveyPlan must be at least 15 characters"),
});

export const financialInforSchema = z.object({
  // totalValue: string;
  //   totalTokens: string;
  //   minInvestment: string;
  //   expectedROI: string;

  totalValue: z
    .string()
    .min(1, "TotalValue is required")
    .min(6, "TotalValue must be at least 6 numbers"),
  totalTokens: z.string(),
  minInvestment: z
    .string()
    .min(1, "MinIvestment is required")
    .min(5, "MinIvestment must be at least 5 numbers")
    .max(5, "MinIvestment must not be more than 5 numbers"),
});

export const geolocationSchema = z.object({
  latitude: z
    .string()
    .min(1, "Latitude is required")
    .min(8, "Latitude must be at least 8 characters"),
  accuracy: z.string(),

  longitude: z
    .string()
    .min(1, "Longitude is required")
    .min(8, "Longitude must be at least 8 characters"),

  locationMethod: z.string(),
});

export const documentsSchema = z.object({
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 10 * 1024 * 1024, {
          message: "Each file must be less than 10MB",
        })
        .refine((file) => ["image/png", "image/jpg"].includes(file.type), {
          message: "Only PNG and JPEG images are allowed",
        })
    )
    .min(1, "Property image are required")
    .min(4, "Property images must be at least 4 images")
    .max(6, "Property images must not be more than 6 images"),

  documents: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 25 * 1024 * 1024, {
          message: "Each file must be less than 25MB",
        })
        .refine(
          (file) =>
            [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type),
          {
            message: "Only PDF or Word documents (.doc, .docx) are allowed",
          }
        )
    )
    .min(1, "Property documents are required")
    .min(2, "Property document must be at least 2 documens")
    .max(6, "Property document must not be more than 6 documents"),

  documentTypes: z
    .array(z.string().min(1, "Document type is required"))
    .max(6, "document type must not be more than 6"),
});

export const propertyDataSchema = basicSchema
  .merge(propertyDetailSchema)
  .merge(financialInforSchema)
  .merge(geolocationSchema)
  .merge(documentsSchema)
  .superRefine((data, ctx) => {
    if (data.documents.length !== data.documentTypes.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["documents"],
        message: "Each document must have a corresponding type",
      });
    }
  });

export type PropertyDataType = z.infer<typeof propertyDataSchema>;
