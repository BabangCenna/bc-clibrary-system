"use client";

import { forwardRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
	"relative flex shrink-0 overflow-hidden rounded-full",
	{
		variants: {
			size: {
				xs: "h-6 w-6 text-[10px]",
				sm: "h-8 w-8 text-xs",
				md: "h-10 w-10 text-sm",
				lg: "h-12 w-12 text-base",
				xl: "h-16 w-16 text-lg",
				"2xl": "h-20 w-20 text-xl",
			},
		},
		defaultVariants: { size: "md" },
	},
);

const Avatar = forwardRef(function Avatar({ className, size, ...props }, ref) {
	return (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(avatarVariants({ size }), className)}
			{...props}
		/>
	);
});

const AvatarImage = forwardRef(function AvatarImage(
	{ className, ...props },
	ref,
) {
	return (
		<AvatarPrimitive.Image
			ref={ref}
			className={cn("aspect-square h-full w-full object-cover", className)}
			{...props}
		/>
	);
});

const AvatarFallback = forwardRef(function AvatarFallback(
	{ className, ...props },
	ref,
) {
	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn(
				"flex h-full w-full items-center justify-center rounded-full",
				"bg-[var(--accent)] text-white font-semibold",
				className,
			)}
			{...props}
		/>
	);
});

// ── AvatarGroup ────────────────────────────────────────
const AvatarGroup = forwardRef(function AvatarGroup(
	{ className, max, children, size = "md", ...props },
	ref,
) {
	const childArray = Array.isArray(children) ? children : [children];
	const visible = max ? childArray.slice(0, max) : childArray;
	const overflow = max ? childArray.length - max : 0;

	const sizeMap = {
		xs: "h-6 w-6 text-[10px]",
		sm: "h-8 w-8 text-xs",
		md: "h-10 w-10 text-sm",
		lg: "h-12 w-12 text-base",
		xl: "h-16 w-16 text-lg",
	};

	return (
		<div ref={ref} className={cn("flex items-center", className)} {...props}>
			{visible.map((child, i) => (
				<div
					key={i}
					className="ring-2 ring-[var(--bg)] rounded-full -ml-2 first:ml-0"
				>
					{child}
				</div>
			))}
			{overflow > 0 && (
				<div
					className={cn(
						"flex items-center justify-center rounded-full",
						"bg-[var(--surface)] text-[var(--text-secondary)] font-semibold",
						"ring-2 ring-[var(--bg)] -ml-2",
						sizeMap[size],
					)}
				>
					+{overflow}
				</div>
			)}
		</div>
	);
});

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
