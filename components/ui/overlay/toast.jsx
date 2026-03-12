"use client";

import { forwardRef } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const ToastProvider = ToastPrimitive.Provider;
const ToastClose = ToastPrimitive.Close;

const ToastViewport = forwardRef(function ToastViewport(
	{ className, ...props },
	ref,
) {
	return (
		<ToastPrimitive.Viewport
			ref={ref}
			className={cn(
				"fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4",
				"sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col",
				"md:max-w-[420px]",
				className,
			)}
			{...props}
		/>
	);
});

const toastVariants = cva(
	[
		"group pointer-events-auto relative flex w-full items-start justify-between gap-3",
		"overflow-hidden rounded-[var(--radius-xl)] p-4 pr-8",
		"border shadow-lg shadow-black/10",
		"transition-all",
		"data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
		"data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none",
		"data-[state=open]:animate-in data-[state=closed]:animate-out",
		"data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
		"data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
	],
	{
		variants: {
			variant: {
				default:
					"bg-[var(--surface)] border-[var(--color-border)] text-[var(--text-primary)]",
				success:
					"bg-[color-mix(in_srgb,var(--color-success)_12%,var(--surface))] border-[color-mix(in_srgb,var(--color-success)_30%,transparent)] text-[var(--text-primary)]",
				warning:
					"bg-[color-mix(in_srgb,var(--color-warning)_12%,var(--surface))] border-[color-mix(in_srgb,var(--color-warning)_30%,transparent)] text-[var(--text-primary)]",
				destructive:
					"bg-[color-mix(in_srgb,var(--color-destructive)_12%,var(--surface))] border-[color-mix(in_srgb,var(--color-destructive)_30%,transparent)] text-[var(--text-primary)]",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

const Toast = forwardRef(function Toast({ className, variant, ...props }, ref) {
	return (
		<ToastPrimitive.Root
			ref={ref}
			className={cn(toastVariants({ variant }), className)}
			{...props}
		/>
	);
});

const ToastAction = forwardRef(function ToastAction(
	{ className, ...props },
	ref,
) {
	return (
		<ToastPrimitive.Action
			ref={ref}
			className={cn(
				"inline-flex h-8 shrink-0 items-center justify-center",
				"rounded-[var(--radius-md)] border border-[var(--color-border-strong)]",
				"bg-transparent px-3 text-sm font-medium",
				"text-[var(--text-primary)]",
				"transition-colors duration-[var(--duration-fast)]",
				"hover:bg-[var(--color-muted)]",
				"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]",
				"disabled:pointer-events-none disabled:opacity-40",
				className,
			)}
			{...props}
		/>
	);
});

const ToastTitle = forwardRef(function ToastTitle(
	{ className, ...props },
	ref,
) {
	return (
		<ToastPrimitive.Title
			ref={ref}
			className={cn(
				"text-sm font-semibold text-[var(--text-primary)]",
				className,
			)}
			{...props}
		/>
	);
});

const ToastDescription = forwardRef(function ToastDescription(
	{ className, ...props },
	ref,
) {
	return (
		<ToastPrimitive.Description
			ref={ref}
			className={cn("text-sm text-[var(--text-secondary)] mt-0.5", className)}
			{...props}
		/>
	);
});

export {
	ToastProvider,
	ToastViewport,
	Toast,
	ToastTitle,
	ToastDescription,
	ToastAction,
	ToastClose,
};
