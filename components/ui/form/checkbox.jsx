"use client";

import { forwardRef, useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const Checkbox = forwardRef(function Checkbox(
	{ className, size = "md", indeterminate, checked, ...props },
	ref,
) {
	return (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				"peer shrink-0 rounded-[var(--radius-sm)]",
				"border border-[var(--color-border-strong)] bg-[var(--bg)]",
				"transition-all duration-[var(--duration-normal)]",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]",
				"disabled:cursor-not-allowed disabled:opacity-40",
				"hover:border-[var(--accent)]",
				"data-[state=checked]:bg-[var(--accent)] data-[state=checked]:border-[var(--accent)] data-[state=checked]:text-white",
				"data-[state=indeterminate]:bg-[var(--accent)] data-[state=indeterminate]:border-[var(--accent)] data-[state=indeterminate]:text-white",
				size === "sm" && "h-4 w-4",
				size === "md" && "h-[1.125rem] w-[1.125rem]",
				size === "lg" && "h-5 w-5",
				className,
			)}
			checked={indeterminate ? "indeterminate" : checked}
			{...props}
		>
			<CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
				{indeterminate ? (
					<Minus
						className={cn(
							size === "sm"
								? "h-2.5 w-2.5"
								: size === "lg"
									? "h-3.5 w-3.5"
									: "h-3 w-3",
						)}
						strokeWidth={3}
					/>
				) : (
					<Check
						className={cn(
							size === "sm"
								? "h-2.5 w-2.5"
								: size === "lg"
									? "h-3.5 w-3.5"
									: "h-3 w-3",
						)}
						strokeWidth={3}
					/>
				)}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
});

const CheckboxField = forwardRef(function CheckboxField(
	{ label, description, size = "md", id, className, ...props },
	ref,
) {
	const generatedId = useId();
	const fieldId = id ?? generatedId;

	return (
		<div className={cn("flex items-start gap-2.5", className)}>
			<Checkbox ref={ref} id={fieldId} size={size} {...props} />
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

export { Checkbox, CheckboxField };
