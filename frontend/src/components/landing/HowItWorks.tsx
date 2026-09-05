import Container from "../Container";

const steps = [
  {
    number: "01",
    title: "Upload your resume",
    description: "Provide your current resume in PDF format.",
  },
  {
    number: "02",
    title: "Add the job description",
    description: "Paste the job description you want to analyze.",
  },
  {
    number: "03",
    title: "Get actionable analysis",
    description:
      "Understand your match, skill gaps, keywords, and areas for improvement.",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-section landing-how">
      <Container>
        <div className="landing-section-heading">
          <p className="landing-eyebrow">Simple process</p>
          <h2>How It Works</h2>
        </div>

        <div className="landing-steps">
          {steps.map((step) => (
            <article key={step.number} className="landing-step">
              <span className="landing-step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;