"use client";

import { forwardRef } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex items-center", {
	variants: {
		variant: {
			default: [
				"rounded-[var(--radius-lg)] bg-[var(--surface)] p-1",
				"border border-[var(--color-border)]",
			],
			underline: [
				"border-b border-[var(--color-border)] w-full gap-0 rounded-none p-0",
			],
			pills: "gap-1 p-0",
		},
	},
	defaultVariants: { variant: "default" },
});

const TabsList = forwardRef(function TabsList(
	{ className, variant = "default", ...props },
	ref,
) {
	return (
		<TabsPrimitive.List
			ref={ref}
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	);
});

const tabsTriggerVariants = cva(
	[
		"inline-flex items-center justify-center gap-1.5 whitespace-nowrap",
		"text-sm font-medium",
		"transition-all duration-[var(--duration-normal)]",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1",
		"disabled:pointer-events-none disabled:opacity-40",
	],
	{
		variants: {
			variant: {
				default: [
					"rounded-[var(--radius-md)] px-3 py-1.5",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)]",
					"data-[state=active]:bg-[var(--bg)] data-[state=active]:text-[var(--text-primary)] data-[state=active]:shadow-sm",
				],
				underline: [
					"px-4 py-2.5 rounded-none border-b-2 border-transparent -mb-px",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)] hover:border-[var(--color-border-strong)]",
					"data-[state=active]:text-[var(--accent)] data-[state=active]:border-[var(--accent)]",
				],
				pills: [
					"rounded-[var(--radius-full)] px-4 py-1.5",
					"text-[var(--text-secondary)]",
					"hover:bg-[var(--surface)] hover:text-[var(--text-primary)]",
					"data-[state=active]:bg-[var(--accent)] data-[state=active]:text-white",
				],
			},
		},
		defaultVariants: { variant: "default" },
	},
);

const TabsTrigger = forwardRef(function TabsTrigger(
	{ className, variant = "default", ...props },
	ref,
) {
	return (
		<TabsPrimitive.Trigger
			ref={ref}
			className={cn(tabsTriggerVariants({ variant }), className)}
			{...props}
		/>
	);
});

const TabsContent = forwardRef(function TabsContent(
	{ className, ...props },
	ref,
) {
	return (
		<TabsPrimitive.Content
			ref={ref}
			className={cn(
				"mt-3",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:rounded-[var(--radius-md)]",
				className,
			)}
			{...props}
		/>
	);
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
