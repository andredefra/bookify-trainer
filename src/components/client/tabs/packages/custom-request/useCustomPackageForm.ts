
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface FormData {
  packageType: string;
  sessionsCount: string;
  duration: string;
  budget: string;
  goals: string;
  specialRequests: string;
  preferredTrainer: string;
  contactMethod: string;
}

export function useCustomPackageForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    packageType: '',
    sessionsCount: '',
    duration: '',
    budget: '',
    goals: '',
    specialRequests: '',
    preferredTrainer: '',
    contactMethod: 'email'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent, onComplete: () => void, onClose: () => void) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate request submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Custom Package Request Submitted",
        description: "We'll review your request and get back to you within 24 hours with a personalized quote.",
      });
      
      // Reset form
      setFormData({
        packageType: '',
        sessionsCount: '',
        duration: '',
        budget: '',
        goals: '',
        specialRequests: '',
        preferredTrainer: '',
        contactMethod: 'email'
      });
      
      onClose();
      onComplete();
    }, 1500);
  };

  const isFormValid = formData.packageType && formData.goals;

  return {
    formData,
    loading,
    handleInputChange,
    handleSubmit,
    isFormValid
  };
}
