import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Table = forwardRef(function Table({ className, ...props }, ref) {
	return (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	);
});

const TableHeader = forwardRef(function TableHeader(
	{ className, ...props },
	ref,
) {
	return (
		<thead
			ref={ref}
			className={cn(
				"[&_tr]:border-b [&_tr]:border-[var(--color-border)]",
				className,
			)}
			{...props}
		/>
	);
});

const TableBody = forwardRef(function TableBody({ className, ...props }, ref) {
	return (
		<tbody
			ref={ref}
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	);
});

const TableFooter = forwardRef(function TableFooter(
	{ className, ...props },
	ref,
) {
	return (
		<tfoot
			ref={ref}
			className={cn(
				"border-t border-[var(--color-border)]",
				"bg-[var(--surface)]",
				"font-medium",
				"[&>tr]:last:border-b-0",
				className,
			)}
			{...props}
		/>
	);
});

const TableRow = forwardRef(function TableRow({ className, ...props }, ref) {
	return (
		<tr
			ref={ref}
			className={cn(
				"border-b border-[var(--color-border)]",
				"transition-colors duration-[var(--duration-fast)]",
				"hover:bg-[var(--surface)]",
				"data-[state=selected]:bg-[color-mix(in_srgb,var(--accent)_8%,transparent)]",
				className,
			)}
			{...props}
		/>
	);
});

const TableHead = forwardRef(function TableHead({ className, ...props }, ref) {
	return (
		<th
			ref={ref}
			className={cn(
				"h-10 px-4 text-left align-middle",
				"text-xs font-semibold uppercase tracking-wide",
				"text-[var(--text-secondary)]",
				"whitespace-nowrap",
				"[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
});

const TableCell = forwardRef(function TableCell({ className, ...props }, ref) {
	return (
		<td
			ref={ref}
			className={cn(
				"px-4 py-3 align-middle text-sm text-[var(--text-primary)]",
				"[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	);
});

const TableCaption = forwardRef(function TableCaption(
	{ className, ...props },
	ref,
) {
	return (
		<caption
			ref={ref}
			className={cn("mt-4 text-xs text-[var(--text-secondary)]", className)}
			{...props}
		/>
	);
});

export {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
	TableCaption,
};
