
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusinessInfo } from "@/components/trainer/training/types";

interface BusinessInfoFormProps {
  businessType: "individual" | "business";
  setBusinessType: (type: "individual" | "business") => void;
  businessInfo: BusinessInfo;
  onSave: () => void;
}

export function BusinessInfoForm({ 
  businessType, 
  setBusinessType, 
  businessInfo, 
  onSave 
}: BusinessInfoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">Trainer Type</Label>
        <RadioGroup 
          value={businessType} 
          onValueChange={(value) => setBusinessType(value as "individual" | "business")}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual Trainer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business/Company</Label>
          </div>
        </RadioGroup>
      </div>
      
      {businessType === "business" && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="business-name">Business Name</Label>
            <Input id="business-name" placeholder="Your Company Name" />
          </div>
          <div>
            <Label htmlFor="vat">VAT Number</Label>
            <Input id="vat" placeholder="VAT Number" />
          </div>
        </div>
      )}
      
      <div>
        <Label htmlFor="tax-id">Tax ID / Fiscal Code</Label>
        <Input id="tax-id" placeholder="Tax ID or Fiscal Code" />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" placeholder="Street Address" className="mb-2" />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <Input placeholder="City" />
          <Input placeholder="State/Province" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Postal Code" />
          <Select defaultValue="Italy">
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Italy">Italy</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Spain">Spain</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button onClick={onSave}>Save Business Information</Button>
    </div>
  );
}
