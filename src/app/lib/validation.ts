import { z } from "zod";

export const userSchemaRegister = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

export const userSchemaLogin = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
  })
  .strict();

export const todoSchemaCreate = z
  .object({
    title: z.string(),
    description: z.string(),
  })
  .strict();

export const todoSchemaUpdate = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isComplete: z.boolean().optional(),
});
