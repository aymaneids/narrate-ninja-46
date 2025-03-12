
import { AnimatedContainer } from "./AnimatedContainer";
import { Button } from "./Button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for trying out NarrateNinja",
    features: [
      "5 content generations per month",
      "Basic templates",
      "Standard export formats",
      "Community support"
    ]
  },
  {
    name: "Pro",
    price: "19",
    description: "For professionals who need more power",
    features: [
      "Unlimited content generations",
      "Advanced AI customization",
      "Priority support",
      "Custom templates",
      "Advanced analytics",
      "API access"
    ]
  }
];

export const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-foreground/70">
            Choose the perfect plan for your content needs
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedContainer
              key={plan.name}
              animation="slide-up"
              delay={(index % 2) * 100 as 0 | 100 | 200 | 300 | 400 | 500 | 600}
            >
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 text-4xl font-bold">
                    ${plan.price}
                    <span className="text-lg font-normal text-foreground/70">/month</span>
                  </div>
                  <p className="mt-2 text-foreground/70">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.name === "Pro" ? "primary" : "secondary"}
                  size="lg"
                  fullWidth
                >
                  {plan.name === "Free" ? "Get Started" : "Upgrade Now"}
                </Button>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};
