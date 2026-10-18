import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Contact, Hero, Projects, Strengths, Toolkit } from "@/components/Home";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Toolkit />
        <Strengths />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
