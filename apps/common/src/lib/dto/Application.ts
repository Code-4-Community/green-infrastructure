import { z } from "zod";

// My interpretation
/*
    Backend object that stores the literal values received from dynamo
    into an expected form. Then we export a type based on the actual fields
    we receive? might just be a shorthand for less code
*/
export const GIApplication = z.object({
  "appID": z.number(),
  "address": z.string(),
  "content": z.string(),
  "email": z.string(),
  "firstName": z.string(),
  "lastName": z.string(),
  "phone": z.string()
})

export type GIApplication = z.infer<typeof GIApplication>