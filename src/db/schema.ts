import { timestamp, text, pgTableCreator } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `yojijukugo_${name}`);

export const word = pgTable("word", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  word: text("word").unique(),
  reading: text("reading"),
  meaning: text("meaning"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
});

export const wotd = pgTable("wotd", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  wordId: text("wordId")
    .references(() => word.id)
    .notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .defaultNow()
    .unique(),
});

export const wotdRelations = relations(wotd, ({ one }) => ({
  word: one(word, {
    fields: [wotd.wordId],
    references: [word.id],
  }),
}));

export const wordRelations = relations(word, ({ many }) => ({
  wotds: many(wotd),
}));
