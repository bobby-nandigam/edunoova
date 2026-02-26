import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Who can use this platform?", a: "Anyone from age 10 to working professionals. We have learning paths for school students, college students, placement aspirants, and career changers." },
  { q: "Is it suitable for complete beginners?", a: "Absolutely! Our Foundations track starts from scratch — no prior coding experience needed. The AI mentor adapts to your level." },
  { q: "How does placement preparation work?", a: "Our Placement Master track covers DSA, system design, aptitude, mock interviews with AI, and company-specific preparation modules." },
  { q: "What does the AI learning path include?", a: "From math foundations through ML, deep learning, NLP, computer vision, generative AI, and MLOps — with hands-on projects at every stage." },
  { q: "What's the difference between Free and Premium?", a: "Free gives you access to basic notes and intro topics. Premium unlocks the full curriculum, unlimited AI tutor, placement prep, projects, and personalized study plans." },
];

const FAQ = () => (
  <section className="py-24 section-gradient" id="faq">
    <div className="container mx-auto px-6 max-w-3xl">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-6">
            <AccordionTrigger className="font-display font-semibold text-sm text-left hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
