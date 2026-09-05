import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import FinalCTA from "../components/landing/FinalCTA";
import Footer from "../components/landing/Footer";
import "../components/landing/landing.css";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

export default Home;