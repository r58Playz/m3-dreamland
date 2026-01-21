import { FC, css } from "dreamland/core";
import { createSpring } from "dreamland/motion";
import { ComponentSize } from "../util";

// TODO icon
export function Slider(this: FC<{
	value: number,
	min?: number,
	max?: number,
	step?: number | "any",

	size?: ComponentSize,
	ticks?: boolean,
	endStop?: boolean,
	indicator?: (n: number) => string,
	disabled?: boolean,
}, {
	stops: number,
}>) {
	this.min ??= 0;
	this.max ??= 100;
	this.step ??= "any";

	this.size ??= "xs";
	this.ticks ??= false;
	this.endStop ??= false;
	this.disabled ??= false;

	let spring = createSpring(use(this.value), { stiffness: 0.3, damping: 1 });
	let display = use(this.min, this.max, spring.current).map(([min, max, current]) => (current - min) / (max - min));

	let update = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
		let value = +e.currentTarget.value;
		e.preventDefault();
		this.value = value;
	}

	let stopList = use(this.min, this.max, this.step, this.ticks, this.endStop).map(([min, max, step, ticks, endStop]) => {
		if (step != "any" && ticks) {
			return Math.floor((max - min) / step) + 1;
		} else if (endStop) {
			return 1;
		} else {
			return 0;
		}
	}).map(Array);
	let stops = () => (
		<div class="stops">
			{stopList.mapEach(_ => (
				<div class="stop" />
			))}
		</div>
	)

	return (
		<div
			class={use`m3dl-container m3dl-slider size-${this.size}`}
			style={{
				"--percent": display,
				"--inverse-percent": display.map(x => 1 - x),
			}}
		>
			<input
				type="range"
				on:input={update}

				disabled={use(this.disabled)}
				min={use(this.min)}
				max={use(this.max)}
				step={use(this.step)}
			/>

			<div class="track left">{stops()}</div>
			<div class="handle">
				{this.indicator ? <div class="indicator m3dl-font-label-large">{use(this.value).map(this.indicator)}</div> : null}
				<div class="handle-inner" />
			</div>
			<div class="track right">{stops()}</div>
		</div>
	)
}
Slider.style = css`
	:scope {
		position: relative;
		min-width: 10rem;
		height: var(--handle);

		display: flex;
		align-items: center;
	}

	.track, .handle, .stop {
		pointer-events: none;
		user-select: none;
	}

	.track {
		height: var(--track);
		overflow: hidden;

		position: relative;
	}
	.left {
		border-radius: var(--shape) 0.125rem 0.125rem var(--shape);
		flex: 0 0 calc(100% * var(--percent) - 0.5rem);
		margin-right: min(0.375rem, 0.375rem + (var(--percent) * 100%) - 0.5rem);

		background: rgb(var(--m3dl-color-primary));
	}
	input:disabled ~ .left {
		background: rgb(var(--m3dl-color-on-surface) / 0.38);
	}
	.right {
		border-radius: 0.125rem var(--shape) var(--shape) 0.125rem;
		flex: 1;
		margin-left: 0.375rem;

		background: rgb(var(--m3dl-color-secondary-container));
	}
	input:disabled ~ .right {
		background: rgb(var(--m3dl-color-on-surface) / 0.12);
	}

	.handle {
		height: var(--handle);
		flex: 0 0 0.25rem;

		display: flex;
		justify-content: center;

		position: relative;
	}
	.handle-inner {
		flex: 0 0 0.25rem;

		border-radius: var(--m3dl-shape-full);
		background: rgb(var(--m3dl-color-primary));

		transition: flex-basis var(--m3dl-spring-effects-fast);
	}
	input:disabled ~ .handle > .handle-inner {
		background: rgb(var(--m3dl-color-on-surface) / 0.38);
	}
	input:is(:focus-visible, :enabled:active) ~ .handle > .handle-inner {
		flex: 0 0 0.125rem;
	}

	.indicator {
		position: absolute;
		top: -3rem;

		width: 3rem;
		padding: 0.75rem 1rem;

		background: rgb(var(--m3dl-color-inverse-surface));
		color: rgb(var(--m3dl-color-inverse-on-surface));
		border-radius: var(--m3dl-shape-full);

		display: flex;
		align-items: center;
		justify-content: center;

		opacity: 0;
		transition: opacity var(--m3dl-spring-effects-default);
	}
	input:enabled {
		cursor: pointer;
	}
	input:enabled:is(:hover, :focus-visible, :active) ~ .handle > .indicator {
		opacity: 1;
	}

	.stops {
		position: absolute;

		height: 100%;

		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row-reverse;

		padding: 0 0.25rem;
	}
	.left > .stops { left: 0; width: calc((100% + 0.5rem) / var(--percent)) }
	.right > .stops { right: 0; width: calc((100% + 0.5rem) / var(--inverse-percent)) }
	.stop {
		width: 0.25rem;
		height: 0.25rem;
		border-radius: var(--m3dl-shape-full);

		background: rgb(var(--m3dl-color-on-secondary-container));
	}
	.left .stop {
		background: rgb(var(--m3dl-color-on-primary));
	}
	input:disabled ~ .track .stop {
		background: rgb(var(--m3dl-color-on-surface) / 0.38);
	}
	input:disabled ~ .track.left .stop {
		background: rgb(var(--m3dl-color-inverse-on-surface) / 0.66);
	}

	.stop.end {
		--stops: calc(100% - 0.375rem);
	}

	input {
		position: absolute;
		inset-inline: -0.25rem;
		width: calc(100% + 0.5rem);
		height: 100%;

		appearance: none;
		opacity: 0;
		margin: 0;
	}

	.size-xs {
		--track: 1rem;
		--handle: 2.75rem;
		--shape: var(--m3dl-shape-small);
	}
	.size-s {
		--track: 1.5rem;
		--handle: 2.75rem;
		--shape: var(--m3dl-shape-small);
	}
	.size-m {
		--track: 2.5rem;
		--handle: 2.75rem;
		--shape: var(--m3dl-shape-medium);
	}
	.size-l {
		--track: 3.5rem;
		--handle: 4.25rem;
		--shape: var(--m3dl-shape-large);
	}
	.size-xl {
		--track: 6rem;
		--handle: 6.75rem;
		--shape: var(--m3dl-shape-extra-large);
	}
`;
