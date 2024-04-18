import { z } from "zod";

export const Application = z.object({
  "appId": z.number(),
  "featureId": z.number(),
  "names": z.array(z.string()), // May need altering
  "status": z.string(),
  "userId": z.number()
})

export type Application = z.infer<typeof Application>