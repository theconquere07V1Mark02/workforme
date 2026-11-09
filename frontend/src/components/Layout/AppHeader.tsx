import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAvis } from '../../context/AvisContext';

interface AppHeaderProps {
  onIntro: () => void;
  onTimer: () => void;
  timerRunning: boolean;
  timerDisplay: string;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onOpenSettings: () => void;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export function AppHeader({
  onIntro,
  onTimer,
  timerRunning,
  timerDisplay,
  theme,
  onThemeToggle,
  onOpenSettings,
  onToggleSidebar,
  sidebarCollapsed,
}: AppHeaderProps) {
  const [clock, setClock] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { hasApiKey, hasKey, activeModel } = useAvis();

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Compute breadcrumbs from current path
  const path = location.pathname;
  let sectionName = 'Command Dashboard';
  if (path.startsWith('/projects')) sectionName = 'Projects & Repositories';
  else if (path.startsWith('/tasks')) sectionName = 'Sprint Tasks & Roadmap';
  else if (path.startsWith('/notes') || path.startsWith('/board')) sectionName = 'Spatial Notesboard';
  else if (path.startsWith('/analyzer')) sectionName = 'Research Analyzer';
  else if (path.startsWith('/growth')) sectionName = 'Growth Telemetry';
  else if (path.startsWith('/showcase-cms')) sectionName = 'Showcase CMS';
  else if (path.startsWith('/storage')) sectionName = 'Media & Document Storage';
  else if (path.startsWith('/avis')) sectionName = 'A.V.I.S. Copilot';

  return (
    <header
      style={{
        height: '60px',
        padding: '0 24px',
        background: 'rgba(6, 7, 12, 0.75)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        zIndex: 40,
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Left: Sidebar Toggle + Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onToggleSidebar && sidebarCollapsed && (
          <button
            onClick={onToggleSidebar}
            title="Expand sidebar"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#d0d4e4',
              borderRadius: '4px',
              padding: '6px 8px',
              cursor: 'pointer',
              fontSize: '11px',
            }}
          >
            ☰
          </button>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <span style={{ color: '#686d80', fontWeight: 500 }}>JARVIS.OS</span>
          <span style={{ color: '#404454' }}>/</span>
          <span
            style={{
              color: '#f0f2fa',
              fontWeight: 600,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.02em',
            }}
          >
            {sectionName}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 8px',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            fontSize: '10px',
            color: '#4ade80',
            fontFamily: "'Martian Mono', monospace",
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#22c55e',
              animation: 'pu 2s infinite',
            }}
          />
          <span>CORE STABLE</span>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* A.V.I.S. Gemini Status Button */}
        <button
          onClick={onOpenSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: hasKey ? 'rgba(240, 180, 41, 0.08)' : 'rgba(245, 158, 11, 0.1)',
            border: `1px solid ${hasKey ? 'rgba(240, 180, 41, 0.35)' : 'rgba(245, 158, 11, 0.4)'}`,
            color: hasKey ? 'var(--gold)' : '#fbbf24',
            fontSize: '11px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          title={hasKey ? 'Gemini 3.8 Flash active - Click to manage' : 'Click to connect Gemini API key'}
        >
          <span style={{ fontSize: '12px' }}>⚡</span>
          <span>{hasKey ? `Gemini Flash (${(activeModel || 'active').replace('gemini-', '')})` : 'Connect Gemini Key'}</span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: hasKey ? '#22c55e' : '#f59e0b',
              boxShadow: `0 0 6px ${hasKey ? '#22c55e' : '#f59e0b'}`,
            }}
          />
        </button>

        {/* Public Showcase Platform Button */}
        <a
          href="/showcase"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(0, 229, 255, 0.06)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            color: '#00e5ff',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.04em',
            transition: 'all 0.15s',
          }}
          title="Open Public Showcase website in new tab"
        >
          <span>Public Showcase</span>
          <span style={{ fontSize: '11px' }}>↗</span>
        </a>

        {/* Work Session Timer Button */}
        <button
          onClick={onTimer}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            background: timerRunning ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.04)',
            border: `1px solid ${timerRunning ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
            color: timerRunning ? '#fca5a5' : '#d0d4e4',
            fontSize: '11.5px',
            fontFamily: "'Martian Mono', monospace",
            cursor: 'pointer',
          }}
          title="Work session timer"
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: timerRunning ? 'var(--red)' : '#707588',
              boxShadow: timerRunning ? '0 0 8px var(--red)' : 'none',
              animation: timerRunning ? 'pu 1.4s infinite' : 'none',
            }}
          />
          <span>{timerRunning ? timerDisplay : 'Timer'}</span>
        </button>

        {/* System Clock */}
        <span
          style={{
            fontSize: '11.5px',
            color: '#707588',
            fontFamily: "'Martian Mono', monospace",
            padding: '0 4px',
          }}
        >
          {clock}
        </span>

        {/* Intro Replay */}
        <button
          onClick={onIntro}
          style={{
            background: 'none',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#8a90a6',
            borderRadius: '4px',
            padding: '5px 9px',
            fontSize: '11px',
            cursor: 'pointer',
          }}
          title="Replay Stark Industries Intro animation"
        >
          Intro
        </button>

        {/* Dark/Light Theme */}
        <button
          onClick={onThemeToggle}
          style={{
            background: 'none',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#8a90a6',
            borderRadius: '4px',
            padding: '5px 9px',
            fontSize: '11px',
            cursor: 'pointer',
          }}
          title="Toggle UI Theme"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
