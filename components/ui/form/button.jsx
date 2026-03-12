import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
	[
		"inline-flex items-center justify-center gap-2 whitespace-nowrap",
		"font-medium text-sm leading-none",
		"rounded-[var(--radius-md)]",
		"border border-transparent",
		"transition-all duration-[var(--duration-normal)]",
		"cursor-pointer select-none",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]",
		"disabled:pointer-events-none disabled:opacity-40",
		"active:scale-[0.97]",
	],
	{
		variants: {
			variant: {
				default:
					"bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-sm",
				secondary:
					"bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--color-border)] border-[var(--color-border)]",
				outline:
					"bg-transparent text-[var(--text-primary)] border-[var(--color-border-strong)] hover:bg-[var(--surface)] hover:border-[var(--accent)]",
				ghost:
					"bg-transparent text-[var(--text-primary)] hover:bg-[var(--surface)]",
				destructive:
					"bg-[var(--color-destructive)] text-white hover:bg-[var(--color-destructive-hover)] shadow-sm",
				link: "bg-transparent text-[var(--accent)] underline-offset-4 hover:underline !h-auto !p-0",
			},
			size: {
				xs: "h-7 px-2.5 text-xs rounded-[var(--radius-sm)]",
				sm: "h-8 px-3 text-sm",
				md: "h-9 px-4",
				lg: "h-10 px-5 text-base",
				xl: "h-12 px-6 text-base",
				icon: "h-9 w-9 p-0",
				"icon-sm": "h-7 w-7 p-0 rounded-[var(--radius-sm)]",
				"icon-lg": "h-11 w-11 p-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

const Spinner = () => (
	<svg
		className="animate-spin h-4 w-4 shrink-0"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
		/>
	</svg>
);

const Button = forwardRef(function Button(
	{
		className,
		variant,
		size,
		loading,
		leftIcon,
		rightIcon,
		children,
		disabled,
		...props
	},
	ref,
) {
	return (
		<button
			ref={ref}
			className={cn(buttonVariants({ variant, size }), className)}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<Spinner />
			) : leftIcon ? (
				<span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{leftIcon}</span>
			) : null}
			{children}
			{!loading && rightIcon && (
				<span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{rightIcon}</span>
			)}
		</button>
	);
});

export { Button, buttonVariants };
