import { Component, ComponentChild, css } from "dreamland/core";
import { ComponentSize } from "../util";

export type ButtonGroupVariant = "standard" | "connected-square" | "connected-round";

export let ButtonGroup: Component<{
	variant: ButtonGroupVariant,
	size?: ComponentSize,
	children?: ComponentChild,
}> = function(cx) {
	this.size ??= "s";


	let variant = use(this.variant).map(x=> x.startsWith("connected") ? x.replace("-", " ") : x);

	return (
		<div class={use`m3dl-container m3dl-buttongroup variant-${variant} size-${this.size}`}>
			{cx.children}
		</div>
	)
}
ButtonGroup.style = css`
	:scope {
		--m3dl-button-size: 1;
		--m3dl-button-multiplier: 0.15;

		--m3dl-active-size: calc(var(--m3dl-button-size) * (1 + var(--m3dl-button-multiplier)));
		--m3dl-1-sibling-size: calc(var(--m3dl-button-size) * (1 - var(--m3dl-button-multiplier)));
		--m3dl-2-sibling-size: calc(var(--m3dl-button-size) * (1 - var(--m3dl-button-multiplier) / 2));

		display: flex;
	}
	.variant-standard.size-xs {
		gap: 1.125rem;
	}
	.variant-standard.size-s {
		gap: 0.75rem;
	}
	.variant-standard:is(.size-m, .size-l, .size-xl) {
		gap: 0.5rem;
	}
	.variant-standard > :global(*) {
		flex: var(--m3dl-button-size) 0 0;
	}
	.variant-standard > :global(*:enabled:active) {
		flex: var(--m3dl-active-size) 0 0;
	}
	.variant-standard > :is(
		:global(*:first-child:enabled:active) + :global(*),
		:global(*:has(+ *:last-child:enabled:active))
	) {
		flex: var(--m3dl-1-sibling-size) 0 0;
	}
	.variant-standard > :is(
		:global(*:has(+ *:not(:first-child, :last-child):enabled:active)),
		:global(*:not(:first-child, :last-child):enabled:active) + :global(*)
	) {
		flex: var(--m3dl-2-sibling-size) 0 0;
	}

	.variant-connected {
		gap: 0.125rem;
	}
	.variant-connected:is(.size-xs, .size-s, .size-m) {
		--inner-corner: var(--m3dl-shape-small);
		--inner-corner-active: var(--m3dl-shape-extra-small);
	}
	.variant-connected.size-l {
		--inner-corner: var(--m3dl-shape-large);
		--inner-corner-active: var(--m3dl-shape-medium);
	}
	.variant-connected.size-xl {
		--inner-corner: var(--m3dl-shape-large-increased);
		--inner-corner-active: var(--m3dl-shape-large);
	}
	.variant-connected > :global(*) {
		border-radius: var(--inner-corner) !important; 
	}
	.variant-connected > :global(*:enabled:active) {
		border-radius: var(--inner-corner-active) !important;
	}
	.variant-connected > :global(*:has(> .m3dl-toggle.selected):is(*)) {
		border-radius: var(--m3dl-shape-full) !important;
	}
	.variant-connected.round > :global(*:first-child:first-child:first-child) {
		border-top-left-radius: var(--m3dl-shape-full) !important;
		border-bottom-left-radius: var(--m3dl-shape-full) !important;
	}
	.variant-connected.round > :global(*:last-child:last-child:last-child) {
		border-top-right-radius: var(--m3dl-shape-full) !important;
		border-bottom-right-radius: var(--m3dl-shape-full) !important;
	}
`;
