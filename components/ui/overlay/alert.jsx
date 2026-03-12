import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
	[
		"relative w-full rounded-[var(--radius-lg)] border p-4",
		"[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
		"[&>svg]:h-4 [&>svg]:w-4",
		"[&>svg~*]:pl-7",
	],
	{
		variants: {
			variant: {
				default: [
					"bg-[var(--surface)] text-[var(--text-primary)]",
					"border-[var(--color-border)]",
					"[&>svg]:text-[var(--text-secondary)]",
				],
				info: [
					"bg-[color-mix(in_srgb,#3B82F6_10%,transparent)]",
					"border-[color-mix(in_srgb,#3B82F6_30%,transparent)]",
					"text-[var(--text-primary)]",
					"[&>svg]:text-[#3B82F6]",
				],
				success: [
					"bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)]",
					"border-[color-mix(in_srgb,var(--color-success)_30%,transparent)]",
					"text-[var(--text-primary)]",
					"[&>svg]:text-[var(--color-success)]",
				],
				warning: [
					"bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)]",
					"border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)]",
					"text-[var(--text-primary)]",
					"[&>svg]:text-[var(--color-warning)]",
				],
				destructive: [
					"bg-[color-mix(in_srgb,var(--color-destructive)_10%,transparent)]",
					"border-[color-mix(in_srgb,var(--color-destructive)_30%,transparent)]",
					"text-[var(--text-primary)]",
					"[&>svg]:text-[var(--color-destructive)]",
				],
			},
		},
		defaultVariants: { variant: "default" },
	},
);

const Alert = forwardRef(function Alert({ className, variant, ...props }, ref) {
	return (
		<div
			ref={ref}
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
});

const AlertTitle = forwardRef(function AlertTitle(
	{ className, ...props },
	ref,
) {
	return (
		<h5
			ref={ref}
			className={cn(
				"mb-1 font-semibold text-sm leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
});

const AlertDescription = forwardRef(function AlertDescription(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn(
				"text-sm text-[var(--text-secondary)] leading-relaxed [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
});

export { Alert, AlertTitle, AlertDescription };
