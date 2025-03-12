import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  PlusCircle, 
  Target, 
  Smile, 
  List, 
  SlidersHorizontal,
  Bold,
  Italic,
  Save,
  Download,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const GenerateContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    contentType: "",
    targetAudience: "",
    tone: "",
    keywords: "",
    length: ""
  });
  const [generatedContent, setGeneratedContent] = useState("");

  // Check if user is logged in
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateContent = () => {
    // Validate form
    if (!formData.contentType || !formData.targetAudience || !formData.tone || !formData.keywords || !formData.length) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields before generating content.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate content generation
    setTimeout(() => {
      const contentTypes = {
        "blog-post": "Blog Post",
        "social-media": "Social Media Update",
        "ad-copy": "Advertisement Copy"
      };
      
      const tones = {
        "formal": "Formal",
        "casual": "Casual",
        "humorous": "Humorous"
      };
      
      const lengths = {
        "short": "Short (approximately 300 words)",
        "medium": "Medium (approximately 600 words)",
        "long": "Long (approximately 1200 words)"
      };

      // Generate sample content based on form data
      const sampleContent = `
        ${contentTypes[formData.contentType as keyof typeof contentTypes]} for ${formData.targetAudience}
        
        This is a sample ${tones[formData.tone as keyof typeof tones].toLowerCase()} content generated based on your keywords: ${formData.keywords}.
        
        The length is set to ${lengths[formData.length as keyof typeof lengths].toLowerCase()}.
        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
      `;

      setGeneratedContent(sampleContent);
      setIsLoading(false);

      // Save to "My Content" (just mocking this functionality)
      const existingContent = JSON.parse(localStorage.getItem("userContent") || "[]");
      const newContent = {
        id: Date.now(),
        title: `${contentTypes[formData.contentType as keyof typeof contentTypes]} - ${new Date().toLocaleDateString()}`,
        type: formData.contentType,
        date: new Date().toISOString(),
        content: sampleContent
      };
      
      localStorage.setItem("userContent", JSON.stringify([...existingContent, newContent]));

      toast({
        title: "Content Generated",
        description: "Your content has been generated and saved.",
      });
    }, 2000);
  };

  const handleSaveContent = () => {
    toast({
      title: "Content Saved",
      description: "Your content has been saved successfully.",
    });
  };

  const handleDownloadContent = () => {
    // Create a blob from the text content
    const blob = new Blob([generatedContent], { type: "text/plain" });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `content-${Date.now()}.txt`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Content Downloaded",
      description: "Your content has been downloaded as a text file.",
    });
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Generate New Content</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-5">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Content Type */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4 text-muted-foreground" />
                      <label className="font-medium">Content Type</label>
                    </div>
                    <Select
                      onValueChange={(value) => handleSelectChange("contentType", value)}
                      value={formData.contentType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog-post">Blog Post</SelectItem>
                        <SelectItem value="social-media">Social Media Update</SelectItem>
                        <SelectItem value="ad-copy">Advertisement Copy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Target Audience */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <label className="font-medium">Target Audience</label>
                    </div>
                    <Input
                      placeholder="E.g., Tech professionals, parents, young adults"
                      name="targetAudience"
                      value={formData.targetAudience}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  {/* Tone */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Smile className="h-4 w-4 text-muted-foreground" />
                      <label className="font-medium">Tone</label>
                    </div>
                    <Select
                      onValueChange={(value) => handleSelectChange("tone", value)}
                      value={formData.tone}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Keywords */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <List className="h-4 w-4 text-muted-foreground" />
                      <label className="font-medium">Keywords</label>
                    </div>
                    <Textarea
                      placeholder="Enter keywords or key phrases separated by commas"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  {/* Length */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                      <label className="font-medium">Length</label>
                    </div>
                    <Select
                      onValueChange={(value) => handleSelectChange("length", value)}
                      value={formData.length}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select content length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (~300 words)</SelectItem>
                        <SelectItem value="medium">Medium (~600 words)</SelectItem>
                        <SelectItem value="long">Long (~1200 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Generate Button */}
                  <Button 
                    className="w-full" 
                    onClick={handleGenerateContent}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Output Section */}
          <div className="lg:col-span-7">
            <Card className={`h-full ${!generatedContent && 'flex items-center justify-center'}`}>
              <CardContent className="p-6 h-full">
                {!generatedContent ? (
                  <div className="text-center text-muted-foreground">
                    <p>Your generated content will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="border-b pb-2 flex items-center gap-2">
                      <h3 className="font-semibold">Generated Content</h3>
                      <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleSaveContent}>
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleDownloadContent}>
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 border-b pb-2">
                      <Button variant="ghost" size="sm">
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Italic className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1 overflow-auto whitespace-pre-line">
                      {generatedContent}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerateContent;
