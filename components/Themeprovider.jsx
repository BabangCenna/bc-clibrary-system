"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";

// ── Theme Context ──────────────────────────────────────
const ThemeContext = createContext({
	theme: null,
	allThemes: [],
	pairs: [],
	setTheme: () => {},
	isLoading: true,
});

export function useTheme() {
	return useContext(ThemeContext);
}

// ── Apply CSS variables to :root ───────────────────────
function applyTheme(theme) {
	if (!theme) return;
	const root = document.documentElement;
	root.style.setProperty("--bg", theme.bg);
	root.style.setProperty("--surface", theme.surface);
	root.style.setProperty("--text-primary", theme.text_primary);
	root.style.setProperty("--text-secondary", theme.text_secondary);
	root.style.setProperty("--accent", theme.accent);
	root.style.setProperty("--accent-hover", theme.accent_hover);

	// Also set data-theme for components that key off it
	root.setAttribute("data-theme", theme.mode);
}

// ── ThemeProvider ──────────────────────────────────────
export function ThemeProvider({
	children,
	userKey = "default",
	initialTheme, // pass server-fetched theme to avoid flash
}) {
	const [theme, setThemeState] = useState(initialTheme ?? null);
	const [allThemes, setAllThemes] = useState([]);
	const [pairs, setPairs] = useState([]);
	const [isLoading, setIsLoading] = useState(!initialTheme);

	// Apply theme to DOM whenever it changes
	useEffect(() => {
		if (theme) applyTheme(theme);
	}, [theme]);

	// Load all available themes + pairs on mount
	useEffect(() => {
		async function load() {
			try {
				const [themesRes, pairsRes] = await Promise.all([
					fetch("/api/themes"),
					fetch("/api/themes?pairs=true"),
				]);
				const { data: themes } = await themesRes.json();
				const { data: pairsData } = await pairsRes.json();
				setAllThemes(themes ?? []);
				setPairs(pairsData ?? []);
			} catch (err) {
				console.error("ThemeProvider: failed to load themes", err);
			}
		}
		load();
	}, []);

	// Load active theme from DB if not provided as initialTheme
	useEffect(() => {
		if (initialTheme) return;
		async function loadActive() {
			try {
				setIsLoading(true);
				const res = await fetch(`/api/themes/active?userKey=${userKey}`);
				const { data } = await res.json();
				if (data) {
					setThemeState(data);
					applyTheme(data);
				}
			} catch (err) {
				console.error("ThemeProvider: failed to load active theme", err);
			} finally {
				setIsLoading(false);
			}
		}
		loadActive();
	}, [userKey, initialTheme]);

	// Set a new theme — updates DB + DOM instantly
	const setTheme = useCallback(
		async (themeOrId) => {
			// Accept either a full theme object or just an ID
			const isObj = typeof themeOrId === "object";
			const id = isObj ? themeOrId.id : themeOrId;

			// Optimistically apply if we have the object
			if (isObj) {
				setThemeState(themeOrId);
				applyTheme(themeOrId);
			} else {
				// Look it up from allThemes
				const found = allThemes.find((t) => t.id === id);
				if (found) {
					setThemeState(found);
					applyTheme(found);
				}
			}

			// Persist to DB
			try {
				await fetch("/api/themes", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ themeId: id, userKey }),
				});
			} catch (err) {
				console.error("ThemeProvider: failed to persist theme", err);
			}
		},
		[allThemes, userKey],
	);

	return (
		<ThemeContext.Provider
			value={{ theme, allThemes, pairs, setTheme, isLoading }}
		>
			{children}
		</ThemeContext.Provider>
	);
}
