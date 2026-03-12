"use client";

import { forwardRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = forwardRef(function Menubar({ className, ...props }, ref) {
	return (
		<MenubarPrimitive.Root
			ref={ref}
			className={cn(
				"flex h-9 items-center gap-1 p-1",
				"rounded-[var(--radius-md)]",
				"border border-[var(--color-border)]",
				"bg-[var(--surface)]",
				"shadow-sm shadow-black/5",
				className,
			)}
			{...props}
		/>
	);
});

const MenubarTrigger = forwardRef(function MenubarTrigger(
	{ className, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex cursor-default select-none items-center",
				"rounded-[var(--radius-sm)] px-3 py-1",
				"text-sm font-medium text-[var(--text-primary)]",
				"transition-colors duration-[var(--duration-fast)]",
				"focus:bg-[var(--color-muted)] focus:outline-none",
				"data-[state=open]:bg-[var(--color-muted)]",
				"hover:bg-[var(--color-muted)]",
				className,
			)}
			{...props}
		/>
	);
});

const menuContentClass = cn(
	"z-50 min-w-[12rem] overflow-hidden p-1",
	"rounded-[var(--radius-lg)]",
	"bg-[var(--surface)] text-[var(--text-primary)]",
	"border border-[var(--color-border)]",
	"shadow-lg shadow-black/10",
	"data-[state=open]:animate-in data-[state=closed]:animate-out",
	"data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
	"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
);

const MenubarContent = forwardRef(function MenubarContent(
	{ className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.Portal>
			<MenubarPrimitive.Content
				ref={ref}
				align={align}
				alignOffset={alignOffset}
				sideOffset={sideOffset}
				className={cn(menuContentClass, className)}
				{...props}
			/>
		</MenubarPrimitive.Portal>
	);
});

const menuItemClass = cn(
	"relative flex cursor-default select-none items-center gap-2",
	"rounded-[var(--radius-sm)] px-2 py-1.5",
	"text-sm text-[var(--text-primary)]",
	"outline-none",
	"transition-colors duration-[var(--duration-fast)]",
	"focus:bg-[var(--color-muted)]",
	"data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
);

const MenubarItem = forwardRef(function MenubarItem(
	{ className, inset, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.Item
			ref={ref}
			className={cn(menuItemClass, inset && "pl-8", className)}
			{...props}
		/>
	);
});

const MenubarCheckboxItem = forwardRef(function MenubarCheckboxItem(
	{ className, children, checked, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.CheckboxItem
			ref={ref}
			className={cn(menuItemClass, "pl-8", className)}
			checked={checked}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<Check className="h-4 w-4" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.CheckboxItem>
	);
});

const MenubarRadioItem = forwardRef(function MenubarRadioItem(
	{ className, children, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.RadioItem
			ref={ref}
			className={cn(menuItemClass, "pl-8", className)}
			{...props}
		>
			<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
				<MenubarPrimitive.ItemIndicator>
					<Circle className="h-2 w-2 fill-current" />
				</MenubarPrimitive.ItemIndicator>
			</span>
			{children}
		</MenubarPrimitive.RadioItem>
	);
});

const MenubarLabel = forwardRef(function MenubarLabel(
	{ className, inset, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.Label
			ref={ref}
			className={cn(
				"px-2 py-1.5 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide",
				inset && "pl-8",
				className,
			)}
			{...props}
		/>
	);
});

const MenubarSeparator = forwardRef(function MenubarSeparator(
	{ className, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.Separator
			ref={ref}
			className={cn("-mx-1 my-1 h-px bg-[var(--color-border)]", className)}
			{...props}
		/>
	);
});

const MenubarShortcut = ({ className, ...props }) => (
	<span
		className={cn(
			"ml-auto text-xs tracking-widest text-[var(--text-secondary)] opacity-60",
			className,
		)}
		{...props}
	/>
);

const MenubarSubTrigger = forwardRef(function MenubarSubTrigger(
	{ className, inset, children, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.SubTrigger
			ref={ref}
			className={cn(
				menuItemClass,
				"data-[state=open]:bg-[var(--color-muted)]",
				inset && "pl-8",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronRight className="ml-auto h-4 w-4" />
		</MenubarPrimitive.SubTrigger>
	);
});

const MenubarSubContent = forwardRef(function MenubarSubContent(
	{ className, ...props },
	ref,
) {
	return (
		<MenubarPrimitive.SubContent
			ref={ref}
			className={cn(menuContentClass, className)}
			{...props}
		/>
	);
});

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	MenubarLabel,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarPortal,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarGroup,
	MenubarSub,
	MenubarShortcut,
};
