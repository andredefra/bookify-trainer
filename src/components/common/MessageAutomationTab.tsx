
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Bot, 
  Plus, 
  Settings, 
  Send, 
  Eye, 
  Edit, 
  Trash,
  Play,
  Pause,
  BarChart3,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useMessageAutomation } from "@/hooks/useMessageAutomation";
import { useLanguage } from "@/context/LanguageContext";
import { useTrainerPlan } from "@/context/TrainerPlanContext";
import { toast } from "sonner";

export function MessageAutomationTab() {
  const { t } = useLanguage();
  const {
    templates,
    rules,
    loading,
    createTemplate,
    createRule,
    toggleRuleStatus,
    sendTestMessage,
    getMessageAnalytics
  } = useMessageAutomation();

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    template_type: "package_expiring" as const,
    subject: "",
    message: ""
  });

  const [newRule, setNewRule] = useState({
    template_id: "",
    trigger_type: "package_expiry" as const,
    days_before_trigger: 7,
    target_type: "packages" as const
  });

  const analytics = getMessageAnalytics();

  const handleCreateTemplate = async () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.message) {
      toast.error(t('messageAutomation.toast.requiredFields'));
      return;
    }

    try {
      await createTemplate(newTemplate);
      setNewTemplate({
        name: "",
        template_type: "package_expiring",
        subject: "",
        message: ""
      });
      toast.success(t('messageAutomation.toast.templateCreated'));
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleCreateRule = async () => {
    if (!newRule.template_id) {
      toast.error(t('messageAutomation.toast.selectTemplate'));
      return;
    }

    try {
      await createRule(newRule);
      setNewRule({
        template_id: "",
        trigger_type: "package_expiry",
        days_before_trigger: 7,
        target_type: "packages"
      });
      toast.success(t('messageAutomation.toast.ruleCreated'));
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  if (loading) {
    return <div className="p-4">{t('messageAutomation.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      {/* KPI Specifici per Automazione */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('messageAutomation.activeTemplates')}</p>
                <p className="text-2xl font-bold">{templates.filter(t => t.is_active).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('messageAutomation.activeRules')}</p>
                <p className="text-2xl font-bold">{rules.filter(r => r.is_active).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('messageAutomation.messagesSent')}</p>
                <p className="text-2xl font-bold">{analytics.totalSent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">{t('messageAutomation.successRate')}</p>
                <p className="text-2xl font-bold">{Math.round(analytics.successRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">{t('messageAutomation.templatesTab')}</TabsTrigger>
          <TabsTrigger value="rules">{t('messageAutomation.rulesTab')}</TabsTrigger>
          <TabsTrigger value="analytics">{t('messageAutomation.analyticsTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('messageAutomation.templates.title')}</CardTitle>
              <CardDescription>{t('messageAutomation.templates.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nuovo Template Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-name">{t('messageAutomation.templates.name')}</Label>
                    <Input
                      id="template-name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate(prev => ({...prev, name: e.target.value}))}
                      placeholder={t('messageAutomation.templates.namePlaceholder')}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="template-type">{t('messageAutomation.templates.type')}</Label>
                    <Select
                      value={newTemplate.template_type}
                      onValueChange={(value: any) => setNewTemplate(prev => ({...prev, template_type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="package_expiring">{t('messageAutomation.types.packageExpiring')}</SelectItem>
                        <SelectItem value="package_expired">{t('messageAutomation.types.packageExpired')}</SelectItem>
                        <SelectItem value="session_reminder">{t('messageAutomation.types.sessionReminder')}</SelectItem>
                        <SelectItem value="program_ending">{t('messageAutomation.types.programEnding')}</SelectItem>
                        <SelectItem value="welcome">{t('messageAutomation.types.welcome')}</SelectItem>
                        <SelectItem value="custom">{t('messageAutomation.types.custom')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="template-subject">{t('messageAutomation.templates.subject')}</Label>
                    <Input
                      id="template-subject"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate(prev => ({...prev, subject: e.target.value}))}
                      placeholder={t('messageAutomation.templates.subjectPlaceholder')}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="template-message">{t('messageAutomation.templates.message')}</Label>
                    <Textarea
                      id="template-message"
                      value={newTemplate.message}
                      onChange={(e) => setNewTemplate(prev => ({...prev, message: e.target.value}))}
                      placeholder={t('messageAutomation.templates.messagePlaceholder')}
                      rows={6}
                    />
                  </div>
                  
                  <Button onClick={handleCreateTemplate} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('messageAutomation.templates.create')}
                  </Button>
                </div>
              </div>

              {/* Lista Templates */}
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <Badge variant={template.is_active ? "default" : "secondary"}>
                          {template.is_active ? t('messageAutomation.status.active') : t('messageAutomation.status.inactive')}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {template.template_type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>{t('messageAutomation.templates.subject')}:</strong> {template.subject}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {template.message.length > 100 
                        ? `${template.message.substring(0, 100)}...` 
                        : template.message
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('messageAutomation.rules.title')}</CardTitle>
              <CardDescription>{t('messageAutomation.rules.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Nuova Regola Form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="rule-template">{t('messageAutomation.rules.template')}</Label>
                  <Select
                    value={newRule.template_id}
                    onValueChange={(value) => setNewRule(prev => ({...prev, template_id: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('messageAutomation.rules.selectTemplate')} />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.filter(t => t.is_active).map(template => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rule-trigger">{t('messageAutomation.rules.trigger')}</Label>
                  <Select
                    value={newRule.trigger_type}
                    onValueChange={(value: any) => setNewRule(prev => ({...prev, trigger_type: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="package_expiry">{t('messageAutomation.triggers.packageExpiry')}</SelectItem>
                      <SelectItem value="session_upcoming">{t('messageAutomation.triggers.sessionUpcoming')}</SelectItem>
                      <SelectItem value="program_ending">{t('messageAutomation.triggers.programEnding')}</SelectItem>
                      <SelectItem value="welcome">{t('messageAutomation.triggers.welcome')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rule-days">{t('messageAutomation.rules.daysBefore')}</Label>
                  <Input
                    id="rule-days"
                    type="number"
                    value={newRule.days_before_trigger}
                    onChange={(e) => setNewRule(prev => ({...prev, days_before_trigger: parseInt(e.target.value) || 0}))}
                    min="0"
                    max="30"
                  />
                </div>

                <div className="flex items-end">
                  <Button onClick={handleCreateRule} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('messageAutomation.rules.create')}
                  </Button>
                </div>
              </div>

              {/* Lista Regole */}
              <div className="space-y-4">
                {rules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{rule.template?.name}</h3>
                        <Badge variant={rule.is_active ? "default" : "secondary"}>
                          {rule.is_active ? t('messageAutomation.status.active') : t('messageAutomation.status.inactive')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('messageAutomation.rules.trigger')}: {rule.trigger_type} • {rule.days_before_trigger} {t('messageAutomation.rules.daysBefore').toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.is_active}
                        onCheckedChange={(checked) => toggleRuleStatus(rule.id, checked)}
                      />
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('messageAutomation.analytics.title')}</CardTitle>
              <CardDescription>{t('messageAutomation.analytics.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{analytics.totalSent}</div>
                  <p className="text-sm text-muted-foreground">{t('messageAutomation.analytics.totalSent')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{analytics.totalScheduled}</div>
                  <p className="text-sm text-muted-foreground">{t('messageAutomation.analytics.scheduled')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{analytics.totalFailed}</div>
                  <p className="text-sm text-muted-foreground">{t('messageAutomation.analytics.failed')}</p>
                </div>
              </div>
              
              {analytics.total > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{t('messageAutomation.analytics.successRateLabel')}</span>
                    <span>{Math.round(analytics.successRate)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${analytics.successRate}%`}}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
