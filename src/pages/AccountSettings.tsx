
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  User, 
  CreditCard, 
  Bell, 
  Save, 
  Upload,
  Lock,
  Mail,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const AccountSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [newPassword, setNewPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    contentUpdates: false,
    defaultTone: "formal",
    defaultContentType: "blog-post",
  });

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");

    if (!isLoggedIn || !userData) {
      navigate("/login");
      return;
    }

    // Load user data
    const user = JSON.parse(userData);
    setProfileData({
      name: user.name || "User",
      email: user.email || "user@example.com",
      avatar: user.avatar || "",
    });
  }, [navigate]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name: string, checked: boolean) => {
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSaveProfile = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Save to local storage
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...userData,
        name: profileData.name,
        email: profileData.email,
        avatar: profileData.avatar,
      })
    );

    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleSavePassword = () => {
    // Validate password
    if (newPassword.new.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.new !== newPassword.confirm) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this to an API
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });

    // Reset password fields
    setNewPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated.",
    });
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  // Calculate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        placeholder="Your email"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="mt-2">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current" className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Current Password
                      </Label>
                      <Input
                        id="current"
                        name="current"
                        type="password"
                        value={newPassword.current}
                        onChange={handlePasswordChange}
                        placeholder="Current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new">New Password</Label>
                      <Input
                        id="new"
                        name="new"
                        type="password"
                        value={newPassword.new}
                        onChange={handlePasswordChange}
                        placeholder="New password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm New Password</Label>
                      <Input
                        id="confirm"
                        name="confirm"
                        type="password"
                        value={newPassword.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button onClick={handleSavePassword} className="mt-2">
                      <Save className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex flex-col items-center">
                  <h3 className="text-lg font-medium mb-4">Profile Picture</h3>
                  <div className="mb-4">
                    <Avatar className="h-32 w-32">
                      {profileData.avatar ? (
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                      ) : (
                        <AvatarFallback className="text-2xl">
                          {getInitials(profileData.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Subscription Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Subscription Plan</h3>
                <div className="bg-primary/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Free Plan</h4>
                      <p className="text-muted-foreground">10 content generations per month</p>
                    </div>
                    <div className="bg-primary/20 text-primary font-medium py-1 px-3 rounded-full">
                      Current Plan
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-2">Plan Features:</h4>
                <ul className="list-disc list-inside mb-6 space-y-1 text-muted-foreground">
                  <li>Generate up to 10 content pieces per month</li>
                  <li>Download content as text files</li>
                  <li>Basic editing tools</li>
                  <li>Email support</li>
                </ul>

                <h4 className="font-medium mb-2">Usage This Month:</h4>
                <div className="h-4 bg-muted rounded-full mb-2">
                  <div className="h-4 bg-primary rounded-full" style={{ width: "30%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground mb-6">3 of 10 generations used</p>

                <Button className="w-full">Upgrade to Premium</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about your account and activity
                      </p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleToggleChange("emailNotifications", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Content Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new features and content types
                      </p>
                    </div>
                    <Switch
                      checked={preferences.contentUpdates}
                      onCheckedChange={(checked) =>
                        handleToggleChange("contentUpdates", checked)
                      }
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="text-lg font-medium mb-4">Default Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultTone">Default Tone</Label>
                    <Select
                      value={preferences.defaultTone}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({ ...prev, defaultTone: value }))
                      }
                    >
                      <SelectTrigger id="defaultTone">
                        <SelectValue placeholder="Select default tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultContentType">Default Content Type</Label>
                    <Select
                      value={preferences.defaultContentType}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({ ...prev, defaultContentType: value }))
                      }
                    >
                      <SelectTrigger id="defaultContentType">
                        <SelectValue placeholder="Select default content type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blog-post">Blog Post</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="ad-copy">Ad Copy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSavePreferences} className="mt-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AccountSettings;
