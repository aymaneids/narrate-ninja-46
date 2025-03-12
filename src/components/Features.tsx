
import { AnimatedContainer } from "./AnimatedContainer";
import { Clock, Settings, Layers, Zap, Layout, ArrowUpRight } from "lucide-react";

const features = [
  {
    title: "Time-Saving Content Generation",
    description: "Create blog posts, social media updates, and ads in minutes instead of hours.",
    icon: Clock,
  },
  {
    title: "Customizable Outputs",
    description: "Tailor the tone, style, and format to perfectly match your brand identity.",
    icon: Settings,
  },
  {
    title: "Multi-Platform Support",
    description: "Generate content for blogs, social media, email campaigns, and more.",
    icon: Layers,
  },
  {
    title: "Easy Editing and Refinement",
    description: "Review and tweak AI-generated content with our intuitive editor.",
    icon: Zap,
  },
  {
    title: "Integration with Marketing Tools",
    description: "Seamlessly connect with tools like WordPress, Hootsuite, or Mailchimp.",
    icon: Layout,
  },
  {
    title: "Advanced Analytics",
    description: "Track content performance and get insights to improve engagement.",
    icon: ArrowUpRight,
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary mb-4">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything you need to create engaging content
          </h2>
          <p className="text-xl text-foreground/70">
            Our AI-powered platform offers a comprehensive set of tools to streamline your content creation process.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <AnimatedContainer 
              key={feature.title} 
              animation="slide-up" 
              delay={(index % 3) * 100 as 0 | 100 | 200 | 300 | 400 | 500 | 600}
              className="group"
            >
              <div className="h-full p-6 bg-white border border-border rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};
