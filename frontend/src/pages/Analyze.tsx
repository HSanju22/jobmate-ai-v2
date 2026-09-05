import Container from '../components/Container';
import './analyze.css';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

function Analyze() {
  return (
    <>
    <Navbar/>
    
    <div className="analyze-page">
      {/* Page Header */}
      <section className="analyze-header">
        <Container>
          <div className="analyze-step">
            <span>●</span>
            <span>Step 1 of 2</span>
            <span>•</span>
            <span>Input & Competency Setup</span>
          </div>

          <h1>Analyze Your Job Match</h1>

          <p>
            Upload your existing resume in PDF and paste the target job
            description. We will rigorously evaluate authentic alignment,
            missing keywords, and role expectations.
          </p>
        </Container>
      </section>

      {/* Integrity Banner */}
      <section className="integrity-section">
        <Container>
          <div className="integrity-banner">
            <div>
              <strong>JobMate Integrity Standard</strong>
              <span>Guaranteed Factuality</span>
            </div>

            <p>
              We analyze only the information you provide. JobMate never
              invents accomplishments, experience, dates, or competencies.
            </p>
          </div>
        </Container>
      </section>

      {/* Input Area */}
      <section className="analyze-inputs">
        <Container>
          <div className="analyze-grid">

            {/* Resume */}
            <div className="analyze-card">
              <div className="card-heading">
                <span className="step-number">1</span>
                <h2>Upload Resume (PDF)</h2>
                <span className="card-limit">Max 10 MB</span>
              </div>

              <p className="card-description">
                Upload your current resume in PDF format.
              </p>

              <div className="resume-upload-placeholder">
                <div className="upload-icon">↑</div>

                <h3>Upload your resume PDF</h3>

                <p>
                  Drag and drop your PDF here or select it from your device.
                </p>

                <button type="button">
                  Select PDF Document
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="analyze-card">
              <div className="card-heading">
                <span className="step-number">2</span>
                <h2>Target Job Description</h2>
                <span className="required-label">Required</span>
              </div>

              <p className="card-description">
                Paste the job description for the role you are targeting.
              </p>

              <div className="job-description-placeholder">
                <label htmlFor="job-description">
                  Job Listing Text
                </label>

                <textarea
                  id="job-description"
                  placeholder="Paste the job description here..."
                  rows={12}
                  disabled
                />

                <div className="character-count">
                  0 characters
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Action */}
      <section className="analyze-action">
        <Container>
          <div className="action-bar">
            <div>
              <strong>Ready when you are</strong>
              <p>
                Provide your resume and job description to begin.
              </p>
            </div>

            <button type="button" disabled>
              Analyze Job
            </button>
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="trust-section">
        <Container>
          <div className="trust-grid">
            <article>
              <h3>Zero Data Resale</h3>
              <p>
                Your uploaded documents should be handled securely and
                never sold or shared for unrelated purposes.
              </p>
            </article>

            <article>
              <h3>Zero Barrier to Entry</h3>
              <p>
                JobMate is designed to be accessible to students and
                early-career job seekers.
              </p>
            </article>

            <article>
              <h3>Factual Alignment</h3>
              <p>
                Recommendations improve the presentation of your existing
                qualifications without fabricating credentials.
              </p>
            </article>
          </div>
        </Container>
      </section>
    </div>

    <Footer/>
    </>
  );
}

export default Analyze;