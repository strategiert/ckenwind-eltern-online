import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Play,
  Plus,
  Trash2,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Zap,
  BarChart3,
  ListTodo,
  Lightbulb,
  Link2,
  Sparkles
} from 'lucide-react';
import contentAutomationService, {
  QueueItem,
  TopicSuggestion,
  WikiCategory,
  ContentStats
} from '@/services/contentAutomationService';

export default function ContentAutomationAdmin() {
  const queryClient = useQueryClient();
  const [newTopic, setNewTopic] = useState('');
  const [newCategory, setNewCategory] = useState<string>('');
  const [contentType, setContentType] = useState<'glossary' | 'blog'>('glossary');

  // Queries
  const { data: queueItems = [], isLoading: queueLoading } = useQuery({
    queryKey: ['content-queue'],
    queryFn: () => contentAutomationService.getQueueItems(),
    refetchInterval: 10000
  });

  const { data: suggestions = [], isLoading: suggestionsLoading } = useQuery({
    queryKey: ['topic-suggestions'],
    queryFn: () => contentAutomationService.getTopicSuggestions({ unused: true, limit: 50 })
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['wiki-categories'],
    queryFn: () => contentAutomationService.getCategories()
  });

  const { data: stats } = useQuery({
    queryKey: ['content-stats'],
    queryFn: () => contentAutomationService.getStats(7),
    refetchInterval: 30000
  });

  // Mutations
  const addToQueueMutation = useMutation({
    mutationFn: (data: { topic: string; content_type: 'glossary' | 'blog'; category?: string }) =>
      contentAutomationService.addToQueue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      setNewTopic('');
      toast.success('Topic zur Queue hinzugefügt');
    },
    onError: (error: any) => {
      toast.error(`Fehler: ${error.message}`);
    }
  });

  const deleteQueueItemMutation = useMutation({
    mutationFn: (id: string) => contentAutomationService.deleteQueueItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      toast.success('Item gelöscht');
    }
  });

  const retryFailedMutation = useMutation({
    mutationFn: () => contentAutomationService.retryFailed(),
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      toast.success(`${count} Items zum Wiederholen markiert`);
    }
  });

  const triggerSchedulerMutation = useMutation({
    mutationFn: () => contentAutomationService.triggerScheduler({ itemsPerRun: 3 }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      queryClient.invalidateQueries({ queryKey: ['content-stats'] });
      toast.success(`Scheduler ausgeführt: ${result.result?.steps?.length || 0} Schritte`);
    },
    onError: (error: any) => {
      toast.error(`Fehler: ${error.message}`);
    }
  });

  const generateSuggestionsMutation = useMutation({
    mutationFn: () => contentAutomationService.generateTopicSuggestions({ count: 15 }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['topic-suggestions'] });
      toast.success(`${result.result?.added || 0} neue Vorschläge generiert`);
    }
  });

  const gapAnalysisMutation = useMutation({
    mutationFn: () => contentAutomationService.performGapAnalysis(),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['topic-suggestions'] });
      toast.success(`Gap-Analyse: ${result.result?.suggestions?.length || 0} Lücken gefunden`);
    }
  });

  const addSuggestionToQueueMutation = useMutation({
    mutationFn: (id: string) => contentAutomationService.addSuggestionToQueue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      queryClient.invalidateQueries({ queryKey: ['topic-suggestions'] });
      toast.success('Zur Queue hinzugefügt');
    }
  });

  const linkTermsMutation = useMutation({
    mutationFn: () => contentAutomationService.linkAllTerms(),
    onSuccess: (result) => {
      toast.success(`${result.result?.linked || 0} Verlinkungen erstellt`);
    }
  });

  const generateSingleMutation = useMutation({
    mutationFn: (data: { topic: string; contentType: 'glossary' | 'blog'; category?: string }) =>
      contentAutomationService.generateSingle(data.topic, data.contentType, data.category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content-queue'] });
      queryClient.invalidateQueries({ queryKey: ['content-stats'] });
      setNewTopic('');
      toast.success('Content generiert und veröffentlicht!');
    },
    onError: (error: any) => {
      toast.error(`Fehler: ${error.message}`);
    }
  });

  // Helpers
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: any }> = {
      pending: { variant: 'secondary', icon: Clock },
      processing: { variant: 'default', icon: Loader2 },
      completed: { variant: 'outline', icon: CheckCircle },
      failed: { variant: 'destructive', icon: XCircle },
      review: { variant: 'secondary', icon: Clock }
    };
    const { variant, icon: Icon } = variants[status] || variants.pending;
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className={`h-3 w-3 ${status === 'processing' ? 'animate-spin' : ''}`} />
        {status}
      </Badge>
    );
  };

  const pendingCount = queueItems.filter(i => i.status === 'pending').length;
  const processingCount = queueItems.filter(i => i.status === 'processing').length;
  const failedCount = queueItems.filter(i => i.status === 'failed').length;

  return (
    <AdminLayout title="Content Automation">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-amber-500" />
              Content Automation
            </h1>
            <p className="text-muted-foreground mt-2">Automatische Wiki-Content-Generierung</p>
          </div>
          <Button
            onClick={() => triggerSchedulerMutation.mutate()}
            disabled={triggerSchedulerMutation.isPending}
          >
            {triggerSchedulerMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            Scheduler starten
          </Button>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{pendingCount}</span>
              <span className="text-sm text-muted-foreground">pending</span>
            </div>
            {processingCount > 0 && (
              <p className="text-sm text-blue-500 mt-1">{processingCount} in Bearbeitung</p>
            )}
            {failedCount > 0 && (
              <p className="text-sm text-red-500 mt-1">{failedCount} fehlgeschlagen</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vorschläge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{suggestions.length}</span>
              <span className="text-sm text-muted-foreground">ungenutzt</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">7 Tage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stats?.successful || 0}</span>
              <span className="text-sm text-muted-foreground">generiert</span>
            </div>
            {stats?.failed ? (
              <p className="text-sm text-red-500 mt-1">{stats.failed} Fehler</p>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">
                {((stats?.total_tokens || 0) / 1000).toFixed(1)}k
              </span>
              <span className="text-sm text-muted-foreground">verbraucht</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="queue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="queue" className="gap-2">
            <ListTodo className="h-4 w-4" /> Queue
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="gap-2">
            <Lightbulb className="h-4 w-4" /> Vorschläge
          </TabsTrigger>
          <TabsTrigger value="generate" className="gap-2">
            <Zap className="h-4 w-4" /> Generieren
          </TabsTrigger>
          <TabsTrigger value="tools" className="gap-2">
            <BarChart3 className="h-4 w-4" /> Tools
          </TabsTrigger>
        </TabsList>

        {/* Queue Tab */}
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Content Queue</CardTitle>
                  <CardDescription>Geplante Content-Generierungen</CardDescription>
                </div>
                {failedCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => retryFailedMutation.mutate()}
                    disabled={retryFailedMutation.isPending}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Fehlgeschlagene wiederholen
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {queueLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : queueItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Queue ist leer</p>
              ) : (
                <div className="space-y-2">
                  {queueItems.slice(0, 20).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusBadge(item.status)}
                        <div>
                          <p className="font-medium">{item.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.content_type} • Priorität: {item.priority}
                            {item.category && ` • ${item.category}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.error_message && (
                          <span className="text-sm text-red-500 max-w-xs truncate" title={item.error_message}>
                            {item.error_message}
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteQueueItemMutation.mutate(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Topic-Vorschläge</CardTitle>
                  <CardDescription>KI-generierte Themenvorschläge</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => gapAnalysisMutation.mutate()}
                    disabled={gapAnalysisMutation.isPending}
                  >
                    {gapAnalysisMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <BarChart3 className="h-4 w-4 mr-2" />
                    )}
                    Gap-Analyse
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => generateSuggestionsMutation.mutate()}
                    disabled={generateSuggestionsMutation.isPending}
                  >
                    {generateSuggestionsMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4 mr-2" />
                    )}
                    Neue generieren
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {suggestionsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : suggestions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Keine Vorschläge vorhanden</p>
              ) : (
                <div className="space-y-2">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{suggestion.topic}</p>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.category && `${suggestion.category} • `}
                          Relevanz: {((suggestion.relevance_score || 0) * 100).toFixed(0)}%
                          {` • ${suggestion.source}`}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addSuggestionToQueueMutation.mutate(suggestion.id)}
                        disabled={addSuggestionToQueueMutation.isPending}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Zur Queue
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate Tab */}
        <TabsContent value="generate">
          <Card>
            <CardHeader>
              <CardTitle>Manuell generieren</CardTitle>
              <CardDescription>Einzelnen Begriff oder Artikel sofort generieren</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Begriff oder Thema eingeben..."
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                  />
                </div>
                <Select value={contentType} onValueChange={(v) => setContentType(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="glossary">Glossar</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Keine</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => addToQueueMutation.mutate({
                    topic: newTopic,
                    content_type: contentType,
                    category: newCategory || undefined
                  })}
                  disabled={!newTopic || addToQueueMutation.isPending}
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Zur Queue
                </Button>
                <Button
                  onClick={() => generateSingleMutation.mutate({
                    topic: newTopic,
                    contentType,
                    category: newCategory || undefined
                  })}
                  disabled={!newTopic || generateSingleMutation.isPending}
                >
                  {generateSingleMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4 mr-2" />
                  )}
                  Sofort generieren
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tools Tab */}
        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Verlinkung</CardTitle>
                <CardDescription>Automatische interne Verlinkung</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => linkTermsMutation.mutate()}
                  disabled={linkTermsMutation.isPending}
                  className="w-full"
                >
                  {linkTermsMutation.isPending ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Link2 className="h-4 w-4 mr-2" />
                  )}
                  Alle Begriffe verlinken
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Verknüpft automatisch verwandte Glossar-Begriffe basierend auf gemeinsamen Tags.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistiken</CardTitle>
                <CardDescription>Letzte 7 Tage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Generiert:</span>
                    <span className="font-medium">{stats?.total_generated || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Erfolgreich:</span>
                    <span className="font-medium text-green-600">{stats?.successful || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fehlgeschlagen:</span>
                    <span className="font-medium text-red-600">{stats?.failed || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Glossar-Einträge:</span>
                    <span className="font-medium">{stats?.glossary_count || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Blog-Artikel:</span>
                    <span className="font-medium">{stats?.blog_count || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ø Dauer:</span>
                    <span className="font-medium">{((stats?.avg_duration_ms || 0) / 1000).toFixed(1)}s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
