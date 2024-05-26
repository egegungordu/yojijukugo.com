import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: "./.env.local" });

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
    }
  }
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  tablesFilter: ["yojijukugo_*"],
  verbose: true,
  strict: true,
});
