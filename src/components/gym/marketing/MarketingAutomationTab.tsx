import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Settings, BarChart3, Play, Pause, Edit, TestTube, Plus, MessageSquare } from "lucide-react";
import { useMarketingAutomation } from '@/hooks/gym/useMarketingAutomation';
import { EmailTemplateEditor } from './EmailTemplateEditor';
import { AutomationRulesPanel } from './AutomationRulesPanel';
import { EmailAnalytics } from './EmailAnalytics';

export function MarketingAutomationTab() {
  const {
    templates,
    rules,
    campaigns,
    loading,
    error,
    toggleRuleStatus,
    sendTestEmail,
    initializeDefaultTemplates,
    getEmailAnalytics
  } = useMarketingAutomation();

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  const analytics = getEmailAnalytics();

  const getTemplateTypeColor = (type: string) => {
    const colors = {
      welcome: 'bg-green-100 text-green-800',
      expiring_soon: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-red-100 text-red-800',
      renewal_discount: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTemplateTypeLabel = (type: string) => {
    const labels = {
      welcome: 'Welcome',
      expiring_soon: 'Expiring Soon',
      expired: 'Expired',
      renewal_discount: 'Renewal Discount'
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading marketing automation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading marketing automation</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Marketing Automation</h1>
        </div>
        <div className="flex gap-2">
          {templates.length === 0 && (
            <Button onClick={initializeDefaultTemplates} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Initialize Templates
            </Button>
          )}
          <Button onClick={() => setRulesOpen(true)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Automation Rules
          </Button>
          <Button onClick={() => setEditorOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalSent}</div>
            <p className="text-xs text-muted-foreground">emails sent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.openRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">opened emails</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.clickRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">clicked emails</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rules.filter(r => r.is_active).length}</div>
            <p className="text-xs text-muted-foreground">automation rules</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Manage your automated email templates for different customer touchpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {templates.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No email templates created yet</p>
                  <Button onClick={initializeDefaultTemplates}>
                    <Plus className="w-4 h-4 mr-2" />
                    Initialize Default Templates
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {templates.map((template) => (
                    <Card key={template.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <div className="flex gap-2 mt-2">
                              <Badge className={getTemplateTypeColor(template.template_type)}>
                                {getTemplateTypeLabel(template.template_type)}
                              </Badge>
                              {!template.is_active && (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.subject}
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setSelectedTemplate(template.id);
                              setEditorOpen(true);
                            }}
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => sendTestEmail(template.id, 'test@example.com')}
                          >
                            <TestTube className="w-3 h-3" />
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
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>
                Configure when and how your email templates are automatically sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              {rules.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No automation rules configured</p>
                  <Button onClick={() => setRulesOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Rule
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {rules.map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                {rule.template?.name || 'Template Not Found'}
                              </h4>
                              <Badge className={getTemplateTypeColor(rule.trigger_type)}>
                                {getTemplateTypeLabel(rule.trigger_type)}
                              </Badge>
                              <Badge variant={rule.is_active ? "default" : "secondary"}>
                                {rule.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Trigger: {rule.trigger_type === 'package_expiry' 
                                ? `${rule.days_before_expiry} days before expiry`
                                : rule.trigger_type}
                            </p>
                            {rule.discount_percentage > 0 && (
                              <p className="text-sm text-muted-foreground">
                                Discount: {rule.discount_percentage}% (valid {rule.discount_valid_days} days)
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleRuleStatus(rule.id, !rule.is_active)}
                            >
                              {rule.is_active ? (
                                <Pause className="w-3 h-3" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
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

        <TabsContent value="analytics" className="space-y-4">
          <EmailAnalytics campaigns={campaigns} />
        </TabsContent>
      </Tabs>

      {/* Email Template Editor Dialog */}
      <EmailTemplateEditor
        open={editorOpen}
        onOpenChange={setEditorOpen}
        templateId={selectedTemplate}
        onClose={() => {
          setSelectedTemplate(null);
          setEditorOpen(false);
        }}
      />

      {/* Automation Rules Dialog */}
      <AutomationRulesPanel
        open={rulesOpen}
        onOpenChange={setRulesOpen}
        templates={templates}
      />
    </div>
  );
}