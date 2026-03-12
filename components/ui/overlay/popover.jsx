"use client";

import { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = forwardRef(function PopoverContent(
	{ className, align = "center", sideOffset = 6, showClose, ...props },
	ref,
) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				ref={ref}
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-72 rounded-[var(--radius-xl)] p-4",
					"bg-[var(--surface)] text-[var(--text-primary)]",
					"border border-[var(--color-border)]",
					"shadow-lg shadow-black/10",
					"outline-none",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2",
					"data-[side=top]:slide-in-from-bottom-2",
					"data-[side=left]:slide-in-from-right-2",
					"data-[side=right]:slide-in-from-left-2",
					className,
				)}
				{...props}
			>
				{props.children}
				{showClose && (
					<PopoverPrimitive.Close
						className={cn(
							"absolute right-3 top-3 rounded-[var(--radius-sm)] p-0.5",
							"text-[var(--text-secondary)] opacity-70 hover:opacity-100",
							"hover:bg-[var(--color-muted)]",
							"transition-all duration-[var(--duration-fast)]",
							"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)]",
						)}
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</PopoverPrimitive.Close>
				)}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	);
});

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose };
