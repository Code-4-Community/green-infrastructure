import { makeApi } from "@zodios/core";
import { z } from "zod";
import { Site } from './dto/Site'

export const userApi = makeApi([
  {
    method: "get",
    path: "/sites",
    alias: "getSites",
    description: "Get Practitioners",
    response: z.array(Site),
  },
]);