import dotenv from "dotenv";
import { runHermesAnalysis } from "./services/hermes";

dotenv.config();

async function main() {
  console.log("1. Testing Hermes 3 local execution via TypeScript...");
  const sampleDiff = `
--- a/auth.ts
+++ b/auth.ts
- export function getUserData(userId: string) {
+ export function fetchUserData(userId: string) {
  `;

  try {
    const result = await runHermesAnalysis(
      sampleDiff,
      "Refactor auth function to fetchUserData",
    );
    console.log("\n[SUCCESS] Hermes AI Analysis Result:");
    console.dir(result, { depth: null });
  } catch (error) {
    console.error("\n[ERROR] Test failed:", error);
  }
}

main();
