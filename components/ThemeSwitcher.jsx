"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const ModeIcon = ({ mode }) =>
	mode === "dark" ? (
		<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	) : (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	);

// ── Compact swatch button ──────────────────────────────
function ThemeSwatch({ theme, isActive, onClick }) {
	return (
		<button
			onClick={() => onClick(theme)}
			title={theme.name}
			style={{
				width: 32,
				height: 32,
				borderRadius: "50%",
				background: `linear-gradient(135deg, ${theme.bg} 50%, ${theme.accent} 50%)`,
				border: isActive
					? `2.5px solid var(--text-primary)`
					: `2px solid var(--color-border, rgba(0,0,0,0.15))`,
				cursor: "pointer",
				transition: "transform 120ms ease, box-shadow 120ms ease",
				boxShadow: isActive ? "0 0 0 3px var(--accent, #C2410C)" : "none",
				transform: isActive ? "scale(1.15)" : "scale(1)",
				flexShrink: 0,
			}}
			aria-label={theme.name}
			aria-pressed={isActive}
		/>
	);
}

// ── ThemeSwitcher ──────────────────────────────────────
// variant: "minimal" | "grid" | "list"
export function ThemeSwitcher({ variant = "grid", showModeFilter = true }) {
	const { theme, allThemes, setTheme, isLoading } = useTheme();
	const [modeFilter, setModeFilter] = useState("all"); // "all" | "light" | "dark"
	const [search, setSearch] = useState("");

	const filtered = allThemes.filter((t) => {
		const matchMode = modeFilter === "all" || t.mode === modeFilter;
		const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
		return matchMode && matchSearch;
	});

	if (isLoading) {
		return (
			<div
				style={{ padding: 16, color: "var(--text-secondary)", fontSize: 13 }}
			>
				Loading themes...
			</div>
		);
	}

	// ── Minimal: just a small swatch strip ──────────────
	if (variant === "minimal") {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 6,
					flexWrap: "wrap",
				}}
			>
				{filtered.slice(0, 12).map((t) => (
					<ThemeSwatch
						key={t.id}
						theme={t}
						isActive={theme?.id === t.id}
						onClick={setTheme}
					/>
				))}
			</div>
		);
	}

	// ── List: name + swatch rows ─────────────────────────
	if (variant === "list") {
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
				{showModeFilter && (
					<ModeFilter value={modeFilter} onChange={setModeFilter} />
				)}
				<SearchInput value={search} onChange={setSearch} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						maxHeight: 320,
						overflowY: "auto",
					}}
				>
					{filtered.map((t) => (
						<button
							key={t.id}
							onClick={() => setTheme(t)}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								padding: "8px 10px",
								borderRadius: 8,
								border: "none",
								background:
									theme?.id === t.id ? "var(--accent)" : "transparent",
								color: theme?.id === t.id ? "#fff" : "var(--text-primary)",
								cursor: "pointer",
								textAlign: "left",
								fontSize: 13,
								transition: "background 120ms ease",
							}}
						>
							<ThemeSwatch theme={t} isActive={false} onClick={() => {}} />
							<span style={{ flex: 1 }}>{t.name}</span>
							<ModeIcon mode={t.mode} />
						</button>
					))}
				</div>
			</div>
		);
	}

	// ── Grid (default): swatches in a grid ──────────────
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			{showModeFilter && (
				<ModeFilter value={modeFilter} onChange={setModeFilter} />
			)}
			<SearchInput value={search} onChange={setSearch} />
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
					gap: 8,
					maxHeight: 360,
					overflowY: "auto",
					paddingRight: 4,
				}}
			>
				{filtered.map((t) => (
					<button
						key={t.id}
						onClick={() => setTheme(t)}
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 6,
							padding: 10,
							borderRadius: 10,
							border:
								theme?.id === t.id
									? "2px solid var(--accent)"
									: "1.5px solid var(--color-border, rgba(0,0,0,0.1))",
							background:
								theme?.id === t.id
									? "color-mix(in srgb, var(--accent) 8%, var(--surface))"
									: "var(--surface)",
							cursor: "pointer",
							transition: "all 120ms ease",
						}}
					>
						{/* Mini preview */}
						<div
							style={{
								width: "100%",
								height: 36,
								borderRadius: 6,
								background: t.bg,
								border: "1px solid rgba(0,0,0,0.06)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: 4,
							}}
						>
							<span
								style={{
									width: 14,
									height: 14,
									borderRadius: "50%",
									background: t.accent,
									flexShrink: 0,
								}}
							/>
							<span
								style={{
									width: 24,
									height: 5,
									borderRadius: 9999,
									background: t.text_primary,
									opacity: 0.5,
								}}
							/>
						</div>
						<span
							style={{
								fontSize: 11,
								fontWeight: 500,
								color: "var(--text-primary)",
								textAlign: "center",
								lineHeight: 1.3,
								wordBreak: "break-word",
							}}
						>
							{t.name}
						</span>
						<span style={{ color: "var(--text-secondary)", lineHeight: 1 }}>
							<ModeIcon mode={t.mode} />
						</span>
					</button>
				))}
			</div>
			{filtered.length === 0 && (
				<p
					style={{
						textAlign: "center",
						color: "var(--text-secondary)",
						fontSize: 13,
						padding: 16,
					}}
				>
					No themes match "{search}"
				</p>
			)}
		</div>
	);
}

// ── Sub-components ─────────────────────────────────────
function ModeFilter({ value, onChange }) {
	const opts = [
		{ label: "All", val: "all" },
		{ label: "Light", val: "light" },
		{ label: "Dark", val: "dark" },
	];
	return (
		<div style={{ display: "flex", gap: 4 }}>
			{opts.map((o) => (
				<button
					key={o.val}
					onClick={() => onChange(o.val)}
					style={{
						flex: 1,
						padding: "5px 0",
						borderRadius: 6,
						border: "1px solid var(--color-border, rgba(0,0,0,0.1))",
						background: value === o.val ? "var(--accent)" : "transparent",
						color: value === o.val ? "#fff" : "var(--text-secondary)",
						fontSize: 12,
						fontWeight: 500,
						cursor: "pointer",
						transition: "all 120ms ease",
					}}
				>
					{o.label}
				</button>
			))}
		</div>
	);
}

function SearchInput({ value, onChange }) {
	return (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder="Search themes..."
			style={{
				width: "100%",
				height: 32,
				padding: "0 10px",
				borderRadius: 7,
				border: "1px solid var(--color-border, rgba(0,0,0,0.15))",
				background: "var(--bg)",
				color: "var(--text-primary)",
				fontSize: 13,
				outline: "none",
				boxSizing: "border-box",
			}}
		/>
	);
}
