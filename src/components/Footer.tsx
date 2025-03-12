
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-16">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">
              Narrate<span className="text-primary">Ninja</span>
            </h3>
            <p className="text-foreground/70">
              AI-powered content generation to help you create compelling marketing materials in minutes.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Stay Updated</h4>
            <p className="text-foreground/70">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button variant="primary" size="sm">
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            &copy; {currentYear} NarrateNinja. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-foreground/60 hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
