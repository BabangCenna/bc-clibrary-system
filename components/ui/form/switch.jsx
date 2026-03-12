"use client";

import { forwardRef, useId } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

const Switch = forwardRef(function Switch(
	{ className, size = "md", ...props },
	ref,
) {
	return (
		<SwitchPrimitive.Root
			ref={ref}
			className={cn(
				"peer inline-flex shrink-0 cursor-pointer items-center",
				"rounded-full border-2 border-transparent",
				"bg-[var(--color-border-strong)]",
				"transition-all duration-[var(--duration-normal)]",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
				"disabled:cursor-not-allowed disabled:opacity-40",
				"data-[state=checked]:bg-[var(--accent)]",
				size === "sm" && "h-5 w-9",
				size === "md" && "h-6 w-11",
				size === "lg" && "h-7 w-[3.25rem]",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				className={cn(
					"pointer-events-none block rounded-full",
					"bg-white shadow-sm shadow-black/20",
					"transition-transform duration-[var(--duration-normal)]",
					size === "sm" &&
						"h-3.5 w-3.5 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
					size === "md" &&
						"h-4 w-4 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5",
					size === "lg" &&
						"h-5 w-5 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0.5",
				)}
			/>
		</SwitchPrimitive.Root>
	);
});

const SwitchField = forwardRef(function SwitchField(
	{
		label,
		description,
		size = "md",
		labelPosition = "right",
		id,
		className,
		...props
	},
	ref,
) {
	const generatedId = useId();
	const fieldId = id ?? generatedId;

	const labelEl = (
		<div className="grid gap-0.5 leading-none">
			<label
				htmlFor={fieldId}
				className={cn(
					"font-medium cursor-pointer leading-snug text-[var(--text-primary)]",
					size === "sm" && "text-xs",
					size === "md" && "text-sm",
					size === "lg" && "text-base",
				)}
			>
				{label}
			</label>
			{description && (
				<p className="text-xs text-[var(--text-secondary)]">{description}</p>
			)}
		</div>
	);

	return (
		<div className={cn("flex items-center gap-3", className)}>
			{labelPosition === "left" && labelEl}
			<Switch ref={ref} id={fieldId} size={size} {...props} />
			{labelPosition === "right" && labelEl}
		</div>
	);
});

export { Switch, SwitchField };
