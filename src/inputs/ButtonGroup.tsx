import { Component, ComponentChild, css } from "dreamland/core";
import { ComponentSize } from "../util";

// TODO variant connected
export let ButtonGroup: Component<{
	variant: "standard" | "connected"

	size?: ComponentSize,

	children?: ComponentChild,
}> = function(cx) {
	this.size ??= "s";

	return (
		<div class={use`m3dl-container m3dl-buttongroup variant-${this.variant} size-${this.size}`}>
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
	.size-xs {
		gap: 1.125rem;
	}
	.size-s {
		gap: 0.75rem;
	}
	.size-m, .size-l, .size-xl {
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
`;
