
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, CreditCard, MessageSquare } from "lucide-react";

interface MarketingSectionProps {
  trainerName: string;
}

export const MarketingSection = ({ trainerName }: MarketingSectionProps) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display font-semibold text-center mb-8">
        How Personal.ai helps trainers like {trainerName}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <CalendarCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-muted-foreground">
              Trainers can sync with Google Calendar and allow clients to book directly based on availability.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Automated Payments</h3>
            <p className="text-muted-foreground">
              Get paid automatically when sessions are completed, with secure Stripe integration.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Client Communication</h3>
            <p className="text-muted-foreground">
              Chat with clients, send workout plans, and answer questions all in one platform.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-10">
        <Link to="/register">
          <Button size="lg" className="px-8">
            Try Personal.ai for Your Training Business
          </Button>
        </Link>
      </div>
    </div>
  );
};
