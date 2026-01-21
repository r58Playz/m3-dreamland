import { FC, ComponentChild, createDelegate, css } from "dreamland/core";
import { HoverLayer, Ripples } from "../misc/Layer";

export function Card(this: FC<{
	variant: "elevated" | "filled" | "outlined",
	"on:click"?: (e: PointerEvent) => void,
	children?: ComponentChild,
}>) {
	if (this["on:click"]) {
		let ripple = createDelegate<PointerEvent>();
		return (
			<button class={use`m3dl-container m3dl-card variant-${this.variant}`} on:pointerdown={ripple} on:click={this["on:click"]}>
				<Ripples create={ripple} />
				<HoverLayer />
				{this.children}
			</button>
		)
	} else {
		return (
			<div class={use`m3dl-container m3dl-card variant-${this.variant}`}>
				{this.children}
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

	:scope.variant-elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		box-shadow: var(--m3dl-elevation-1);
	}

	:scope.variant-filled {
		background: rgb(var(--m3dl-color-surface-container-highest));
	}

	:scope.variant-outlined {
		background: rgb(var(--m3dl-color-surface));
		border: 1px solid rgb(var(--m3dl-color-outline-variant));
	}
`;
