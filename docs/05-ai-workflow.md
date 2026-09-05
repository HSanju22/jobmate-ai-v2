# JobMate V1 — AI Workflow Specification

**Project:** JobMate  
**Repository:** `jobmate-ai`  
**Document Version:** 1.0  
**Related Documents:**
- `01-product-requirements.md`
- `02-user-flow.md`
- `03-ui-design-system.md`
- `04-system-architecture.md`

**Status:** V1 Planning

---

# 1. AI Objective

The purpose of JobMate's AI system is to help users understand how well their existing resume aligns with a specific job and generate useful application materials without inventing information.

The AI should prioritize:

1. Factual accuracy
2. Relevance
3. Consistency
4. Explainability
5. Structured output
6. User usefulness
7. Low hallucination risk

The AI should not prioritize impressive-sounding responses over factual correctness.

---

# 2. Core AI Principle

The fundamental rule is:

> **JobMate may improve the presentation of a user's existing information, but it must not create facts about the user.**

This rule applies to:

- Resume analysis
- Match analysis
- Recommendations
- Tailored resumes
- Cover letters
- Recruiter messages
- Interview preparation

---

# 3. Overall AI Pipeline

The V1 AI workflow is:

```text
                    RESUME
                      │
                      ▼
                PDF Extraction
                      │
                      ▼
              Resume Normalization
                      │
                      ▼
             Structured Resume
                      │
                      │
                      │
                    JOB
                      │
                      ▼
             JD Text / PDF Extraction
                      │
                      ▼
                JD Normalization
                      │
                      ▼
               Structured Job
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
       Resume Analysis    Job Analysis
             │                 │
             └────────┬────────┘
                      ▼
                Matching Engine
                      │
                      ▼
                Match Analysis
                      │
                      ▼
              Structured Results
                      │
             ┌────────┼─────────┐
             │        │         │
             ▼        ▼         ▼
          Results   Recommendations
                              │
                              ▼
                     Application Generation
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
             Resume       Cover Letter   Recruiter
             Tailoring                    Message
                              │
                              ▼
                     Interview Preparation
                              │
                              ▼
                       Output Validation
                              │
                              ▼
                            USER