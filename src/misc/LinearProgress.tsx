import { Component, css } from "dreamland/core";

export let LinearProgress: Component<{
	progress: number,
	thickness?: number,
}> = function () {
	this.thickness ??= 4;

	return (
		<div role="progressbar" class="m3dl-container m3dl-linear-progress">
			<div class="progress" />
			<div class="track" />
		</div>
	)
}
LinearProgress.style = css<typeof LinearProgress>`
	:scope {
		--m3dl-progress-height: ${x => use(x.thickness).map(x => x / 16 + "rem")};

		height: var(--m3dl-progress-height);

		overflow: hidden;
		position: relative;

		flex: 0 0 var(--m3dl-progress-height);

		display: flex;
		gap: 0.25rem;
		margin: 0 0.25rem;
	}
	:scope, :scope > * {
		border-radius: var(--m3dl-shape-full);
		transition: var(--m3dl-spring-effects-default);
	}

	.progress {
		background: rgb(var(--m3dl-color-primary));
		flex: 0 0 ${x => use(x.progress).map(x => x + "%")};
		min-width: var(--m3dl-progress-height);
	}
	.track {
		flex: 1;
		background: rgb(var(--m3dl-color-secondary-container));
	}
`;

export let LinearProgressIndeterminate: Component<{ thickness?: number }> = function () {
	this.thickness ??= 4;
	return (
		<div role="progressbar" class="m3dl-container m3dl-linear-progress-indeterminate">
			<div class="bar1" />
			<div class="bar2" />
			<div class="track1" />
			<div class="track2" />
			<div class="track3" />
		</div>
	)
}
LinearProgressIndeterminate.style = css<typeof LinearProgressIndeterminate>`
	:scope {
		--m3dl-progress-height: ${x => use(x.thickness).map(x => x / 16 + "rem")};

		height: var(--m3dl-progress-height);
		flex: 0 0 var(--m3dl-progress-height);

		overflow: hidden;
		position: relative;

		margin: 0 0.25rem;
	}
	:scope, :scope > * {
		border-radius: var(--m3dl-shape-full);
	}

	.bar1, .bar2 {
		position: absolute;
		height: 100%;
		background: rgb(var(--m3dl-color-primary));
	}
	.track1, .track2, .track3 {
		position: absolute;
		height: 100%;
		background: rgb(var(--m3dl-color-secondary-container));
	}

	.bar1 {
		animation:
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-right-bar1,
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-left-bar1;
	}
	.bar2 {
		animation:
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-right-bar2,
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-left-bar2;
	}
	.track1 {
		right: 0%;
		margin-left: 0.25rem;
		animation:
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-left-track1;
	}
	.track2 {
		margin: 0 0.25rem;
		animation:
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-right-track2,
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-left-track2;
	}
	.track3 {
		left: 0%;
		margin-right: 0.25rem;
		animation:
			1.75s var(--m3dl-easing-emphasized-accelerate) infinite m3dl-linear-progress-indeterminate-right-track3;
	}

	@keyframes m3dl-linear-progress-indeterminate-right-bar1 {
		0% { right: 100%; }
		57.14%, 71.42% { right: 0%; }
		to { right: 100%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-left-bar1 {
		0%, 14.29% { left: 0%; }
		71.42% { left: 100%; }
		to { left: 0%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-right-bar2 {
		0%, 37.14% { right: 100%; }
		85.71%, to { right: 0%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-left-bar2 {
		0%, 51.43% { left: 0%; }
		to { left: 100%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-left-track1 {
		0% { left: 0%; }
		57.14%, to { left: 100%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-left-track2 {
		0%, 37.14% { left: 0%; }
		85.71%, to { left: 100%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-right-track2 {
		0%, 14.29% { right: 100%; }
		71.42%, 85.71% { right: 0%; }
		to { right: 100%; }
	}
	@keyframes m3dl-linear-progress-indeterminate-right-track3 {
		0%, 51.43% { right: 100%; }
		to { right: 0; }
	}
`;
