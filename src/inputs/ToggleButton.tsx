import { Component, ComponentChild } from "dreamland/core";
import { Button, ButtonIcon, ButtonSize } from "./Button";

export type ToggleButtonVariant = "elevated" | "filled" | "tonal" | "outlined";

export let ToggleButton: Component<{
	value: boolean,
	variant: ToggleButtonVariant,
	size?: ButtonSize,
	icon?: ButtonIcon,

	disabled?: boolean,

	children?: ComponentChild,
}> = function(cx) {
	this.value ??= false;

	return (
		<Button
			variant={use(this.variant)}
			size={use(this.size)}
			shape={use(this.value).andThen("square", "round")}
			icon={use(this.icon)}

			disabled={use(this.disabled)}

			on:click={() => this.value = !this.value}
		>
			<span class="m3dl-toggle" class:selected={use(this.value)} />
			{cx.children}
		</Button>
	)
}
