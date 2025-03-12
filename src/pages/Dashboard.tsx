
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, FileEdit, Home, HelpCircle, LogOut, Menu, PlusCircle, Settings, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Get content items from local storage
  const contentItems = JSON.parse(localStorage.getItem("userContent") || "[]").slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 flex flex-col z-30",
          sidebarOpen ? "w-64" : "w-0 md:w-20"
        )}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-sidebar-border">
          <div className={cn("flex items-center", !sidebarOpen && "md:justify-center")}>
            <span className={cn("font-bold text-xl", !sidebarOpen && "md:hidden")}>
              Narrate<span className="text-primary">Ninja</span>
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="px-2 space-y-1">
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start py-2 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !sidebarOpen && "md:justify-center md:px-0"
              )}
              asChild
            >
              <Link to="/dashboard">
                <Home className="h-5 w-5 mr-3" />
                <span className={cn(!sidebarOpen && "md:hidden")}>Dashboard</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start py-2 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !sidebarOpen && "md:justify-center md:px-0"
              )}
              asChild
            >
              <Link to="/generate-content">
                <PlusCircle className="h-5 w-5 mr-3" />
                <span className={cn(!sidebarOpen && "md:hidden")}>Generate Content</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start py-2 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !sidebarOpen && "md:justify-center md:px-0"
              )}
              asChild
            >
              <Link to="/my-content">
                <FileEdit className="h-5 w-5 mr-3" />
                <span className={cn(!sidebarOpen && "md:hidden")}>My Content</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start py-2 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !sidebarOpen && "md:justify-center md:px-0"
              )}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Account Settings</span>
            </Button>
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start py-2 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                !sidebarOpen && "md:justify-center md:px-0"
              )}
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              <span className={cn(!sidebarOpen && "md:hidden")}>Help & Support</span>
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-medium md:block">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            <div className="flex items-center space-x-1">
              <div className="text-sm font-medium hidden md:block text-right mr-2">
                <div>{user.name}</div>
                <div className="text-muted-foreground text-xs">{user.email}</div>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.png" alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Message */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-2">Welcome back, {user.name}!</h2>
              <p className="text-muted-foreground">Ready to create your next piece of marketing content?</p>
              <Button className="mt-4" asChild>
                <Link to="/generate-content">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Generate New Content
                </Link>
              </Button>
            </div>

            {/* Recent Content */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Content</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/my-content">View All</Link>
                </Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {contentItems.length > 0 ? (
                  contentItems.map((item: any) => (
                    <Card key={item.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{new Date(item.date).toLocaleDateString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Download</Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="md:col-span-2 lg:col-span-3">
                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                      <p className="text-muted-foreground mb-4">You haven't created any content yet</p>
                      <Button asChild>
                        <Link to="/generate-content">
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Generate Your First Content
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Your current plan usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Content Generations</span>
                    <span className="font-medium">{contentItems.length} / 10 this month</span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(contentItems.length / 10) * 100}%` }}></div>
                  </div>
                  <Button variant="outline" className="mt-4" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-primary/10 rounded-md border border-primary/20">
                    <p className="text-sm font-medium">New feature: Multi-language support now available!</p>
                    <p className="text-xs text-muted-foreground mt-1">Generate content in Spanish, French, and 10 other languages.</p>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium">Your trial ends in 7 days</p>
                    <p className="text-xs text-muted-foreground mt-1">Upgrade now to continue using all features.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
