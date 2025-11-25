import { atom } from "jotai";
import { createStore } from "jotai";

import type { components } from "~/consts/schema";

export const userAtom = atom<components['schemas']['User'] | undefined>()


export const store = createStore()