// Run: node scripts/migrate.js
// Creates all DB tables. Safe to run multiple times (IF NOT EXISTS).

import { createTables } from "../db/schema.js";

async function main() {
	console.log("🔄 Running migrations...");
	try {
		await createTables();
		console.log("✅ Migration complete.");
	} catch (err) {
		console.error("❌ Migration failed:", err.message);
		process.exit(1);
	}
}

main();
