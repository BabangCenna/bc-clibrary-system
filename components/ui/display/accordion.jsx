"use client";

import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef(function AccordionItem(
	{ className, ...props },
	ref,
) {
	return (
		<AccordionPrimitive.Item
			ref={ref}
			className={cn(
				"border-b border-[var(--color-border)] last:border-0",
				className,
			)}
			{...props}
		/>
	);
});

const AccordionTrigger = forwardRef(function AccordionTrigger(
	{ className, children, ...props },
	ref,
) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				ref={ref}
				className={cn(
					"flex flex-1 items-center justify-between",
					"py-4 px-0",
					"text-sm font-medium text-[var(--text-primary)]",
					"transition-all duration-[var(--duration-normal)]",
					"hover:text-[var(--accent)]",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:rounded-[var(--radius-sm)]",
					"disabled:pointer-events-none disabled:opacity-40",
					"[&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				<ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-secondary)] transition-transform duration-[var(--duration-normal)]" />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
});

const AccordionContent = forwardRef(function AccordionContent(
	{ className, children, ...props },
	ref,
) {
	return (
		<AccordionPrimitive.Content
			ref={ref}
			className={cn(
				"overflow-hidden text-sm text-[var(--text-secondary)]",
				"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
				className,
			)}
			{...props}
		>
			<div className="pb-4">{children}</div>
		</AccordionPrimitive.Content>
	);
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
