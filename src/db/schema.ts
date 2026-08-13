import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: int().primaryKey({ autoIncrement: true }),
	username: text().notNull().unique(),
	displayname: text(),
	registered: int({ mode: 'boolean'}).notNull().default(false),
	platformid: text().notNull().default("0"),
	settings: text({ mode: 'json' }).notNull().default([]),
	avatar: text({ mode: 'json' }).notNull().default({OutfitSelections: "", SkinColor:"", HairColor:""}),
	relationships: text({ mode: 'json' }).notNull().default([]),
	profileImage: text().notNull().default("DefaultProfileImage"),
	xp: int().notNull().default(0),
	level: int().notNull().default(1),
	developer: int({ mode: 'boolean' }).notNull().default(false),
	moderation: text({ mode: 'json' }).notNull().default({banned: false, reason: "", expires: 0})
});