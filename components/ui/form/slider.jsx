"use client";

import { forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

const Slider = forwardRef(function Slider(
	{ className, size = "md", showValue, formatValue, ...props },
	ref,
) {
	const raw = props.value ?? props.defaultValue ?? [0];
	const displayValue = Array.isArray(raw) ? raw : [raw];

	return (
		<div className="w-full space-y-2">
			{showValue && (
				<div className="flex justify-between">
					<span className="text-xs text-[var(--text-secondary)]">
						{formatValue ? formatValue(displayValue[0]) : displayValue[0]}
					</span>
					{displayValue.length > 1 && (
						<span className="text-xs text-[var(--text-secondary)]">
							{formatValue
								? formatValue(displayValue[displayValue.length - 1])
								: displayValue[displayValue.length - 1]}
						</span>
					)}
				</div>
			)}
			<SliderPrimitive.Root
				ref={ref}
				className={cn(
					"relative flex w-full touch-none select-none items-center",
					size === "sm" && "h-4",
					size === "md" && "h-5",
					size === "lg" && "h-6",
					className,
				)}
				{...props}
			>
				<SliderPrimitive.Track
					className={cn(
						"relative w-full grow overflow-hidden rounded-full bg-[var(--color-border-strong)]",
						size === "sm" && "h-1",
						size === "md" && "h-1.5",
						size === "lg" && "h-2",
					)}
				>
					<SliderPrimitive.Range className="absolute h-full bg-[var(--accent)] rounded-full" />
				</SliderPrimitive.Track>
				{displayValue.map((_, i) => (
					<SliderPrimitive.Thumb
						key={i}
						className={cn(
							"block rounded-full bg-[var(--accent)]",
							"border-2 border-white shadow-md shadow-black/20",
							"transition-all duration-[var(--duration-fast)]",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]",
							"disabled:pointer-events-none disabled:opacity-40",
							"hover:scale-110 active:scale-95",
							size === "sm" && "h-3.5 w-3.5",
							size === "md" && "h-[1.125rem] w-[1.125rem]",
							size === "lg" && "h-5 w-5",
						)}
					/>
				))}
			</SliderPrimitive.Root>
		</div>
	);
});

export { Slider };
