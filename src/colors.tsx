import { DynamicScheme, MaterialDynamicColors } from "@ktibow/material-color-utilities-nightly";
import { Component, ComponentChild } from "dreamland/core";
import { randomUid } from "./util";

let createRules = (ns: string, rules: readonly (readonly [string, string | number])[]) => rules.map(x => `--m3dl-${ns}-${x[0].replace(/_/g, "-")}: ${x[1]};`).join("\n");

let dynamicColors = new MaterialDynamicColors();
let colors = [
	...dynamicColors.allColors,
	dynamicColors.shadow(),
	dynamicColors.scrim(),
];
let argbToString = (argb: number) => `${(argb >> 16) & 255} ${(argb >> 8) & 255} ${argb & 255}`;

let shapes = [["none", 0], ["extra-small", 4], ["small", 8], ["medium", 12], ["large", 16], ["extra-large", 28], ["full", 1e6]] as const;

let FAST = "fast", DEFAULT = "default", SLOW = "slow";
let bezier = (a: number, b: number, c: number, d: number, duration: number) => `cubic-bezier(${a},${b},${c},${d}) ${duration / 1000}s`;
let expressiveSpatial = [
	[FAST, bezier(0.42, 1.67, 0.21, 0.9, 350)],
	[DEFAULT, bezier(0.38, 1.21, 0.22, 1, 500)],
	[SLOW, bezier(0.39, 1.29, 0.35, 0.98, 650)]
] as const;
let expressiveEffects = [
	[FAST, bezier(0.31, 0.94, 0.34, 1, 150)],
	[DEFAULT, bezier(0.34, 0.8, 0.34, 1, 200)],
	[SLOW, bezier(0.34, 0.88, 0.34, 1, 300)]
] as const;

let standardSpatial = [
	[FAST, bezier(0.27, 1.06, 0.18, 1, 350)],
	[DEFAULT, bezier(0.27, 1.06, 0.18, 1, 500)],
	[SLOW, bezier(0.27, 1.06, 0.18, 1, 750)],
] as const;
let standardEffects = [
	[FAST, bezier(0.31, 0.94, 0.34, 1, 150)],
	[DEFAULT, bezier(0.34, 0.8, 0.34, 1, 200)],
	[SLOW, bezier(0.34, 0.88, 0.34, 1, 300)]
] as const;

export let genStyle = (uid: string, scheme: DynamicScheme, motion: "expressive" | "standard"): string => {
	let spatial = motion === "expressive" ? expressiveSpatial : standardSpatial;
	let effects = motion === "expressive" ? expressiveEffects : standardEffects;

	return `
		.${uid} {
			${createRules("color", colors.map(x => [x.name, argbToString(x.getArgb(scheme))]))}
			${createRules("shape", shapes.map(([a, b]) => [a, b + "px"]))}
			${createRules("motion-spatial", spatial)}
			${createRules("motion-effects", effects)}
			--m3dl-elevation-0: none;
			--m3dl-elevation-1:
				0px 3px 1px -2px rgb(var(--m3dl-color-shadow) / 0.2),
				0px 2px 2px 0px rgb(var(--m3dl-color-shadow) / 0.14),
				0px 1px 5px 0px rgb(var(--m3dl-color-shadow) / 0.12);
			--m3dl-elevation-2:
				0px 2px 4px -1px rgb(var(--m3dl-color-shadow) / 0.2),
				0px 4px 5px 0px rgb(var(--m3dl-color-shadow) / 0.14),
				0px 1px 10px 0px rgb(var(--m3dl-color-shadow) / 0.12);
			--m3dl-elevation-3:
				0px 5px 5px -3px rgb(var(--m3dl-color-shadow) / 0.2),
				0px 8px 10px 1px rgb(var(--m3dl-color-shadow) / 0.14),
				0px 3px 14px 2px rgb(var(--m3dl-color-shadow) / 0.12);
			--m3dl-elevation-4:
				0px 5px 5px -3px rgb(var(--m3dl-color-shadow) / 0.2),
				0px 8px 10px 1px rgb(var(--m3dl-color-shadow) / 0.14),
				0px 3px 14px 2px rgb(var(--m3dl-color-shadow) / 0.12);
			--m3dl-elevation-5:
				0px 8px 10px -6px rgb(var(--m3dl-color-shadow) / 0.2),
				0px 16px 24px 2px rgb(var(--m3dl-color-shadow) / 0.14),
				0px 6px 30px 5px rgb(var(--m3dl-color-shadow) / 0.12);
			--m3dl-font: Roboto, system-ui, sans-serif;
		}
	`;
};

export let SchemeStyles: Component<{
	scheme: DynamicScheme,
	motion: "expressive" | "standard",
	children?: ComponentChild
}, { style: string }> = function(cx) {
	let uid = "m3dl-" + randomUid();
	let setStyles = () => {
		this.style = genStyle(uid, this.scheme, this.motion);
	};

	setStyles();
	use(this.scheme).listen(setStyles);

	return (
		<div class={`${uid} m3dl-scheme-styles m3dl-font-body-medium`}>
			<style attr:innerText={use(this.style)} />
			{cx.children}
		</div>
	)
}
