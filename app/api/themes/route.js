import { NextResponse } from "next/server";
import { getThemes, getThemePairs, setActiveTheme } from "@/lib/themes";

// GET /api/themes
// GET /api/themes?mode=light
// GET /api/themes?pairs=true
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const mode = searchParams.get("mode"); // "light" | "dark"
		const pairs = searchParams.get("pairs"); // "true"

		if (pairs === "true") {
			const data = await getThemePairs();
			return NextResponse.json({ data });
		}

		const data = await getThemes(mode || undefined);
		return NextResponse.json({ data });
	} catch (err) {
		console.error("[GET /api/themes]", err);
		return NextResponse.json(
			{ error: "Failed to fetch themes" },
			{ status: 500 },
		);
	}
}

// POST /api/themes
// Body: { themeId: number, userKey?: string }
export async function POST(request) {
	try {
		const body = await request.json();
		const themeId = body?.themeId;
		const userKey = body?.userKey ?? "default";

		if (!themeId) {
			return NextResponse.json(
				{ error: "themeId is required" },
				{ status: 400 },
			);
		}

		await setActiveTheme(themeId, userKey);
		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("[POST /api/themes]", err);
		return NextResponse.json({ error: "Failed to set theme" }, { status: 500 });
	}
}
