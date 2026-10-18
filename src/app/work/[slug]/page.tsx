import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { caseBySlug, cases } from "@/content/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.intro[0],
    openGraph: { title: c.title, description: c.intro[0], images: [{ url: `/work/${c.slug}/card.jpg` }] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  return (
    <>
      <Header />
      <CaseStudyPage c={c} />
      <Footer />
    </>
  );
}
