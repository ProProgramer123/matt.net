import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./schema";

const sqlitePath = process.env.SQLITE_DB_PATH || "ctm.2017m.db";
const sqlite = new Database(sqlitePath);
const db = drizzle(sqlite, { schema });

export default db