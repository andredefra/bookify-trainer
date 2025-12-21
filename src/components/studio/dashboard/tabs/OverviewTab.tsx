import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, Package, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface OverviewTabProps {
  user: {
    name?: string;
    email: string;
    type: string;
    plan?: string;
    studioName?: string;
  } | null;
}

export function OverviewTab({ user }: OverviewTabProps) {
  const stats = [
    { label: "Active Clients", value: "47", icon: Users, change: "+12%" },
    { label: "Active Trainers", value: "6", icon: Dumbbell, change: "+2" },
    { label: "Programs Created", value: "23", icon: Package, change: "+5 this month" },
    { label: "Sessions This Week", value: "38", icon: Calendar, change: "+8%" },
    { label: "Monthly Revenue", value: "€8,450", icon: DollarSign, change: "+15%" },
    { label: "Client Retention", value: "94%", icon: TrendingUp, change: "+2%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.name || "Studio Admin"}!
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of {user?.studioName || "your studio"}'s performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">New program created</p>
                  <p className="text-xs text-muted-foreground">12-Week Transformation assigned to 3 clients</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Trainer assigned</p>
                  <p className="text-xs text-muted-foreground">Marco assigned to client Sarah's sessions</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-2 w-2 bg-purple-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium">Package sold</p>
                  <p className="text-xs text-muted-foreground">Premium 20-session package - €800</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Marco Rossi", clients: 12, sessions: 48 },
                { name: "Laura Bianchi", clients: 10, sessions: 42 },
                { name: "Giuseppe Verde", clients: 8, sessions: 36 },
              ].map((trainer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{trainer.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{trainer.name}</p>
                      <p className="text-xs text-muted-foreground">{trainer.clients} clients</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{trainer.sessions}</p>
                    <p className="text-xs text-muted-foreground">sessions/mo</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
