import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Plus, MessageCircle, Clock, Send, Settings, BarChart3 } from 'lucide-react';
import { useMessageAutomation, MessageTemplate, MessageAutomationRule } from '@/hooks/useMessageAutomation';
import { MessageTemplateDialog } from './automation/MessageTemplateDialog';
import { MessageRuleDialog } from './automation/MessageRuleDialog';
import { MessageFlowBuilder } from './automation/MessageFlowBuilder';

export function MessageAutomationTab() {
  const {
    templates,
    rules,
    messages,
    loading,
    toggleRuleStatus,
    initializeDefaultTemplates,
    getMessageAnalytics
  } = useMessageAutomation();

  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showRuleDialog, setShowRuleDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [editingRule, setEditingRule] = useState<MessageAutomationRule | null>(null);

  const analytics = getMessageAnalytics();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-500';
      case 'scheduled':
        return 'bg-blue-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTemplateTypeLabel = (type: string) => {
    switch (type) {
      case 'package_expiring':
        return 'Package Expiring';
      case 'package_expired':
        return 'Package Expired';
      case 'session_reminder':
        return 'Session Reminder';
      case 'program_ending':
        return 'Program Ending';
      case 'welcome':
        return 'Welcome';
      case 'custom':
        return 'Custom';
      default:
        return type;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{analytics.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Send className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Sent</p>
                <p className="text-2xl font-bold">{analytics.totalSent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{analytics.totalScheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{analytics.successRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="flows">Message Flows</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Message Templates</CardTitle>
                  <CardDescription>
                    Create and manage reusable message templates for different scenarios
                  </CardDescription>
                </div>
                <div className="space-x-2">
                  {templates.length === 0 && (
                    <Button
                      variant="outline"
                      onClick={initializeDefaultTemplates}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Initialize Templates
                    </Button>
                  )}
                  <Button onClick={() => setShowTemplateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {templates.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Templates Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first message template or initialize default templates to get started
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {templates.map((template) => (
                    <Card key={template.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant="outline">
                                {getTemplateTypeLabel(template.template_type)}
                              </Badge>
                              <Badge variant={template.is_active ? "default" : "secondary"}>
                                {template.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>Subject:</strong> {template.subject}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {template.message}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingTemplate(template);
                              setShowTemplateDialog(true);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>
                    Set up automatic message triggers based on events and schedules
                  </CardDescription>
                </div>
                <Button
                  onClick={() => setShowRuleDialog(true)}
                  disabled={templates.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Rule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {rules.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Rules Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create automation rules to send messages automatically based on triggers
                  </p>
                  {templates.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      You need to create templates first before setting up rules
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">
                                {rule.template?.name || 'Template not found'}
                              </h4>
                              <Badge variant="outline">
                                {rule.trigger_type.replace('_', ' ')}
                              </Badge>
                              <Badge variant="secondary">
                                {rule.target_type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Triggers {rule.days_before_trigger} days before event for {rule.target_type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={rule.is_active}
                              onCheckedChange={(checked) => toggleRuleStatus(rule.id, checked)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditingRule(rule);
                                setShowRuleDialog(true);
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flows" className="space-y-4">
          <MessageFlowBuilder />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message History</CardTitle>
              <CardDescription>
                View all automated messages sent to your clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <Send className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Messages Yet</h3>
                  <p className="text-muted-foreground">
                    Automated messages will appear here once they are sent
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{message.recipient_name}</h4>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(message.status)}`} />
                              <Badge variant="outline">{message.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              <strong>Subject:</strong> {message.subject}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              <strong>To:</strong> {message.recipient_email}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {message.status === 'sent' && message.sent_at
                                ? `Sent: ${new Date(message.sent_at).toLocaleString()}`
                                : `Scheduled: ${new Date(message.scheduled_for).toLocaleString()}`}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <MessageTemplateDialog
        open={showTemplateDialog}
        onOpenChange={setShowTemplateDialog}
        template={editingTemplate}
        onClose={() => {
          setEditingTemplate(null);
          setShowTemplateDialog(false);
        }}
      />

      <MessageRuleDialog
        open={showRuleDialog}
        onOpenChange={setShowRuleDialog}
        rule={editingRule}
        templates={templates}
        onClose={() => {
          setEditingRule(null);
          setShowRuleDialog(false);
        }}
      />
    </div>
  );
}