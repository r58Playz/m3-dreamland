import { DynamicScheme, MaterialDynamicColors } from "@ktibow/material-color-utilities-nightly";
import { Component, ComponentChild } from "dreamland/core";
import { randomUid } from "./util";

let dynamicColors = new MaterialDynamicColors();
let colors = [
	"background",
	"onBackground",
	"surface",
	"surfaceDim",
	"surfaceBright",
	"surfaceContainerLowest",
	"surfaceContainerLow",
	"surfaceContainer",
	"surfaceContainerHigh",
	"surfaceContainerHighest",
	"onSurface",
	"onSurfaceVariant",
	"outline",
	"outlineVariant",
	"inverseSurface",
	"inverseOnSurface",
	"primary",
	"primaryDim",
	"onPrimary",
	"primaryContainer",
	"onPrimaryContainer",
	"primaryFixed",
	"primaryFixedDim",
	"onPrimaryFixed",
	"onPrimaryFixedVariant",
	"inversePrimary",
	"secondary",
	"secondaryDim",
	"onSecondary",
	"secondaryContainer",
	"onSecondaryContainer",
	"secondaryFixed",
	"secondaryFixedDim",
	"onSecondaryFixed",
	"onSecondaryFixedVariant",
	"tertiary",
	"tertiaryDim",
	"onTertiary",
	"tertiaryContainer",
	"onTertiaryContainer",
	"tertiaryFixed",
	"tertiaryFixedDim",
	"onTertiaryFixed",
	"onTertiaryFixedVariant",
	"error",
	"errorDim",
	"onError",
	"errorContainer",
	"onErrorContainer",
	"shadow",
	"scrim",
] as const;
export type SerializedScheme = { [K in typeof colors[number]]: number };

export let serializeScheme = (scheme: DynamicScheme): SerializedScheme => {
	return colors.map(x => dynamicColors[x]()).map(x => ({ [x.name]: x.getArgb(scheme) })).reduce((acc, x) => Object.assign(acc, x), {}) as any as SerializedScheme;
}
let argbToString = (argb: number) => `${(argb >> 16) & 255} ${(argb >> 8) & 255} ${argb & 255}`;

let createRules = (ns: string, rules: readonly (readonly [string, string | number])[]) => rules.map(x => `--m3dl-${ns}-${x[0].replace(/_/g, "-")}: ${x[1]};`).join("\n");
let bezier = (a: number, b: number, c: number, d: number) => `cubic-bezier(${a},${b},${c},${d})`;

let shapes = [["none", 0], ["extra-small", 4], ["small", 8], ["medium", 12], ["large", 16], ["extra-large", 28], ["full", 1e6]] as const;

let FAST = "fast", DEFAULT = "default", SLOW = "slow";
let bezierTime = (a: number, b: number, c: number, d: number, duration: number) => `${bezier(a, b, c, d)} ${duration / 1000}s`;
let springExpressiveSpatial = [
	[FAST, bezierTime(0.42, 1.67, 0.21, 0.9, 350)],
	[DEFAULT, bezierTime(0.38, 1.21, 0.22, 1, 500)],
	[SLOW, bezierTime(0.39, 1.29, 0.35, 0.98, 650)]
] as const;
let springExpressiveEffects = [
	[FAST, bezierTime(0.31, 0.94, 0.34, 1, 150)],
	[DEFAULT, bezierTime(0.34, 0.8, 0.34, 1, 200)],
	[SLOW, bezierTime(0.34, 0.88, 0.34, 1, 300)]
] as const;

let springStandardSpatial = [
	[FAST, bezierTime(0.27, 1.06, 0.18, 1, 350)],
	[DEFAULT, bezierTime(0.27, 1.06, 0.18, 1, 500)],
	[SLOW, bezierTime(0.27, 1.06, 0.18, 1, 750)],
] as const;
let springStandardEffects = [
	[FAST, bezierTime(0.31, 0.94, 0.34, 1, 150)],
	[DEFAULT, bezierTime(0.34, 0.8, 0.34, 1, 200)],
	[SLOW, bezierTime(0.34, 0.88, 0.34, 1, 300)]
] as const;

let ACCELERATE = "accelerate", DECELERATE = "decelerate";
let easingEmphasized = [
	[DEFAULT, bezier(0.2, 0, 0, 1)],
	[ACCELERATE, bezier(0.3, 0, 0.8, 0.15)],
	[DECELERATE, bezier(0.05, 0.7, 0.1, 1)]
] as const;
let easingStandard = [
	[DEFAULT, bezier(0.2, 0, 0, 1)],
	[ACCELERATE, bezier(0.3, 0, 1, 1)],
	[DECELERATE, bezier(0, 0, 0, 1)],
] as const;
let easingLegacy = [
	[DEFAULT, bezier(0.4, 0, 0.2, 1)],
	[ACCELERATE, bezier(0.4, 0, 1, 1)],
	[DECELERATE, bezier(0, 0, 0.2, 1)],
] as const;

export let genStyle = (uid: string, scheme: DynamicScheme | SerializedScheme, motion: "expressive" | "standard"): string => {
	let springSpatial = motion === "expressive" ? springExpressiveSpatial : springStandardSpatial;
	let springEffects = motion === "expressive" ? springExpressiveEffects : springStandardEffects;

	if (scheme instanceof DynamicScheme) scheme = serializeScheme(scheme);

	return `
		.${uid} {
			${createRules("color", Object.entries(scheme).map(([x, y]) => [x, argbToString(y)]))}
			${createRules("shape", shapes.map(([a, b]) => [a, b + "px"]))}
			${createRules("spring-spatial", springSpatial)}
			${createRules("spring-effects", springEffects)}
			${createRules("easing-emphasized", easingEmphasized)}
			${createRules("easing-standard", easingStandard)}
			${createRules("easing-legacy", easingLegacy)}
			--m3dl-easing-linear: ${bezier(0, 0, 1, 1)};
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
	scheme: DynamicScheme | SerializedScheme,
	motion: "expressive" | "standard",
	children?: ComponentChild
}> = function (cx) {
	let uid = "m3dl-" + randomUid();
	let styles = use(this.scheme, this.motion).map(([scheme, motion]) => genStyle(uid, scheme, motion));

	return (
		<div class={`${uid} m3dl-scheme-styles m3dl-font-body-medium`}>
			<style attr:textContent={styles} />
			{cx.children}
		</div>
	)
}
