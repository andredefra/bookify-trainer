import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Eye, ExternalLink, Save, RefreshCw } from "lucide-react";
import { useTrainerProfile, type TrainerProfile } from "@/hooks/useTrainerProfile";
import { useToast } from "@/hooks/use-toast";

interface PublicProfileSectionProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    profileImage?: string;
  } | null;
}

export function PublicProfileSection({ user }: PublicProfileSectionProps) {
  const { profile, loading, saving, saveProfile, generateSlug } = useTrainerProfile(user?.email === "demo@trainer.com" ? "demo-trainer-id" : undefined);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<TrainerProfile>>({});
  const [newSpecialty, setNewSpecialty] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [customSlug, setCustomSlug] = useState("");

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setCustomSlug(profile.slug || "");
    } else if (user?.name) {
      // Initialize with basic data
      setFormData({
        trainer_id: user.email === "demo@trainer.com" ? "demo-trainer-id" : "",
        title: "Personal Trainer",
        bio: "",
        location: "",
        hourly_rate: 50,
        specialties: [],
        certifications: [],
        education: [],
        experience: [],
        languages: ["English"],
        is_public: true
      });
    }
  }, [profile, user]);

  const handleInputChange = (field: keyof TrainerProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      const specialties = (formData.specialties as string[]) || [];
      setFormData(prev => ({
        ...prev,
        specialties: [...specialties, newSpecialty.trim()]
      }));
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (index: number) => {
    const specialties = (formData.specialties as string[]) || [];
    setFormData(prev => ({
      ...prev,
      specialties: specialties.filter((_, i) => i !== index)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      const languages = formData.languages || [];
      if (!languages.includes(newLanguage.trim())) {
        setFormData(prev => ({
          ...prev,
          languages: [...languages, newLanguage.trim()]
        }));
      }
      setNewLanguage("");
    }
  };

  const removeLanguage = (index: number) => {
    const languages = formData.languages || [];
    setFormData(prev => ({
      ...prev,
      languages: languages.filter((_, i) => i !== index)
    }));
  };

  const handleGenerateSlug = async () => {
    if (user?.name) {
      const slug = await generateSlug(user.name);
      if (slug) {
        setCustomSlug(slug);
        handleInputChange('slug', slug);
      }
    }
  };

  const handleSave = async () => {
    const success = await saveProfile({
      ...formData,
      slug: customSlug
    });
    if (success) {
      toast({
        title: "Success",
        description: "Your public profile has been updated",
      });
    }
  };

  const profileUrl = customSlug ? `${window.location.origin}/trainer/${customSlug}` : "";

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading profile...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Public Profile</h2>
          <p className="text-muted-foreground">
            Manage your public trainer profile that clients will see
          </p>
        </div>
        <div className="flex gap-2">
          {profileUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </a>
            </Button>
          )}
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Your basic profile information that clients will see first
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={formData.title || ""}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Certified Personal Trainer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location || ""}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., New York, NY"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio || ""}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell clients about yourself, your experience, and what makes you unique..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  value={formData.hourly_rate || ""}
                  onChange={(e) => handleInputChange('hourly_rate', parseFloat(e.target.value))}
                  placeholder="50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Specialties</CardTitle>
              <CardDescription>
                Add your training specialties to help clients find you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="e.g., Weight Loss, Strength Training"
                  onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button onClick={addSpecialty} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(formData.specialties as string[])?.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {specialty}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeSpecialty(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>
                Languages you can communicate with clients in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="e.g., Spanish, French"
                  onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                />
                <Button onClick={addLanguage} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.languages?.map((language, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {language}
                    {language !== "English" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => removeLanguage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Professional Background</CardTitle>
              <CardDescription>
                Add your certifications, education, and experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Professional background management coming soon. You'll be able to add detailed certifications, education history, and work experience.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Configure your profile visibility and URL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to potential clients
                  </p>
                </div>
                <Switch
                  id="public"
                  checked={formData.is_public}
                  onCheckedChange={(checked) => handleInputChange('is_public', checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Profile URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="slug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="your-name"
                  />
                  <Button onClick={handleGenerateSlug} variant="outline" size="sm">
                    Generate
                  </Button>
                </div>
                {profileUrl && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Your profile will be available at:</span>
                    <a 
                      href={profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {profileUrl}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}