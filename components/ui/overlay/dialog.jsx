"use client";

import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef(function DialogOverlay(
	{ className, ...props },
	ref,
) {
	return (
		<DialogPrimitive.Overlay
			ref={ref}
			className={cn(
				"fixed inset-0 z-50",
				"bg-black/50 backdrop-blur-sm",
				"data-[state=open]:animate-in data-[state=closed]:animate-out",
				"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
				className,
			)}
			{...props}
		/>
	);
});

const DialogContent = forwardRef(function DialogContent(
	{ className, children, hideClose, size = "md", ...props },
	ref,
) {
	const sizeMap = {
		sm: "max-w-sm",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-[calc(100vw-2rem)]",
	};

	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50",
					"translate-x-[-50%] translate-y-[-50%]",
					"w-full",
					sizeMap[size],
					"bg-[var(--surface)]",
					"border border-[var(--color-border)]",
					"rounded-[var(--radius-2xl)]",
					"shadow-xl shadow-black/20",
					"p-6",
					"focus:outline-none",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
					"data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
					className,
				)}
				{...props}
			>
				{children}
				{!hideClose && (
					<DialogPrimitive.Close
						className={cn(
							"absolute right-4 top-4",
							"rounded-[var(--radius-sm)] p-1",
							"text-[var(--text-secondary)]",
							"opacity-70 hover:opacity-100",
							"hover:bg-[var(--color-muted)]",
							"transition-all duration-[var(--duration-fast)]",
							"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]",
							"disabled:pointer-events-none",
						)}
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});

const DialogHeader = forwardRef(function DialogHeader(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("flex flex-col gap-1.5 mb-4", className)}
			{...props}
		/>
	);
});

const DialogFooter = forwardRef(function DialogFooter(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("flex items-center justify-end gap-2 mt-6", className)}
			{...props}
		/>
	);
});

const DialogTitle = forwardRef(function DialogTitle(
	{ className, ...props },
	ref,
) {
	return (
		<DialogPrimitive.Title
			ref={ref}
			className={cn(
				"text-base font-semibold leading-none text-[var(--text-primary)]",
				className,
			)}
			{...props}
		/>
	);
});

const DialogDescription = forwardRef(function DialogDescription(
	{ className, ...props },
	ref,
) {
	return (
		<DialogPrimitive.Description
			ref={ref}
			className={cn("text-sm text-[var(--text-secondary)]", className)}
			{...props}
		/>
	);
});

export {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogClose,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogDescription,
};
