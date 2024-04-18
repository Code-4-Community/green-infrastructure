import { z } from "zod";

export const Site = z.object({
  "Object ID?": z.number(),
  "Address": z.string(),
  "Asset Name": z.string(),
  "Asset Type": z.string(),
  Lat: z.string(),
  Long: z.string(),
  "Link to Construction Cost + Plans": z.string(),
  "Link to Final Reports": z.string(),
  "Link to Maintenance Agreement": z.string(),
  "Link to Maintenance Checklist": z.string(),
  "Link to RFQ or Bid Invitation": z.any(), // Not sure why any used here, could be string instead.
  "Maintenance Agreement?": z.string(),
  "Neighborhood": z.string(),
  "Partner Depts.": z.string(),
  "Symbol Type": z.string()
})

export type Site = z.infer<typeof Site>