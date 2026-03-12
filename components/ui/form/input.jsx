import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
	[
		"flex w-full",
		"bg-[var(--bg)] text-[var(--text-primary)]",
		"border border-[var(--color-border-strong)]",
		"rounded-[var(--radius-md)]",
		"text-sm",
		"placeholder:text-[var(--text-secondary)]",
		"transition-all duration-[var(--duration-normal)]",
		"file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--text-primary)]",
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:border-[var(--accent)]",
		"disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-[var(--surface)]",
		"read-only:bg-[var(--surface)] read-only:cursor-default",
	],
	{
		variants: {
			size: {
				sm: "h-8 px-2.5 text-xs",
				md: "h-9 px-3",
				lg: "h-10 px-4 text-base",
			},
			state: {
				default: "",
				error:
					"border-[var(--color-destructive)] focus-visible:ring-[color-mix(in_srgb,var(--color-destructive)_40%,transparent)]",
				success:
					"border-[var(--color-success)] focus-visible:ring-[color-mix(in_srgb,var(--color-success)_40%,transparent)]",
			},
		},
		defaultVariants: {
			size: "md",
			state: "default",
		},
	},
);

const Input = forwardRef(function Input(
	{ className, type, size, state, leftElement, rightElement, ...props },
	ref,
) {
	if (leftElement || rightElement) {
		return (
			<div className="relative flex items-center w-full">
				{leftElement && (
					<div className="absolute left-3 flex items-center pointer-events-none text-[var(--text-secondary)] [&>svg]:h-4 [&>svg]:w-4">
						{leftElement}
					</div>
				)}
				<input
					type={type}
					ref={ref}
					className={cn(
						inputVariants({ size, state }),
						leftElement && "pl-9",
						rightElement && "pr-9",
						className,
					)}
					{...props}
				/>
				{rightElement && (
					<div className="absolute right-3 flex items-center text-[var(--text-secondary)] [&>svg]:h-4 [&>svg]:w-4">
						{rightElement}
					</div>
				)}
			</div>
		);
	}

	return (
		<input
			type={type}
			ref={ref}
			className={cn(inputVariants({ size, state }), className)}
			{...props}
		/>
	);
});

export { Input, inputVariants };
