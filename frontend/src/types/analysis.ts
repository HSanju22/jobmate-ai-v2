/**
 * JobMate V2 — Analysis Result Type Definitions
 *
 * These types define the shape of data that will eventually be returned
 * by the JobMate AI analysis engine. The Results page is designed to
 * accept and render an AnalysisResult object.
 *
 * No fake/placeholder data is stored here — these are purely type contracts.
 */

// ─── Skill Alignment ─────────────────────────────────────────────────────────

export interface SkillItem {
  /** The skill name exactly as found in the resume or job description. */
  name: string;
  /** Optional context or note about the skill from the resume. */
  context?: string;
}

export interface SkillsAnalysis {
  /** Skills that appear in both the resume and the job description. */
  matched: SkillItem[];
  /**
   * Skills that are partially aligned — e.g. the resume mentions a related
   * technology but not the exact one required.
   */
  partial: SkillItem[];
  /**
   * Skills explicitly required by the job description that are absent or
   * insufficiently represented in the resume.
   */
  gaps: SkillItem[];
}

// ─── Keyword Alignment ───────────────────────────────────────────────────────

export interface KeywordGroup {
  /** The keyword or phrase from the job description. */
  keyword: string;
  /** Explanation of how (or whether) it appears in the resume. */
  explanation?: string;
}

export interface KeywordAlignment {
  /** Keywords that appear clearly and prominently in the resume. */
  strong: KeywordGroup[];
  /**
   * Keywords from the job description that are absent or buried in the resume,
   * reducing ATS/recruiter visibility.
   */
  missing: KeywordGroup[];
}

// ─── Job Requirements ────────────────────────────────────────────────────────

export type RequirementStatus = "met" | "partial" | "not-met";

export interface Requirement {
  /** The requirement as stated in the job description. */
  description: string;
  /** How well the resume satisfies this requirement. */
  status: RequirementStatus;
  /** Brief rationale for the status assessment. */
  rationale?: string;
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export type RecommendationPriority = "high" | "medium" | "low";

export interface Recommendation {
  /** Short headline for this recommendation. */
  title: string;
  /** Detailed, actionable description. */
  detail: string;
  /** Priority level to help the user triage. */
  priority: RecommendationPriority;
}

// ─── Root Result ─────────────────────────────────────────────────────────────

export interface AnalysisResult {
  /**
   * Overall match score as a percentage (0–100).
   * Computed from the actual resume and job description — never fabricated.
   */
  matchScore: number;

  /** Breakdown of skill alignment between the resume and the job description. */
  skillsAnalysis: SkillsAnalysis;

  /** Keyword presence analysis for ATS and recruiter visibility. */
  keywordAlignment: KeywordAlignment;

  /** Line-by-line assessment of job requirements against the resume. */
  requirements: Requirement[];

  /** Ordered list of actionable recommendations derived from the analysis. */
  recommendations: Recommendation[];
}

