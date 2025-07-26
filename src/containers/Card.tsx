import { Component, ComponentChild, createDelegate, css } from "dreamland/core";
import { HoverLayer, Ripples } from "../misc/Layer";

export let Card: Component<{
	variant: "elevated" | "filled" | "outlined",
	"on:click"?: (e: MouseEvent) => void,
	children?: ComponentChild,
}> = function(cx) {
	if (this["on:click"]) {
		let ripple = createDelegate<MouseEvent>();
		return (
			<button class={`m3dl-container m3dl-card ${this.variant}`} on:pointerdown={ripple} on:click={this["on:click"]}>
				<Ripples create={ripple} />
				<HoverLayer />
				{cx.children}
			</button>
		)
	} else {
		return (
			<div class={`m3dl-container m3dl-card ${this.variant}`}>
				{cx.children}
			</div>
		)
	}
}
Card.style = css`
	:scope {
		padding: 1rem;

		border: none;
		border-radius: var(--m3dl-shape-medium);
		color: rgb(var(--m3dl-color-on-surface));
	}

	button:scope {
		position: relative;
		font: inherit;
		letter-spacing: inherit;
		word-spacing: inherit;
		line-height: inherit;
		text-align: inherit;
		cursor: pointer;
	}

	:scope.elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		box-shadow: var(--m3dl-elevation-1);
	}

	:scope.filled {
		background: rgb(var(--m3dl-color-surface-container-highest));
	}

	:scope.outlined {
		background: rgb(var(--m3dl-color-surface));
		border: 1px solid rgb(var(--m3dl-color-outline-variant));
	}
`;
