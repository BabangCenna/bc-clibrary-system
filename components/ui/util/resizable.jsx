"use client";

import { forwardRef } from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { GripVertical, GripHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const ResizablePanelGroup = forwardRef(function ResizablePanelGroup(
	{ className, ...props },
	ref,
) {
	return (
		<ResizablePrimitive.PanelGroup
			ref={ref}
			className={cn(
				"flex h-full w-full",
				"data-[panel-group-direction=vertical]:flex-col",
				className,
			)}
			{...props}
		/>
	);
});

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = forwardRef(function ResizableHandle(
	{ withHandle = true, className, ...props },
	ref,
) {
	return (
		<ResizablePrimitive.PanelResizeHandle
			ref={ref}
			className={cn(
				"relative flex items-center justify-center",
				"bg-[var(--color-border)]",
				"transition-colors duration-[var(--duration-fast)]",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1",
				"hover:bg-[var(--accent)]",
				"data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full",
				"data-[panel-group-direction=horizontal]:h-full data-[panel-group-direction=horizontal]:w-px",
				// Active drag
				"data-[resize-handle-state=drag]:bg-[var(--accent)]",
				className,
			)}
			{...props}
		>
			{withHandle && (
				<div
					className={cn(
						"z-10 flex h-6 w-6 items-center justify-center rounded-[var(--radius-sm)]",
						"border border-[var(--color-border-strong)]",
						"bg-[var(--surface)]",
						"shadow-sm",
					)}
				>
					{/* Icon adapts to orientation via parent data attr */}
					<GripVertical
						className="h-3.5 w-3.5 text-[var(--text-secondary)]
              [[data-panel-group-direction=vertical]_&]:hidden"
					/>
					<GripHorizontal
						className="h-3.5 w-3.5 text-[var(--text-secondary)]
              [[data-panel-group-direction=horizontal]_&]:hidden"
					/>
				</div>
			)}
		</ResizablePrimitive.PanelResizeHandle>
	);
});

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
