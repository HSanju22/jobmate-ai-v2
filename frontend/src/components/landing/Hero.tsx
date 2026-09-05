import { Link } from "react-router-dom";
import Container from "../Container";

function Hero() {
  return (
    <section className="landing-hero">
      <Container className="landing-hero-container">
        <div className="landing-hero-content">
          <p className="landing-eyebrow">Your job application assistant</p>

          <h1>Understand how well your resume matches any job.</h1>

          <p className="landing-hero-description">
            JobMate analyzes your resume against a job description and gives
            you clear, actionable feedback to improve your application.
          </p>

          <Link to="/analyze" className="button button-primary">
            Analyze a Job
          </Link>
        </div>

        <div className="landing-hero-visual" aria-label="JobMate analysis flow">
          <div className="flow-item">Resume</div>
          <span>+</span>
          <div className="flow-item">Job Description</div>
          <span>→</span>
          <div className="flow-result">Analysis</div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;