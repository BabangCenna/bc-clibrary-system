"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/form/button";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function getDaysInMonth(year, month) {
	return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
	return new Date(year, month, 1).getDay();
}

function isSameDay(a, b) {
	if (!a || !b) return false;
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	);
}

function isInRange(date, start, end) {
	if (!start || !end) return false;
	const t = date.getTime();
	return (
		t > Math.min(start.getTime(), end.getTime()) &&
		t < Math.max(start.getTime(), end.getTime())
	);
}

function Calendar({
	mode = "single", // "single" | "range" | "multiple"
	selected,
	onSelect,
	disabled,
	minDate,
	maxDate,
	className,
}) {
	const today = new Date();
	const [viewYear, setViewYear] = useState(today.getFullYear());
	const [viewMonth, setViewMonth] = useState(today.getMonth());
	const [hovered, setHovered] = useState(null);

	const daysInMonth = getDaysInMonth(viewYear, viewMonth);
	const firstDaySlot = getFirstDayOfMonth(viewYear, viewMonth);

	const prevMonth = () => {
		if (viewMonth === 0) {
			setViewMonth(11);
			setViewYear((y) => y - 1);
		} else setViewMonth((m) => m - 1);
	};

	const nextMonth = () => {
		if (viewMonth === 11) {
			setViewMonth(0);
			setViewYear((y) => y + 1);
		} else setViewMonth((m) => m + 1);
	};

	const isDisabled = (date) => {
		if (disabled && disabled(date)) return true;
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	};

	const isSelected = (date) => {
		if (!selected) return false;
		if (mode === "single") return isSameDay(date, selected);
		if (mode === "multiple") return selected.some((d) => isSameDay(d, date));
		if (mode === "range") {
			const [start, end] = selected;
			return isSameDay(date, start) || isSameDay(date, end);
		}
		return false;
	};

	const isRangeMiddle = (date) => {
		if (mode !== "range" || !selected) return false;
		const [start, end] = selected;
		const endOrHover = end || hovered;
		return isInRange(date, start, endOrHover);
	};

	const isRangeStart = (date) => {
		if (mode !== "range" || !selected) return false;
		return isSameDay(date, selected[0]);
	};

	const isRangeEnd = (date) => {
		if (mode !== "range" || !selected) return false;
		return isSameDay(date, selected[1]);
	};

	const handleClick = (date) => {
		if (isDisabled(date)) return;
		if (!onSelect) return;

		if (mode === "single") {
			onSelect(date);
		} else if (mode === "multiple") {
			const next = selected ? [...selected] : [];
			const idx = next.findIndex((d) => isSameDay(d, date));
			if (idx >= 0) next.splice(idx, 1);
			else next.push(date);
			onSelect(next);
		} else if (mode === "range") {
			const [start, end] = selected || [];
			if (!start || (start && end)) {
				onSelect([date, null]);
			} else {
				const sorted = date < start ? [date, start] : [start, date];
				onSelect(sorted);
			}
		}
	};

	const cells = [];
	for (let i = 0; i < firstDaySlot; i++) cells.push(null);
	for (let d = 1; d <= daysInMonth; d++) {
		cells.push(new Date(viewYear, viewMonth, d));
	}

	return (
		<div
			className={cn(
				"w-fit p-4 rounded-[var(--radius-xl)]",
				"bg-[var(--surface)] border border-[var(--color-border)]",
				"shadow-sm shadow-black/5",
				className,
			)}
		>
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<button
					onClick={prevMonth}
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon-sm" }),
						"text-[var(--text-secondary)]",
					)}
				>
					<ChevronLeft className="h-4 w-4" />
				</button>
				<span className="text-sm font-semibold text-[var(--text-primary)]">
					{MONTHS[viewMonth]} {viewYear}
				</span>
				<button
					onClick={nextMonth}
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon-sm" }),
						"text-[var(--text-secondary)]",
					)}
				>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>

			{/* Day headers */}
			<div className="grid grid-cols-7 mb-2">
				{DAYS.map((d) => (
					<div
						key={d}
						className="h-8 w-8 flex items-center justify-center text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wide"
					>
						{d}
					</div>
				))}
			</div>

			{/* Day cells */}
			<div className="grid grid-cols-7">
				{cells.map((date, i) => {
					if (!date) return <div key={`e-${i}`} className="h-8 w-8" />;

					const isToday = isSameDay(date, today);
					const selected_ = isSelected(date);
					const rangeStart = isRangeStart(date);
					const rangeEnd = isRangeEnd(date);
					const rangeMid = isRangeMiddle(date);
					const disabled_ = isDisabled(date);

					return (
						<div key={date.toISOString()} className="relative">
							{/* Range background strip */}
							{rangeMid && (
								<div className="absolute inset-y-0 inset-x-0 bg-[color-mix(in_srgb,var(--accent)_15%,transparent)]" />
							)}
							{rangeStart && (
								<div className="absolute inset-y-0 right-0 left-1/2 bg-[color-mix(in_srgb,var(--accent)_15%,transparent)]" />
							)}
							{rangeEnd && (
								<div className="absolute inset-y-0 left-0 right-1/2 bg-[color-mix(in_srgb,var(--accent)_15%,transparent)]" />
							)}

							<button
								onClick={() => handleClick(date)}
								onMouseEnter={() => setHovered(date)}
								onMouseLeave={() => setHovered(null)}
								disabled={disabled_}
								className={cn(
									"relative z-10 h-8 w-8 rounded-full text-sm",
									"flex items-center justify-center",
									"transition-all duration-[var(--duration-fast)]",
									"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
									"disabled:opacity-30 disabled:pointer-events-none",
									!selected_ &&
										!rangeMid &&
										"hover:bg-[var(--color-muted)] text-[var(--text-primary)]",
									isToday && !selected_ && "font-bold text-[var(--accent)]",
									selected_ &&
										"bg-[var(--accent)] text-white font-semibold hover:bg-[var(--accent-hover)]",
									rangeMid && "text-[var(--text-primary)] rounded-none",
								)}
							>
								{date.getDate()}
							</button>
						</div>
					);
				})}
			</div>

			{/* Footer hint */}
			{mode === "range" && (
				<p className="mt-3 text-center text-[10px] text-[var(--text-secondary)]">
					{!selected || (!selected[0] && !selected[1])
						? "Select start date"
						: !selected[1]
							? "Select end date"
							: `${selected[0].toLocaleDateString()} – ${selected[1].toLocaleDateString()}`}
				</p>
			)}
		</div>
	);
}

export { Calendar };
