
import { Button } from "./Button";
import { AnimatedContainer } from "./AnimatedContainer";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[60%] h-[70%] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" />
        <div className="absolute top-[50%] -left-[10%] w-[50%] h-[60%] rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-300/5 blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <AnimatedContainer 
                animation="slide-down" 
                className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Introducing AI-Powered Content Creation
              </AnimatedContainer>
              
              <AnimatedContainer 
                animation="slide-down" 
                delay={100}
                className="text-balance"
              >
                <h1 className="font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl">
                  Generate High-Quality <br className="hidden sm:inline" />
                  <span className="text-primary">Marketing Content</span> <br className="hidden sm:inline" />
                  in Minutes
                </h1>
              </AnimatedContainer>
              
              <AnimatedContainer 
                animation="slide-down" 
                delay={200}
                className="max-w-[85%] text-balance"
              >
                <p className="text-lg md:text-xl text-foreground/80">
                  Input your goals and audience, and let our AI create tailored content for your campaigns. Save time and boost your marketing efforts.
                </p>
              </AnimatedContainer>
            </div>
            
            <AnimatedContainer animation="slide-down" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Start Generating Content
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" size="lg">
                  Watch Demo
                </Button>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer animation="fade-in" delay={500}>
              <div className="pt-4">
                <p className="text-sm text-foreground/60 mb-3">Trusted by leading companies</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 opacity-70">
                  {['Microsoft', 'Adobe', 'Shopify', 'Slack', 'Spotify'].map((brand) => (
                    <div key={brand} className="text-lg font-semibold tracking-tight">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContainer>
          </div>
          
          <div className="w-full lg:w-1/2">
            <AnimatedContainer animation="scale-in" delay={200}>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-blue-600/50 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl rounded-2xl overflow-hidden">
                  <div className="bg-secondary/50 p-3 border-b border-border">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-secondary rounded"></div>
                        <div className="h-4 w-1/2 bg-secondary rounded"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex space-x-4">
                          <div className="h-8 w-24 bg-primary/20 rounded-full"></div>
                          <div className="h-8 w-24 bg-secondary rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-secondary rounded"></div>
                        <div className="h-4 w-full bg-secondary rounded"></div>
                        <div className="h-4 w-3/4 bg-secondary rounded"></div>
                      </div>
                      <div className="flex justify-end">
                        <div className="h-10 w-32 bg-primary/30 rounded-md"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary/30 rounded-full blur-xl"></div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
};
