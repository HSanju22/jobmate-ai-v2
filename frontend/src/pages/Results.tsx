import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import './results.css';
import type {
  AnalysisResult,
  RequirementStatus,
  RecommendationPriority,
} from '../types/analysis';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function requirementStatusIcon(status: RequirementStatus): string {
  switch (status) {
    case 'met':      return '✓';
    case 'partial':  return '~';
    case 'not-met':  return '✕';
  }
}

function requirementStatusLabel(status: RequirementStatus): string {
  switch (status) {
    case 'met':      return 'Met';
    case 'partial':  return 'Partial';
    case 'not-met':  return 'Not Met';
  }
}

function priorityLabel(priority: RecommendationPriority): string {
  switch (priority) {
    case 'high':   return 'High';
    case 'medium': return 'Medium';
    case 'low':    return 'Low';
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Generic card shell — header + body.
 * Keeps the card structure DRY without over-engineering.
 */
interface ResultsCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

function ResultsCard({ title, subtitle, children, className = '' }: ResultsCardProps) {
  return (
    <div className={`results-card ${className}`.trim()}>
      <div className="results-card-header">
        <h2 className="results-card-title">{title}</h2>
        {subtitle && <p className="results-card-subtitle">{subtitle}</p>}
      </div>
      <div className="results-card-body">{children}</div>
    </div>
  );
}

/**
 * Shown inside any section that has no data yet.
 * Communicates "awaiting analysis" without inventing content.
 */
interface PendingStateProps {
  icon: string;
  message: string;
}

function PendingState({ icon, message }: PendingStateProps) {
  return (
    <div className="results-pending">
      <div className="results-pending-icon" aria-hidden="true">{icon}</div>
      <p>{message}</p>
    </div>
  );
}

// ─── Match Score Card ─────────────────────────────────────────────────────────

interface MatchScoreCardProps {
  score: number | null;
}

function MatchScoreCard({ score }: MatchScoreCardProps) {
  // SVG ring geometry
  const radius = 56;
  const circumference = 2 * Math.PI * radius; // ≈ 351.86

  const dashOffset =
    score !== null
      ? circumference - (score / 100) * circumference
      : circumference; // fully empty when no data

  return (
    <ResultsCard
      title="Match Score"
      subtitle="How closely your resume aligns with the job description."
      className="results-score-card"
    >
      <div className="score-ring-wrapper" role="img" aria-label={
        score !== null ? `Match score: ${score}%` : 'Match score pending'
      }>
        <svg
          className="score-ring-svg"
          viewBox="0 0 140 140"
          aria-hidden="true"
        >
          <circle
            className="score-ring-track"
            cx="70"
            cy="70"
            r={radius}
          />
          <circle
            className="score-ring-fill"
            cx="70"
            cy="70"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>

        <div className="score-ring-label">
          {score !== null ? (
            <>
              <span className="score-ring-value">{score}</span>
              <span className="score-ring-unit">%</span>
            </>
          ) : (
            <>
              <span className="score-ring-value" style={{ fontSize: 'var(--jm-font-size-xl)' }}>
                —
              </span>
              <span className="score-ring-unit">score</span>
            </>
          )}
        </div>
      </div>

      {score === null && (
        <p className="score-pending-note">
          Your match score will appear here once the analysis is complete.
        </p>
      )}
    </ResultsCard>
  );
}

// ─── Skills Analysis Card ─────────────────────────────────────────────────────

interface SkillsCardProps {
  analysis: AnalysisResult['skillsAnalysis'] | null;
}

function SkillsCard({ analysis }: SkillsCardProps) {
  const isEmpty =
    !analysis ||
    (analysis.matched.length === 0 &&
      analysis.partial.length === 0 &&
      analysis.gaps.length === 0);

  return (
    <ResultsCard
      title="Skills Analysis"
      subtitle="Skill alignment between your resume and the job requirements."
    >
      {isEmpty ? (
        <PendingState
          icon="🔍"
          message="Matched skills, partial matches, and skill gaps will be listed here after analysis."
        />
      ) : (
        <div className="skills-groups">
          {/* Matched */}
          <div>
            <div className="skill-group-label">
              <span className="skill-group-dot skill-group-dot--matched" aria-hidden="true" />
              Matched Skills
            </div>
            {analysis!.matched.length > 0 ? (
              <div className="skill-tags">
                {analysis!.matched.map((s) => (
                  <span key={s.name} className="skill-tag skill-tag--matched">
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="skills-empty-note">None identified.</p>
            )}
          </div>

          {/* Partial */}
          <div>
            <div className="skill-group-label">
              <span className="skill-group-dot skill-group-dot--partial" aria-hidden="true" />
              Partial Matches
            </div>
            {analysis!.partial.length > 0 ? (
              <div className="skill-tags">
                {analysis!.partial.map((s) => (
                  <span key={s.name} className="skill-tag skill-tag--partial">
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="skills-empty-note">None identified.</p>
            )}
          </div>

          {/* Gaps */}
          <div>
            <div className="skill-group-label">
              <span className="skill-group-dot skill-group-dot--gap" aria-hidden="true" />
              Skill Gaps
            </div>
            {analysis!.gaps.length > 0 ? (
              <div className="skill-tags">
                {analysis!.gaps.map((s) => (
                  <span key={s.name} className="skill-tag skill-tag--gap">
                    {s.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="skills-empty-note">None identified.</p>
            )}
          </div>
        </div>
      )}
    </ResultsCard>
  );
}

// ─── Keyword Alignment Card ───────────────────────────────────────────────────

interface KeywordCardProps {
  alignment: AnalysisResult['keywordAlignment'] | null;
}

function KeywordCard({ alignment }: KeywordCardProps) {
  const isEmpty =
    !alignment ||
    (alignment.strong.length === 0 && alignment.missing.length === 0);

  return (
    <ResultsCard
      title="Keyword Alignment"
      subtitle="Key terms from the job description and how your resume represents them."
    >
      {isEmpty ? (
        <PendingState
          icon="🔑"
          message="Strongly aligned keywords and missing terms will appear here after analysis."
        />
      ) : (
        <div className="keyword-groups">
          {/* Strong */}
          <div>
            <div className="keyword-group-label">
              <span className="keyword-group-icon" aria-hidden="true">✅</span>
              Strongly Aligned
            </div>
            <div className="keyword-list">
              {alignment!.strong.map((k) => (
                <span key={k.keyword} className="keyword-chip keyword-chip--strong">
                  {k.keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div>
            <div className="keyword-group-label">
              <span className="keyword-group-icon" aria-hidden="true">⚠️</span>
              Missing or Underrepresented
            </div>
            <div className="keyword-list">
              {alignment!.missing.map((k) => (
                <span key={k.keyword} className="keyword-chip keyword-chip--missing">
                  {k.keyword}
                </span>
              ))}
            </div>
          </div>

          <p className="keyword-context-note">
            These keywords come directly from the job description you provided.
            Adding missing keywords where genuinely applicable can improve your
            visibility with applicant tracking systems and recruiters.
          </p>
        </div>
      )}
    </ResultsCard>
  );
}

// ─── Requirements Analysis Card ───────────────────────────────────────────────

interface RequirementsCardProps {
  requirements: AnalysisResult['requirements'] | null;
}

function RequirementsCard({ requirements }: RequirementsCardProps) {
  const isEmpty = !requirements || requirements.length === 0;

  return (
    <ResultsCard
      title="Job Requirements Analysis"
      subtitle="How your resume maps against the stated requirements of this role."
    >
      {isEmpty ? (
        <PendingState
          icon="📋"
          message="Each job requirement will be assessed against your resume and displayed here."
        />
      ) : (
        <ul className="requirements-list" role="list">
          {requirements!.map((req, idx) => (
            <li key={idx} className="requirement-row">
              <span
                className={`requirement-status-icon requirement-status-icon--${req.status}`}
                aria-label={requirementStatusLabel(req.status)}
              >
                {requirementStatusIcon(req.status)}
              </span>

              <div>
                <p className="requirement-description">{req.description}</p>
                {req.rationale && (
                  <p className="requirement-rationale">{req.rationale}</p>
                )}
              </div>

              <span
                className={`requirement-badge requirement-badge--${req.status}`}
              >
                {requirementStatusLabel(req.status)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ResultsCard>
  );
}

// ─── Recommendations Card ─────────────────────────────────────────────────────

interface RecommendationsCardProps {
  recommendations: AnalysisResult['recommendations'] | null;
}

function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  const isEmpty = !recommendations || recommendations.length === 0;

  return (
    <ResultsCard
      title="Recommendations"
      subtitle="Actionable steps to strengthen your application for this specific role."
    >
      {isEmpty ? (
        <PendingState
          icon="💡"
          message="Personalised recommendations based on your resume and the job description will appear here."
        />
      ) : (
        <ul className="recommendations-list" role="list">
          {recommendations!.map((rec, idx) => (
            <li key={idx} className="recommendation-item">
              <div
                className={`recommendation-priority-bar recommendation-priority-bar--${rec.priority}`}
                aria-hidden="true"
              />
              <div className="recommendation-content">
                <div className="recommendation-header">
                  <span className="recommendation-title">{rec.title}</span>
                  <span
                    className={`recommendation-priority-label recommendation-priority-label--${rec.priority}`}
                  >
                    {priorityLabel(rec.priority)}
                  </span>
                </div>
                <p className="recommendation-detail">{rec.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </ResultsCard>
  );
}

// ─── Application Package CTA ──────────────────────────────────────────────────

const PACKAGE_ITEMS = [
  {
    icon: '📄',
    title: 'Tailored Resume',
    desc: 'A revised resume aligned to this specific job description.',
  },
  {
    icon: '✉️',
    title: 'Cover Letter',
    desc: 'A personalised cover letter grounded in your actual experience.',
  },
  {
    icon: '💬',
    title: 'Recruiter Message',
    desc: 'A concise outreach message for the hiring team.',
  },
  {
    icon: '🎯',
    title: 'Interview Prep',
    desc: 'Likely questions and talking points based on your background.',
  },
] as const;

function ApplicationPackageCTA() {
  return (
    <section className="results-cta-section" aria-labelledby="cta-heading">
      <Container>
        <div className="results-cta-inner">
          <p className="results-cta-eyebrow">Next Step</p>

          <h2 id="cta-heading">Turn Your Analysis Into a Stronger Application</h2>

          <p>
            The Application Package transforms your analysis into ready-to-use
            materials — each piece crafted strictly from the resume and job
            description you provided.
          </p>

          <ul className="results-package-items" role="list">
            {PACKAGE_ITEMS.map((item) => (
              <li key={item.title} className="results-package-item">
                <div className="package-item-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <p className="package-item-title">{item.title}</p>
                <p className="package-item-desc">{item.desc}</p>
              </li>
            ))}
          </ul>

          <div className="results-cta-actions">
            <Link to="/application" className="results-cta-btn-primary">
              Build Application Package
            </Link>
            <Link to="/analyze" className="results-cta-btn-secondary">
              Run a New Analysis
            </Link>
          </div>

          <p className="results-cta-disclaimer">
            All generated content is based solely on the documents you provided.
            JobMate never adds credentials, experience, or achievements you have not supplied.
          </p>
        </div>
      </Container>
    </section>
  );
}

// ─── Results Page ─────────────────────────────────────────────────────────────

/**
 * Results page — Task 7.
 *
 * Accepts an optional `analysis` prop (typed `AnalysisResult`).
 * When no analysis is provided (pre-backend state), every section
 * renders an honest "awaiting data" state instead of fake content.
 *
 * Usage once the backend is wired:
 *   <Results analysis={analysisResultObject} />
 */
interface ResultsProps {
  analysis?: AnalysisResult;
}

function Results({ analysis }: ResultsProps) {
  const score       = analysis?.matchScore          ?? null;
  const skills      = analysis?.skillsAnalysis      ?? null;
  const keywords    = analysis?.keywordAlignment    ?? null;
  const requirements = analysis?.requirements       ?? null;
  const recommendations = analysis?.recommendations ?? null;

  return (
    <>
      <Navbar />

      <div className="results-page">

        {/* ── Page Header ──────────────────────────────────── */}
        <section className="results-header" aria-labelledby="results-heading">
          <Container>
            <div className="results-step-badge" aria-label="Step 2 of 2 — Results">
              <span aria-hidden="true">●</span>
              <span>Step 2 of 2</span>
              <span aria-hidden="true">•</span>
              <span>Match Analysis</span>
            </div>

            <h1 id="results-heading">Your Job Match Analysis</h1>

            <p className="results-header-description">
              This analysis compares your submitted resume with the job description
              you provided. Every finding is derived exclusively from those two
              documents — no assumptions, no invented data.
            </p>
          </Container>
        </section>

        {/* ── Integrity Notice ─────────────────────────────── */}
        <section className="results-integrity" aria-label="Integrity notice">
          <Container>
            <div className="results-integrity-banner" role="note">
              <span className="results-integrity-icon" aria-hidden="true">🔒</span>
              <div>
                <strong>JobMate Integrity Standard — Guaranteed Factuality</strong>
                <p>
                  All results shown are derived strictly from the resume and job
                  description you supplied. JobMate never invents skills,
                  experience, achievements, dates, or qualifications.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Dashboard Body ───────────────────────────────── */}
        <section className="results-body">
          <Container>
            <div className="results-dashboard">

              {/* Left sidebar */}
              <aside className="results-sidebar" aria-label="Score and skills">
                <MatchScoreCard score={score} />
                <SkillsCard analysis={skills} />
              </aside>

              {/* Main content column */}
              <div className="results-main">
                <KeywordCard alignment={keywords} />
                <RequirementsCard requirements={requirements} />
                <RecommendationsCard recommendations={recommendations} />
              </div>

            </div>
          </Container>
        </section>

        {/* ── Application Package CTA ──────────────────────── */}
        <ApplicationPackageCTA />

      </div>

      <Footer />
    </>
  );
}

export default Results;