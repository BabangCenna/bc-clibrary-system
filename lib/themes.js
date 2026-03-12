import { db } from "@/db/client";

// ── Theme Queries ──────────────────────────────────────

// Get all themes (optionally filter by mode)
export async function getThemes(mode) {
	if (mode) {
		return db.query(`SELECT * FROM themes WHERE mode = ? ORDER BY name ASC`, [
			mode,
		]);
	}
	return db.query(`SELECT * FROM themes ORDER BY mode ASC, name ASC`);
}

// Get a single theme by ID
export async function getThemeById(id) {
	return db.queryOne(`SELECT * FROM themes WHERE id = ?`, [id]);
}

// Get a single theme by name
export async function getThemeByName(name) {
	return db.queryOne(`SELECT * FROM themes WHERE name = ?`, [name]);
}

// Get the default theme
export async function getDefaultTheme() {
	return db.queryOne(`SELECT * FROM themes WHERE is_default = 1 LIMIT 1`);
}

// Get all theme pairs with their light + dark theme data joined
export async function getThemePairs() {
	return db.query(`
    SELECT
      tp.id,
      tp.name                  AS pair_name,
      lt.id                    AS light_id,
      lt.name                  AS light_name,
      lt.bg                    AS light_bg,
      lt.surface               AS light_surface,
      lt.text_primary          AS light_text_primary,
      lt.text_secondary        AS light_text_secondary,
      lt.accent                AS light_accent,
      lt.accent_hover          AS light_accent_hover,
      dt.id                    AS dark_id,
      dt.name                  AS dark_name,
      dt.bg                    AS dark_bg,
      dt.surface               AS dark_surface,
      dt.text_primary          AS dark_text_primary,
      dt.text_secondary        AS dark_text_secondary,
      dt.accent                AS dark_accent,
      dt.accent_hover          AS dark_accent_hover
    FROM theme_pairs tp
    JOIN themes lt ON lt.id = tp.light_theme_id
    JOIN themes dt ON dt.id = tp.dark_theme_id
    ORDER BY tp.name ASC
  `);
}

// ── User Preference Queries ────────────────────────────

// Get user preference (with joined theme data)
export async function getUserPreference(userKey = "default") {
	return db.queryOne(
		`
    SELECT
      up.*,
      t.name          AS theme_name,
      t.mode          AS theme_mode,
      t.bg,
      t.surface,
      t.text_primary,
      t.text_secondary,
      t.accent,
      t.accent_hover
    FROM user_preferences up
    LEFT JOIN themes t ON t.id = up.active_theme_id
    WHERE up.user_key = ?
  `,
		[userKey],
	);
}

// Set active theme for a user
export async function setActiveTheme(themeId, userKey = "default") {
	// Upsert — create row if it doesn't exist
	await db.run(
		`
    INSERT INTO user_preferences (user_key, active_theme_id, updated_at)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(user_key) DO UPDATE SET
      active_theme_id = excluded.active_theme_id,
      updated_at      = excluded.updated_at
  `,
		[userKey, themeId],
	);
}

// Update font / radius / scaling preferences
export async function updatePreferences(prefs, userKey = "default") {
	const { fontSans, fontMono, radius, scaling, overrides } = prefs;
	await db.run(
		`
    INSERT INTO user_preferences (user_key, font_sans, font_mono, radius, scaling, overrides, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(user_key) DO UPDATE SET
      font_sans  = COALESCE(excluded.font_sans,  font_sans),
      font_mono  = COALESCE(excluded.font_mono,  font_mono),
      radius     = COALESCE(excluded.radius,     radius),
      scaling    = COALESCE(excluded.scaling,    scaling),
      overrides  = COALESCE(excluded.overrides,  overrides),
      updated_at = excluded.updated_at
  `,
		[
			userKey,
			fontSans ?? null,
			fontMono ?? null,
			radius ?? null,
			scaling ?? null,
			overrides ?? null,
		],
	);
}
