import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ArrowRight, Clock, MessageSquare, Users, Settings } from 'lucide-react';

export function MessageFlowBuilder() {
  const [flows, setFlows] = useState([
    {
      id: 1,
      name: 'Package Expiration Flow',
      description: 'Complete flow for handling package expirations',
      steps: [
        { id: 1, type: 'trigger', name: '30 days before expiry', description: 'First reminder' },
        { id: 2, type: 'message', name: 'Package Expiring Soon', description: 'Reminder with renewal option' },
        { id: 3, type: 'delay', name: '14 days', description: 'Wait period' },
        { id: 4, type: 'message', name: 'Final Reminder', description: 'Last chance to renew' },
        { id: 5, type: 'delay', name: '7 days', description: 'Wait period' },
        { id: 6, type: 'message', name: 'Package Expired', description: 'Post-expiry follow-up' },
      ],
      status: 'active',
      clientsEnrolled: 12,
      completionRate: 85,
    },
    {
      id: 2,
      name: 'New Client Onboarding',
      description: 'Welcome and onboard new clients',
      steps: [
        { id: 1, type: 'trigger', name: 'Package purchased', description: 'Immediate trigger' },
        { id: 2, type: 'message', name: 'Welcome Message', description: 'Welcome and next steps' },
        { id: 3, type: 'delay', name: '2 days', description: 'Wait period' },
        { id: 4, type: 'message', name: 'Book First Session', description: 'Encourage first booking' },
        { id: 5, type: 'delay', name: '7 days', description: 'Wait period' },
        { id: 6, type: 'message', name: 'How are you doing?', description: 'Check-in message' },
      ],
      status: 'active',
      clientsEnrolled: 8,
      completionRate: 92,
    },
  ]);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger':
        return <Settings className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'delay':
        return <Clock className="h-4 w-4" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'bg-blue-500';
      case 'message':
        return 'bg-green-500';
      case 'delay':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Message Flows</CardTitle>
              <CardDescription>
                Create multi-step automated message sequences for different scenarios
              </CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Flow
            </Button>
          </div>
        </CardHeader>
      </Card>

      {flows.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Message Flows Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first message flow to automate client communication sequences
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Flow
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {flows.map((flow) => (
            <Card key={flow.id} className="border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{flow.name}</CardTitle>
                      <Badge variant={flow.status === 'active' ? 'default' : 'secondary'}>
                        {flow.status}
                      </Badge>
                    </div>
                    <CardDescription>{flow.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Users className="h-4 w-4 mr-1" />
                      {flow.clientsEnrolled} clients enrolled
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {flow.completionRate}% completion rate
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {flow.steps.map((step, index) => (
                      <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center min-w-[120px]">
                          <div className={`w-10 h-10 rounded-full ${getStepColor(step.type)} flex items-center justify-center text-white mb-2`}>
                            {getStepIcon(step.type)}
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-medium">{step.name}</p>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                        {index < flow.steps.length - 1 && (
                          <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{flow.steps.length} steps</span>
                      <span>•</span>
                      <span>
                        {flow.steps.filter(s => s.type === 'message').length} messages
                      </span>
                      <span>•</span>
                      <span>
                        {flow.steps
                          .filter(s => s.type === 'delay')
                          .reduce((total, step) => {
                            const days = parseInt(step.name.split(' ')[0]);
                            return total + (isNaN(days) ? 0 : days);
                          }, 0)}{' '}
                        days total duration
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        Edit Flow
                      </Button>
                      <Button variant="outline" size="sm">
                        View Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}