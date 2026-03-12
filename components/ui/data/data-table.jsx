"use client";

import { useState, useMemo } from "react";
import {
	ChevronUp,
	ChevronDown,
	ChevronsUpDown,
	Search,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/data/table";

// ── Internal sort icon ─────────────────────────────────
function SortIcon({ direction }) {
	if (direction === "asc")
		return <ChevronUp className="h-3.5 w-3.5 text-[var(--accent)]" />;
	if (direction === "desc")
		return <ChevronDown className="h-3.5 w-3.5 text-[var(--accent)]" />;
	return (
		<ChevronsUpDown className="h-3.5 w-3.5 text-[var(--text-secondary)] opacity-50" />
	);
}

// ── DataTable ──────────────────────────────────────────
// columns: [{ key, header, cell?, sortable?, width?, align? }]
// data:    array of row objects
function DataTable({
	columns = [],
	data = [],
	searchable = true,
	searchPlaceholder = "Search...",
	searchKeys, // which keys to search — defaults to all
	pageSize: initialPageSize = 10,
	pageSizeOptions = [5, 10, 20, 50],
	selectable = false,
	onRowClick,
	emptyText = "No results found.",
	className,
	toolbar, // extra JSX rendered in toolbar
}) {
	const [query, setQuery] = useState("");
	const [sort, setSort] = useState({ key: null, dir: null });
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [selected, setSelected] = useState(new Set());

	// ── Search ─────────────────────────────────────────
	const keys = searchKeys ?? columns.map((c) => c.key);

	const filtered = useMemo(() => {
		if (!query.trim()) return data;
		const q = query.toLowerCase();
		return data.filter((row) =>
			keys.some((k) =>
				String(row[k] ?? "")
					.toLowerCase()
					.includes(q),
			),
		);
	}, [data, query, keys]);

	// ── Sort ───────────────────────────────────────────
	const sorted = useMemo(() => {
		if (!sort.key || !sort.dir) return filtered;
		return [...filtered].sort((a, b) => {
			const av = a[sort.key] ?? "";
			const bv = b[sort.key] ?? "";
			const cmp =
				typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
			return sort.dir === "asc" ? cmp : -cmp;
		});
	}, [filtered, sort]);

	// ── Pagination ─────────────────────────────────────
	const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
	const safePage = Math.min(page, totalPages);
	const paginated = sorted.slice(
		(safePage - 1) * pageSize,
		safePage * pageSize,
	);

	const toggleSort = (key) => {
		setSort((prev) => {
			if (prev.key !== key) return { key, dir: "asc" };
			if (prev.dir === "asc") return { key, dir: "desc" };
			return { key: null, dir: null };
		});
		setPage(1);
	};

	// ── Selection ──────────────────────────────────────
	const allChecked =
		paginated.length > 0 &&
		paginated.every((_, i) => selected.has((safePage - 1) * pageSize + i));

	const toggleAll = () => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (allChecked) {
				paginated.forEach((_, i) => next.delete((safePage - 1) * pageSize + i));
			} else {
				paginated.forEach((_, i) => next.add((safePage - 1) * pageSize + i));
			}
			return next;
		});
	};

	const toggleRow = (idx) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(idx)) next.delete(idx);
			else next.add(idx);
			return next;
		});
	};

	return (
		<div className={cn("flex flex-col gap-3", className)}>
			{/* ── Toolbar ─────────────────────────────────── */}
			{(searchable || toolbar) && (
				<div className="flex items-center gap-3 flex-wrap">
					{searchable && (
						<div className="relative flex-1 min-w-[200px] max-w-sm">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
							<input
								value={query}
								onChange={(e) => {
									setQuery(e.target.value);
									setPage(1);
								}}
								placeholder={searchPlaceholder}
								className={cn(
									"w-full h-9 pl-9 pr-3",
									"bg-[var(--bg)] text-[var(--text-primary)]",
									"border border-[var(--color-border-strong)]",
									"rounded-[var(--radius-md)] text-sm",
									"placeholder:text-[var(--text-secondary)]",
									"focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-[var(--accent)]",
									"transition-all duration-[var(--duration-normal)]",
								)}
							/>
						</div>
					)}
					{toolbar && (
						<div className="flex items-center gap-2 ml-auto">{toolbar}</div>
					)}
					{selected.size > 0 && (
						<span className="text-xs text-[var(--text-secondary)] ml-auto">
							{selected.size} selected
						</span>
					)}
				</div>
			)}

			{/* ── Table ───────────────────────────────────── */}
			<div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent">
							{selectable && (
								<TableHead className="w-10">
									<input
										type="checkbox"
										checked={allChecked}
										onChange={toggleAll}
										className="rounded border-[var(--color-border-strong)] accent-[var(--accent)]"
									/>
								</TableHead>
							)}
							{columns.map((col) => (
								<TableHead
									key={col.key}
									style={{ width: col.width, textAlign: col.align ?? "left" }}
									className={
										col.sortable
											? "cursor-pointer select-none hover:text-[var(--text-primary)]"
											: ""
									}
									onClick={() => col.sortable && toggleSort(col.key)}
								>
									<div className="flex items-center gap-1.5">
										{col.header}
										{col.sortable && (
											<SortIcon
												direction={sort.key === col.key ? sort.dir : null}
											/>
										)}
									</div>
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{paginated.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={columns.length + (selectable ? 1 : 0)}
									className="h-24 text-center text-[var(--text-secondary)]"
								>
									{emptyText}
								</TableCell>
							</TableRow>
						) : (
							paginated.map((row, i) => {
								const absIdx = (safePage - 1) * pageSize + i;
								return (
									<TableRow
										key={absIdx}
										data-state={selected.has(absIdx) ? "selected" : undefined}
										onClick={() => onRowClick?.(row)}
										className={onRowClick ? "cursor-pointer" : ""}
									>
										{selectable && (
											<TableCell
												onClick={(e) => {
													e.stopPropagation();
													toggleRow(absIdx);
												}}
											>
												<input
													type="checkbox"
													checked={selected.has(absIdx)}
													onChange={() => toggleRow(absIdx)}
													className="rounded border-[var(--color-border-strong)] accent-[var(--accent)]"
												/>
											</TableCell>
										)}
										{columns.map((col) => (
											<TableCell
												key={col.key}
												style={{ textAlign: col.align ?? "left" }}
											>
												{col.cell ? col.cell(row[col.key], row) : row[col.key]}
											</TableCell>
										))}
									</TableRow>
								);
							})
						)}
					</TableBody>
				</Table>
			</div>

			{/* ── Footer / Pagination ─────────────────────── */}
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
					<span>Rows per page</span>
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
							setPage(1);
						}}
						className={cn(
							"h-7 px-2 rounded-[var(--radius-sm)]",
							"bg-[var(--surface)] text-[var(--text-primary)]",
							"border border-[var(--color-border-strong)]",
							"text-xs focus:outline-none focus:ring-1 focus:ring-[var(--color-ring)]",
						)}
					>
						{pageSizeOptions.map((n) => (
							<option key={n} value={n}>
								{n}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
					<span>
						{sorted.length === 0
							? "0 results"
							: `${(safePage - 1) * pageSize + 1}–${Math.min(safePage * pageSize, sorted.length)} of ${sorted.length}`}
					</span>
					<button
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						disabled={safePage <= 1}
						className={cn(
							"h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)]",
							"text-[var(--text-secondary)] hover:bg-[var(--surface)]",
							"disabled:opacity-30 disabled:pointer-events-none",
							"transition-colors duration-[var(--duration-fast)]",
						)}
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					{Array.from({ length: totalPages }, (_, i) => i + 1)
						.filter(
							(p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1,
						)
						.reduce((acc, p, i, arr) => {
							if (i > 0 && arr[i - 1] !== p - 1) acc.push("...");
							acc.push(p);
							return acc;
						}, [])
						.map((p, i) =>
							p === "..." ? (
								<span
									key={`ellipsis-${i}`}
									className="px-1 text-[var(--text-secondary)]"
								>
									…
								</span>
							) : (
								<button
									key={p}
									onClick={() => setPage(p)}
									className={cn(
										"h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)]",
										"text-xs font-medium transition-colors duration-[var(--duration-fast)]",
										p === safePage
											? "bg-[var(--accent)] text-white"
											: "text-[var(--text-secondary)] hover:bg-[var(--surface)]",
									)}
								>
									{p}
								</button>
							),
						)}
					<button
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						disabled={safePage >= totalPages}
						className={cn(
							"h-7 w-7 flex items-center justify-center rounded-[var(--radius-sm)]",
							"text-[var(--text-secondary)] hover:bg-[var(--surface)]",
							"disabled:opacity-30 disabled:pointer-events-none",
							"transition-colors duration-[var(--duration-fast)]",
						)}
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
			</div>
		</div>
	);
}

export { DataTable };
