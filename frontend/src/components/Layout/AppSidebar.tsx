import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAvis } from '../../context/AvisContext';
import { Project } from '../../types';

interface AppSidebarProps {
  projects?: Project[];
  onSignOut: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenSettings: () => void;
}

export function AppSidebar({
  projects = [],
  onSignOut,
  collapsed,
  onToggleCollapse,
  onOpenSettings,
}: AppSidebarProps) {
  const navigate = useNavigate();
  const { hasKey, activeModel } = useAvis();

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '260px',
        transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'linear-gradient(180deg, #090a10 0%, #030407 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        zIndex: 50,
        flexShrink: 0,
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Brand & Arc Reactor Header */}
      <div
        style={{
          padding: collapsed ? '18px 0' : '18px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          minHeight: '66px',
        }}
      >
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
        >
          {/* Animated Arc-Reactor SVG */}
          <div
            style={{
              position: 'relative',
              width: '32px',
              height: '32px',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px dashed var(--gold)',
                animation: 'spin 25s linear infinite',
                opacity: 0.65,
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '5px',
                borderRadius: '50%',
                border: '1px solid rgba(240, 180, 41, 0.5)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--gold)',
                boxShadow: '0 0 10px var(--gold)',
                animation: 'pu 2.5s ease-in-out infinite',
              }}
            />
          </div>

          {!collapsed && (
            <div style={{ whiteSpace: 'nowrap' }}>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  lineHeight: 1.1,
                }}
              >
                JARVIS<span style={{ color: 'var(--gold)' }}>.OS</span>
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  color: '#7a8096',
                  fontFamily: "'Martian Mono', monospace",
                  letterSpacing: '0.04em',
                  marginTop: '2px',
                }}
              >
                v2.0 · Personal Executive
              </div>
            </div>
          )}
        </div>

        {!collapsed && (
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar ([)"
            style={{
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#6e7387',
              borderRadius: '4px',
              padding: '4px 6px',
              cursor: 'pointer',
              fontSize: '10px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6e7387';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }}
          >
            ◀
          </button>
        )}
      </div>

      {/* Main Navigation Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: collapsed ? '14px 8px' : '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* SECTION 1: EXECUTION & WORKSPACE */}
        <div>
          {!collapsed && (
            <div
              style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: '#62677b',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0 8px 6px',
                fontFamily: "'Martian Mono', monospace",
              }}
            >
              Control & Build
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <NavItem
              to="/dashboard"
              collapsed={collapsed}
              icon="❖"
              label="Command Dashboard"
            />
            <NavItem
              to="/projects"
              collapsed={collapsed}
              icon="▤"
              label="Projects & Repos"
              badge={projects.length ? String(projects.length) : '28'}
            />
            <NavItem
              to="/tasks"
              collapsed={collapsed}
              icon="☑"
              label="Sprint Tasks"
            />
            <NavItem
              to="/notes"
              collapsed={collapsed}
              icon="▦"
              label="Spatial Notesboard"
            />
            <NavItem
              to="/storage"
              collapsed={collapsed}
              icon="☷"
              label="Storage & Media"
            />
            <NavItem
              to="/profile"
              collapsed={collapsed}
              icon="👤"
              label="Executive Profile"
              badge="ME"
              badgeColor="var(--gold)"
            />
          </div>
        </div>

        {/* SECTION 2: AI & RESEARCH */}
        <div>
          {!collapsed && (
            <div
              style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: '#62677b',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0 8px 6px',
                fontFamily: "'Martian Mono', monospace",
              }}
            >
              Intelligence
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <NavItem
              to="/avis"
              collapsed={collapsed}
              icon="⚡"
              label="A.V.I.S. Copilot"
              isAi
              badge={hasKey ? activeModel.replace('gemini-', '') : 'Key Req'}
              badgeColor={hasKey ? '#22c55e' : '#f59e0b'}
            />
            <NavItem
              to="/analyzer"
              collapsed={collapsed}
              icon="⌬"
              label="Research Analyzer"
            />
            <NavItem
              to="/growth"
              collapsed={collapsed}
              icon="▲"
              label="Growth Telemetry"
            />
          </div>
        </div>

        {/* SECTION 3: PUBLIC SHOWCASE PLATFORM */}
        <div>
          {!collapsed && (
            <div
              style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: '#62677b',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0 8px 6px',
                fontFamily: "'Martian Mono', monospace",
              }}
            >
              Public Showcase
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <NavItem
              to="/showcase-cms"
              collapsed={collapsed}
              icon="◈"
              label="Showcase CMS"
            />
            <a
              href="/showcase"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: collapsed ? '10px 0' : '9px 12px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: '6px',
                color: '#00e5ff',
                textDecoration: 'none',
                fontSize: '12.5px',
                fontWeight: 500,
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                transition: 'all 0.15s',
              }}
              title="Open Public Showcase in new tab"
            >
              <span style={{ fontSize: '13px', lineHeight: 1 }}>↗</span>
              {!collapsed && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <span>View Showcase</span>
                  <span
                    style={{
                      fontSize: '9px',
                      background: 'rgba(0, 229, 255, 0.15)',
                      padding: '2px 5px',
                      borderRadius: '3px',
                      fontFamily: "'Martian Mono', monospace",
                    }}
                  >
                    LIVE
                  </span>
                </div>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar Footer Controls */}
      <div
        style={{
          padding: collapsed ? '12px 6px' : '14px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Gemini API Key Quick Status button */}
        <button
          onClick={onOpenSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: collapsed ? '8px 0' : '7px 10px',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderRadius: '5px',
            background: hasKey ? 'rgba(34, 197, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)',
            border: `1px solid ${hasKey ? 'rgba(34, 197, 94, 0.25)' : 'rgba(245, 158, 11, 0.3)'}`,
            color: hasKey ? '#4ade80' : '#fbbf24',
            fontSize: '11px',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.15s',
          }}
          title={hasKey ? `Gemini Online (${activeModel})` : 'Connect Gemini API Key'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: hasKey ? '#22c55e' : '#f59e0b',
                boxShadow: `0 0 6px ${hasKey ? '#22c55e' : '#f59e0b'}`,
              }}
            />
            {!collapsed && <span style={{ fontWeight: 500 }}>{hasKey ? activeModel.replace('gemini-', 'Gemini ') : 'Connect Key'}</span>}
          </div>
          {!collapsed && (
            <span style={{ fontSize: '10px', color: '#9094a6' }}>⚙</span>
          )}
        </button>

        {/* User Card -> Navigates to /profile */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            paddingTop: '2px',
            gap: '8px',
          }}
        >
          <NavLink
            to="/profile"
            title="Executive Profile, Credentials & Atmosphere (P)"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflow: 'hidden',
              padding: collapsed ? '5px' : '5px 8px',
              borderRadius: '6px',
              textDecoration: 'none',
              background: isActive ? 'rgba(240, 180, 41, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)'}`,
              transition: 'all 0.15s ease',
              flex: 1,
            })}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(240, 180, 41, 0.3) 0%, #0d0f18 100%)',
                border: '1.5px solid var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--gold)',
                flexShrink: 0,
                boxShadow: '0 0 10px rgba(240, 180, 41, 0.25)',
              }}
            >
              AG
            </div>
            {!collapsed && (
              <div style={{ overflow: 'hidden', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#f0f0f4', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    Abhishek G.
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--gold)' }}>↗</span>
                </div>
                <div style={{ fontSize: '9.5px', color: '#8e94a8', whiteSpace: 'nowrap' }}>
                  Architect & Founder
                </div>
              </div>
            )}
          </NavLink>

          {!collapsed && (
            <button
              onClick={onSignOut}
              title="Sign out of JARVIS Workspace"
              style={{
                background: 'none',
                border: 'none',
                color: '#6e7387',
                fontSize: '11px',
                cursor: 'pointer',
                padding: '4px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6e7387')}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  to,
  icon,
  label,
  badge,
  badgeColor,
  isAi,
  collapsed,
}: {
  to: string;
  icon: string;
  label: string;
  badge?: string;
  badgeColor?: string;
  isAi?: boolean;
  collapsed?: boolean;
}) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: collapsed ? '10px 0' : '9px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: '6px',
        color: isActive ? '#fff' : isAi ? 'var(--gold)' : '#9da2b4',
        background: isActive
          ? isAi
            ? 'rgba(240, 180, 41, 0.15)'
            : 'rgba(255, 255, 255, 0.08)'
          : 'transparent',
        border: isActive
          ? `1px solid ${isAi ? 'rgba(240, 180, 41, 0.4)' : 'rgba(255, 255, 255, 0.14)'}`
          : '1px solid transparent',
        textDecoration: 'none',
        fontSize: '12.5px',
        fontWeight: isActive ? 600 : 400,
        transition: 'all 0.12s',
      })}
      title={collapsed ? label : undefined}
    >
      <span
        style={{
          fontSize: '14px',
          width: '18px',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>

      {!collapsed && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            {label}
          </span>
          {badge && (
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: 600,
                color: badgeColor || '#fff',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '1px 6px',
                borderRadius: '10px',
                fontFamily: "'Martian Mono', monospace",
                flexShrink: 0,
              }}
            >
              {badge}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}
