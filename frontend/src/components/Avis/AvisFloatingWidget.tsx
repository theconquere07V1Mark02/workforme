import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvis } from '../../context/AvisContext';
import { Project } from '../../types';

interface AvisFloatingWidgetProps {
  projects?: Project[];
}

export function AvisFloatingWidget({ projects = [] }: AvisFloatingWidgetProps) {
  const { messages, loading, isOpen, toggleOpen, setIsOpen, sendMessage } = useAvis();
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
          bottom: '24px',
          right: '24px',
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #18140c 0%, #08080a 100%)',
          border: '1.5px solid var(--gold)',
          boxShadow: isOpen
            ? '0 0 24px rgba(240, 180, 41, 0.6), inset 0 0 10px rgba(240, 180, 41, 0.3)'
            : '0 8px 24px rgba(0, 0, 0, 0.7), 0 0 14px rgba(240, 180, 41, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          cursor: 'pointer',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {/* Arc reactor concentric circles */}
        <div
          style={{
            position: 'absolute',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px dashed rgba(240, 180, 41, 0.45)',
            animation: 'spin 20s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            border: '1px solid rgba(240, 180, 41, 0.6)',
          }}
        />
        <div
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 10px var(--gold)',
            animation: 'pu 2s ease-in-out infinite',
          }}
        />
      </button>

      {/* Compact Anchored Chat Popup */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '86px',
            right: '24px',
            width: '380px',
            height: '520px',
            maxWidth: 'calc(100vw - 32px)',
            maxHeight: 'calc(100vh - 100px)',
            background: 'linear-gradient(165deg, #101017 0%, #040406 75%)',
            border: '1px solid var(--ln2)',
            borderRadius: '4px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.85), 0 0 30px rgba(240, 180, 41, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'var(--mono)',
            fontSize: '11px',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 14px',
              borderBottom: '1px solid var(--ln)',
              background: 'rgba(255, 255, 255, 0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 8px var(--gold)',
                  animation: 'pu 2s ease-in-out infinite',
                }}
              />
              <div>
                <b style={{ color: 'var(--tx)', letterSpacing: '0.06em', fontSize: '11.5px' }}>
                  A.V.I.S. COPILOT
                </b>
                <span style={{ color: 'var(--mut)', fontSize: '9px', marginLeft: '6px' }}>v2.0</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/avis');
                }}
                title="Open full-screen chat"
                style={{
                  color: 'var(--dim)',
                  fontSize: '10px',
                  border: '1px solid var(--ln)',
                  padding: '2px 6px',
                  borderRadius: '2px',
                }}
              >
                Full view ↗
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  color: 'var(--mut)',
                  fontSize: '14px',
                  lineHeight: '1',
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
              padding: '8px 12px',
              borderBottom: '1px solid var(--ln)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              background: 'rgba(0,0,0,0.3)',
              flex: 'none',
            }}
          >
            <button
              onClick={() => handleQuickPrompt('Give me a brief ecosystem telemetry status.')}
              style={{
                fontSize: '9.5px',
                color: 'var(--dim)',
                border: '1px solid var(--ln)',
                padding: '3px 8px',
                borderRadius: '2px',
              }}
            >
              Status brief
            </button>
            <button
              onClick={() => handleQuickPrompt('What projects require immediate attention or are blocked?')}
              style={{
                fontSize: '9.5px',
                color: 'var(--dim)',
                border: '1px solid var(--ln)',
                padding: '3px 8px',
                borderRadius: '2px',
              }}
            >
              Blockers audit
            </button>
            <button
              onClick={() => handleQuickPrompt('Review showcase readiness for published projects.')}
              style={{
                fontSize: '9.5px',
                color: 'var(--dim)',
                border: '1px solid var(--ln)',
                padding: '3px 8px',
                borderRadius: '2px',
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
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
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
                    background: isUser ? 'rgba(255, 255, 255, 0.07)' : 'rgba(240, 180, 41, 0.05)',
                    border: `1px solid ${isUser ? 'var(--ln2)' : 'rgba(240, 180, 41, 0.2)'}`,
                    padding: '8px 11px',
                    borderRadius: '3px',
                    color: isUser ? 'var(--tx)' : '#f5e8c8',
                    fontSize: '11px',
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
                  background: 'rgba(240, 180, 41, 0.04)',
                  border: '1px solid rgba(240, 180, 41, 0.15)',
                  padding: '6px 10px',
                  borderRadius: '3px',
                  color: 'var(--gold)',
                  fontSize: '10px',
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
              padding: '10px 12px',
              borderTop: '1px solid var(--ln)',
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              gap: '8px',
              flex: 'none',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask A.V.I.S. anything…"
              style={{
                flex: 1,
                borderBottom: '1px solid var(--ln2)',
                color: 'var(--tx)',
                padding: '4px 0',
                fontSize: '11px',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                padding: '4px 10px',
                border: '1px solid var(--ln2)',
                color: 'var(--tx)',
                fontSize: '10px',
                opacity: loading || !input.trim() ? 0.4 : 1,
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
