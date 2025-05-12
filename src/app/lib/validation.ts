import { z } from "zod";

export const userSchemaRegister = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();
