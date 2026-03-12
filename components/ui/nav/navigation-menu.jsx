"use client";

import { forwardRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const NavigationMenu = forwardRef(function NavigationMenu(
	{ className, children, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.Root
			ref={ref}
			className={cn(
				"relative z-10 flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuViewport />
		</NavigationMenuPrimitive.Root>
	);
});

const NavigationMenuList = forwardRef(function NavigationMenuList(
	{ className, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.List
			ref={ref}
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className,
			)}
			{...props}
		/>
	);
});

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva([
	"group inline-flex h-9 w-max items-center justify-center gap-1",
	"rounded-[var(--radius-md)] px-4 py-2",
	"text-sm font-medium",
	"bg-transparent text-[var(--text-primary)]",
	"transition-colors duration-[var(--duration-normal)]",
	"hover:bg-[var(--surface)] hover:text-[var(--text-primary)]",
	"focus:bg-[var(--surface)] focus:outline-none",
	"disabled:pointer-events-none disabled:opacity-40",
	"data-[active]:bg-[var(--surface)] data-[state=open]:bg-[var(--surface)]",
]);

const NavigationMenuTrigger = forwardRef(function NavigationMenuTrigger(
	{ className, children, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.Trigger
			ref={ref}
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}
		>
			{children}
			<ChevronDown
				className="relative top-[1px] h-3.5 w-3.5 text-[var(--text-secondary)] transition-transform duration-[var(--duration-normal)] group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	);
});

const NavigationMenuContent = forwardRef(function NavigationMenuContent(
	{ className, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.Content
			ref={ref}
			className={cn(
				"left-0 top-0 w-full",
				"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
				"data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
				"data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
				"data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
				"md:absolute md:w-auto",
				className,
			)}
			{...props}
		/>
	);
});

const NavigationMenuLink = forwardRef(function NavigationMenuLink(
	{ className, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.Link
			ref={ref}
			className={cn(navigationMenuTriggerStyle(), className)}
			{...props}
		/>
	);
});

const NavigationMenuViewport = forwardRef(function NavigationMenuViewport(
	{ className, ...props },
	ref,
) {
	return (
		<div className="absolute left-0 top-full flex justify-center">
			<NavigationMenuPrimitive.Viewport
				ref={ref}
				className={cn(
					"origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]",
					"w-full overflow-hidden rounded-[var(--radius-xl)]",
					"bg-[var(--surface)] border border-[var(--color-border)]",
					"shadow-lg shadow-black/10",
					"data-[state=open]:animate-in data-[state=closed]:animate-out",
					"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90",
					"md:w-[var(--radix-navigation-menu-viewport-width)]",
					className,
				)}
				{...props}
			/>
		</div>
	);
});

const NavigationMenuIndicator = forwardRef(function NavigationMenuIndicator(
	{ className, ...props },
	ref,
) {
	return (
		<NavigationMenuPrimitive.Indicator
			ref={ref}
			className={cn(
				"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
				"data-[state=visible]:animate-in data-[state=hidden]:animate-out",
				"data-[state=hidden]:fade-out data-[state=visible]:fade-in",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-[var(--color-border)] shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
});

// ── NavigationMenuListItem ─────────────────────────────
// Convenience component for items inside NavigationMenuContent
const NavigationMenuListItem = forwardRef(function NavigationMenuListItem(
	{ className, title, children, href, ...props },
	ref,
) {
	return (
		<li>
			<NavigationMenuPrimitive.Link asChild>
				<a
					ref={ref}
					href={href}
					className={cn(
						"block select-none space-y-1 rounded-[var(--radius-md)] p-3 leading-none",
						"no-underline outline-none",
						"transition-colors duration-[var(--duration-fast)]",
						"hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)]",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none text-[var(--text-primary)]">
						{title}
					</div>
					{children && (
						<p className="line-clamp-2 text-sm leading-snug text-[var(--text-secondary)] mt-1">
							{children}
						</p>
					)}
				</a>
			</NavigationMenuPrimitive.Link>
		</li>
	);
});

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuViewport,
	NavigationMenuIndicator,
	NavigationMenuListItem,
	navigationMenuTriggerStyle,
};
