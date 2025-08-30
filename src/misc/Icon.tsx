import type { IconifyIcon } from "@iconify/types";
import { Component } from "dreamland/core";

export const Icon: Component<{
	icon: IconifyIcon,
	width?: string | undefined,
	height?: string | undefined,
	class?: string | undefined
}, {}> = function() {
	return (
		<svg
			width={use(this.width).map(x => x || "1em")}
			height={use(this.height).map(x => x || "1em")}
			viewBox={use`0 0 ${this.icon.width} ${this.icon.height}`}
			xmlns="http://www.w3.org/2000/svg"
			{...(this.class ? { class: this.class } : {})}

			attr:innerHTML={use(this.icon).map(x => x.body)}
		/>
	);
}
