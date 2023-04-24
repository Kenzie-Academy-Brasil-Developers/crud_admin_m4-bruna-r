import { string, z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean(),
  active: z.boolean(),
});

const userSchemaRequest = userSchema.omit({
  id: true,
  active: true,
});

const userSchemaResponse = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  admin: z.boolean(),
  active: z.boolean(),
});

const userSchemaResponseArray = userSchemaResponse.array();

const userSchemaUpdateRequest = userSchema
  .omit({ id: true, admin: true, active: true })
  .partial();

const userschemaResponseRecover = userSchema.omit({
  active: true,
  password: true,
  admin: true,
});

export {
  userSchema,
  userSchemaRequest,
  userSchemaResponse,
  userSchemaUpdateRequest,
  userSchemaResponseArray,
  userschemaResponseRecover,
};
