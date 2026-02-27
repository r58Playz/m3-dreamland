import { domImpl } from "dreamland/core";

export let randomUid = () => domImpl()[4]((() => {}) as any);

export type ComponentSize = "xs" | "s" | "m" | "l" | "xl";
