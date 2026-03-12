import { db } from "./client.js";

// ── Create Tables ──────────────────────────────────────
// Run this once: node scripts/migrate.js
// or call createTables() from anywhere

export async function createTables() {
	await db.batch([
		// ── themes ──────────────────────────────────────────
		{
			sql: `
        CREATE TABLE IF NOT EXISTS themes (
          id            INTEGER PRIMARY KEY AUTOINCREMENT,
          name          TEXT    NOT NULL UNIQUE,
          mode          TEXT    NOT NULL CHECK (mode IN ('light', 'dark')),
          bg            TEXT    NOT NULL,
          surface       TEXT    NOT NULL,
          text_primary  TEXT    NOT NULL,
          text_secondary TEXT   NOT NULL,
          accent        TEXT    NOT NULL,
          accent_hover  TEXT    NOT NULL,
          is_default    INTEGER NOT NULL DEFAULT 0,
          tags          TEXT,
          created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
          updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `,
		},

		// ── theme_pairs ──────────────────────────────────────
		{
			sql: `
        CREATE TABLE IF NOT EXISTS theme_pairs (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          name           TEXT    NOT NULL UNIQUE,
          light_theme_id INTEGER NOT NULL REFERENCES themes(id),
          dark_theme_id  INTEGER NOT NULL REFERENCES themes(id),
          created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `,
		},

		// ── user_preferences ────────────────────────────────
		{
			sql: `
        CREATE TABLE IF NOT EXISTS user_preferences (
          id              INTEGER PRIMARY KEY AUTOINCREMENT,
          user_key        TEXT    NOT NULL UNIQUE DEFAULT 'default',
          active_theme_id INTEGER REFERENCES themes(id) ON DELETE SET NULL,
          font_sans       TEXT    DEFAULT 'Geist',
          font_mono       TEXT    DEFAULT 'Geist Mono',
          radius          TEXT    DEFAULT '0.5rem',
          scaling         REAL    DEFAULT 1.0,
          overrides       TEXT,
          updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `,
		},

		// ── components ──────────────────────────────────────
		{
			sql: `
        CREATE TABLE IF NOT EXISTS components (
          id          INTEGER PRIMARY KEY AUTOINCREMENT,
          name        TEXT    NOT NULL UNIQUE,
          slug        TEXT    NOT NULL UNIQUE,
          description TEXT,
          category    TEXT,
          status      TEXT    NOT NULL DEFAULT 'stable'
                      CHECK (status IN ('stable','beta','deprecated','planned')),
          variants    TEXT,
          sizes       TEXT,
          states      TEXT,
          file_path   TEXT,
          version     TEXT    DEFAULT '1.0.0',
          created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
          updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `,
		},

		// ── assets ──────────────────────────────────────────
		{
			sql: `
        CREATE TABLE IF NOT EXISTS assets (
          id             INTEGER PRIMARY KEY AUTOINCREMENT,
          name           TEXT    NOT NULL,
          cloudinary_id  TEXT    NOT NULL UNIQUE,
          cloudinary_url TEXT    NOT NULL,
          secure_url     TEXT,
          resource_type  TEXT    NOT NULL DEFAULT 'image'
                         CHECK (resource_type IN ('image','video','raw','auto')),
          format         TEXT,
          width          INTEGER,
          height         INTEGER,
          bytes          INTEGER,
          folder         TEXT,
          tags           TEXT,
          component_id   INTEGER REFERENCES components(id) ON DELETE SET NULL,
          theme_id       INTEGER REFERENCES themes(id)     ON DELETE SET NULL,
          created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
        )
      `,
		},

		// ── indexes ─────────────────────────────────────────
		{ sql: `CREATE INDEX IF NOT EXISTS idx_themes_mode     ON themes(mode)` },
		{
			sql: `CREATE INDEX IF NOT EXISTS idx_themes_default  ON themes(is_default)`,
		},
		{
			sql: `CREATE INDEX IF NOT EXISTS idx_components_slug ON components(slug)`,
		},
		{ sql: `CREATE INDEX IF NOT EXISTS idx_assets_folder   ON assets(folder)` },
	]);

	console.log("✅ Tables created successfully");
}
