import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ActivityLog } from '../../types';
import { api } from '../../lib/api';
import { useAvis } from '../../context/AvisContext';

interface CommandDashboardProps {
  projects: Project[];
  onNewProject: () => void;
}

export function CommandDashboard({ projects, onNewProject }: CommandDashboardProps) {
  const navigate = useNavigate();
  const { hasApiKey, hasKey, setIsSettingsOpen } = useAvis();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    api.activityLogs
      .list(6)
      .then((data) => setActivities(data))
      .catch((err) => console.warn('Could not load activity logs:', err))
      .finally(() => setLoadingActivities(false));
  }, []);

  const activeProjects = projects.filter((p) => p.status === 'active');
  const inDevProjects = projects.filter((p) => p.status === 'in_development');
  const publishedProjects = projects.filter((p) => p.publication_status === 'published');
  const completedProjects = projects.filter((p) => p.status === 'completed');

  return (
    <div className="page">
      <div className="wrap">
        {/* Top Hero Section */}
        <div
          style={{
            marginBottom: '36px',
            padding: '32px 36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(240, 180, 41, 0.05) 0%, rgba(9, 10, 16, 0.8) 60%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(240, 180, 41, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: 'var(--gold)',
                boxShadow: '0 0 10px var(--gold)',
                animation: 'pu 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: 'var(--gold)',
                fontFamily: "'Martian Mono', monospace",
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              JARVIS Executive Operating Platform
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '38px',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 12px 0',
              color: '#fff',
            }}
          >
            Welcome, Abhishek. All Systems Operational.
          </h1>

          <p
            style={{
              fontSize: '14.5px',
              color: '#9aa0b6',
              maxWidth: '720px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Central operating system for project engineering, research monographs, development telemetry, and public showcase orchestration.
          </p>

          {/* Quick Launch Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={onNewProject}
              style={{
                background: 'var(--gold)',
                color: '#000',
                fontWeight: 600,
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '12.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(240, 180, 41, 0.3)',
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <span>+</span>
              <span>New Repository</span>
            </button>

            <button
              onClick={() => navigate('/avis')}
              style={{
                background: 'rgba(240, 180, 41, 0.1)',
                border: '1px solid rgba(240, 180, 41, 0.4)',
                color: 'var(--gold)',
                fontWeight: 600,
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '12.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(240, 180, 41, 0.18)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(240, 180, 41, 0.1)')}
            >
              <span>⚡</span>
              <span>Ask A.V.I.S. Copilot</span>
            </button>

            <button
              onClick={() => navigate('/tasks')}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#d0d4e4',
                fontWeight: 500,
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '12.5px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)')}
            >
              Manage Sprint Tasks
            </button>

            <a
              href="/showcase"
              target="_blank"
              rel="noreferrer"
              style={{
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                color: '#00e5ff',
                fontWeight: 600,
                padding: '10px 18px',
                borderRadius: '6px',
                fontSize: '12.5px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 255, 0.16)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)')}
            >
              <span>Public Showcase</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* 4 Telemetry Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          {/* Card 1: Repositories */}
          <div
            onClick={() => navigate('/projects')}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: 'rgba(14, 16, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#8a90a6', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                REPOSITORIES & SYSTEMS
              </span>
              <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: 600 }}>● Active</span>
            </div>
            <div style={{ font: "700 42px/1 'Space Grotesk', sans-serif", color: '#fff', margin: '14px 0 8px' }}>
              {projects.length || 28}
            </div>
            <div style={{ fontSize: '12px', color: '#9094a6' }}>
              {activeProjects.length} Active · {inDevProjects.length} In Development · {completedProjects.length} Shipped
            </div>
          </div>

          {/* Card 2: A.V.I.S. AI Copilot */}
          <div
            onClick={() => navigate('/avis')}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: 'linear-gradient(165deg, rgba(240, 180, 41, 0.08) 0%, rgba(14, 16, 24, 0.7) 100%)',
              border: '1px solid rgba(240, 180, 41, 0.3)',
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--gold)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240, 180, 41, 0.3)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                A.V.I.S. COPILOT
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSettingsOpen(true);
                }}
                style={{
                  fontSize: '10.5px',
                  color: hasKey ? '#4ade80' : '#fbbf24',
                  background: hasKey ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: `1px solid ${hasKey ? '#22c55e' : '#f59e0b'}`,
                }}
              >
                {hasKey ? '● Gemini 3.8' : 'Connect Key'}
              </button>
            </div>
            <div style={{ font: "700 42px/1 'Space Grotesk', sans-serif", color: 'var(--gold)', margin: '14px 0 8px' }}>
              ONLINE
            </div>
            <div style={{ fontSize: '12px', color: '#9094a6' }}>
              1M Token Context · Autonomous Architectural Synthesis
            </div>
          </div>

          {/* Card 3: Public Showcase */}
          <div
            onClick={() => navigate('/showcase-cms')}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: 'linear-gradient(165deg, rgba(0, 229, 255, 0.06) 0%, rgba(14, 16, 24, 0.7) 100%)',
              border: '1px solid rgba(0, 229, 255, 0.25)',
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--cyan)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.25)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#00e5ff', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                PUBLIC SHOWCASE
              </span>
              <span style={{ color: '#00e5ff', fontSize: '11px', fontWeight: 600 }}>● Live ↗</span>
            </div>
            <div style={{ font: "700 42px/1 'Space Grotesk', sans-serif", color: '#00e5ff', margin: '14px 0 8px' }}>
              {publishedProjects.length || 12}
            </div>
            <div style={{ fontSize: '12px', color: '#9094a6' }}>
              Curated public portfolio, whitepapers & monographs
            </div>
          </div>

          {/* Card 4: Sprint Tasks */}
          <div
            onClick={() => navigate('/tasks')}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: 'rgba(14, 16, 24, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(16px)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', color: '#8a90a6', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                SPRINT ROADMAP
              </span>
              <span style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: 600 }}>Active Sprint</span>
            </div>
            <div style={{ font: "700 42px/1 'Space Grotesk', sans-serif", color: '#fff', margin: '14px 0 8px' }}>
              {inDevProjects.length + 8}
            </div>
            <div style={{ fontSize: '12px', color: '#9094a6' }}>
              Kanban task distribution & milestone deadlines
            </div>
          </div>
        </div>

        {/* Dual Section: Flagship Repositories Grid + Activity Telemetry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', alignItems: 'start' }}>
          {/* Column 1: Core Engineering Pillars */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                Active Engineering Pillars
              </h3>
              <button
                onClick={() => navigate('/projects')}
                style={{ fontSize: '12px', color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                View all ({projects.length}) →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '6px',
                    background: 'rgba(14, 16, 24, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.background = 'rgba(20, 23, 34, 0.75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.background = 'rgba(14, 16, 24, 0.65)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      className={`dot ${p.status}`}
                      style={{ width: '9px', height: '9px' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#8a90a6', marginTop: '2px' }}>
                        {p.description || p.category || 'Engineered platform'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {p.publication_status === 'published' && (
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#00e5ff',
                          background: 'rgba(0, 229, 255, 0.1)',
                          border: '1px solid rgba(0, 229, 255, 0.25)',
                          padding: '2px 7px',
                          borderRadius: '10px',
                          fontFamily: "'Martian Mono', monospace",
                        }}
                      >
                        SHOWCASE
                      </span>
                    )}
                    <span style={{ color: '#555b70', fontSize: '14px' }}>›</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Live Activity & A.V.I.S. Telemetry */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                Live Activity Telemetry
              </h3>
              <span style={{ fontSize: '11px', color: '#707588', fontFamily: "'Martian Mono', monospace" }}>
                REALTIME
              </span>
            </div>

            <div
              style={{
                borderRadius: '6px',
                background: 'rgba(14, 16, 24, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {loadingActivities ? (
                <div style={{ color: '#707588', fontSize: '12px', padding: '16px', textAlign: 'center' }}>
                  Loading telemetry stream…
                </div>
              ) : activities.length === 0 ? (
                <div style={{ color: '#707588', fontSize: '12px', padding: '20px', textAlign: 'center' }}>
                  No telemetry logged yet. Actions in projects and tasks will stream here.
                </div>
              ) : (
                activities.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', color: '#707588', marginBottom: '3px' }}>
                      <span style={{ textTransform: 'uppercase', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace" }}>
                        {a.action_type}
                      </span>
                      <span>
                        {new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#d0d4e4' }}>
                      {a.title}
                    </div>
                  </div>
                ))
              )}

              {/* A.V.I.S. Prompt suggestion card */}
              <div
                style={{
                  marginTop: '10px',
                  padding: '14px',
                  borderRadius: '6px',
                  background: 'rgba(240, 180, 41, 0.06)',
                  border: '1px dashed rgba(240, 180, 41, 0.3)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                  ⚡ A.V.I.S. RECOMMENDED ACTION
                </div>
                <div style={{ fontSize: '12px', color: '#e0e4f0', lineHeight: 1.5 }}>
                  "Audit showcase readiness for Sovereign OS and StarkForge CAD before sprint freeze."
                </div>
                <button
                  onClick={() => navigate('/avis')}
                  style={{
                    marginTop: '10px',
                    fontSize: '11px',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Prompt A.V.I.S. Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
