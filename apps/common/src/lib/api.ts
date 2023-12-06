import { makeApi } from "@zodios/core";
import { z } from "zod";
import { GIApplication } from "./dto/Application";
import { Site } from './dto/Site'

export const userApi = makeApi([
  {
    method: "get",
    path: "/sites",
    alias: "getSites",
    description: "Get Practitioners",
    response: z.array(Site),
  },
  {
    method: "get",
    path: "/giApplications",
    alias: "getGIApplications",
    description: "Get GI Applications",
    response: z.array(GIApplication),
  }
]);