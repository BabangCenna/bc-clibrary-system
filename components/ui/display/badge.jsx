"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	[
		"inline-flex items-center gap-1.5",
		"rounded-[var(--radius-full)]",
		"border",
		"font-semibold text-xs leading-none",
		"transition-colors duration-[var(--duration-fast)]",
		"select-none",
	],
	{
		variants: {
			variant: {
				default: "bg-[var(--accent)] text-white border-transparent",
				secondary:
					"bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--color-border)]",
				outline:
					"bg-transparent text-[var(--text-primary)] border-[var(--color-border-strong)]",
				success:
					"bg-[color-mix(in_srgb,var(--color-success)_15%,transparent)] text-[var(--color-success)] border-[color-mix(in_srgb,var(--color-success)_30%,transparent)]",
				warning:
					"bg-[color-mix(in_srgb,var(--color-warning)_15%,transparent)] text-[var(--color-warning)] border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)]",
				destructive:
					"bg-[color-mix(in_srgb,var(--color-destructive)_15%,transparent)] text-[var(--color-destructive)] border-[color-mix(in_srgb,var(--color-destructive)_30%,transparent)]",
				ghost:
					"bg-transparent text-[var(--text-secondary)] border-transparent hover:bg-[var(--surface)]",
			},
			size: {
				sm: "px-2 py-0.5 text-[10px]",
				md: "px-2.5 py-0.5 text-xs",
				lg: "px-3 py-1 text-sm",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

const Badge = forwardRef(function Badge(
	{ className, variant, size, dot, children, ...props },
	ref,
) {
	return (
		<span
			ref={ref}
			className={cn(badgeVariants({ variant, size }), className)}
			{...props}
		>
			{dot && (
				<span className="inline-block h-1.5 w-1.5 rounded-full bg-current shrink-0" />
			)}
			{children}
		</span>
	);
});

export { Badge, badgeVariants };
