"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Nav Root ───────────────────────────────────────────
const navVariants = cva("flex", {
	variants: {
		variant: {
			default: "gap-1",
			tabs: "border-b border-[var(--color-border)] gap-0",
			pills: "gap-1",
			underline: "border-b border-[var(--color-border)] gap-0",
		},
		orientation: {
			horizontal: "flex-row flex-wrap items-center",
			vertical: "flex-col",
		},
		align: {
			start: "justify-start",
			center: "justify-center",
			end: "justify-end",
			fill: "", // children get flex-1
			justify: "", // children get flex-1 + text-center
		},
	},
	defaultVariants: {
		variant: "default",
		orientation: "horizontal",
		align: "start",
	},
});

const Nav = forwardRef(function Nav(
	{
		className,
		variant = "default",
		orientation = "horizontal",
		align = "start",
		children,
		...props
	},
	ref,
) {
	return (
		<nav
			ref={ref}
			role="navigation"
			data-variant={variant}
			data-orientation={orientation}
			data-align={align}
			className={cn(navVariants({ variant, orientation, align }), className)}
			{...props}
		>
			{children}
		</nav>
	);
});

// ── NavLink ────────────────────────────────────────────
const navLinkVariants = cva(
	[
		"inline-flex items-center gap-1.5 whitespace-nowrap",
		"text-sm font-medium",
		"transition-all duration-[var(--duration-normal)]",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:rounded-[var(--radius-md)]",
		"disabled:pointer-events-none",
		"aria-disabled:pointer-events-none aria-disabled:opacity-40",
		"cursor-pointer select-none",
	],
	{
		variants: {
			variant: {
				default: [
					"rounded-[var(--radius-md)] px-3 py-2",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)] hover:bg-[var(--surface)]",
					"aria-[current]:text-[var(--text-primary)] aria-[current]:bg-[var(--surface)]",
				],
				tabs: [
					"px-4 py-2.5 -mb-px rounded-none",
					"border-b-2 border-transparent",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)] hover:border-[var(--color-border-strong)]",
					"aria-[current]:text-[var(--accent)] aria-[current]:border-[var(--accent)]",
				],
				pills: [
					"rounded-[var(--radius-full)] px-4 py-2",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)] hover:bg-[var(--surface)]",
					"aria-[current]:bg-[var(--accent)] aria-[current]:text-white",
				],
				underline: [
					"px-3 py-2.5 -mb-px rounded-none",
					"border-b-2 border-transparent",
					"text-[var(--text-secondary)]",
					"hover:text-[var(--text-primary)]",
					"aria-[current]:text-[var(--text-primary)] aria-[current]:border-[var(--text-primary)]",
				],
			},
		},
		defaultVariants: { variant: "default" },
	},
);

const NavLink = forwardRef(function NavLink(
	{
		className,
		variant, // inherits from Nav via context — or pass explicitly
		active,
		disabled,
		icon,
		badge,
		fill, // stretch to fill available width
		justify, // fill + center text
		href = "#",
		onClick,
		children,
		...props
	},
	ref,
) {
	// Resolve variant from parent Nav data attr if not passed directly
	const resolvedVariant = variant ?? "default";

	return (
		<a
			ref={ref}
			href={disabled ? undefined : href}
			aria-current={active ? "page" : undefined}
			aria-disabled={disabled ? "true" : undefined}
			tabIndex={disabled ? -1 : undefined}
			onClick={disabled ? (e) => e.preventDefault() : onClick}
			className={cn(
				navLinkVariants({ variant: resolvedVariant }),
				fill && "flex-1",
				justify && "flex-1 justify-center",
				className,
			)}
			{...props}
		>
			{icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
			{children}
			{badge != null && (
				<span className="ml-1 inline-flex items-center justify-center h-4 min-w-[1rem] px-1 rounded-full bg-[var(--accent)] text-white text-[10px] font-bold leading-none">
					{badge}
				</span>
			)}
		</a>
	);
});

// ── NavItem ────────────────────────────────────────────
// Optional wrapper — useful when you need a list-style nav
const NavItem = forwardRef(function NavItem(
	{ className, fill, justify, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn("flex", fill && "flex-1", justify && "flex-1", className)}
			{...props}
		/>
	);
});

