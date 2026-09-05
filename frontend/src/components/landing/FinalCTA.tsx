import { Link } from "react-router-dom";
import Container from "../Container";

function FinalCTA() {
  return (
    <section className="landing-final-cta">
      <Container className="landing-final-cta-container">
        <p className="landing-eyebrow">Start with your next application</p>

        <h2>Ready to understand your job match?</h2>

        <p>
          Analyze your resume against a job description and find opportunities
          to improve your application.
        </p>

        <Link to="/analyze" className="button button-primary">
          Analyze a Job
        </Link>
      </Container>
    </section>
  );
}

export default FinalCTA;