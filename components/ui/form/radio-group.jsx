"use client";

import { forwardRef, useId } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const RadioGroup = forwardRef(function RadioGroup(
	{ className, ...props },
	ref,
) {
	return (
		<RadioGroupPrimitive.Root
			className={cn("grid gap-2", className)}
			{...props}
			ref={ref}
		/>
	);
});

const RadioGroupItem = forwardRef(function RadioGroupItem(
	{ className, size = "md", ...props },
	ref,
) {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"aspect-square shrink-0 rounded-full",
				"border border-[var(--color-border-strong)] bg-[var(--bg)]",
				"text-[var(--accent)]",
				"transition-all duration-[var(--duration-normal)]",
				"focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]",
				"disabled:cursor-not-allowed disabled:opacity-40",
				"hover:border-[var(--accent)]",
				"data-[state=checked]:border-[var(--accent)]",
				size === "sm" && "h-4 w-4",
				size === "md" && "h-[1.125rem] w-[1.125rem]",
				size === "lg" && "h-5 w-5",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<span
					className={cn(
						"rounded-full bg-[var(--accent)] block",
						size === "sm" && "h-1.5 w-1.5",
						size === "md" && "h-2 w-2",
						size === "lg" && "h-2.5 w-2.5",
					)}
				/>
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});

const RadioGroupField = forwardRef(function RadioGroupField(
	{ label, description, size = "md", id, className, ...props },
	ref,
) {
	const generatedId = useId();
	const fieldId = id ?? generatedId;

	return (
		<div className={cn("flex items-start gap-2.5", className)}>
			<RadioGroupItem ref={ref} id={fieldId} size={size} {...props} />
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
		</div>
	);
});

export { RadioGroup, RadioGroupItem, RadioGroupField };
