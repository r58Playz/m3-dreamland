import { getDomImpl } from "dreamland/core";

export let randomUid = getDomImpl()[4];

export type ComponentSize = "xs" | "s" | "m" | "l" | "xl";
