"use client";

import { forwardRef, createContext, useContext, useId } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

// ── Form (FormProvider wrapper) ───────────────────────
const Form = FormProvider;

// ── FormField ─────────────────────────────────────────
const FormFieldContext = createContext({});

function FormField(props) {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
}

// ── useFormField ──────────────────────────────────────
function useFormField() {
	const fieldContext = useContext(FormFieldContext);
	const itemContext = useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext.name) {
		throw new Error("useFormField must be used within <FormField>");
	}

	return {
		id: itemContext.id,
		name: fieldContext.name,
		formItemId: `${itemContext.id}-form-item`,
		formDescriptionId: `${itemContext.id}-form-item-description`,
		formMessageId: `${itemContext.id}-form-item-message`,
		...fieldState,
	};
}

// ── FormItem ──────────────────────────────────────────
const FormItemContext = createContext({});

const FormItem = forwardRef(function FormItem({ className, ...props }, ref) {
	const id = useId();
	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn("space-y-1.5", className)} {...props} />
		</FormItemContext.Provider>
	);
});

// ── FormLabel ─────────────────────────────────────────
const FormLabel = forwardRef(function FormLabel(
	{ className, required, children, ...props },
	ref,
) {
	const { error, formItemId } = useFormField();
	return (
		<label
			ref={ref}
			className={cn(
				"block text-sm font-medium leading-none text-[var(--text-primary)]",
				error && "text-[var(--color-destructive)]",
				className,
			)}
			htmlFor={formItemId}
			{...props}
		>
			{children}
			{required && (
				<span
					className="ml-1 text-[var(--color-destructive)]"
					aria-hidden="true"
				>
					*
				</span>
			)}
		</label>
	);
});

// ── FormControl ───────────────────────────────────────
const FormControl = forwardRef(function FormControl({ ...props }, ref) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();
	return (
		<div
			ref={ref}
			id={formItemId}
			aria-describedby={
				!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});

// ── FormDescription ───────────────────────────────────
const FormDescription = forwardRef(function FormDescription(
	{ className, ...props },
	ref,
) {
	const { formDescriptionId } = useFormField();
	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn("text-xs text-[var(--text-secondary)]", className)}
			{...props}
		/>
	);
});

// ── FormMessage ───────────────────────────────────────
const FormMessage = forwardRef(function FormMessage(
	{ className, children, ...props },
	ref,
) {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message ?? "") : children;
	if (!body) return null;
	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn(
				"text-xs font-medium",
				error
					? "text-[var(--color-destructive)]"
					: "text-[var(--text-secondary)]",
				className,
			)}
			{...props}
		>
			{body}
		</p>
	);
});

// ── FormSection ───────────────────────────────────────
const FormSection = forwardRef(function FormSection(
	{ className, title, description, children, ...props },
	ref,
) {
	return (
		<fieldset
			ref={ref}
			className={cn("space-y-4 border-none p-0 m-0", className)}
			{...props}
		>
			{(title || description) && (
				<div className="space-y-0.5">
					{title && (
						<legend className="text-sm font-semibold text-[var(--text-primary)]">
							{title}
						</legend>
					)}
					{description && (
						<p className="text-xs text-[var(--text-secondary)]">
							{description}
						</p>
					)}
				</div>
			)}
			{children}
		</fieldset>
	);
});

// ── FormRow ───────────────────────────────────────────
const FormRow = forwardRef(function FormRow(
	{ className, cols = 2, ...props },
	ref,
) {
	return (
		<div
			ref={ref}
			className={cn(
				"grid gap-4",
				cols === 2 && "grid-cols-1 sm:grid-cols-2",
				cols === 3 && "grid-cols-1 sm:grid-cols-3",
				cols === 4 && "grid-cols-2 sm:grid-cols-4",
				className,
			)}
			{...props}
		/>
	);
});

export {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormSection,
	FormRow,
	useFormField,
};
