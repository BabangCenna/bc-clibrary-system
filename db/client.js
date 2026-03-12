import { createClient } from "@libsql/client";

// ── Turso Client ───────────────────────────────────────
// Add to your .env.local:
//   TURSO_DATABASE_URL=libsql://your-db-name-your-org.turso.io
//   TURSO_AUTH_TOKEN=your-token-here
//
// Get these from: turso db show <db-name> && turso db tokens create <db-name>

let client;

function getClient() {
	if (client) return client;

	const url = process.env.TURSO_DATABASE_URL;
	const token = process.env.TURSO_AUTH_TOKEN;

	if (!url) throw new Error("Missing TURSO_DATABASE_URL in environment");
	if (!token) throw new Error("Missing TURSO_AUTH_TOKEN in environment");

	client = createClient({ url, authToken: token });
	return client;
}

export const db = {
	// Run a query that returns rows
	async query(sql, args = []) {
		const c = getClient();
		const result = await c.execute({ sql, args });
		return result.rows;
	},

	// Run a query that mutates (INSERT/UPDATE/DELETE)
	async run(sql, args = []) {
		const c = getClient();
		const result = await c.execute({ sql, args });
		return {
			rowsAffected: result.rowsAffected,
			lastInsertRowid: result.lastInsertRowid,
		};
	},

	// Run multiple statements in a transaction
	async batch(statements) {
		const c = getClient();
		const results = await c.batch(
			statements.map(({ sql, args = [] }) => ({ sql, args })),
		);
		return results;
	},

	// Get a single row
	async queryOne(sql, args = []) {
		const rows = await db.query(sql, args);
		return rows[0] ?? null;
	},
};
