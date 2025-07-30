import { Component, css } from "dreamland/core";
import { Icon } from "../misc/Icon";

import iconCheck from "@ktibow/iconset-material-symbols/check";
import { IconifyIcon } from "@iconify/types";

export let Switch: Component<{
	value: boolean,
	icon?: IconifyIcon,
	disabled?: boolean,
}> = function() {
	this.disabled ??= false;
	this.icon ??= iconCheck;

	return (
		<span class="m3dl-container m3dl-switch">
			<input type="checkbox" role="switch" disabled={use(this.disabled)} checked={use(this.value).bind()} />
			<div class="layer">
				<div class="handle">
					<Icon icon={use(this.icon)} />
				</div>
			</div>
		</span>
	)
}
Switch.style = css`
	:scope {
		width: 3.25rem;
		height: 2rem;

		display: inline-flex;
		position: relative;
	}

	input {
		position: absolute;
		inset: 0;

		appearance: none;
		margin: 0;
		border: 2px solid rgb(var(--m3dl-color-outline));
		border-radius: var(--m3dl-shape-full);
		background: rgb(var(--m3dl-color-surface-container-highest));

		transition: var(--m3dl-motion-effects-default);
	}
	input:checked {
		background: rgb(var(--m3dl-color-primary));
		border-color: rgb(var(--m3dl-color-primary));
	}
	input:disabled {
		background: rgb(var(--m3dl-color-surface-container-highest));
		border-color: rgb(var(--m3dl-color-outline) / 0.12);
	}
	input:disabled:checked {
		background: rgb(var(--m3dl-color-on-surface) / 0.12);
		border-color: transparent;
	}

	.layer {
		pointer-events: none;

		width: 2.5rem;
		height: 2.5rem;

		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		border-radius: var(--m3dl-shape-full);
		background: rgb(var(--m3dl-color-primary) / 0);

		display: flex;
		align-items: center;
		justify-content: center;

		transition: left var(--m3dl-motion-spatial-fast), background var(--m3dl-motion-effects-default);
	}
	input:checked ~ .layer {
		left: 2.25rem;
	}
	input:enabled:hover ~ .layer {
		background: rgb(var(--m3dl-color-primary) / 0.1);
	}

	.handle {
		width: 1rem;
		height: 1rem;

		background: rgb(var(--m3dl-color-outline));
		color: rgb(var(--m3dl-color-surface-container-highest));
		border-radius: var(--m3dl-shape-full);

		display: flex;
		align-items: center;
		justify-content: center;

		transition: var(--m3dl-motion-spatial-fast);
	}
	.handle :global(svg) {
		opacity: 0;
		transition: var(--m3dl-motion-effects-default);
	}
	input:checked ~ .layer .handle {
		width: 1.5rem;
		height: 1.5rem;

		background: rgb(var(--m3dl-color-on-primary));
		color: rgb(var(--m3dl-color-primary));
	}
	input:checked ~ .layer :global(svg) {
		opacity: 1;
	}
	input:enabled:hover ~ .layer .handle {
		background: rgb(var(--m3dl-color-on-surface-variant));
		color: rgb(var(--m3dl-color-surface-container-highest));
	}
	input:enabled:checked:hover ~ .layer .handle {
		background: rgb(var(--m3dl-color-primary-container));
		color: rgb(var(--m3dl-color-on-primary-container));
	}
	input:enabled:active ~ .layer .handle {
		width: 1.75rem;
		height: 1.75rem;
	}
	input:disabled ~ .layer .handle {
		background: rgb(var(--m3dl-color-on-surface) / 0.38);
		color: rgb(var(--m3dl-color-surface-container-highest) / 0.38);
	}
	input:disabled:checked ~ .layer .handle {
		background: rgb(var(--m3dl-color-surface));
		color: rgb(var(--m3dl-color-on-surface) / 0.38);
	}
`;
