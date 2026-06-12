import {
  HeroSection,
  AboutSection,
  WhyUsSection,
  ServicesSection,
  ProcessSection,
  ProjectsSection,
  InvestmentSection,
  LeadershipSection,
  StatsSection,
  BlogSection,
  CtaSection,
} from "@/components/sections";
import allPosts from "@/data/news.json";

export default function HomePage() {
  const newsPosts = (allPosts as { id: number; date: string; title: string; excerpt: string; image: string | null; slug: string }[]).slice(0, 3);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <WhyUsSection />
      <ProcessSection />
      <ProjectsSection />
      <BlogSection posts={newsPosts} />
      <InvestmentSection />
      <CtaSection />
    </>
  );
}
