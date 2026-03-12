// app/layout.jsx
// This is how you wire everything into your Next.js root layout.
//
// The server fetches the active theme BEFORE render so there's
// zero flash of unstyled content (FOUC).

import { getUserPreference, getDefaultTheme } from "@/lib/themes";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";

export const metadata = {
	title: "Your App",
};

export default async function RootLayout({ children }) {
	// Server-side: fetch active theme to pass as initialTheme
	// This prevents any flash — CSS vars are set before paint
	let initialTheme = null;

	try {
		const pref = await getUserPreference("default");

		if (pref && pref.bg) {
			initialTheme = {
				id: pref.active_theme_id,
				name: pref.theme_name,
				mode: pref.theme_mode,
				bg: pref.bg,
				surface: pref.surface,
				text_primary: pref.text_primary,
				text_secondary: pref.text_secondary,
				accent: pref.accent,
				accent_hover: pref.accent_hover,
			};
		} else {
			initialTheme = await getDefaultTheme();
		}
	} catch {
		// DB not ready yet — use hard-coded fallback (Coffee Roast)
		initialTheme = {
			name: "Coffee Roast",
			mode: "light",
			bg: "#FAF7F2",
			surface: "#F3ECE3",
			text_primary: "#3E2F2F",
			text_secondary: "#6B5E5E",
			accent: "#C2410C",
			accent_hover: "#9A3412",
		};
	}

	// Build inline style string to inject CSS vars before any JS runs
	const themeStyle = initialTheme
		? `
    :root {
      --bg:             ${initialTheme.bg};
      --surface:        ${initialTheme.surface};
      --text-primary:   ${initialTheme.text_primary};
      --text-secondary: ${initialTheme.text_secondary};
      --accent:         ${initialTheme.accent};
      --accent-hover:   ${initialTheme.accent_hover};
    }
  `
		: "";

	return (
		<html
			lang="en"
			data-theme={initialTheme?.mode ?? "light"}
			suppressHydrationWarning
		>
			<head>
				{/* Inject theme vars synchronously — no FOUC */}
				{themeStyle && (
					<style dangerouslySetInnerHTML={{ __html: themeStyle }} />
				)}
			</head>
			<body>
				<ThemeProvider initialTheme={initialTheme} userKey="default">
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
