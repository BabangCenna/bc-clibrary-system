import { forwardRef } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = forwardRef(function Breadcrumb(
	{ className, ...props },
	ref,
) {
	return (
		<nav
			ref={ref}
			aria-label="breadcrumb"
			className={cn("", className)}
			{...props}
		/>
	);
});

const BreadcrumbList = forwardRef(function BreadcrumbList(
	{ className, ...props },
	ref,
) {
	return (
		<ol
			ref={ref}
			className={cn(
				"flex flex-wrap items-center gap-1 text-sm text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		/>
	);
});

const BreadcrumbItem = forwardRef(function BreadcrumbItem(
	{ className, ...props },
	ref,
) {
	return (
		<li
			ref={ref}
			className={cn("inline-flex items-center gap-1", className)}
			{...props}
		/>
	);
});

const BreadcrumbLink = forwardRef(function BreadcrumbLink(
	{ className, asChild, ...props },
	ref,
) {
	return (
		<a
			ref={ref}
			className={cn(
				"text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
				"transition-colors duration-[var(--duration-fast)]",
				"underline-offset-4 hover:underline",
				className,
			)}
			{...props}
		/>
	);
});

const BreadcrumbPage = forwardRef(function BreadcrumbPage(
	{ className, ...props },
	ref,
) {
	return (
		<span
			ref={ref}
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn("font-medium text-[var(--text-primary)]", className)}
			{...props}
		/>
	);
});

const BreadcrumbSeparator = forwardRef(function BreadcrumbSeparator(
	{ className, children, ...props },
	ref,
) {
	return (
		<li
			ref={ref}
			role="presentation"
			aria-hidden="true"
			className={cn(
				"[&>svg]:h-3.5 [&>svg]:w-3.5 text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		>
			{children ?? <ChevronRight />}
		</li>
	);
});

const BreadcrumbEllipsis = forwardRef(function BreadcrumbEllipsis(
	{ className, ...props },
	ref,
) {
	return (
		<span
			ref={ref}
			role="presentation"
			aria-hidden="true"
			className={cn("flex h-9 w-9 items-center justify-center", className)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More</span>
		</span>
	);
});

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
};
