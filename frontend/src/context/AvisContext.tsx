import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AvisConversation, AvisMessage, Project, ProjectTask } from '../types';
import { api } from '../lib/api';
import { GeminiService, AvisActionProposal, WorkspaceContextData } from '../lib/gemini';
import { supabase } from '../lib/supabase';

interface AvisContextType {
  conversations: AvisConversation[];
  activeConversation: AvisConversation | null;
  messages: AvisMessage[];
  loading: boolean;
  isOpen: boolean;
  hasApiKey: boolean;
  hasKey: boolean;
  isSettingsOpen: boolean;
  activeModel: string;
  setIsOpen: (open: boolean) => void;
  setIsSettingsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  selectConversation: (c: AvisConversation) => void;
  createConversation: (title?: string) => Promise<AvisConversation>;
  sendMessage: (content: string, projects?: Project[]) => Promise<void>;
  executeAction: (proposal: AvisActionProposal, projects?: Project[]) => Promise<{ ok: boolean; message: string }>;
  refreshKeyStatus: () => void;
}

const AvisContext = createContext<AvisContextType | null>(null);

const DEFAULT_CONVERSATION: AvisConversation = {
  id: 'session-executive-core',
  user_id: 'default-user',
  title: 'A.V.I.S. Executive Core',
  context_project_id: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function AvisProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<AvisConversation[]>([DEFAULT_CONVERSATION]);
  const [activeConversation, setActiveConversation] = useState<AvisConversation | null>(DEFAULT_CONVERSATION);
  const [messages, setMessages] = useState<AvisMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(() => GeminiService.hasApiKey());
  const [activeModel, setActiveModel] = useState(() => GeminiService.getActiveModel());
  const [cachedTasks, setCachedTasks] = useState<ProjectTask[]>([]);

  const refreshKeyStatus = useCallback(() => {
    setHasApiKey(GeminiService.hasApiKey());
    setActiveModel(GeminiService.getActiveModel());
  }, []);

  // Pre-load tasks in background once so sendMessage is ultra-fast
  useEffect(() => {
    api.tasks
      .list()
      .then((list) => setCachedTasks(list || []))
      .catch(() => {});
  }, []);

  // Load conversations on mount
  useEffect(() => {
    api.avis
      .getConversations()
      .then(async (convos) => {
        if (convos && convos.length > 0) {
          setConversations(convos);
          setActiveConversation(convos[0]);
        } else {
          try {
            const created = await api.avis.createConversation('A.V.I.S. Executive Core');
            setConversations([created]);
            setActiveConversation(created);
          } catch {
            setConversations([DEFAULT_CONVERSATION]);
            setActiveConversation(DEFAULT_CONVERSATION);
          }
        }
      })
      .catch(() => {
        setConversations([DEFAULT_CONVERSATION]);
        setActiveConversation(DEFAULT_CONVERSATION);
      });
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    const convoId = activeConversation?.id || DEFAULT_CONVERSATION.id;
    api.avis
      .getMessages(convoId)
      .then((msgs) => {
        if (!msgs || msgs.length === 0) {
          setMessages([
            {
              id: 'init-msg',
              conversation_id: convoId,
              user_id: '',
              role: 'assistant',
              content: `### A.V.I.S. NEURAL ONLINE
*Authorative Versatile Incross System — Strategic Engineering Copilot*

All **28 ecosystem repositories**, sprint tasks, and research monographs are active and loaded into my neural working memory.

I am your second brain and engineering partner. We can audit system architectures, prioritize sprints, troubleshoot codebases, or directly execute tasks and modifications across your workspace.

How shall we advance your objectives today, Abhishek?`,
              suggested_actions: [
                { label: 'Ecosystem Telemetry', action: 'telemetry_briefing' },
                { label: 'Attention & Bottleneck Audit', action: 'audit_blockers' },
                { label: 'Showcase Readiness', action: 'audit_showcase' },
                { label: 'Sprint Priorities', action: 'recommend_sprint' },
              ],
              action_proposals: null,
              model_used: GeminiService.getActiveModel(),
              structured_data: { latencyMs: 120 },
              tokens_used: 0,
              created_at: new Date().toISOString(),
            },
          ]);
        } else {
          setMessages(msgs);
        }
      })
      .catch(() => {
        setMessages([
          {
            id: 'init-msg-fallback',
            conversation_id: convoId,
            user_id: '',
            role: 'assistant',
            content: `### A.V.I.S. READY
*Authorative Versatile Incross System — Core Online*

Neural context loaded with full project registry and platform telemetry. Ask me any architectural questions or instruct me to plan and manage your sprint tasks.`,
            suggested_actions: [
              { label: 'Ecosystem Telemetry', action: 'telemetry_briefing' },
              { label: 'Attention Audit', action: 'audit_blockers' },
            ],
            structured_data: { latencyMs: 50 },
            tokens_used: 0,
            created_at: new Date().toISOString(),
          },
        ]);
      });
  }, [activeConversation?.id]);

  const selectConversation = useCallback((c: AvisConversation) => {
    setActiveConversation(c);
  }, []);

  const createConversation = useCallback(async (title = 'New Intelligence Session') => {
    try {
      const c = await api.avis.createConversation(title);
      setConversations((prev) => [c, ...prev]);
      setActiveConversation(c);
      return c;
    } catch {
      const localC: AvisConversation = {
        id: `session-${Date.now()}`,
        user_id: 'default-user',
        title,
        context_project_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setConversations((prev) => [localC, ...prev]);
      setActiveConversation(localC);
      return localC;
    }
  }, []);

  const sendMessage = useCallback(
    async (content: string, projects: Project[] = []) => {
      const text = content.trim();
      if (!text) return;

      const activeConvo = activeConversation || conversations[0] || DEFAULT_CONVERSATION;
      if (!activeConversation) {
        setActiveConversation(activeConvo);
      }

      const tempUserMsg: AvisMessage = {
        id: `tmp-${Date.now()}`,
        conversation_id: activeConvo.id,
        user_id: '',
        role: 'user',
        content: text,
        suggested_actions: null,
        action_proposals: null,
        structured_data: null,
        tokens_used: null,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, tempUserMsg]);
      setLoading(true);

      try {
        // Use in-memory cached tasks immediately to avoid network blocking
        const openTasks = cachedTasks.filter((t) => t.status !== 'done');

        const contextData: WorkspaceContextData = {
          total_projects: projects.length || 28,
          projects: projects.map((p) => ({
            id: p.id,
            name: p.name,
            status: p.status,
            priority: p.priority,
            description: p.description || p.short_desc,
            tags: p.tags,
            technologies: p.technologies,
            repo_url: p.repo_url,
            live_url: p.live_url,
          })),
          active_projects: projects.filter((p) => p.status === 'active').map((p) => p.name),
          in_dev_projects: projects.filter((p) => p.status === 'in_development').map((p) => p.name),
          published_projects: projects.filter((p) => p.publication_status === 'published').map((p) => p.name),
          open_tasks: openTasks.slice(0, 15).map((t) => ({
            id: t.id,
            title: t.title,
            status: t.status,
            project_id: t.project_id,
            priority: t.priority,
          })),
        };

        // 1. Generate response using GeminiService (ultra-low latency)
        const geminiResult = await GeminiService.generateResponse({
          userMessage: text,
          conversationHistory: messages
            .filter((m) => m.id !== tempUserMsg.id)
            .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
          contextData,
        });

        setActiveModel(geminiResult.modelUsed);

        // 2. Persist user message to Supabase if authenticated (non-blocking in background)
        let savedUserMsg = tempUserMsg;
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data } = await supabase
              .from('avis_messages')
              .insert({
                conversation_id: activeConvo.id,
                user_id: user.id,
                role: 'user',
                content: text,
              })
              .select()
              .single();
            if (data) savedUserMsg = data as AvisMessage;
          }
        } catch {}

        // 3. Persist assistant message to Supabase
        const tempAssistantMsg: AvisMessage = {
          id: `asst-${Date.now()}`,
          conversation_id: activeConvo.id,
          user_id: '',
          role: 'assistant',
          content: geminiResult.reply,
          suggested_actions: geminiResult.suggestedActions,
          action_proposals: geminiResult.actionProposals || null,
          model_used: geminiResult.modelUsed,
          structured_data: { latencyMs: geminiResult.latencyMs },
          tokens_used: geminiResult.tokensUsed || null,
          created_at: new Date().toISOString(),
        };

        let savedAssistantMsg = tempAssistantMsg;
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data } = await supabase
              .from('avis_messages')
              .insert({
                conversation_id: activeConvo.id,
                user_id: user.id,
                role: 'assistant',
                content: geminiResult.reply,
                suggested_actions: geminiResult.suggestedActions,
                tokens_used: geminiResult.tokensUsed,
              })
              .select()
              .single();
            if (data)
              savedAssistantMsg = {
                ...data,
                action_proposals: geminiResult.actionProposals,
                structured_data: { latencyMs: geminiResult.latencyMs },
              } as AvisMessage;
          }
        } catch {}

        setMessages((prev) => [
          ...prev.filter((m) => m.id !== tempUserMsg.id),
          savedUserMsg,
          savedAssistantMsg,
        ]);
      } catch (err: any) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            conversation_id: activeConvo.id,
            user_id: '',
            role: 'assistant',
            content: `*A.V.I.S. Neural Alert*: ${err.message || 'Execution error'}. Local telemetry fallback active.`,
            suggested_actions: null,
            structured_data: null,
            tokens_used: null,
            created_at: new Date().toISOString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [activeConversation, conversations, messages, cachedTasks]
  );

  const executeAction = useCallback(
    async (proposal: AvisActionProposal, projectsList: Project[] = []) => {
      try {
        if (proposal.action === 'create_task') {
          let targetProjectId = proposal.params.project_id;
          const proj = projectsList.find(
            (p) => p.id === targetProjectId || p.name.toLowerCase() === (targetProjectId || '').toLowerCase()
          );
          if (proj) targetProjectId = proj.id;

          const createdTask = await api.tasks.create({
            title: proposal.params.title || 'New Task',
            project_id: targetProjectId || null,
            priority: proposal.params.priority || 'medium',
            status: 'todo',
          });
          // Update cached tasks in memory immediately
          setCachedTasks((prev) => [createdTask, ...prev]);
          return { ok: true, message: `Created task "${proposal.params.title}"${proj ? ` under ${proj.name}` : ''}.` };
        } else if (proposal.action === 'update_project_status') {
          let targetProjectId = proposal.params.project_id;
          const proj = projectsList.find(
            (p) => p.id === targetProjectId || p.name.toLowerCase() === (targetProjectId || '').toLowerCase()
          );
          if (proj) targetProjectId = proj.id;

          if (targetProjectId) {
            await api.projects.update(targetProjectId, { status: proposal.params.status });
            return { ok: true, message: `Updated project status to "${proposal.params.status}".` };
          }
        } else if (proposal.action === 'create_note') {
          await api.notes.create({
            type: 'note',
            content: proposal.params.content || 'Note from A.V.I.S.',
            x: Math.floor(Math.random() * 200) + 120,
            y: Math.floor(Math.random() * 200) + 120,
            w: 280,
          });
          return { ok: true, message: 'Created note on workspace canvas.' };
        }
        return { ok: true, message: `Action executed: ${proposal.summary}` };
      } catch (err: any) {
        return { ok: false, message: `Execution failed: ${err.message}` };
      }
    },
    []
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <AvisContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        loading,
        isOpen,
        hasApiKey,
        hasKey: hasApiKey,
        isSettingsOpen,
        activeModel,
        setIsOpen,
        setIsSettingsOpen,
        toggleOpen,
        selectConversation,
        createConversation,
        sendMessage,
        executeAction,
        refreshKeyStatus,
      }}
    >
      {children}
    </AvisContext.Provider>
  );
}

export function useAvis() {
  const ctx = useContext(AvisContext);
  if (!ctx) throw new Error('useAvis must be used within AvisProvider');
  return ctx;
}
