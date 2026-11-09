import React, { useState, useEffect } from 'react';
import { GeminiService, GeminiTestResult } from '../../lib/gemini';

interface AvisSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySaved?: () => void;
}

export function AvisSettingsModal({ isOpen, onClose, onKeySaved }: AvisSettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<GeminiTestResult | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(GeminiService.getApiKey());
      setTestResult(null);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await GeminiService.testApiKey(apiKey);
      setTestResult(res);
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    GeminiService.setApiKey(apiKey);
    setSaveSuccess(true);
    if (onKeySaved) onKeySaved();
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleClear = () => {
    GeminiService.setApiKey('');
    setApiKey('');
    setTestResult(null);
    if (onKeySaved) onKeySaved();
  };

  const hasKey = Boolean(apiKey.trim());

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(2, 2, 4, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'linear-gradient(165deg, #12141e 0%, #08090e 100%)',
          border: '1px solid rgba(240, 180, 41, 0.3)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 40px rgba(240, 180, 41, 0.12)',
          borderRadius: '8px',
          overflow: 'hidden',
          fontFamily: "'Inter', sans-serif",
          color: '#f0f0f4',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(240, 180, 41, 0.1)',
                border: '1px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 14px rgba(240, 180, 41, 0.3)',
              }}
            >
              <span style={{ color: 'var(--gold)', fontSize: '15px' }}>⚡</span>
            </div>
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                A.V.I.S. Intelligence Engine
              </h2>
              <div style={{ fontSize: '11px', color: '#9094a6', marginTop: '2px' }}>
                Google Gemini API Key & Model Configuration
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              color: '#808496',
              fontSize: '20px',
              padding: '4px 8px',
              lineHeight: 1,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#808496')}
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Model Status Pill */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '6px',
              background: 'rgba(240, 180, 41, 0.06)',
              border: '1px solid rgba(240, 180, 41, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                Active Production Model
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginTop: '3px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {GeminiService.getActiveModel()} (Auto-adaptive Flash Core)
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: hasKey ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                border: `1px solid ${hasKey ? '#22c55e' : '#eab308'}`,
                fontSize: '11px',
                color: hasKey ? '#4ade80' : '#facc15',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: hasKey ? '#22c55e' : '#eab308',
                  boxShadow: `0 0 8px ${hasKey ? '#22c55e' : '#eab308'}`,
                  animation: 'pu 2s ease-in-out infinite',
                }}
              />
              <span>{hasKey ? 'Key Configured' : 'Missing Key'}</span>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 500, color: '#d0d4e4' }}>
                Gemini API Key
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: '11px',
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>Get a free key from Google AI Studio</span>
                <span>↗</span>
              </a>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  padding: '12px 76px 12px 14px',
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '13px',
                  fontFamily: "'Martian Mono', monospace",
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#8a90a6',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '4px 6px',
                }}
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>

            <p style={{ fontSize: '11px', color: '#7a8096', margin: '8px 0 0', lineHeight: 1.5 }}>
              Your API key is stored securely in your browser's local sandbox storage and sent directly to Google Gemini for A.V.I.S. reasoning.
            </p>
          </div>

          {/* Test Result Feedback Box */}
          {testResult && (
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '6px',
                background: testResult.ok ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                border: `1px solid ${testResult.ok ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span
                  style={{
                    fontWeight: 600,
                    color: testResult.ok ? '#4ade80' : '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{testResult.ok ? '✓' : '✗'}</span>
                  <span>{testResult.ok ? 'Connection Verified Operational' : 'Connection Failed'}</span>
                </span>
                <span style={{ fontSize: '10.5px', color: '#9094a6', fontFamily: "'Martian Mono', monospace" }}>
                  {testResult.latencyMs}ms latency
                </span>
              </div>
              <div style={{ color: '#d0d4e4', fontSize: '11.5px', lineHeight: 1.5 }}>
                {testResult.message}
              </div>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {hasKey ? (
            <button
              onClick={handleClear}
              style={{
                color: '#ef4444',
                fontSize: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 0',
              }}
            >
              Disconnect Key
            </button>
          ) : (
            <div />
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              disabled={testing || !apiKey.trim()}
              onClick={handleTestKey}
              style={{
                padding: '9px 16px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 500,
                cursor: testing || !apiKey.trim() ? 'not-allowed' : 'pointer',
                opacity: testing || !apiKey.trim() ? 0.5 : 1,
              }}
            >
              {testing ? 'Benchmarking…' : '⚡ Test Connection'}
            </button>

            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: '9px 20px',
                borderRadius: '6px',
                border: '1px solid var(--gold)',
                background: saveSuccess ? '#22c55e' : 'var(--gold)',
                color: '#000',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {saveSuccess ? '✓ Activated!' : 'Save & Activate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
