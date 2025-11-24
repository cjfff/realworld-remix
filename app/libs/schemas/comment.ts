import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

export const inputsSchema = z.object({
  body: z.string().max(100).min(1),
});

export type Inputs = z.infer<typeof inputsSchema>;

// export const resolver = zodResolver(inputsSchema);
