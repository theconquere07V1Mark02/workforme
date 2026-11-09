import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvis } from '../../context/AvisContext';
import { Project } from '../../types';

interface AvisFloatingWidgetProps {
  projects?: Project[];
}

export function AvisFloatingWidget({ projects = [] }: AvisFloatingWidgetProps) {
  const { messages, loading, isOpen, toggleOpen, setIsOpen, sendMessage, hasApiKey, hasKey, setIsSettingsOpen } = useAvis();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    await sendMessage(text, projects);
  };

  const handleQuickPrompt = async (promptText: string) => {
    await sendMessage(promptText, projects);
  };

  return (
    <>
      {/* Floating Circular Arc-Reactor Button */}
      <button
        onClick={toggleOpen}
        aria-label="Open A.V.I.S. AI Assistant"
        title="A.V.I.S. AI Core Assistant"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #18140c 0%, #08080a 100%)',
          border: '1.5px solid var(--gold)',
          boxShadow: isOpen
            ? '0 0 30px rgba(240, 180, 41, 0.7), inset 0 0 14px rgba(240, 180, 41, 0.4)'
            : '0 12px 32px rgba(0, 0, 0, 0.8), 0 0 16px rgba(240, 180, 41, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        {/* Arc reactor concentric rings */}
        <div
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '1px dashed rgba(240, 180, 41, 0.45)',
            animation: 'spin 20s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: '1px solid rgba(240, 180, 41, 0.65)',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 12px var(--gold)',
            animation: 'pu 2s ease-in-out infinite',
          }}
        />
      </button>

      {/* Compact Anchored Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '28px',
            width: '400px',
            height: '560px',
            maxWidth: 'calc(100vw - 36px)',
            maxHeight: 'calc(100vh - 120px)',
            background: 'linear-gradient(165deg, #10121c 0%, #05060a 80%)',
            border: '1px solid rgba(240, 180, 41, 0.3)',
            borderRadius: '8px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(240, 180, 41, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12.5px',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 8px var(--gold)',
                  animation: 'pu 2s ease-in-out infinite',
                }}
              />
              <div>
                <b style={{ color: '#fff', letterSpacing: '0.04em', fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif" }}>
                  A.V.I.S. COPILOT
                </b>
                <span
                  style={{
                    color: hasKey ? '#4ade80' : '#fbbf24',
                    fontSize: '10px',
                    marginLeft: '8px',
                    fontFamily: "'Martian Mono', monospace",
                  }}
                >
                  {hasKey ? 'Gemini 3.8 Flash' : 'Key Required'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsSettingsOpen(true);
                }}
                title="Configure Gemini API key"
                style={{
                  color: '#8a90a6',
                  fontSize: '12px',
                  padding: '2px 6px',
                }}
              >
                ⚙
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/avis');
                }}
                title="Open full-screen chat"
                style={{
                  color: 'var(--gold)',
                  fontSize: '11px',
                  border: '1px solid rgba(240, 180, 41, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                }}
              >
                Full view ↗
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  color: '#8a90a6',
                  fontSize: '16px',
                  lineHeight: 1,
                  padding: '2px 4px',
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div
            style={{
              padding: '8px 14px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              background: 'rgba(0, 0, 0, 0.3)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => handleQuickPrompt('Give me a brief ecosystem telemetry status.')}
              style={{
                fontSize: '10.5px',
                color: '#9aa0b6',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Status brief
            </button>
            <button
              onClick={() => handleQuickPrompt('What projects require immediate attention or are blocked?')}
              style={{
                fontSize: '10.5px',
                color: '#9aa0b6',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Blockers audit
            </button>
            <button
              onClick={() => handleQuickPrompt('Review showcase readiness for published projects.')}
              style={{
                fontSize: '10.5px',
                color: '#9aa0b6',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              Showcase audit
            </button>
          </div>

          {/* Message Stream */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                    background: isUser ? 'rgba(255, 255, 255, 0.08)' : 'rgba(240, 180, 41, 0.06)',
                    border: `1px solid ${isUser ? 'rgba(255, 255, 255, 0.14)' : 'rgba(240, 180, 41, 0.25)'}`,
                    padding: '10px 14px',
                    borderRadius: '6px',
                    color: isUser ? '#fff' : '#f5e8c8',
                    fontSize: '12.5px',
                    lineHeight: '1.6',
                    wordBreak: 'break-word',
                  }}
                >
                  <div style={{ whiteSpace: 'pre-wrap' }}>{m.content}</div>
                </div>
              );
            })}

            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(240, 180, 41, 0.06)',
                  border: '1px solid rgba(240, 180, 41, 0.2)',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  color: 'var(--gold)',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    animation: 'pu 1s ease-in-out infinite',
                  }}
                />
                <span>A.V.I.S. synthesizing telemetry…</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '12px 14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask A.V.I.S. anything…"
              style={{
                flex: 1,
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '4px',
                color: '#fff',
                padding: '8px 12px',
                fontSize: '12.5px',
                background: 'rgba(255, 255, 255, 0.03)',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: '0 14px',
                borderRadius: '4px',
                border: 'none',
                background: 'var(--gold)',
                color: '#000',
                fontWeight: 600,
                fontSize: '12px',
                opacity: loading || !input.trim() ? 0.4 : 1,
                cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
