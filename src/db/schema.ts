import { timestamp, serial, text, pgTableCreator, uniqueIndex, integer } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";

const pgTable = pgTableCreator((name) => `yojijukugo_${name}`);

export const word = pgTable("word", {
  id: serial("id").primaryKey(),
  word: text("word"),
  reading: text("reading"),
  meaning: text("meaning"),
  dictionary: text("dictionary"),
  raw: text("raw"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
}, (table) => ({
  unique: uniqueIndex("word-dictionary-unique").on(table.word, table.dictionary),
}));

export const wotd = pgTable("wotd", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  wordId: integer("wordId")
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
