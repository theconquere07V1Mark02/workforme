import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project, ActivityLog } from '../../types';
import { api } from '../../lib/api';

interface CommandDashboardProps {
  projects: Project[];
  onNewProject: () => void;
}

export function CommandDashboard({ projects, onNewProject }: CommandDashboardProps) {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    api.activityLogs
      .list(8)
      .then((data) => setActivities(data))
      .catch((err) => console.warn('Could not load activity logs:', err))
      .finally(() => setLoadingActivities(false));
  }, []);

  const activeProjects = projects.filter((p) => p.status === 'active');
  const inDevProjects = projects.filter((p) => p.status === 'in_development');
  const publishedProjects = projects.filter((p) => p.publication_status === 'published');
  const plannedProjects = projects.filter((p) => p.status === 'planned');

  return (
    <div className="page" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="wrap" style={{ maxWidth: '1000px' }}>
        {/* Top Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="pulse" />
            <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              JARVIS Control Center v2.0
            </span>
          </div>
          <h1 className="ttl" style={{ fontSize: '42px' }}>Personal Technology Ecosystem</h1>
          <p className="desc" style={{ maxWidth: '640px' }}>
            Central operating system for project engineering, research monographs, development telemetry, and public showcase orchestration.
          </p>
        </div>

        {/* Telemetry Metric Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '32px',
          }}
        >
          <div
            onClick={() => navigate('/projects')}
            style={{
              border: '1px solid var(--ln2)',
              background: 'linear-gradient(160deg, #111118, #050508 70%)',
              padding: '18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              TOTAL REPOSITORIES
            </div>
            <div style={{ font: '400 36px/1.1 var(--ser)', color: 'var(--tx)', marginTop: '8px' }}>
              {projects.length}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--mut)', marginTop: '4px' }}>
              {activeProjects.length} active · {inDevProjects.length} in development
            </div>
          </div>

          <div
            onClick={() => navigate('/showcase-cms')}
            style={{
              border: '1px solid var(--ln2)',
              background: 'linear-gradient(160deg, #111118, #050508 70%)',
              padding: '18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              PUBLIC SHOWCASE
            </div>
            <div style={{ font: '400 36px/1.1 var(--ser)', color: 'var(--gold)', marginTop: '8px' }}>
              {publishedProjects.length}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--mut)', marginTop: '4px' }}>
              Live on public portfolio
            </div>
          </div>

          <div
            onClick={() => navigate('/tasks')}
            style={{
              border: '1px solid var(--ln2)',
              background: 'linear-gradient(160deg, #111118, #050508 70%)',
              padding: '18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ENGINEERING SPRINT
            </div>
            <div style={{ font: '400 36px/1.1 var(--ser)', color: 'var(--tx)', marginTop: '8px' }}>
              {inDevProjects.length + plannedProjects.length}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--mut)', marginTop: '4px' }}>
              In build & planned queue
            </div>
          </div>

          <div
            onClick={() => navigate('/avis')}
            style={{
              border: '1px solid rgba(240, 180, 41, 0.4)',
              background: 'linear-gradient(160deg, #1a160d, #080705 70%)',
              padding: '18px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              A.V.I.S. INTELLIGENCE
            </div>
            <div style={{ font: '400 36px/1.1 var(--ser)', color: '#fff', marginTop: '8px' }}>
              ONLINE
            </div>
            <div style={{ fontSize: '10px', color: 'var(--gold)', opacity: 0.8, marginTop: '4px' }}>
              Gemini 3.8 Flash operational
            </div>
          </div>
        </div>

        {/* Quick Launchpad Action Buttons */}
        <div style={{ marginBottom: '38px' }}>
          <h4 style={{ margin: '0 0 14px 0' }}>QUICK ACTIONS & NAVIGATION</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={onNewProject}
              style={{
                border: '1px solid var(--tx)',
                background: 'var(--tx)',
                color: '#000',
                padding: '9px 16px',
                fontWeight: 500,
                fontSize: '11px',
              }}
            >
              + Create New Project
            </button>
            <button
              onClick={() => navigate('/avis')}
              style={{
                border: '1px solid var(--gold)',
                background: 'rgba(240, 180, 41, 0.1)',
                color: 'var(--gold)',
                padding: '9px 16px',
                fontSize: '11px',
              }}
            >
              Ask A.V.I.S. Briefing
            </button>
            <button
              onClick={() => navigate('/tasks')}
              style={{
                border: '1px solid var(--ln2)',
                padding: '9px 16px',
                color: 'var(--tx)',
                fontSize: '11px',
              }}
            >
              Manage Tasks
            </button>
            <button
              onClick={() => navigate('/showcase-cms')}
              style={{
                border: '1px solid var(--ln2)',
                padding: '9px 16px',
                color: 'var(--tx)',
                fontSize: '11px',
              }}
            >
              Showcase CMS
            </button>
            <button
              onClick={() => navigate('/notes')}
              style={{
                border: '1px solid var(--ln2)',
                padding: '9px 16px',
                color: 'var(--dim)',
                fontSize: '11px',
              }}
            >
              Notesboard
            </button>
            <button
              onClick={() => navigate('/analyzer')}
              style={{
                border: '1px solid var(--ln2)',
                padding: '9px 16px',
                color: 'var(--dim)',
                fontSize: '11px',
              }}
            >
              Research Analyzer
            </button>
            <button
              onClick={() => navigate('/growth')}
              style={{
                border: '1px solid var(--ln2)',
                padding: '9px 16px',
                color: 'var(--dim)',
                fontSize: '11px',
              }}
            >
              Growth Dashboard
            </button>
            <a
              href="/showcase"
              target="_blank"
              rel="noreferrer"
              style={{
                border: '1px solid #00e5ff',
                color: '#00e5ff',
                padding: '9px 16px',
                fontSize: '11px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0, 229, 255, 0.05)',
              }}
            >
              View Public Showcase ↗
            </a>
          </div>
        </div>

        {/* Dual Column: Active Highlights + Activity Telemetry */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Column 1: Active Projects */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
              <h4 style={{ margin: 0 }}>ACTIVE CORE PROJECTS</h4>
              <button
                onClick={() => navigate('/projects')}
                style={{ fontSize: '10px', color: 'var(--dim)', textDecoration: 'underline' }}
              >
                View all ({projects.length})
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeProjects.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/projects/${p.id}`)}
                  style={{
                    border: '1px solid var(--ln)',
                    background: 'var(--s1)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="dot active" />
                    <div>
                      <b style={{ color: 'var(--tx)', fontSize: '12px', display: 'block' }}>{p.name}</b>
                      <span style={{ color: 'var(--dim)', fontSize: '10px' }}>
                        {p.category || 'Engineering'} · {p.publication_status === 'published' ? 'Published' : 'Private'}
                      </span>
                    </div>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--mut)' }}>›</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Recent Activity Telemetry */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
              <h4 style={{ margin: 0 }}>RECENT TELEMETRY & LOGS</h4>
              <span style={{ fontSize: '10px', color: 'var(--mut)' }}>Live audit</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {loadingActivities ? (
                <div style={{ color: 'var(--mut)', fontSize: '11px', padding: '12px 0' }}>Loading telemetry...</div>
              ) : activities.length === 0 ? (
                <div style={{ color: 'var(--mut)', fontSize: '11px', padding: '12px 0' }}>
                  No activity logged yet. Work in projects to record telemetry.
                </div>
              ) : (
                activities.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      border: '1px solid var(--ln)',
                      background: 'rgba(255, 255, 255, 0.01)',
                      padding: '10px 12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dim)', fontSize: '9.5px' }}>
                      <span style={{ textTransform: 'uppercase', color: 'var(--gold)' }}>{a.action_type}</span>
                      <span>{new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div style={{ color: 'var(--tx)', fontSize: '11.5px', marginTop: '3px' }}>{a.title}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
