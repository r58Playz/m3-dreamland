import { FC, ComponentChild } from "dreamland/core";
import { Button, ButtonIcon } from "./Button";
import { ComponentSize } from "../util";

export type ToggleButtonVariant = "elevated" | "filled" | "tonal" | "outlined";

export function ToggleButton(this: FC<{
	value: boolean,
	variant: ToggleButtonVariant,
	size?: ComponentSize,
	icon?: ButtonIcon,
	title?: string,

	disabled?: boolean,

	children?: ComponentChild,
}>) {
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
			{this.children}
		</Button>
	)
}
