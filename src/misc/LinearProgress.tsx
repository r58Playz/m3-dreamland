import { Component, css } from "dreamland/core";

export let LinearProgress: Component<{
	progress: number,
	thickness?: number,
}> = function() {
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
		transition: var(--m3dl-motion-effects-default);
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
