
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface SalesHeaderProps {
  onAddLead: () => void;
}

export function SalesHeader({ onAddLead }: SalesHeaderProps) {
  return (
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <CardTitle>CRM</CardTitle>
        <CardDescription>Manage your leads, prospects and clients in one place</CardDescription>
      </div>
      <Button 
        className="self-start sm:self-center mt-2 sm:mt-0" 
        onClick={onAddLead}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Lead
      </Button>
    </CardHeader>
  );
}
