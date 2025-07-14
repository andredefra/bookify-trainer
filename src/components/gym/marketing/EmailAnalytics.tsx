import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmailCampaign } from '@/hooks/gym/useMarketingAutomation';
import { Mail, Eye, MousePointer, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface EmailAnalyticsProps {
  campaigns: EmailCampaign[];
}

export function EmailAnalytics({ campaigns }: EmailAnalyticsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'sent':
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'opened':
        return <Eye className="w-4 h-4" />;
      case 'clicked':
        return <MousePointer className="w-4 h-4" />;
      case 'bounced':
      case 'failed':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      case 'opened':
        return 'bg-green-100 text-green-800';
      case 'clicked':
        return 'bg-purple-100 text-purple-800';
      case 'bounced':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate analytics by template type
  const analyticsByType = campaigns.reduce((acc, campaign) => {
    // We'll need to get template info from the campaign data
    // For now, we'll use a simple aggregation
    const key = 'all'; // In a real implementation, you'd get this from the template relationship
    
    if (!acc[key]) {
      acc[key] = {
        total: 0,
        sent: 0,
        opened: 0,
        clicked: 0,
        bounced: 0
      };
    }
    
    acc[key].total++;
    if (['sent', 'delivered', 'opened', 'clicked'].includes(campaign.status)) {
      acc[key].sent++;
    }
    if (campaign.opened_at) {
      acc[key].opened++;
    }
    if (campaign.clicked_at) {
      acc[key].clicked++;
    }
    if (campaign.status === 'bounced') {
      acc[key].bounced++;
    }
    
    return acc;
  }, {} as Record<string, any>);

  const recentCampaigns = campaigns.slice(0, 20); // Show last 20 campaigns

  return (
    <div className="space-y-6">
      {/* Performance Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">all time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.length > 0 
                ? ((campaigns.filter(c => ['sent', 'delivered', 'opened', 'clicked'].includes(c.status)).length / campaigns.length) * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.length > 0 
                ? ((campaigns.filter(c => c.opened_at).length / campaigns.length) * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">emails opened</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.length > 0 
                ? ((campaigns.filter(c => c.clicked_at).length / campaigns.length) * 100).toFixed(1)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">emails clicked</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Email Campaigns</CardTitle>
          <CardDescription>
            Track the performance of your automated email campaigns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentCampaigns.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No email campaigns sent yet</p>
              <p className="text-sm text-muted-foreground mt-2">
                Campaigns will appear here once automation rules start triggering
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCampaigns.map((campaign) => (
                <Card key={campaign.id} className="border-l-4 border-l-primary/20">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{campaign.subject}</h4>
                          <Badge className={getStatusColor(campaign.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(campaign.status)}
                              {campaign.status}
                            </div>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          To: {campaign.recipient_email}
                          {campaign.recipient_name && ` (${campaign.recipient_name})`}
                        </p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>Sent: {formatDate(campaign.sent_at)}</span>
                          {campaign.opened_at && (
                            <span>Opened: {formatDate(campaign.opened_at)}</span>
                          )}
                          {campaign.clicked_at && (
                            <span>Clicked: {formatDate(campaign.clicked_at)}</span>
                          )}
                        </div>
                        {campaign.bounce_reason && (
                          <p className="text-sm text-red-600">
                            Bounce reason: {campaign.bounce_reason}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}