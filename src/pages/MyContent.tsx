
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Search, 
  PlusCircle, 
  FileText, 
  FileEdit, 
  Download, 
  Trash2, 
  Eye,
  Newspaper,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ContentItem {
  id: number;
  title: string;
  type: string;
  date: string;
  content: string;
}

const MyContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/login");
      return;
    }

    // Load content items from local storage
    const storedContent = localStorage.getItem("userContent");
    if (storedContent) {
      setContentItems(JSON.parse(storedContent));
    }
  }, [navigate]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: number) => {
    const updatedContent = contentItems.filter(item => item.id !== id);
    setContentItems(updatedContent);
    localStorage.setItem("userContent", JSON.stringify(updatedContent));
    
    toast({
      title: "Content Deleted",
      description: "The content has been deleted successfully.",
    });
  };

  const handleDownload = (item: ContentItem) => {
    // Create a blob from the text content
    const blob = new Blob([item.content], { type: "text/plain" });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    
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

  const handleView = (item: ContentItem) => {
    // In a real app, you would navigate to a detail view
    // For this demo, just show a toast
    toast({
      title: item.title,
      description: item.content.substring(0, 100) + "...",
    });
  };

  const handleEdit = (item: ContentItem) => {
    // In a real app, you would navigate to an edit view
    // For this demo, just show a toast
    toast({
      title: "Edit Content",
      description: "Editing functionality would be implemented here.",
    });
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case "blog-post":
        return <Newspaper className="h-4 w-4" />;
      case "social-media":
        return <MessageSquare className="h-4 w-4" />;
      case "ad-copy":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getContentTypeName = (type: string) => {
    switch (type) {
      case "blog-post":
        return "Blog Post";
      case "social-media":
        return "Social Media";
      case "ad-copy":
        return "Ad Copy";
      default:
        return type;
    }
  };

  const filteredAndSortedContent = contentItems
    .filter(item => {
      // Filter by search term
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by content type
      const matchesType = filterType ? item.type === filterType : true;
      
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      // Sort by date
      if (sortOrder === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Content</h1>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search content..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-40">
              <Select
                value={filterType}
                onValueChange={setFilterType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="blog-post">Blog Post</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="ad-copy">Ad Copy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-40">
              <Select
                value={sortOrder}
                onValueChange={(value: "newest" | "oldest") => setSortOrder(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Content List */}
        {filteredAndSortedContent.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getContentTypeIcon(item.type)}
                        <span>{getContentTypeName(item.type)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleView(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(item)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-md p-12 flex flex-col items-center justify-center text-center">
            <div className="text-muted-foreground mb-4">
              <FileText className="h-12 w-12 mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">You haven't generated any content yet</h3>
              <p className="mb-4">Create your first piece of content to get started</p>
            </div>
            <Button onClick={() => navigate("/generate-content")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Generate New Content
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyContent;
