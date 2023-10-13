import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // setupFilesAfterEnv: ["./src/lib/singleton.ts"],
};
export default config;
