import { createContext } from "react-router";
import type { components } from "~/consts/schema";

export const userContext = createContext<components['schemas']['User'] | null>(null);
