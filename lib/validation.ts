import { z } from "zod";

export const schema = z.object({
  name: z.number({}).max(100, { message: "Test" }),
  email: z.null(),
  test: z.array(z.string(), {
    description: "Test",
  })
})