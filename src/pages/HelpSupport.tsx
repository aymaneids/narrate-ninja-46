
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Search,
  HelpCircle,
  Mail,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Send
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How do I generate content?",
    answer:
      "To generate content, navigate to the Generate Content page, fill out the form with your requirements (type, audience, tone, keywords, length), and click the Generate button. Your content will appear below the form once it's ready.",
  },
  {
    question: "What types of content can I create?",
    answer:
      "Currently, you can create blog posts, social media updates, and advertisement copy. We're continuously adding new content types based on user feedback.",
  },
  {
    question: "How is my content saved?",
    answer:
      "All generated content is automatically saved to your account. You can access your saved content anytime from the My Content page.",
  },
  {
    question: "Can I export my content?",
    answer:
      "Yes, you can download your content as a text file by clicking the Download button that appears next to your generated content.",
  },
  {
    question: "What is the character limit for generated content?",
    answer:
      "The length of generated content varies based on your selection. Short is approximately 300 words, Medium is around 600 words, and Long is about 1200 words.",
  },
  {
    question: "How do I change my account settings?",
    answer:
      "Navigate to the Account Settings page from the dashboard sidebar. There, you can update your profile information, change your password, and manage your preferences.",
  },
];

const HelpSupport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Missing Fields",
        description: "Please fill out both subject and message fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setContactForm({
        subject: "",
        message: "",
      });
      toast({
        title: "Message Sent",
        description: "We've received your message and will get back to you soon.",
      });
    }, 1000);
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Filter FAQs based on search term
  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Help & Support</h1>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search for help topics..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FAQs Section */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
                </div>

                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No results found for "{searchTerm}"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact and Resources */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Contact Support</h2>
                </div>
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                      placeholder="How can we help you?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Describe your issue or question"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">Resources</h2>
                </div>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-primary hover:underline"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      User Guide
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-primary hover:underline"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Content Writing Tips
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-primary hover:underline"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      API Documentation
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport;
