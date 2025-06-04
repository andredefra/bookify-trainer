
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Link2, Check } from "lucide-react";
import { TrainerSessionItem } from "@/types/sessions";
import { toast } from "sonner";

interface InviteLinkButtonProps {
  session: TrainerSessionItem;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export function InviteLinkButton({ 
  session, 
  variant = "outline", 
  size = "sm" 
}: InviteLinkButtonProps) {
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateInviteLink = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/book-session/${session.id}?invite=${Date.now()}`;
    setInviteLink(link);
    return link;
  };

  const handleClick = async () => {
    const link = inviteLink || generateInviteLink();
    
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Invite link copied to clipboard!");
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={variant} 
            size={size} 
            className="flex items-center gap-1"
            onClick={handleClick}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <Link2 className="h-3.5 w-3.5" />
            )}
            {size !== "icon" && (
              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Share"}
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Link copied!" : "Generate and copy invite link"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
