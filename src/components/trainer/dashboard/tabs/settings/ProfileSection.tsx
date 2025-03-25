
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileSectionProps {
  user: {
    name?: string;
    email: string;
  };
}

export function ProfileSection({ user }: ProfileSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Trainer Profile</h3>
        <p className="text-sm text-muted-foreground">This information will be displayed on your public profile page.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" defaultValue={user.name || "Demo Trainer"} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <textarea id="bio" className="w-full mt-1 px-3 py-2 border border-border rounded-md h-24" placeholder="Tell clients about yourself and your training approach..." />
            </div>
            <div>
              <Label htmlFor="specializations">Specializations</Label>
              <Input id="specializations" className="mt-1" placeholder="e.g. HIIT, Yoga, Strength Training" />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input id="experience" type="number" className="mt-1" defaultValue="5" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Certifications</h3>
        <p className="text-sm text-muted-foreground">Add your professional certifications to build client trust.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div>
              <Label htmlFor="cert-title">Certification Title</Label>
              <Input id="cert-title" className="mt-1" placeholder="e.g. NASM Certified Personal Trainer" />
            </div>
            <div>
              <Label htmlFor="issuing-org">Issuing Organization</Label>
              <Input id="issuing-org" className="mt-1" placeholder="e.g. National Academy of Sports Medicine" />
            </div>
            <div>
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input id="issue-date" type="date" className="mt-1" />
            </div>
            <Button variant="secondary" size="sm">Add Certification</Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">AI Assistant Settings</h3>
        <p className="text-sm text-muted-foreground">Configure how your AI assistant interacts with clients.</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-ai">Enable AI Assistant</Label>
              <Switch id="enable-ai" />
            </div>
            <div>
              <Label htmlFor="ai-style">AI Response Style</Label>
              <Select>
                <SelectTrigger id="ai-style">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
