import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

export const inputsSchema = z.object({
    image: z.string().default(''),
    bio: z.string().default(''),
    username: z.string().max(200).min(1),
    email: z.email(),
    password: z.string().min(8).max(20).optional().nullish().or(z.string().max(0)),
})

export type Inputs = z.infer<typeof inputsSchema>;

// export const resolver = zodResolver(inputsSchema);