import Container from "../Container";

const features = [
  {
    title: "Resume Analysis",
    description:
      "Extract and understand the skills, experience, and information already present in your resume.",
  },
  {
    title: "Job Description Analysis",
    description:
      "Break down the requirements, responsibilities, skills, and keywords in a job description.",
  },
  {
    title: "Skill Matching",
    description:
      "Compare the skills represented in your resume with the requirements of the job.",
  },
  {
    title: "Skill Gap Identification",
    description:
      "Identify important job requirements that are not clearly represented in your resume.",
  },
  {
    title: "Keyword Analysis",
    description:
      "See relevant keywords and understand where your resume can better reflect the job description.",
  },
  {
    title: "Application Guidance",
    description:
      "Receive practical recommendations for improving how your existing experience is presented.",
  },
];

function Features() {
  return (
    <section id="features" className="landing-section landing-features">
      <Container>
        <div className="landing-section-heading">
          <p className="landing-eyebrow">What JobMate helps with</p>
          <h2>Built for better applications</h2>
        </div>

        <div className="landing-features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="landing-feature">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;