// ── NavDropdown ────────────────────────────────────────
// A nav link that opens a dropdown menu
function NavDropdown({
	label,
	variant = "default",
	active,
	disabled,
	icon,
	align = "start", // "start" | "end"
	children,
	className,
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	// Close on outside click
	useEffect(() => {
		if (!open) return;
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);

	// Close on Escape
	useEffect(() => {
		if (!open) return;
		const handler = (e) => e.key === "Escape" && setOpen(false);
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open]);

	return (
		<div ref={ref} className={cn("relative", className)}>
			<button
				type="button"
				aria-haspopup="true"
				aria-expanded={open}
				aria-current={active ? "page" : undefined}
				disabled={disabled}
				onClick={() => !disabled && setOpen((o) => !o)}
				className={cn(
					navLinkVariants({ variant }),
					"gap-1.5",
					open &&
						variant === "default" &&
						"bg-[var(--surface)] text-[var(--text-primary)]",
					open &&
						variant === "pills" &&
						"bg-[var(--surface)] text-[var(--text-primary)]",
					open &&
						variant === "tabs" &&
						"border-b-2 border-[var(--color-border-strong)]",
					open &&
						variant === "underline" &&
						"border-b-2 border-[var(--text-primary)]",
				)}
			>
				{icon && (
					<span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>
				)}
				{label}
				<ChevronDown
					className={cn(
						"h-3.5 w-3.5 text-[var(--text-secondary)] transition-transform duration-[var(--duration-normal)] shrink-0",
						open && "rotate-180",
					)}
				/>
			</button>

			{open && (
				<div
					className={cn(
						"absolute top-full z-50 mt-1 min-w-[10rem]",
						"rounded-[var(--radius-lg)] p-1",
						"bg-[var(--surface)] border border-[var(--color-border)]",
						"shadow-lg shadow-black/10",
						"animate-in fade-in-0 zoom-in-95",
						align === "end" ? "right-0" : "left-0",
					)}
					role="menu"
				>
					{children}
				</div>
			)}
		</div>
	);
}

// ── NavDropdownItem ────────────────────────────────────
const NavDropdownItem = forwardRef(function NavDropdownItem(
	{ className, href = "#", disabled, divider, children, onClick, ...props },
	ref,
) {
	if (divider) {
		return (
			<div
				className="my-1 h-px bg-[var(--color-border)] -mx-1"
				role="separator"
			/>
		);
	}

	return (
		<a
			ref={ref}
			href={disabled ? undefined : href}
			role="menuitem"
			aria-disabled={disabled ? "true" : undefined}
			tabIndex={disabled ? -1 : undefined}
			onClick={disabled ? (e) => e.preventDefault() : onClick}
			className={cn(
				"flex items-center gap-2 w-full",
				"rounded-[var(--radius-sm)] px-3 py-1.5",
				"text-sm text-[var(--text-primary)]",
				"transition-colors duration-[var(--duration-fast)]",
				"cursor-pointer outline-none",
				"hover:bg-[var(--color-muted)] focus:bg-[var(--color-muted)]",
				"aria-disabled:opacity-40 aria-disabled:pointer-events-none",
				className,
			)}
			{...props}
		>
			{children}
		</a>
	);
});

// ── NavDivider ─────────────────────────────────────────
// Visual spacer inside a Nav
const NavDivider = forwardRef(function NavDivider(
	{ className, orientation = "horizontal", ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			role="separator"
			className={cn(
				"shrink-0 bg-[var(--color-border)]",
				orientation === "horizontal"
					? "h-px w-full my-1"
					: "w-px self-stretch mx-1",
				className,
			)}
			{...props}
		/>
	);
});

export { Nav, NavItem, NavLink, NavDropdown, NavDropdownItem, NavDivider };
