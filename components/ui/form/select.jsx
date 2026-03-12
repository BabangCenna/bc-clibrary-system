"use client";

import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef(function SelectTrigger(
	{ className, children, size = "md", ...props },
	ref,
) {
	return (
		<SelectPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex w-full items-center justify-between gap-2",
				"bg-[var(--bg)] text-[var(--text-primary)]",
				"border border-[var(--color-border-strong)]",
				"rounded-[var(--radius-md)] text-sm",
				"transition-all duration-[var(--duration-normal)]",
				"placeholder:text-[var(--text-secondary)]",
				"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-[var(--accent)]",
				"disabled:cursor-not-allowed disabled:opacity-40",
				"data-[placeholder]:text-[var(--text-secondary)]",
				"[&>span]:line-clamp-1 [&>span]:text-left",
				size === "sm" && "h-8 px-2.5 text-xs",
				size === "md" && "h-9 px-3",
				size === "lg" && "h-10 px-4 text-base",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDown className="h-4 w-4 shrink-0 text-[var(--text-secondary)] opacity-70" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
});

const SelectScrollUpButton = forwardRef(function SelectScrollUpButton(
	{ className, ...props },
	ref,
) {
	return (
		<SelectPrimitive.ScrollUpButton
			ref={ref}
			className={cn(
				"flex cursor-default items-center justify-center py-1 text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		>
			<ChevronUp className="h-4 w-4" />
		</SelectPrimitive.ScrollUpButton>
	);
});

const SelectScrollDownButton = forwardRef(function SelectScrollDownButton(
	{ className, ...props },
	ref,
) {
	return (
		<SelectPrimitive.ScrollDownButton
			ref={ref}
			className={cn(
				"flex cursor-default items-center justify-center py-1 text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		>
			<ChevronDown className="h-4 w-4" />
		</SelectPrimitive.ScrollDownButton>
	);
});

const SelectContent = forwardRef(function SelectContent(
	{ className, children, position = "popper", ...props },
	ref,
) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				ref={ref}
				className={cn(
					"relative z-50 min-w-[8rem] overflow-hidden",
					"bg-[var(--surface)] text-[var(--text-primary)]",
					"border border-[var(--color-border)]",
					"rounded-[var(--radius-lg)] shadow-lg shadow-black/10",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
					"data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
					position === "popper" && [
						"data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
						"w-[var(--radix-select-trigger-width)]",
						"max-h-[var(--radix-select-content-available-height)]",
					],
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						"p-1",
						position === "popper" && "h-[var(--radix-select-trigger-height)]",
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
});

const SelectLabel = forwardRef(function SelectLabel(
	{ className, ...props },
	ref,
) {
	return (
		<SelectPrimitive.Label
			ref={ref}
			className={cn(
				"px-2 py-1.5 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide",
				className,
			)}
			{...props}
		/>
	);
});

const SelectItem = forwardRef(function SelectItem(
	{ className, children, ...props },
	ref,
) {
	return (
		<SelectPrimitive.Item
			ref={ref}
			className={cn(
				"relative flex w-full cursor-default select-none items-center",
				"rounded-[var(--radius-sm)] py-1.5 pl-8 pr-2",
				"text-sm text-[var(--text-primary)] outline-none",
				"transition-colors duration-[var(--duration-fast)]",
				"focus:bg-[var(--color-muted)]",
				"data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
				"data-[state=checked]:text-[var(--accent)]",
				className,
			)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
});

const SelectSeparator = forwardRef(function SelectSeparator(
	{ className, ...props },
	ref,
) {
	return (
		<SelectPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className)}
			{...props}
		/>
	);
});

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
	SelectScrollUpButton,
	SelectScrollDownButton,
};
