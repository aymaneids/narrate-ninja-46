
import { AnimatedContainer } from "./AnimatedContainer";

const steps = [
  {
    number: "01",
    title: "Input Your Content Goals",
    description: "Tell us what you want to achieve, such as promoting a new product or engaging your audience.",
  },
  {
    number: "02",
    title: "Define Your Audience",
    description: "Specify who you're targeting to ensure the content resonates with your ideal customers.",
  },
  {
    number: "03",
    title: "Choose Platform and Tone",
    description: "Select where the content will be used and the desired style, from professional to conversational.",
  },
  {
    number: "04",
    title: "Generate Content",
    description: "Let our advanced AI create your content with one click, based on your specific parameters.",
  },
  {
    number: "05",
    title: "Review and Edit",
    description: "Make any adjustments to perfect your message using our intuitive editing tools.",
  },
  {
    number: "06",
    title: "Export or Publish",
    description: "Download your content or publish it directly to your marketing platforms.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How It Works
          </h2>
          <p className="text-xl text-foreground/70">
            Creating perfect marketing content has never been easier. Follow these simple steps to get started.
          </p>
        </AnimatedContainer>

        <div className="flex flex-col gap-y-6 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <AnimatedContainer 
              key={step.number} 
              animation="scale-in" 
              delay={(index % 6) * 100 as 0 | 100 | 200 | 300 | 400 | 500 | 600}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-foreground/70">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute h-6 w-px bg-border left-[39px] top-full md:left-7" />
              )}
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};
