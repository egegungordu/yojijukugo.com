import { cronTrigger } from "@trigger.dev/sdk";
import { client } from "@/trigger";
import { db } from "@/db";
import { wotd, word } from "@/db/schema";
import { eq, isNull, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

client.defineJob({
  id: "calculate-wotd",
  name: "Calculate word of the day",
  version: "0.0.1",
  trigger: cronTrigger({
    cron: "0 0 * * *",
  }),
  run: async (_, io) => {
    let candidateWords = await io.runTask(
      "get-all-words-without-wotds-recently",
      async () => {
        // Calculate the date one year ago
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        return db
          .select({ word: word })
          .from(word)
          .leftJoin(wotd, eq(word.id, wotd.wordId))
          .where(or(isNull(wotd.id), sql`${wotd.createdAt} < ${oneYearAgo.toISOString()}`))
          .then((words) => words.map((word) => word.word));
      },
    );

    if (candidateWords.length === 0) {
      // If there are no words without a word of the day, select all words
      io.logger.warn("No words without a word of the day recently, selecting all words");
      candidateWords = await io.runTask("get-all-words", async () => {
        return db.select({ word: word }).from(word).then((words) => words.map((word) => word.word));
      });
    }

    // Pick a random word from the list of candidates
    const todaysWord =
      candidateWords[Math.floor(Math.random() * candidateWords.length)];

    // Save the word of the day
    await db.insert(wotd).values({
      wordId: todaysWord.id,
    });

    // Revalidate the home page cache
    revalidatePath("/");
  },
});
