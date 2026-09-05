import { Link } from "react-router-dom";
import Container from "../Container";

function Navbar() {
  return (
    <header className="landing-navbar">
      <Container className="landing-navbar-container">
        <Link to="/" className="landing-brand">
          JobMate
        </Link>

        <nav className="landing-nav" aria-label="Main navigation">
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>

          <Link to="/analyze" className="button button-primary">
            Analyze a Job
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;