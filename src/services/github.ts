import axios from "axios";
import { ReviewResult } from "../types";

export async function getPrDiff(
  diffUrl: string,
  token?: string,
): Promise<string> {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get<string>(diffUrl, {
    headers,
    responseType: "text",
  });
  return response.data;
}

export async function postGithubComment(
  repoFullName: string,
  prNumber: number,
  reviewData: ReviewResult,
  token: string,
): Promise<void> {
  const url = `https://api.github.com/repos/${repoFullName}/issues/${prNumber}/comments`;
  const breaking = reviewData.breaking_changes?.length
    ? reviewData.breaking_changes.map((b) => `- ${b}`).join("\n")
    : "- None detected";
  const suggestions = reviewData.suggestions?.length
    ? reviewData.suggestions.map((s) => `- ${s}`).join("\n")
    : "- None";

  const commentBody =
    `### 🛡️ CLIFF AI Agent Review\n\n` +
    `**Risk Level:** \`${reviewData.risk_level || "UNKNOWN"}\`\n\n` +
    `**Summary:**\n${reviewData.summary || "No summary provided."}\n\n` +
    `**Breaking Changes:**\n${breaking}\n\n` +
    `**Suggestions:**\n${suggestions}`;

  await axios.post(
    url,
    { body: commentBody },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
}
