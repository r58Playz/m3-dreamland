import { Component, css } from "dreamland/core";
import { randomUid } from "../util";
import { IconifyIcon } from "@iconify/types";
import { Icon } from "../misc/Icon";
import { HoverLayer } from "../misc/Layer";

// TODO trailing
export let TextFieldFilled: Component<{
	value: string,
	placeholder?: string,
	supporting?: string,

	leading?: IconifyIcon,

	errored?: boolean,
}> = function() {
	let id = randomUid();

	this.placeholder ??= "";
	this.errored ??= false;

	return (
		<div class="m3dl-container m3dl-textfield" class:errored={use(this.errored)}>
			<div class="field m3dl-font-body-large">
				{use(this.leading).map(x => x && <Icon class="leading" icon={x} />)}
				<input
					class="focus-none"
					value={use(this.value)}
					placeholder=" "
					id={id}
				/>
				<label class="placeholder" for={id}>{use(this.placeholder)}</label>
				<div class="focus" />
				<HoverLayer />
			</div>
			{use(this.supporting).map(x => typeof x == "string" ? <div class="m3dl-font-body-small supporting">{x}</div> : null)}
		</div>
	)
}
TextFieldFilled.style = css`
	:scope {
		display: inline-flex;
		min-width: 15rem;

		flex-direction: column;
		gap: 0.25rem;
	}

	.field {
		position: relative;
		min-height: 3.5rem;

		flex: 1;
		width: 100%;

		background: rgb(var(--m3dl-color-surface-container-highest));
		border-radius: var(--m3dl-shape-extra-small) var(--m3dl-shape-extra-small) 0 0;

		--m3dl-state-color: rgb(var(--m3dl-color-on-surface));
	}
	.field input {
		position: absolute;
		inset: 0;

		padding: 1.5rem 1rem 0.5rem 1rem;

		border: none;
		background: transparent;
		color: rgb(var(--m3dl-color-on-surface));
		caret-color: rgb(var(--m3dl-color-primary));

		font: inherit;
		letter-spacing: inherit;
		word-spacing: inherit;
		line-height: inherit;
		text-align: inherit;
	}
	.field label {
		position: absolute;
		left: 1rem;
		top: 0.5rem;
		color: rgb(var(--m3dl-color-primary));

		font-size: var(--m3dl-font-body-small-size, 0.75rem);
		line-height: var(--m3dl-font-body-small-height, 1.333);
		letter-spacing: var(--m3dl-font-body-small-tracking, 0.025rem);
		font-weight: var(--m3dl-font-body-small-weight, 400);

		transition: var(--m3dl-motion-effects-default);
	}
	.field input:not(:focus):placeholder-shown ~ label {
		top: 1rem;
		color: rgb(var(--m3dl-color-on-surface-variant));

		font-size: var(--m3dl-font-body-large-size, 1rem);
		line-height: var(--m3dl-font-body-large-height, 1.5);
		letter-spacing: var(--m3dl-font-body-large-tracking, 0);
		font-weight: var(--m3dl-font-body-large-weight, 400);
	}
	.field .focus {
		position: absolute;
		bottom: 0px;
		height: 1px;
		width: 100%;

		background: rgb(var(--m3dl-color-on-surface-variant));
		transition: var(--m3dl-motion-effects-default);
	}
	.field input:focus ~ .focus {
		background: rgb(var(--m3dl-color-primary));
		height: 2px;
	}
	.field > :global(svg) {
		top: calc(100% / 2 - 0.75rem);
		width: 1.5rem;
		height: 1.5rem;
		color: rgb(var(--m3dl-color-on-surface-variant));
	}
	.field > :global(.leading) {
		position: absolute;
		left: 0.5rem;
	}
	.field > :global(.leading) ~ input {
		padding-left: 3rem;
	}
	.field > :global(.leading) ~ label {
		left: 3rem;
	}
	.field :global(:is(label, svg)) {
		pointer-events: none;
	}

	.supporting {
		margin: 0 1rem;

		color: rgb(var(--m3dl-color-on-surface-variant));
	}

	:scope.errored .field .focus {
		background: rgb(var(--m3dl-color-error));
	}
	:scope.errored :is(.field :is(label, .trailing), .supporting) {
		color: rgb(var(--m3dl-color-error));
	}
	:scope.errored .field input {
		caret-color: rgb(var(--m3dl-color-error));
	}

	:scope.errored .field:hover .focus {
		background: rgb(var(--m3dl-color-on-error-container));
	}
	:scope.errored .field:hover :is(label, .trailing) {
		color: rgb(var(--m3dl-color-on-error-container));
	}
`;
