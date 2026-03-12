"use client";

import { forwardRef } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;
const DrawerNestedRoot = DrawerPrimitive.NestedRoot;

const DrawerOverlay = forwardRef(function DrawerOverlay(
	{ className, ...props },
	ref,
) {
	return (
		<DrawerPrimitive.Overlay
			ref={ref}
			className={cn(
				"fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
				className,
			)}
			{...props}
		/>
	);
});

const DrawerContent = forwardRef(function DrawerContent(
	{ className, children, side = "bottom", hideClose, hideHandle, ...props },
	ref,
) {
	const sideStyles = {
		bottom: "inset-x-0 bottom-0 rounded-t-[var(--radius-2xl)] max-h-[96vh]",
		top: "inset-x-0 top-0 rounded-b-[var(--radius-2xl)] max-h-[96vh]",
		left: "inset-y-0 left-0 rounded-r-[var(--radius-2xl)] w-[320px] h-full",
		right: "inset-y-0 right-0 rounded-l-[var(--radius-2xl)] w-[320px] h-full",
	};

	return (
		<DrawerPortal>
			<DrawerOverlay />
			<DrawerPrimitive.Content
				ref={ref}
				className={cn(
					"fixed z-50 flex flex-col",
					"bg-[var(--surface)]",
					"border border-[var(--color-border)]",
					"shadow-xl shadow-black/20",
					"focus:outline-none",
					sideStyles[side],
					className,
				)}
				{...props}
			>
				{/* Handle — bottom/top only */}
				{!hideHandle && (side === "bottom" || side === "top") && (
					<div
						className={cn(
							"mx-auto w-12 h-1.5 rounded-full bg-[var(--color-border-strong)]",
							side === "bottom" ? "mt-4" : "mb-4 order-last",
						)}
					/>
				)}
				{/* Close button — left/right only */}
				{!hideClose && (side === "left" || side === "right") && (
					<DrawerPrimitive.Close
						className={cn(
							"absolute top-4",
							side === "right" ? "left-4" : "right-4",
							"rounded-[var(--radius-sm)] p-1",
							"text-[var(--text-secondary)] opacity-70 hover:opacity-100",
							"hover:bg-[var(--color-muted)]",
							"transition-all duration-[var(--duration-fast)]",
							"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]",
						)}
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</DrawerPrimitive.Close>
				)}
				{children}
			</DrawerPrimitive.Content>
		</DrawerPortal>
	);
});

const DrawerHeader = forwardRef(function DrawerHeader(
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

const DrawerFooter = forwardRef(function DrawerFooter(
	{ className, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("mt-auto flex flex-col gap-2 p-6", className)}
			{...props}
		/>
	);
});

const DrawerTitle = forwardRef(function DrawerTitle(
	{ className, ...props },
	ref,
) {
	return (
		<DrawerPrimitive.Title
			ref={ref}
			className={cn(
				"text-base font-semibold text-[var(--text-primary)]",
				className,
			)}
			{...props}
		/>
	);
});

const DrawerDescription = forwardRef(function DrawerDescription(
	{ className, ...props },
	ref,
) {
	return (
		<DrawerPrimitive.Description
			ref={ref}
			className={cn("text-sm text-[var(--text-secondary)]", className)}
			{...props}
		/>
	);
});

export {
	Drawer,
	DrawerPortal,
	DrawerOverlay,
	DrawerTrigger,
	DrawerClose,
	DrawerNestedRoot,
	DrawerContent,
	DrawerHeader,
	DrawerFooter,
	DrawerTitle,
	DrawerDescription,
};
