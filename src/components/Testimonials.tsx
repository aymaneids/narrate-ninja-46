
import { AnimatedContainer } from "./AnimatedContainer";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "This tool saved me hours every week on content creation!",
    author: "Jane Cooper",
    role: "Marketing Manager",
    company: "TechStart",
    rating: 5
  },
  {
    quote: "The AI-generated content consistently matches our brand voice.",
    author: "Mark Johnson",
    role: "Content Strategist",
    company: "GrowthLabs",
    rating: 5
  },
  {
    quote: "Increased our blog traffic by 30% using NarrateNinja.",
    author: "Sarah Wilson",
    role: "Digital Marketing Lead",
    company: "InnovateX",
    rating: 5
  }
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6 mx-auto">
        <AnimatedContainer className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Loved by marketers worldwide
          </h2>
          <p className="text-xl text-foreground/70">
            See what our customers have to say about their experience with NarrateNinja.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedContainer
              key={testimonial.author}
              animation="slide-up"
              delay={(index % 3) * 100 as 0 | 100 | 200 | 300 | 400 | 500 | 600}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-foreground/70">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
};
