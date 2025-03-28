
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AIAssistantSettings() {
  return (
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
  );
}
