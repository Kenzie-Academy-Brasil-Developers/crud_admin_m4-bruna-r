import { z } from "zod";

const loginSchemaRequest = z.object({
  password: z.string(),
  email: z.string().email(),
});

export { loginSchemaRequest };
