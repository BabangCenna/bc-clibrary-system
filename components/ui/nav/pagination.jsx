import { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/form/button";

const Pagination = forwardRef(function Pagination(
	{ className, ...props },
	ref,
) {
	return (
		<nav
			ref={ref}
			role="navigation"
			aria-label="pagination"
			className={cn("mx-auto flex w-full justify-center", className)}
			{...props}
		/>
	);
});

const PaginationContent = forwardRef(function PaginationContent(
	{ className, ...props },
	ref,
) {
	return (
		<ul
			ref={ref}
			className={cn("flex flex-row items-center gap-1", className)}
			{...props}
		/>
	);
});

const PaginationItem = forwardRef(function PaginationItem(
	{ className, ...props },
	ref,
) {
	return <li ref={ref} className={cn("", className)} {...props} />;
});

const PaginationLink = forwardRef(function PaginationLink(
	{ className, isActive, size = "icon", ...props },
	ref,
) {
	return (
		<a
			ref={ref}
			aria-current={isActive ? "page" : undefined}
			className={cn(
				buttonVariants({
					variant: isActive ? "default" : "ghost",
					size,
				}),
				"cursor-pointer",
				className,
			)}
			{...props}
		/>
	);
});

const PaginationPrevious = forwardRef(function PaginationPrevious(
	{ className, ...props },
	ref,
) {
	return (
		<PaginationLink
			ref={ref}
			aria-label="Go to previous page"
			size="sm"
			className={cn("gap-1", className)}
			{...props}
		>
			<ChevronLeft className="h-4 w-4" />
			<span>Prev</span>
		</PaginationLink>
	);
});

const PaginationNext = forwardRef(function PaginationNext(
	{ className, ...props },
	ref,
) {
	return (
		<PaginationLink
			ref={ref}
			aria-label="Go to next page"
			size="sm"
			className={cn("gap-1", className)}
			{...props}
		>
			<span>Next</span>
			<ChevronRight className="h-4 w-4" />
		</PaginationLink>
	);
});

const PaginationEllipsis = forwardRef(function PaginationEllipsis(
	{ className, ...props },
	ref,
) {
	return (
		<span
			ref={ref}
			aria-hidden="true"
			className={cn(
				"flex h-9 w-9 items-center justify-center",
				"text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		>
			<MoreHorizontal className="h-4 w-4" />
			<span className="sr-only">More pages</span>
		</span>
	);
});

export {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
};
