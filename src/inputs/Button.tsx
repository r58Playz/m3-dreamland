import { Component, ComponentChild, createDelegate, css } from "dreamland/core";
import { HoverLayer, Ripples } from "../misc/Layer";
import { ComponentSize } from "../util";

export type ButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text";
export type ButtonIcon = "full" | "wide" | "narrow" | "left";

let sizeFontMap = { xs: "label-large", s: "label-large", m: "title-medium", l: "headline-small", xl: "headline-large" };

export let Button: Component<{
	variant: ButtonVariant,
	size?: ComponentSize,
	shape?: "round" | "square",
	icon?: ButtonIcon,
	title?: string,

	disabled?: boolean,

	"on:click"?: (e: PointerEvent) => void,
	children?: ComponentChild,
}> = function(cx) {
	// TODO xs and s target areas
	// TODO full/wide/narrow icons
	this.size ??= "s";
	this.shape ??= "round";
	this.icon ??= "left";
	this.disabled ??= false;

	let ripple = createDelegate<PointerEvent>();

	let font = use(this.size).map(x => sizeFontMap[x]); 
	return (
		<button
			class={use`m3dl-container m3dl-button m3dl-font-${font} variant-${this.variant} size-${this.size} shape-${this.shape} icon-${this.icon}`}
			disabled={use(this.disabled)}
			on:click={this["on:click"]}
			on:pointerdown={ripple}
			title={use(this.title)}
		>
			<Ripples create={ripple} />
			<HoverLayer />
			{cx.children}
		</button>
	)
}
Button.style = css`
	:scope {
		position: relative;

		border: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		transition: border-radius var(--m3dl-spring-spatial-fast),
			flex var(--m3dl-spring-spatial-fast),
			color var(--m3dl-spring-effects-default),
			background var(--m3dl-spring-effects-default),
			border-color var(--m3dl-spring-effects-default);

		cursor: pointer;
		user-select: none;

		height: var(--m3dl-shape-full);

		word-spacing: inherit;
		text-align: inherit;
	}
	:scope:disabled {
		cursor: default;
	}

	:scope.variant-elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		color: rgb(var(--m3dl-color-primary));
		box-shadow: var(--m3dl-elevation-1);
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-elevated {
		background: rgb(var(--m3dl-color-primary));
		color: rgb(var(--m3dl-color-on-primary));
	}
	:scope:not(:has(:global(.m3dl-toggle:not(.selected)))).variant-filled {
		background: rgb(var(--m3dl-color-primary));
		color: rgb(var(--m3dl-color-on-primary));
	}
	:scope:has(:global(.m3dl-toggle)).variant-filled {
		background: rgb(var(--m3dl-color-surface-container));
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	:scope.variant-tonal {
		background: rgb(var(--m3dl-color-secondary-container));
		color: rgb(var(--m3dl-color-on-secondary-container));
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-tonal {
		background: rgb(var(--m3dl-color-secondary));
		color: rgb(var(--m3dl-color-on-secondary));
	}
	:scope.variant-outlined {
		border: var(--m3dl-button-border, 1px) solid rgb(var(--m3dl-color-outline-variant));
		background: transparent;
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	:scope:has(:global(.m3dl-toggle.selected)).variant-outlined {
		border-color: transparent;
		background: rgb(var(--m3dl-color-inverse-surface));
		color: rgb(var(--m3dl-color-inverse-on-surface));
	}
	:scope.variant-text {
		background: transparent;
		color: rgb(var(--m3dl-color-primary));
	}
	:scope:disabled:disabled:disabled:disabled {
		background: rgb(var(--m3dl-color-on-surface) / 0.1);
		color: rgb(var(--m3dl-color-on-surface) / 0.38);
		box-shadow: var(--m3dl-elevation-0);
	}

	:scope.shape-round {
		border-radius: var(--m3dl-shape-full);
	}

	:scope.shape-square:is(.size-xs, .size-s) {
		border-radius: var(--m3dl-shape-medium);
	}
	:scope.shape-square:is(.size-m) {
		border-radius: var(--m3dl-shape-large);
	}
	:scope.shape-square:is(.size-l, .size-xl) {
		border-radius: var(--m3dl-shape-extra-large);
	}

	:scope:enabled:active:is(.size-xs, .size-s) {
		border-radius: var(--m3dl-shape-small);
	}
	:scope:enabled:active:is(.size-m) {
		border-radius: var(--m3dl-shape-medium);
	}
	:scope:enabled:active:is(.size-l, .size-xl) {
		border-radius: var(--m3dl-shape-large);
	}

	:scope.size-xs {
		--m3dl-shape-full: 2rem;
		padding: 0.75rem;
		gap: 0.25rem;
	}
	:scope.size-s {
		--m3dl-shape-full: 2.5rem;
		padding: 1rem;
		gap: 0.5rem;
	}
	:scope.size-m {
		--m3dl-shape-full: 3.5rem;
		padding: 1.5rem;
		gap: 0.5rem;
	}
	:scope.size-l {
		--m3dl-button-border: 2px;
		--m3dl-shape-full: 6rem;
		padding: 3rem;
		gap: 0.75rem;
	}
	:scope.size-xl {
		--m3dl-button-border: 3px;
		--m3dl-shape-full: 8.5rem;
		padding: 4rem;
		gap: 1rem;
	}
	
	:scope:not(.icon-left).size-xs {
		--m3dl-icon-size: 1.25rem;
	}
	:scope:not(.icon-left):is(.size-s, .size-m) {
		--m3dl-icon-size: 1.5rem;
	}
	:scope:not(.icon-left).size-l {
		--m3dl-icon-size: 2rem;
	}
	:scope:not(.icon-left).size-xl {
		--m3dl-icon-size: 2.5rem;
	}

	:scope.icon-full.size-xs {
		padding: 0.375rem;
	}
	:scope.icon-full.size-s {
		padding: 0.5rem;
	}
	:scope.icon-full.size-m {
		padding: 1rem;
	}
	:scope.icon-full.size-l {
		padding: 2rem;
	}
	:scope.icon-full.size-xl {
		padding: 3rem;
	}

	:scope > :global(svg) {
		width: var(--m3dl-icon-size, 1em);
		height: var(--m3dl-icon-size, 1em);
	}

	:scope > :global(span.m3dl-toggle) {
		display: none;
	}
`;
