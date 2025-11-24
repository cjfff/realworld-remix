import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { inputsSchema as registerInputsSchema } from './register'

export const inputsSchema = registerInputsSchema.omit({ 'username': true })

export type Inputs = z.infer<typeof inputsSchema>;

// export const resolver = zodResolver(inputsSchema);