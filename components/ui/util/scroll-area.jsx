"use client";

import { forwardRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

const ScrollArea = forwardRef(function ScrollArea(
	{ className, children, orientation = "vertical", ...props },
	ref,
) {
	return (
		<ScrollAreaPrimitive.Root
			ref={ref}
			className={cn("relative overflow-hidden", className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
				{children}
			</ScrollAreaPrimitive.Viewport>
			<ScrollBar orientation="vertical" />
			{orientation === "both" && <ScrollBar orientation="horizontal" />}
			<ScrollAreaPrimitive.Corner />
		</ScrollAreaPrimitive.Root>
	);
});

const ScrollBar = forwardRef(function ScrollBar(
	{ className, orientation = "vertical", ...props },
	ref,
) {
	return (
		<ScrollAreaPrimitive.ScrollAreaScrollbar
			ref={ref}
			orientation={orientation}
			className={cn(
				"flex touch-none select-none transition-colors duration-[var(--duration-slow)]",
				orientation === "vertical" &&
					"h-full w-2 border-l border-l-transparent p-[1px]",
				orientation === "horizontal" &&
					"h-2 flex-col border-t border-t-transparent p-[1px]",
				className,
			)}
			{...props}
		>
			<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-[var(--color-border-strong)]" />
		</ScrollAreaPrimitive.ScrollAreaScrollbar>
	);
});

export { ScrollArea, ScrollBar };
