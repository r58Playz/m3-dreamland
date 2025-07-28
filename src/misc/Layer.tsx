import { Component, createDelegate, css, Delegate, DLElement } from "dreamland/core";
import { randomUid } from "../util";

let ua = navigator.userAgent;
let isFirefox = ua.includes("Firefox");
let isTrulySafari = !ua.includes("Chrome") && ua.includes("Safari");
let advancedRipplesEnabled = !isTrulySafari && !isFirefox;

let Ripple: Component<{ x: number, y: number, size: number, speed: number, cancel: Delegate<number> }> = function(cx) {
	let id = randomUid();

	cx.mount = () => {
		this.cancel.listen((duration) => {
			let animate = <animate
				xmlns="http://www.w3.org/2000/svg"
				attributeName="opacity"
				from={1}
				to={0}
				dur={`${duration}ms`}
				fill="freeze"
				calcMode="spline"
				keySplines="0.4 0, 0.2 1"
			/> as any as SVGAnimateElement;
			cx.root.querySelector("circle")!.appendChild(animate);
			animate.beginElement();
		});
	}

	return (
		<svg xmlns="http://www.w3.org/2000/svg">
			<radialGradient id={"gradient-" + id}>
				<stop offset="0%" stop-color="currentColor" stop-opacity="0.12" />
				<stop offset="70%" stop-color="currentColor" stop-opacity="0.12" />
				<stop offset="100%" stop-color="currentColor" stop-opacity="0" />
			</radialGradient>
			{advancedRipplesEnabled ?
				<filter id={"filter-" + id}>
					<feTurbulence type="fractalNoise" baseFrequency="0.6" seed={Math.random()} />
					<feDisplacementMap in="SourceGraphic" in2="turbulence" scale={this.size ** 2 * 0.0001} xChannelSelector="R" yChannelSelector="B" />
				</filter> : "firefox sucks"}
			<circle cx={this.size / 2} cy={this.size / 2} r={0} fill={`url(#gradient-${id})`} {...(advancedRipplesEnabled ? { filter: `url(#filter-${id})` } : {})}>
				<animate attributeName="r" from={0} to={this.size / 2} dur={this.speed + "ms"} fill="freeze" calcMode="spline" keySplines="0.4 0, 0.2 1" />
			</circle>
		</svg>
	)
}
Ripple.style = css<typeof Ripple>`
	:scope {
		position: absolute;
		left: ${x => `${x.x - x.size / 2}px`};
		top: ${x => `${x.y - x.size / 2}px`};
		width: ${x => `${x.size}px`};
		height: ${x => `${x.size}px`};
		pointer-events: none;
		overflow: visible;
	}
`;

export let Ripples: Component<{ create: Delegate<MouseEvent> }, { ripples: DLElement<typeof Ripple>[] }> = function(cx) {
	this.ripples = [];
	let cancels = [];

	cx.mount = () => {
		this.create.listen((e: MouseEvent) => {
			let rect = cx.root.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;
			let size = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y)) * 2.5;
			let speed = Math.max(Math.min(Math.log(size) * 50, 600), 200);

			let delegate = createDelegate<number>();

			let ripple = <Ripple x={x} y={y} size={size} speed={speed} cancel={delegate} /> as DLElement<typeof Ripple>;

			cancels.push(() => {
				delegate(800);
				setTimeout(() => this.ripples = this.ripples.filter(x => x !== ripple), 800);
			})
			this.ripples = [...this.ripples, ripple];
		})

		let cancel = () => {
			cancels.map(x => x());
			cancels = [];
		}

		window.addEventListener("pointerup", cancel);
		window.addEventListener("dragend", cancel);
	}

	return <div>{use(this.ripples)}</div>
}
Ripples.style = css`
	:scope {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;

		overflow: hidden;
	}

	:global(*):disabled > :scope { opacity: 0; }
`;

export let HoverLayer: Component = function() {
	return <div />
}
HoverLayer.style = css`
	:scope {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		pointer-events: none;

		overflow: hidden;

		background: currentColor;
		opacity: 0;
		transition: opacity var(--m3dl-motion-effects-default);
	}

	:global(*):hover:not(:global(:disabled)) > :scope {
		opacity: 0.08;
	}
`;
