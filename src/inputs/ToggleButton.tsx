import { Component, ComponentChild } from "dreamland/core";
import { Button, ButtonIcon } from "./Button";
import { ComponentSize } from "../util";

export type ToggleButtonVariant = "elevated" | "filled" | "tonal" | "outlined";

export let ToggleButton: Component<{
	value: boolean,
	variant: ToggleButtonVariant,
	size?: ComponentSize,
	icon?: ButtonIcon,
	title?: string,

	disabled?: boolean,

	children?: ComponentChild,
}> = function(cx) {
	this.value ??= false;

	return (
		<Button
			variant={use(this.variant)}
			size={use(this.size)}
			shape={use(this.value).and("square" as const).or("round" as const)}
			icon={use(this.icon)}
			title={use(this.title)}

			disabled={use(this.disabled)}

			on:click={() => this.value = !this.value}
		>
			<span class="m3dl-toggle" class:selected={use(this.value)} />
			{cx.children}
		</Button>
	)
}
