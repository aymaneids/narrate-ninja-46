
import { AnimatedContainer } from "./AnimatedContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the AI generate content?",
    answer: "Our AI uses advanced language models trained on high-quality marketing content to generate relevant and engaging material based on your inputs and preferences."
  },
  {
    question: "Can I customize the AI-generated content?",
    answer: "Yes! You can customize the tone, style, and format of the generated content to match your brand voice perfectly."
  },
  {
    question: "What platforms are supported?",
    answer: "We support content generation for all major platforms including blogs, social media (Twitter, LinkedIn, Facebook, Instagram), email campaigns, and more."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, you can start with our free tier which includes 5 content generations per month, no credit card required."
  },
  {
    question: "How secure is my data?",
    answer: "We take data security seriously. All your data is encrypted, and we never share your information with third parties."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to know about NarrateNinja
          </p>
        </AnimatedContainer>

        <div className="max-w-3xl mx-auto">
          <AnimatedContainer animation="fade-in">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
};
