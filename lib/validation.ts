import { z } from "zod";

export const schema = z.object({
  name: z.number({}).max(100, { message: "je moeder is lelijk" }),
  email: z.null()
});