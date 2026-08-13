import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";

const sqlite = new Database("ctm.2017m.db");
const db = drizzle(sqlite, { schema });

export default db