export interface ReviewResult {
  summary: string;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  breaking_changes: string[];
  suggestions: string[];
}
