import { IconifyIcon } from "@iconify/types";
import { Component, ComponentChild, createDelegate, css } from "dreamland/core";
import { HoverLayer, Ripples } from "../misc/Layer";
import { Icon } from "../misc/Icon";

export type ChipVariant = "input" | "assist" | "filter" | "suggestion";
export let Chip: Component<{
	variant: ChipVariant,
	icon?: IconifyIcon,
	trailing?: IconifyIcon,

	elevated?: boolean,
	value?: boolean,
	disabled?: boolean,

	"on:click": (e: PointerEvent) => void,
	children?: ComponentChild
}> = function(cx) {
	this.elevated ??= false;
	this.value ??= false;
	this.disabled ??= false;

	let ripple = createDelegate<PointerEvent>();
	return (
		<button
			class={use`m3dl-container m3dl-chip variant-${this.variant}`}
			class:selected={use(this.value)}
			class:elevated={use(this.elevated)}
			disabled={use(this.disabled)}

			on:click={this["on:click"]}
			on:pointerdown={ripple}
		>
			<Ripples create={ripple} />
			<HoverLayer />
			{use(this.icon).and(x => <Icon icon={x} class="leading" />)}
			<span class="m3dl-font-label-large">{cx.children}</span>
			{use(this.trailing).and(x => <Icon icon={x} class="trailing" />)}
		</button>
	)
}
Chip.style = css`
	:scope {
		position: relative;

		display: inline-flex;
		align-items: center;

		height: 2rem;
		padding: 0 1rem;
		gap: 0.5rem;
		border-radius: var(--m3dl-shape-small);

		background: rgb(var(--m3dl-color-surface));
		color: rgb(var(--m3dl-color-on-surface-variant));
		border: 1px solid rgb(var(--m3dl-color-outline));

		cursor: pointer;
		transition: var(--m3dl-spring-effects-default);
	}

	:scope > svg {
		width: 1.125rem;
		height: 1.125rem;
	}

	:scope > :global(.leading) {
		margin-left: -0.5rem;
	}
	:scope.variant-input > :global(.leading) {
		margin-left: -0.25rem;
	}
	:scope:enabled:not(.variant-input):not(.selected) > :global(.leading) {
		color: rgb(var(--m3dl-color-primary));
	}

	:scope > :global(.trailing) {
		margin-right: -0.5rem;
	}
	:scope.variant-input > :global(.trailing) {
		margin-right: -0.25rem;
	}

	:scope.variant-assist {
		color: rgb(var(--m3dl-color-on-surface));
	}
	:scope.variant-input {
		padding: 0 0.75rem;
	}

	:scope:scope.elevated, :scope:scope.selected {
		border-color: transparent;
	}
	:scope.elevated {
		background: rgb(var(--m3dl-color-surface-container-low));
		box-shadow: var(--m3dl-elevation-1);
	}
	:scope.selected {
		background: rgb(var(--m3dl-color-secondary-container));
		color: rgb(var(--m3dl-color-on-secondary-container));
	}

	:scope:disabled {
		cursor: auto;
		box-shadow: none;
		border-color: rgb(var(--m3dl-color-on-surface) / 0.12));
		background: rgb(var(--m3dl-color-surface));
		color: rgb(var(--m3dl-color-on-surface) / 0.38);
	}
	:scope.selected:disabled, :scope.elevated:disabled {
		background: rgb(var(--m3dl-color-on-surface) / 0.12);
	}
`;
