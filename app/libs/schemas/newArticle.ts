import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

export const inputsSchema = z.object({
    title: z.string().max(100).min(1),
    description: z.string().min(1).max(100),
    body: z.string().min(1).max(500),
    tagList: z.array(z.string().min(1).max(10)).optional(),
    slug: z.string().optional()
});

export type Inputs = z.infer<typeof inputsSchema>;

// export const resolver = zodResolver(inputsSchema);