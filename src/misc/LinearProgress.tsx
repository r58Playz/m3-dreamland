import { Component, css } from "dreamland/core";

export let LinearProgress: Component<{
	progress: number,
	thickness?: number,
}> = function() {
	this.thickness ??= 4;

	return (
		<div role="progressbar" class="m3dl-container m3dl-linear-progress">
			<div class="indeterminate" class:hidden={use(this.progress).map(x => x >= 0)} />
			<div class="progress" class:hidden={use(this.progress).map(x => x < 0)} />
		</div>
	)
}
LinearProgress.style = css<typeof LinearProgress>`
	:scope {
		background: rgb(var(--m3dl-color-secondary-container));
		height: ${x => use(x.thickness).map(x => x + "px")};

		overflow: hidden;
		position: relative;

		flex: 0 0 ${x => use(x.thickness).map(x => x + "px")};
	}
	:scope, :scope > * {
		border-radius: var(--m3dl-shape-full);
	}
	:scope > * {
		background: rgb(var(--m3dl-color-primary));

		position: absolute;
		top: 0;
		bottom: 0;
	}

	.progress {
		left: 0;
		width: ${x => use(x.progress).map(x => x + "%")};
		transition: width var(--m3dl-motion-effects-default);
	}
	.indeterminate {
		width: 50%;
		animation: m3dl-linear-progress-indeterminate infinite 1.5s ease-out;
	}

	.hidden {
		visibility: hidden;
	}

	@keyframes m3dl-linear-progress-indeterminate {
		0% {
			left: -50%;
		}
		100% {
			left: 125%;
		}
	}
`;
