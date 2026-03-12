import { NextResponse } from "next/server";
import { getUserPreference, getDefaultTheme } from "@/lib/themes";

// GET /api/themes/active
// GET /api/themes/active?userKey=abc123
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userKey = searchParams.get("userKey") ?? "default";

		const pref = await getUserPreference(userKey);

		if (pref && pref.bg) {
			// preference row exists and has a theme joined
			return NextResponse.json({
				data: {
					id: pref.active_theme_id,
					name: pref.theme_name,
					mode: pref.theme_mode,
					bg: pref.bg,
					surface: pref.surface,
					text_primary: pref.text_primary,
					text_secondary: pref.text_secondary,
					accent: pref.accent,
					accent_hover: pref.accent_hover,
					font_sans: pref.font_sans,
					font_mono: pref.font_mono,
					radius: pref.radius,
					scaling: pref.scaling,
				},
			});
		}

		// Fall back to default theme
		const fallback = await getDefaultTheme();
		return NextResponse.json({ data: fallback });
	} catch (err) {
		console.error("[GET /api/themes/active]", err);
		return NextResponse.json(
			{ error: "Failed to fetch active theme" },
			{ status: 500 },
		);
	}
}
