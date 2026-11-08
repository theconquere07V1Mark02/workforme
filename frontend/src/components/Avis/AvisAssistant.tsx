import React, { useState, useEffect, useRef } from 'react';
import { Project, AvisMessage } from '../../types';
import { useAvis } from '../../context/AvisContext';
import { AvisActionProposal } from '../../lib/gemini';

interface AvisAssistantProps {
  projects: Project[];
  onNavigateTab: (tab: string) => void;
}

const QUICK_PROMPTS = [
  'Synthesize full ecosystem telemetry briefing',
  'Which projects are blocked or need architectural attention?',
  'Recommend sprint focus and priorities for this week',
  'Create a task for StarkForge CAD to build the 3D viewport',
  'Audit public showcase readiness and gaps',
  'Review system architecture for Sovereign OS',
];

// Clean Markdown & Content Formatter with Code Block Copying
function FormattedMessage({ content }: { content: string }) {
  const [copiedBlock, setCopiedBlock] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBlock(idx);
    setTimeout(() => setCopiedBlock(null), 2000);
  };

  // Split content by fenced code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', lineHeight: 1.7, color: '#f0f2fa' }}>
      {parts.map((part, pIdx) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          const hasLang = firstLine && !firstLine.includes(' ') && firstLine.length < 15;
          const lang = hasLang ? firstLine : '';
          const code = (hasLang ? lines.slice(1) : lines).join('\n');

          return (
            <div
              key={pIdx}
              style={{
                borderRadius: '6px',
                background: '#05070c',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
                margin: '6px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '10.5px',
                  fontFamily: "'Martian Mono', monospace",
                  color: 'var(--gold)',
                }}
              >
                <span>{lang ? lang.toUpperCase() : 'CODE'}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(code, pIdx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedBlock === pIdx ? '#22c55e' : 'var(--dim)',
                    cursor: 'pointer',
                    fontSize: '10px',
                  }}
                >
                  {copiedBlock === pIdx ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '12px 16px',
                  overflowX: 'auto',
                  fontFamily: "'Martian Mono', monospace",
                  fontSize: '12px',
                  color: '#e2e8f0',
                  lineHeight: 1.55,
                }}
              >
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render markdown lines (headings, lists, bold, blockquotes)
        const lines = part.split('\n');
        return (
          <div key={pIdx}>
            {lines.map((line, lIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lIdx} style={{ height: '8px' }} />;
              }

              // Heading 3: ### Heading
              if (trimmed.startsWith('### ')) {
                return (
                  <h3
                    key={lIdx}
                    style={{
                      font: '700 15px/1.3 "Space Grotesk", sans-serif',
                      color: 'var(--gold)',
                      margin: '12px 0 6px',
                      letterSpacing: '0.02em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: 'var(--gold)', fontSize: '11px' }}>◆</span>
                    <span>{trimmed.slice(4)}</span>
                  </h3>
                );
              }

              // Heading 2: ## Heading
              if (trimmed.startsWith('## ')) {
                return (
                  <h2
                    key={lIdx}
                    style={{
                      font: '700 17px/1.3 "Space Grotesk", sans-serif',
                      color: '#fff',
                      margin: '14px 0 8px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      paddingBottom: '4px',
                    }}
                  >
                    {trimmed.slice(3)}
                  </h2>
                );
              }

              // Bullet item: - item or * item
              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const bulletText = trimmed.slice(2);
                return (
                  <div key={lIdx} style={{ display: 'flex', gap: '8px', marginLeft: '8px', margin: '3px 0' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '13px', lineHeight: 1.6 }}>•</span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(bulletText) }} />
                  </div>
                );
              }

              // Numbered list: 1. item
              if (/^\d+\.\s/.test(trimmed)) {
                return (
                  <div key={lIdx} style={{ display: 'flex', gap: '8px', marginLeft: '8px', margin: '3px 0' }}>
                    <span style={{ color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", fontSize: '11px', marginTop: '2px' }}>
                      {trimmed.match(/^\d+\./)?.[0]}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace(/^\d+\.\s/, '')) }} />
                  </div>
                );
              }

              // Blockquote: > quote
              if (trimmed.startsWith('> ')) {
                return (
                  <blockquote
                    key={lIdx}
                    style={{
                      margin: '8px 0',
                      padding: '8px 14px',
                      borderLeft: '3px solid var(--gold)',
                      background: 'rgba(240, 180, 41, 0.05)',
                      borderRadius: '0 4px 4px 0',
                      color: '#cbd5e1',
                      fontSize: '12.5px',
                    }}
                    dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }}
                  />
                );
              }

              // Standard line
              return (
                <p
                  key={lIdx}
                  style={{ margin: '4px 0' }}
                  dangerouslySetInnerHTML={{ __html: formatInline(line) }}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

// Inline formatting helper for bold, italic, code
function formatInline(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#ffffff;font-weight:600;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em style="color:#cbd5e1;">$1</em>')
    .replace(/`([^`]+)`/g, '<code style="font-family:\'Martian Mono\', monospace; font-size:11px; background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:3px; color:var(--gold); border:1px solid rgba(255,255,255,0.1);">$1</code>');
}

export function AvisAssistant({ projects, onNavigateTab }: AvisAssistantProps) {
  const {
    conversations,
    activeConversation,
    selectConversation,
    createConversation,
    messages,
    loading,
    sendMessage,
    executeAction,
    hasKey,
    activeModel,
    setIsSettingsOpen,
  } = useAvis();

  const [input, setInput] = useState('');
  const [actionStatuses, setActionStatuses] = useState<Record<string, { status: 'idle' | 'executing' | 'done' | 'error'; message?: string }>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q || loading) return;
    setInput('');
    await sendMessage(q, projects);
  };

  const handleExecuteProposal = async (proposal: AvisActionProposal, msgId: string, idx: number) => {
    const key = `${msgId}-${idx}`;
    setActionStatuses((prev) => ({ ...prev, [key]: { status: 'executing' } }));

    const res = await executeAction(proposal, projects);
    if (res.ok) {
      setActionStatuses((prev) => ({ ...prev, [key]: { status: 'done', message: res.message } }));
    } else {
      setActionStatuses((prev) => ({ ...prev, [key]: { status: 'error', message: res.message } }));
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'which_project') {
      handleSend('Which project do you suggest we should work on next?');
      return;
    }
    if (action.includes('showcase')) onNavigateTab('showcase');
    else if (action.includes('project')) onNavigateTab('projects');
    else if (action.includes('task')) onNavigateTab('tasks');
    else if (action.includes('growth')) onNavigateTab('growth');
    else if (action.includes('storage')) onNavigateTab('storage');
    else if (action.includes('profile')) onNavigateTab('profile');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '270px 1fr',
        height: '100%',
        background: 'var(--bg)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Column 1: Conversations Sidebar */}
      <div
        style={{
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(7, 8, 14, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 8px var(--gold)',
                }}
              />
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.04em',
                }}
              >
                A.V.I.S. SESSIONS
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#7a8096', marginTop: '2px', fontFamily: "'Martian Mono', monospace" }}>
              Authorative Versatile Incross System
            </div>
          </div>

          <button
            onClick={() => createConversation(`A.V.I.S. Session ${conversations.length + 1}`)}
            style={{
              padding: '5px 9px',
              borderRadius: '4px',
              background: 'rgba(240, 180, 41, 0.1)',
              border: '1px solid rgba(240, 180, 41, 0.3)',
              color: 'var(--gold)',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Create new intelligence session"
          >
            + New
          </button>
        </div>

        {/* Sessions List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {conversations.map((c) => {
            const isActive = activeConversation?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => selectConversation(c)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '11px 13px',
                  borderRadius: '6px',
                  marginBottom: '6px',
                  background: isActive ? 'rgba(240, 180, 41, 0.12)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(240, 180, 41, 0.35)' : 'transparent'}`,
                  color: isActive ? '#fff' : '#9da2b4',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span style={{ color: isActive ? 'var(--gold)' : 'var(--dim)', fontSize: '11px' }}>
                  {isActive ? '●' : '○'}
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {c.title || 'Untitled Session'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Key & Model status footer */}
        <div
          style={{
            padding: '14px 18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: hasKey ? '#22c55e' : 'var(--gold)',
                boxShadow: hasKey ? '0 0 6px #22c55e' : '0 0 6px var(--gold)',
              }}
            />
            <span style={{ fontSize: '10px', color: '#9da2b4', fontFamily: "'Martian Mono', monospace" }}>
              {activeModel.toUpperCase()}
            </span>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--gold)',
              fontSize: '10.5px',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            {hasKey ? 'Key Config' : 'Set Key'}
          </button>
        </div>
      </div>

      {/* Column 2: Chat & Execution Workspace */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
        {/* Header Bar */}
        <div
          style={{
            padding: '16px 36px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(9, 11, 18, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(240, 180, 41, 0.2) 0%, rgba(226, 54, 54, 0.15) 100%)',
                border: '1px solid rgba(240, 180, 41, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 14px rgba(240, 180, 41, 0.25)',
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: '15px' }}>⚡</span>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <b style={{ color: '#fff', fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>
                  A.V.I.S. Neural Copilot & Second Brain
                </b>
                <span
                  style={{
                    fontSize: '9.5px',
                    color: hasKey ? '#22c55e' : 'var(--gold)',
                    background: hasKey ? 'rgba(34, 197, 94, 0.12)' : 'rgba(240, 180, 41, 0.12)',
                    border: `1px solid ${hasKey ? 'rgba(34, 197, 94, 0.3)' : 'rgba(240, 180, 41, 0.3)'}`,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontFamily: "'Martian Mono', monospace",
                  }}
                >
                  {activeModel.toUpperCase()} ● ONLINE
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#8a90a6', marginTop: '2px' }}>
                Full active memory of 28 repositories, tasks, architecture specs & direct action execution
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{
              fontSize: '11.5px',
              color: 'var(--gold)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {hasKey ? 'API Key Settings' : 'Connect Gemini API Key ↗'}
          </button>
        </div>

        {/* Message Stream */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '26px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
          }}
        >
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: isUser ? '75%' : '88%',
                  flexDirection: isUser ? 'row-reverse' : 'row',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(240, 180, 41, 0.15)',
                    border: `1px solid ${isUser ? 'rgba(255, 255, 255, 0.2)' : 'var(--gold)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isUser ? '#fff' : 'var(--gold)',
                    flexShrink: 0,
                  }}
                >
                  {isUser ? 'A' : '⚡'}
                </div>

                {/* Message Body */}
                <div
                  style={{
                    padding: '18px 22px',
                    borderRadius: '8px',
                    background: isUser
                      ? 'rgba(255, 255, 255, 0.06)'
                      : 'linear-gradient(165deg, rgba(16, 18, 28, 0.85) 0%, rgba(8, 9, 14, 0.95) 100%)',
                    border: `1px solid ${isUser ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                    color: '#f0f2fa',
                    wordBreak: 'break-word',
                  }}
                >
                  {/* Model & Latency Pill */}
                  {!isUser && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '10.5px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                        ⚡ {(m.model_used || activeModel).toUpperCase()}
                      </span>
                      {m.structured_data?.latencyMs && (
                        <span style={{ fontSize: '9.5px', color: '#22c55e', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '1px 6px', borderRadius: '10px', fontFamily: "'Martian Mono', monospace" }}>
                          {m.structured_data.latencyMs}ms
                        </span>
                      )}
                    </div>
                  )}

                  <FormattedMessage content={m.content} />

                  {/* Executable Action Cards (Two-Way Action Execution) */}
                  {m.action_proposals && m.action_proposals.length > 0 && (
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {m.action_proposals.map((proposal: AvisActionProposal, idx: number) => {
                        const statusKey = `${m.id}-${idx}`;
                        const currentStatus = actionStatuses[statusKey] || { status: 'idle' };

                        return (
                          <div
                            key={idx}
                            style={{
                              padding: '12px 16px',
                              borderRadius: '6px',
                              background: currentStatus.status === 'done'
                                ? 'rgba(34, 197, 94, 0.1)'
                                : 'rgba(240, 180, 41, 0.08)',
                              border: `1px solid ${
                                currentStatus.status === 'done'
                                  ? 'rgba(34, 197, 94, 0.4)'
                                  : 'rgba(240, 180, 41, 0.35)'
                              }`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '14px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  fontSize: '10px',
                                  color: currentStatus.status === 'done' ? '#4ade80' : 'var(--gold)',
                                  fontWeight: 700,
                                  letterSpacing: '0.06em',
                                  fontFamily: "'Martian Mono', monospace",
                                }}
                              >
                                {currentStatus.status === 'done' ? '✓ ACTION EXECUTED' : '⚡ PROPOSED WORKSPACE MODIFICATION'}
                              </div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginTop: '3px' }}>
                                {proposal.summary}
                              </div>
                              {currentStatus.message && (
                                <div style={{ fontSize: '11px', color: '#4ade80', marginTop: '3px' }}>
                                  {currentStatus.message}
                                </div>
                              )}
                            </div>

                            {currentStatus.status !== 'done' && (
                              <button
                                onClick={() => handleExecuteProposal(proposal, m.id, idx)}
                                disabled={currentStatus.status === 'executing'}
                                style={{
                                  padding: '7px 16px',
                                  borderRadius: '4px',
                                  background: 'var(--gold)',
                                  color: '#000',
                                  fontWeight: 600,
                                  fontSize: '11.5px',
                                  border: 'none',
                                  cursor: currentStatus.status === 'executing' ? 'not-allowed' : 'pointer',
                                  boxShadow: '0 2px 10px rgba(240, 180, 41, 0.3)',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {currentStatus.status === 'executing' ? 'Applying…' : '✓ Execute Action'}
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Dynamic Navigation Pills */}
                  {m.suggested_actions && m.suggested_actions.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
                      {m.suggested_actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act.action)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            background: 'rgba(240, 180, 41, 0.08)',
                            border: '1px solid rgba(240, 180, 41, 0.3)',
                            color: 'var(--gold)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {act.label} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {loading && (
            <div
              style={{
                display: 'flex',
                gap: '14px',
                alignSelf: 'flex-start',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(240, 180, 41, 0.15)',
                  border: '1px solid var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'var(--gold)',
                }}
              >
                ⚡
              </div>
              <div
                style={{
                  padding: '12px 18px',
                  borderRadius: '8px',
                  background: 'rgba(240, 180, 41, 0.06)',
                  border: '1px solid rgba(240, 180, 41, 0.25)',
                  color: 'var(--gold)',
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    animation: 'pu 1s ease-in-out infinite',
                  }}
                />
                <span>A.V.I.S. is synthesizing with Gemini ({activeModel})…</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompt Carousel */}
        <div
          style={{
            padding: '10px 40px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            background: 'rgba(0, 0, 0, 0.25)',
          }}
        >
          {QUICK_PROMPTS.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#9aa0b6',
                fontSize: '11px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9aa0b6';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: '18px 40px 24px',
            background: 'rgba(0, 0, 0, 0.45)',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            gap: '12px',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Command A.V.I.S. (e.g. 'Create task X for StarkForge CAD', 'Review Sovereign OS architecture', 'Audit sprint tasks')…"
            style={{
              flex: 1,
              padding: '13px 18px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#fff',
              fontSize: '13.5px',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)')}
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '0 24px',
              borderRadius: '6px',
              background: loading || !input.trim() ? 'rgba(255, 255, 255, 0.05)' : 'var(--gold)',
              border: 'none',
              color: loading || !input.trim() ? '#6e7387' : '#000',
              fontWeight: 600,
              fontSize: '13px',
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {loading ? 'Synthesizing…' : 'Execute →'}
          </button>
        </form>
      </div>
    </div>
  );
}
