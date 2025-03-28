
import React from "react";
import { BusinessInfoForm } from "./BusinessInfoForm";
import { BusinessInfo } from "@/components/trainer/training/types";

interface BusinessInfoSectionProps {
  businessType: "individual" | "business";
  setBusinessType: (type: "individual" | "business") => void;
  businessInfo: BusinessInfo;
  onSaveBusinessInfo: () => void;
}

export function BusinessInfoSection({ 
  businessType, 
  setBusinessType, 
  businessInfo, 
  onSaveBusinessInfo 
}: BusinessInfoSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Business Information</h3>
      
      <BusinessInfoForm 
        businessType={businessType}
        setBusinessType={setBusinessType}
        businessInfo={businessInfo}
        onSave={onSaveBusinessInfo}
      />
    </div>
  );
}
