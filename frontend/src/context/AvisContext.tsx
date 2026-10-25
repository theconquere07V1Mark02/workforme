import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AvisConversation, AvisMessage, Project } from '../types';
import { api } from '../lib/api';

interface AvisContextType {
  conversations: AvisConversation[];
  activeConversation: AvisConversation | null;
  messages: AvisMessage[];
  loading: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleOpen: () => void;
  selectConversation: (c: AvisConversation) => void;
  createConversation: (title?: string) => Promise<AvisConversation>;
  sendMessage: (content: string, projects?: Project[]) => Promise<void>;
}

const AvisContext = createContext<AvisContextType | null>(null);

export function AvisProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<AvisConversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<AvisConversation | null>(null);
  const [messages, setMessages] = useState<AvisMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load conversations on mount
  useEffect(() => {
    api.avis.getConversations().then(async (convos) => {
      setConversations(convos);
      if (convos.length > 0) {
        setActiveConversation(convos[0]);
      } else {
        const c = await api.avis.createConversation('A.V.I.S. Core Intelligence');
        setConversations([c]);
        setActiveConversation(c);
      }
    }).catch((err) => console.warn('Could not load A.V.I.S. conversations:', err));
  }, []);

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation?.id) {
      api.avis.getMessages(activeConversation.id).then((msgs) => {
        if (msgs.length === 0) {
          setMessages([
            {
              id: 'init-msg',
              conversation_id: activeConversation.id,
              user_id: '',
              role: 'assistant',
              content: `**A.V.I.S. OPERATIONAL**\n\n*Authorative Versatile Incross System v2.0*\n\nWorkspace telemetry active. I have indexed your projects, milestones, tasks, and work logs. How can I assist?`,
              suggested_actions: null,
              structured_data: null,
              tokens_used: 0,
              created_at: new Date().toISOString(),
            },
          ]);
        } else {
          setMessages(msgs);
        }
      }).catch((err) => console.warn('Could not load messages:', err));
    }
  }, [activeConversation?.id]);

  const selectConversation = useCallback((c: AvisConversation) => {
    setActiveConversation(c);
  }, []);

  const createConversation = useCallback(async (title = 'New Intelligence Session') => {
    const c = await api.avis.createConversation(title);
    setConversations((prev) => [c, ...prev]);
    setActiveConversation(c);
    return c;
  }, []);

  const sendMessage = useCallback(async (content: string, projects: Project[] = []) => {
    const text = content.trim();
    if (!text || !activeConversation) return;

    const tempUserMsg: AvisMessage = {
      id: `tmp-${Date.now()}`,
      conversation_id: activeConversation.id,
      user_id: '',
      role: 'user',
      content: text,
      suggested_actions: null,
      structured_data: null,
      tokens_used: null,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const res = await api.avis.sendMessage(activeConversation.id, text, {
        total_projects: projects.length,
        active_projects: projects.filter((p) => p.status === 'active').map((p) => p.name),
        in_dev_projects: projects.filter((p) => p.status === 'in_development').map((p) => p.name),
        published_projects: projects.filter((p) => p.publication_status === 'published').map((p) => p.name),
      });

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== tempUserMsg.id),
        res.userMessage,
        res.assistantMessage,
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          conversation_id: activeConversation.id,
          user_id: '',
          role: 'assistant',
          content: `*A.V.I.S. Telemetry Error*: ${err.message || 'Connection anomaly'}. Telemetry fallback active.`,
          suggested_actions: null,
          structured_data: null,
          tokens_used: null,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [activeConversation]);

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
        setIsOpen,
        toggleOpen,
        selectConversation,
        createConversation,
        sendMessage,
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
