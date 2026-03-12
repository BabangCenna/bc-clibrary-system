import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Card = forwardRef(function Card({ className, hoverable, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={cn(
				"rounded-[var(--radius-xl)]",
				"bg-[var(--surface)]",
				"border border-[var(--color-border)]",
				"shadow-sm shadow-black/5",
				"transition-all duration-[var(--duration-normal)]",
				hoverable &&
					"hover:shadow-md hover:shadow-black/10 hover:-translate-y-0.5 cursor-pointer",
				className,
			)}
			{...props}
		/>
	);
});

const CardHeader = forwardRef(function CardHeader(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
			{...props}
		/>
	);
});

const CardTitle = forwardRef(function CardTitle({ className, ...props }, ref) {
	return (
		<h3
			ref={ref}
			className={cn(
				"text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)]",
				className,
			)}
			{...props}
		/>
	);
});

const CardDescription = forwardRef(function CardDescription(
	{ className, ...props },
	ref,
) {
	return (
		<p
			ref={ref}
			className={cn(
				"text-sm text-[var(--text-secondary)] leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
});

const CardContent = forwardRef(function CardContent(
	{ className, ...props },
	ref,
) {
	return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

const CardFooter = forwardRef(function CardFooter(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("flex items-center p-6 pt-0", className)}
			{...props}
		/>
	);
});

// ── CardSeparator ──────────────────────────────────────
const CardSeparator = forwardRef(function CardSeparator(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("h-px w-full bg-[var(--color-border)] mx-0", className)}
			{...props}
		/>
	);
});

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardSeparator,
};
