import React from 'react';

export type ExecutiveViewId =
  | 'overview'
  | 'sites'
  | 'atmosphere'
  | 'my_public'
  | 'field_experts'
  | 'vault'
  | 'academics'
  | 'credentials'
  | 'socials'
  | 'communities'
  | 'publications'
  | 'resume';

interface NavItem {
  id: ExecutiveViewId;
  label: string;
  icon: string;
  badge?: string;
}

interface ExecutiveNavProps {
  activeView: ExecutiveViewId;
  onChangeView: (view: ExecutiveViewId) => void;
  counts: {
    sites: number;
    atmospheres: number;
    vaultDocs: number;
    certifications: number;
    socials: number;
    publications: number;
  };
}

export function ExecutiveNav({ activeView, onChangeView, counts }: ExecutiveNavProps) {
  const navItems: NavItem[] = [
    { id: 'overview', label: 'Command Dossier', icon: '👤' },
    { id: 'sites', label: 'Live Sites & Ventures', icon: '🌐', badge: String(counts.sites) },
    { id: 'atmosphere', label: 'Email Atmosphere Matrix', icon: '⚡', badge: String(counts.atmospheres) },
    { id: 'vault', label: 'DocGov & ID Vault', icon: '🛡️', badge: String(counts.vaultDocs) },
    { id: 'academics', label: 'Academic Journey', icon: '🎓' },
    { id: 'credentials', label: 'Certifications & Honors', icon: '🏆', badge: String(counts.certifications) },
    { id: 'socials', label: 'Social & Networks', icon: '📱', badge: String(counts.socials) },
    { id: 'communities', label: 'Memberships & Guilds', icon: '🤝' },
    { id: 'publications', label: 'Publications & Patents', icon: '📚', badge: String(counts.publications) },
    { id: 'resume', label: 'Curriculum Vitae (PDF)', icon: '📄' },
  ];

  return (
    <nav
      style={{
        padding: '16px 36px 0',
        background: 'rgba(6, 8, 14, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'none',
        position: 'sticky',
        top: '72px',
        zIndex: 45,
        backdropFilter: 'blur(16px)',
      }}
    >
      {navItems.map((item) => {
        const isActive = activeView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChangeView(item.id)}
            style={{
              padding: '12px 18px',
              borderRadius: '8px 8px 0 0',
              background: isActive
                ? 'linear-gradient(180deg, rgba(240, 180, 41, 0.16) 0%, rgba(240, 180, 41, 0.03) 100%)'
                : 'transparent',
              borderTop: isActive ? '2px solid var(--gold)' : '2px solid transparent',
              borderLeft: isActive ? '1px solid rgba(240, 180, 41, 0.3)' : '1px solid transparent',
              borderRight: isActive ? '1px solid rgba(240, 180, 41, 0.3)' : '1px solid transparent',
              borderBottom: 'none',
              color: isActive ? '#fff' : '#949bb2',
              fontSize: '13px',
              fontWeight: isActive ? 700 : 500,
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = '#949bb2';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ fontSize: '15px' }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge && (
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isActive ? 'rgba(240, 180, 41, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  color: isActive ? 'var(--gold)' : '#8389a0',
                  fontWeight: 700,
                }}
              >
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
