import axios from "axios";
import { ReviewResult } from "../types";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export async function runHermesAnalysis(
  diffText: string,
  prTitle: string,
): Promise<ReviewResult> {
  const prompt = `You're CLIFF AI Agent. Analyze this PR diff and return ONLY a valid JSON object. 
    PR Title: ${prTitle}
    Diff: 
    ${diffText}
    
    Return format: 
    {
    "summary": "Short explanation of changes",
    "risk_level": "HIGH/MEDIUM/LOW",
    "breaking_changes": ["affected_file_1 or function_1"],
    "suggestions": ["suggestion_1", "suggestion_2"],    
   }`;

  const response = await axios.post(
    OLLAMA_URL,
    {
      model: "hermes3",
      prompt,
      stream: false,
      format: "json",
    },
    { timeout: 120000 },
  );

  const parsed: ReviewResult = JSON.parse(response.data.response);
  return parsed;
}
