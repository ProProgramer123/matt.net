import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const sqlitePath = process.env.SQLITE_DB_PATH || "ctm.2017m.db";
const sqlite = new Database(sqlitePath);
const db = drizzle(sqlite, { schema });

export default db