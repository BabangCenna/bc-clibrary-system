"use client";

import { Toaster as SonnerToaster } from "sonner";

// Re-export the toast function for use anywhere
export { toast } from "sonner";

/**
 * Drop this <Sonner /> once in your root layout.
 * Uses your CSS variables so it auto-adapts to any theme.
 *
 * Usage:
 *   import { toast } from "@/components/ui/overlay/sonner"
 *   toast("Saved!", { description: "Changes saved successfully." })
 *   toast.success("Done!")
 *   toast.error("Something went wrong")
 *   toast.warning("Check your input")
 *   toast.promise(promise, { loading: "Saving...", success: "Saved!", error: "Error" })
 */
function Sonner({
	theme = "system",
	richColors = true,
	closeButton = true,
	...props
}) {
	return (
		<SonnerToaster
			theme={theme}
			richColors={richColors}
			closeButton={closeButton}
			toastOptions={{
				style: {
					background: "var(--surface)",
					color: "var(--text-primary)",
					border: "1px solid var(--color-border, rgba(0,0,0,0.1))",
					borderRadius: "var(--radius-xl)",
					fontFamily: "var(--font-sans)",
					fontSize: "14px",
				},
			}}
			{...props}
		/>
	);
}

export { Sonner };
