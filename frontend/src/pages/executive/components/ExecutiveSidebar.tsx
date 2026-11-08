import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExecutiveViewId } from './ExecutiveNav';

interface ExecutiveSidebarProps {
  activeView: ExecutiveViewId;
  onChangeView: (view: ExecutiveViewId) => void;
  onOpenEdit: () => void;
  counts: {
    sites: number;
    atmospheres: number;
    vaultDocs: number;
    certifications: number;
    socials: number;
    publications: number;
  };
  clock: string;
}

interface NavSection {
  title: string;
  items: {
    id: ExecutiveViewId;
    label: string;
    icon: string;
    badge?: string;
  }[];
}

export function ExecutiveSidebar({
  activeView,
  onChangeView,
  onOpenEdit,
  counts,
  clock,
}: ExecutiveSidebarProps) {
  const navigate = useNavigate();

  // Prioritized from most-used daily operations down to foundational pedigree
  const sections: NavSection[] = [
    {
      title: 'COMMAND & OVERVIEW',
      items: [
        { id: 'overview', label: 'Command Dossier', icon: '👤' },
      ],
    },
    {
      title: 'ECOSYSTEM & CLOUD',
      items: [
        { id: 'sites', label: 'Live Sites & Ventures', icon: '🌐', badge: String(counts.sites) },
        { id: 'atmosphere', label: 'Email Atmosphere Matrix', icon: '⚡', badge: String(counts.atmospheres) },
        { id: 'my_public', label: 'My Public & Network Engine', icon: '📡', badge: 'PEOPLES' },
        { id: 'field_experts', label: 'Field Experts', icon: '🧠', badge: 'COMPENDIUM' },
      ],
    },
    {
      title: 'CREDENTIALS & IDENTITY',
      items: [
        { id: 'vault', label: 'DocGov & ID Vault', icon: '🛡️', badge: String(counts.vaultDocs) },
        { id: 'resume', label: 'Curriculum Vitae (PDF)', icon: '📄' },
        { id: 'socials', label: 'Social & Networks', icon: '📱', badge: String(counts.socials) },
        { id: 'credentials', label: 'Certifications & Honors', icon: '🏆', badge: String(counts.certifications) },
      ],
    },
    {
      title: 'PEDIGREE & RESEARCH',
      items: [
        { id: 'academics', label: 'Academic Journey', icon: '🎓' },
        { id: 'publications', label: 'Publications & Patents', icon: '📚', badge: String(counts.publications) },
        { id: 'communities', label: 'Memberships & Guilds', icon: '🤝' },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: '300px',
        height: '100vh',
        background: '#09090c',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        zIndex: 60,
        fontFamily: "'Inter', sans-serif",
        color: '#f4f4f5',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Top Section: Back to Workspace Button */}
      <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <button
          onClick={() => navigate('/dashboard')}
          title="Return to JARVIS.OS Workspace"
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '11px 16px',
            borderRadius: '10px',
            background: '#ffffff',
            color: '#000000',
            border: 'none',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.01em',
            boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.15)';
          }}
        >
          <span style={{ fontSize: '15px' }}>←</span>
          <span>Return to Workspace</span>
        </button>
      </div>

      {/* Identity Brand Seal */}
      <div
        style={{
          padding: '18px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.01)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f0b429 0%, #d97706 100%)',
            color: '#000',
            fontWeight: 800,
            fontSize: '15px',
            fontFamily: "'Space Grotesk', sans-serif",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(240, 180, 41, 0.35)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            flexShrink: 0,
          }}
        >
          AG
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '14.5px',
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Space Grotesk', sans-serif",
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              Abhishek G.
            </span>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                flexShrink: 0,
              }}
            />
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#8b91a5',
              fontFamily: "'Martian Mono', monospace",
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              marginTop: '1px',
            }}
          >
            LEVEL 9 • ARCHITECT
          </div>
        </div>
      </div>

      {/* Prioritized Navigation Sections */}
      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: '#71717a',
                letterSpacing: '0.12em',
                fontFamily: "'Martian Mono', monospace",
                padding: '0 10px 8px',
                textTransform: 'uppercase',
              }}
            >
              {section.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {section.items.map((item) => {
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      background: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#000000' : '#a1a1aa',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "'Inter', sans-serif",
                      cursor: 'pointer',
                      transition: 'all 0.12s ease',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#a1a1aa';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <span style={{ fontSize: '15px' }}>{item.icon}</span>
                      <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {item.label}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: "'Martian Mono', monospace",
                          padding: '2px 7px',
                          borderRadius: '12px',
                          background: isActive ? '#000000' : 'rgba(255, 255, 255, 0.08)',
                          color: isActive ? '#ffffff' : '#a1a1aa',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sticky Controls */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(5, 6, 10, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onOpenEdit}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#d4d4d8',
              fontSize: '11.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>✏️</span>
            <span>Edit Data</span>
          </button>

          <a
            href="/showcase"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#00e5ff',
              fontSize: '11.5px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <span>Showcase</span>
            <span style={{ fontSize: '11px' }}>↗</span>
          </a>
        </div>

        {/* Live Telemetry Clock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '10.5px',
            color: '#71717a',
            fontFamily: "'Martian Mono', monospace",
            paddingTop: '4px',
          }}
        >
          <span>IST TELEMETRY</span>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>{clock}</span>
        </div>
      </div>
    </aside>
  );
}
