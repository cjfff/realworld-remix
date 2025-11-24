import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
export const inputsSchema = z.object({
    username: z.string().max(200).min(1),
    email: z.email(),
    password: z.string().min(8).max(20),
});

export type Inputs = z.infer<typeof inputsSchema>;

// export const resolver = zodResolver(inputsSchema);