import { Component, ComponentChild, createDelegate, css } from "dreamland/core";
import { HoverLayer, Ripples } from "../misc/Layer";

export type ButtonVariant = "elevated" | "filled" | "tonal" | "outlined" | "text";
export type ButtonSize = "xs" | "s" | "m" | "l" | "xl";
export type ButtonIcon = "full" | "wide" | "narrow" | "left";

let sizeFontMap = { xs: "label-large", s: "label-large", m: "title-medium", l: "headline-small", xl: "headline-large" };

export let Button: Component<{
	variant: ButtonVariant,
	size?: ButtonSize,
	shape?: "round" | "square",
	icon?: ButtonIcon,

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

		transition: border-radius var(--m3dl-motion-spatial-fast);

		cursor: pointer;
		user-select: none;

		height: var(--m3dl-shape-full);

		letter-spacing: inherit;
		word-spacing: inherit;
		line-height: inherit;
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
	:scope.variant-filled {
		background: rgb(var(--m3dl-color-primary));
		color: rgb(var(--m3dl-color-on-primary));
	}
	:scope.variant-tonal {
		background: rgb(var(--m3dl-color-secondary-container));
		color: rgb(var(--m3dl-color-on-secondary-container));
	}
	:scope.variant-outlined {
		border: var(--m3dl-button-border, 1px) solid rgb(var(--m3dl-color-outline-variant));
		background: transparent;
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	:scope.variant-text {
		background: transparent;
		color: rgb(var(--m3dl-color-primary));
	}
	:scope:disabled {
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

	:scope:not(:disabled):active:is(.size-xs, .size-s) {
		border-radius: var(--m3dl-shape-small);
	}
	:scope:not(:disabled):active:is(.size-m) {
		border-radius: var(--m3dl-shape-medium);
	}
	:scope:not(:disabled):active:is(.size-l, .size-xl) {
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
`;
