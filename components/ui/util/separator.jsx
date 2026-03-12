import { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

const Separator = forwardRef(function Separator(
	{ className, orientation = "horizontal", decorative = true, label, ...props },
	ref,
) {
	if (label) {
		return (
			<div className={cn("flex items-center gap-3", className)}>
				<SeparatorPrimitive.Root
					ref={ref}
					decorative={decorative}
					orientation="horizontal"
					className="flex-1 h-px bg-[var(--color-border)]"
					{...props}
				/>
				<span className="text-xs text-[var(--text-secondary)] font-medium whitespace-nowrap shrink-0">
					{label}
				</span>
				<SeparatorPrimitive.Root
					decorative={decorative}
					orientation="horizontal"
					className="flex-1 h-px bg-[var(--color-border)]"
				/>
			</div>
		);
	}

	return (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-[var(--color-border)]",
				orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
				className,
			)}
			{...props}
		/>
	);
});

export { Separator };
