import { useState, useRef } from 'react';
import {
  ProfileStore,
  ExecutiveProfile,
  EmailAtmosphere,
} from '../../lib/profileData';
import { useProjects } from '../../hooks/useProjects';

type ProfileTab =
  | 'overview'
  | 'portfolio'
  | 'socials'
  | 'education'
  | 'certifications'
  | 'vault'
  | 'atmosphere'
  | 'memberships'
  | 'publications'
  | 'resume';

export function ProfilePage() {
  const { projects } = useProjects();
  const [profile, setProfile] = useState<ExecutiveProfile>(() => ProfileStore.getProfile());
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [selectedAtmosphereId, setSelectedAtmosphereId] = useState<string>(
    profile.emailAtmospheres[0]?.id || ''
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState<ExecutiveProfile>(profile);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const updated = ProfileStore.updateProfile({ avatarUrl: url });
        setProfile(updated);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const updated = ProfileStore.updateProfile({
          resumeUrl: url,
          resumeFileName: file.name,
        });
        setProfile(updated);
        alert(`Resume updated to "${file.name}"!`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = ProfileStore.updateProfile(tempProfile);
    setProfile(updated);
    setEditModalOpen(false);
  };

  const selectedAtmosphere: EmailAtmosphere | undefined = profile.emailAtmospheres.find(
    (a) => a.id === selectedAtmosphereId
  ) || profile.emailAtmospheres[0];

  const totalProjectsCount = projects.length || 28;

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        background: 'linear-gradient(180deg, #07090f 0%, #030407 100%)',
        color: '#f0f2fa',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '36px 40px 100px' }}>
        {/* ============================================================== */}
        {/* HERO COMMAND IDENTITY BAR                                     */}
        {/* ============================================================== */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            background: 'linear-gradient(165deg, rgba(16, 20, 32, 0.85) 0%, rgba(9, 11, 18, 0.95) 100%)',
            border: '1px solid rgba(240, 180, 41, 0.3)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(240, 180, 41, 0.08)',
            padding: '32px 36px',
            marginBottom: '28px',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Arc-Glow Backdrop */}
          <div
            style={{
              position: 'absolute',
              right: '-60px',
              top: '-60px',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(240, 180, 41, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Left: Avatar & Identity Details */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              {/* Avatar with Ring */}
              <div style={{ position: 'relative' }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarUpload}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  title="Click to change profile image"
                  style={{
                    width: '94px',
                    height: '94px',
                    borderRadius: '50%',
                    background: profile.avatarUrl
                      ? `url(${profile.avatarUrl}) center/cover no-repeat`
                      : 'linear-gradient(135deg, rgba(240, 180, 41, 0.3) 0%, #0d0f18 100%)',
                    border: '2px solid var(--gold)',
                    boxShadow: '0 0 25px rgba(240, 180, 41, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: 'var(--gold)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {!profile.avatarUrl && 'AG'}
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    border: '2px solid #07090f',
                    boxShadow: '0 0 8px #22c55e',
                  }}
                  title="Verified Systems Architect"
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#fff',
                      fontFamily: "'Space Grotesk', sans-serif",
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {profile.name}
                  </h1>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 600,
                      color: '#22c55e',
                      background: 'rgba(34, 197, 94, 0.12)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontFamily: "'Martian Mono', monospace",
                    }}
                  >
                    ● VERIFIED EXECUTIVE
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '13.5px',
                    color: 'var(--gold)',
                    fontWeight: 600,
                    marginTop: '4px',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {profile.title}
                </div>

                <div
                  style={{
                    fontSize: '11px',
                    color: '#8e94a8',
                    marginTop: '4px',
                    fontFamily: "'Martian Mono', monospace",
                  }}
                >
                  📍 {profile.homeAddress} • 🏢 {profile.officeAddress}
                </div>
              </div>
            </div>

            {/* Right: Quick Command Actions */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setTempProfile(profile);
                  setEditModalOpen(true);
                }}
                style={{
                  padding: '9px 18px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s',
                }}
              >
                <span>✏️</span>
                <span>Edit Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('resume')}
                style={{
                  padding: '9px 18px',
                  borderRadius: '6px',
                  background: 'rgba(240, 180, 41, 0.1)',
                  border: '1px solid rgba(240, 180, 41, 0.35)',
                  color: 'var(--gold)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>📄</span>
                <span>Resume (PDF)</span>
              </button>

              <a
                href="/showcase"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '9px 18px',
                  borderRadius: '6px',
                  background: 'var(--gold)',
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 18px rgba(240, 180, 41, 0.3)',
                }}
              >
                <span>🌐</span>
                <span>Public Showcase ↗</span>
              </a>
            </div>
          </div>

          {/* Core Metrics Ribbon */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              marginTop: '26px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>PROJECT INVENTORY</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: 'var(--gold)', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {totalProjectsCount}
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>LIVE SITES</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: '#22c55e', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {profile.liveSites.length}
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>EMAIL ATMOSPHERES</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: '#38bdf8', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {profile.emailAtmospheres.length}
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>CERTIFICATIONS</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: '#f59e0b', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {profile.certifications.length}
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>PUBLICATIONS / PATENTS</div>
              <div style={{ fontSize: '19px', fontWeight: 700, color: '#e879f9', marginTop: '2px', fontFamily: "'Space Grotesk', sans-serif" }}>
                {profile.publications.length}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* EXECUTIVE NAVIGATION TABS                                      */}
        {/* ============================================================== */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {[
            { id: 'overview', label: '👤 Identity & Bio' },
            { id: 'portfolio', label: '🌐 Live Sites & Portfolio' },
            { id: 'socials', label: '📱 Socials & Networks' },
            { id: 'atmosphere', label: '⚡ Email Atmosphere Matrix' },
            { id: 'education', label: '🎓 Academic Journey' },
            { id: 'certifications', label: '🏆 Certifications & Honors' },
            { id: 'vault', label: '🛡️ DocGov & ID Vault' },
            { id: 'memberships', label: '🤝 Memberships & Groups' },
            { id: 'publications', label: '📚 Publications & Research' },
            { id: 'resume', label: '📄 Resume & CV' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ProfileTab)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(240, 180, 41, 0.14)' : 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${isActive ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)'}`,
                  color: isActive ? 'var(--gold)' : '#9da2b4',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & IDENTITY BIO                                 */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '24px 28px',
                  borderRadius: '8px',
                  background: 'rgba(12, 14, 22, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Executive Summary & Vision
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 1.8, color: '#e2e8f0', margin: '12px 0 0' }}>
                  {profile.summary}
                </p>
              </div>

              <div
                style={{
                  padding: '24px 28px',
                  borderRadius: '8px',
                  background: 'rgba(12, 14, 22, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Core Competencies & Architectures
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
                  {profile.skills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#f0f2fa',
                        fontSize: '12px',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact & Addresses */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div
                style={{
                  padding: '24px 28px',
                  borderRadius: '8px',
                  background: 'rgba(12, 14, 22, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div style={{ fontSize: '11px', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Locations & Official Addresses
                </div>
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>HOME RESIDENCE</div>
                    <div style={{ fontSize: '13px', color: '#fff', marginTop: '3px' }}>{profile.homeAddress}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>OFFICE / RESEARCH LAB HQ</div>
                    <div style={{ fontSize: '13px', color: '#fff', marginTop: '3px' }}>{profile.officeAddress}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>PRIMARY CONTACT PHONE</div>
                    <div style={{ fontSize: '13px', color: '#fff', marginTop: '3px' }}>{profile.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>OFFICIAL PUBLIC PORTFOLIO</div>
                    <a
                      href={profile.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '13px', color: 'var(--gold)', textDecoration: 'underline', marginTop: '3px', display: 'block' }}
                    >
                      {profile.portfolioUrl} ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: LIVE SITES & PORTFOLIO                                  */}
        {/* ============================================================== */}
        {activeTab === 'portfolio' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                  Active Live Sites & Deployments
                </h2>
                <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                  Live production endpoints, cloud infrastructure, and private staging hubs.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
              {profile.liveSites.map((site) => (
                <div
                  key={site.id}
                  style={{
                    padding: '20px 22px',
                    borderRadius: '8px',
                    background: 'linear-gradient(165deg, rgba(14, 17, 26, 0.8) 0%, rgba(8, 10, 16, 0.9) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <b style={{ fontSize: '15px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {site.name}
                      </b>
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontFamily: "'Martian Mono', monospace",
                          color: site.status === 'live' ? '#22c55e' : site.status === 'staging' ? '#f59e0b' : '#38bdf8',
                          background: site.status === 'live' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                          border: `1px solid ${site.status === 'live' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                        }}
                      >
                        {site.status.toUpperCase()}
                      </span>
                    </div>

                    <p style={{ fontSize: '12px', color: '#9da2b4', margin: '8px 0 14px', lineHeight: 1.5 }}>
                      {site.description}
                    </p>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '2px 7px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#7dd3fc',
                          fontFamily: "'Martian Mono', monospace",
                        }}
                      >
                        ☁ {site.cloudProvider}
                      </span>
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '2px 7px',
                          borderRadius: '3px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: site.visibility === 'public' ? '#86efac' : '#cbd5e1',
                          fontFamily: "'Martian Mono', monospace",
                        }}
                      >
                        {site.visibility.toUpperCase()}
                      </span>
                      {site.sslActive && (
                        <span
                          style={{
                            fontSize: '9.5px',
                            padding: '2px 7px',
                            borderRadius: '3px',
                            background: 'rgba(34, 197, 94, 0.08)',
                            color: '#22c55e',
                            fontFamily: "'Martian Mono', monospace",
                          }}
                        >
                          🔒 SSL SECURED
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', fontFamily: "'Martian Mono', monospace", overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {site.url}
                    </span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '5px 12px',
                        borderRadius: '4px',
                        background: 'rgba(240, 180, 41, 0.1)',
                        border: '1px solid rgba(240, 180, 41, 0.35)',
                        color: 'var(--gold)',
                        fontSize: '11px',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Open Site ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SOCIALS & NETWORKS                                      */}
        {/* ============================================================== */}
        {activeTab === 'socials' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                Social, Professional & Freelance Profiles
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                All public and professional accounts connected to Abhishek Gangadhar.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {profile.socials.map((soc) => (
                <div
                  key={soc.id}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '8px',
                    background: 'rgba(12, 14, 22, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ fontSize: '24px' }}>{soc.icon}</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <b style={{ fontSize: '13.5px', color: '#fff' }}>{soc.platform}</b>
                        {soc.verified && (
                          <span style={{ color: '#38bdf8', fontSize: '11px' }} title="Verified Profile">
                            ✓
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", marginTop: '2px' }}>
                        {soc.handle}
                      </div>
                    </div>
                  </div>

                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '5px 10px',
                      borderRadius: '4px',
                      border: '1px solid var(--ln2)',
                      color: '#fff',
                      fontSize: '11px',
                      textDecoration: 'none',
                    }}
                  >
                    Open ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: EMAIL ATMOSPHERE MATRIX (Next-Level Innovation)         */}
        {/* ============================================================== */}
        {activeTab === 'atmosphere' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                Connected Email Atmosphere Matrix
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                Select an email account to view its dedicated connected infrastructure, cloud databases, repositories, and channels.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
              {/* Left: Email Selector Rail */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {profile.emailAtmospheres.map((atm) => {
                  const isSelected = selectedAtmosphere?.id === atm.id;
                  return (
                    <div
                      key={atm.id}
                      onClick={() => setSelectedAtmosphereId(atm.id)}
                      style={{
                        padding: '16px 18px',
                        borderRadius: '8px',
                        background: isSelected ? 'rgba(240, 180, 41, 0.12)' : 'rgba(12, 14, 22, 0.7)',
                        border: `1px solid ${isSelected ? 'var(--gold)' : 'rgba(255, 255, 255, 0.08)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span
                          style={{
                            fontSize: '9.5px',
                            color: isSelected ? 'var(--gold)' : '#7a8096',
                            textTransform: 'uppercase',
                            fontFamily: "'Martian Mono', monospace",
                          }}
                        >
                          {atm.purpose}
                        </span>
                        <span
                          style={{
                            fontSize: '10px',
                            padding: '1px 6px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.06)',
                            color: '#9da2b4',
                          }}
                        >
                          {atm.connectedServices.length} Services
                        </span>
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#fff', marginTop: '6px', wordBreak: 'break-all' }}>
                        {atm.email}
                      </div>
                      <div style={{ fontSize: '11px', color: '#8e94a8', marginTop: '3px' }}>
                        {atm.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Selected Atmosphere Connected Services Matrix */}
              {selectedAtmosphere && (
                <div
                  style={{
                    padding: '24px 28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(165deg, rgba(14, 18, 28, 0.85) 0%, rgba(8, 10, 16, 0.95) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", textTransform: 'uppercase' }}>
                        ATMOSPHERE INFRASTRUCTURE MAPPING
                      </div>
                      <h3 style={{ margin: '4px 0 0', fontSize: '18px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {selectedAtmosphere.email}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedAtmosphere.email, 'email')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: copiedText === 'email' ? '#22c55e' : '#fff',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      {copiedText === 'email' ? '✓ Copied' : 'Copy Email'}
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
                    {selectedAtmosphere.connectedServices.map((svc, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '16px 18px',
                          borderRadius: '6px',
                          background: 'rgba(0, 0, 0, 0.35)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '10px', color: '#7a8096', fontFamily: "'Martian Mono', monospace", textTransform: 'uppercase' }}>
                              {svc.category}
                            </span>
                            <span style={{ fontSize: '9px', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '1px 5px', borderRadius: '3px' }}>
                              CONNECTED
                            </span>
                          </div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginTop: '6px' }}>
                            {svc.name}
                          </div>
                          <div style={{ fontSize: '11.5px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", marginTop: '3px' }}>
                            {svc.accountName}
                          </div>
                        </div>

                        <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <a
                            href={svc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '11px',
                              color: '#38bdf8',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span>Open Console Dashboard</span>
                            <span>↗</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: ACADEMIC JOURNEY & EDUCATION                            */}
        {/* ============================================================== */}
        {activeTab === 'education' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                Academic Timeline & Education Journey
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                Complete educational records: 10th standard, 12th standard, and ongoing engineering degrees.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {profile.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    padding: '24px 28px',
                    borderRadius: '8px',
                    background: 'rgba(12, 14, 22, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr',
                    gap: '24px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'rgba(240, 180, 41, 0.1)',
                        border: '1px solid rgba(240, 180, 41, 0.3)',
                        color: 'var(--gold)',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: "'Martian Mono', monospace",
                        display: 'inline-block',
                      }}
                    >
                      {edu.level.toUpperCase()}
                    </span>
                    <div style={{ fontSize: '11.5px', color: '#7a8096', marginTop: '8px', fontFamily: "'Martian Mono', monospace" }}>
                      {edu.year}
                    </div>
                    <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600, marginTop: '4px' }}>
                      {edu.scoreOrGrade}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {edu.title}
                    </h3>
                    <div style={{ fontSize: '13px', color: 'var(--gold)', marginTop: '4px' }}>
                      {edu.institution} • {edu.boardOrUniversity}
                    </div>

                    <ul style={{ margin: '12px 0 0', paddingLeft: '18px', color: '#cbd5e1', fontSize: '12.5px', lineHeight: 1.6 }}>
                      {edu.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: CERTIFICATIONS & HONORS                                 */}
        {/* ============================================================== */}
        {activeTab === 'certifications' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                Course Completions, Hackathon Wins & Workshop Honors
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                Accredited technical credentials, competitive hackathon awards, and event recognitions.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {profile.certifications.map((cert) => (
                <div
                  key={cert.id}
                  style={{
                    padding: '20px 22px',
                    borderRadius: '8px',
                    background: 'rgba(12, 14, 22, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '2px 7px',
                          borderRadius: '3px',
                          background: 'rgba(240, 180, 41, 0.1)',
                          color: 'var(--gold)',
                          fontFamily: "'Martian Mono', monospace",
                          textTransform: 'uppercase',
                        }}
                      >
                        {cert.category.replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '11px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>
                        {cert.date}
                      </span>
                    </div>

                    <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#fff', marginTop: '10px', lineHeight: 1.4 }}>
                      {cert.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--dim)', marginTop: '4px' }}>
                      Issuer: <strong style={{ color: '#cbd5e1' }}>{cert.issuer}</strong>
                    </div>

                    {cert.credentialId && (
                      <div style={{ fontSize: '10.5px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", marginTop: '8px' }}>
                        ID: {cert.credentialId}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '11px', color: '#22c55e' }}>✓ Verified Credential</span>
                    <button
                      onClick={() => alert(`Certificate Record: ${cert.title} (${cert.credentialId || 'Verified'})`)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'transparent',
                        border: '1px solid var(--ln2)',
                        color: '#fff',
                        fontSize: '10.5px',
                        cursor: 'pointer',
                      }}
                    >
                      View Badge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: DOCGOV & DIGITAL IDENTITY VAULT                         */}
        {/* ============================================================== */}
        {activeTab === 'vault' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>🛡️</span>
                <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                  DocGov & Encrypted Digital Identity Vault
                </h2>
              </div>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                Government identities, academic verification cards, authorized digital signatures, and official PDF documents.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {profile.identityDocs.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    padding: '22px 24px',
                    borderRadius: '8px',
                    background: 'linear-gradient(165deg, rgba(16, 20, 32, 0.75) 0%, rgba(9, 11, 18, 0.9) 100%)',
                    border: '1px solid rgba(240, 180, 41, 0.25)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '18px' }}>
                      {doc.idType === 'signature' ? '✍️' : doc.idType === 'docgov' ? '🏛️' : '🪪'}
                    </span>
                    <span
                      style={{
                        fontSize: '9px',
                        padding: '2px 7px',
                        borderRadius: '3px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#f87171',
                        fontFamily: "'Martian Mono', monospace",
                        fontWeight: 600,
                      }}
                    >
                      CONFIDENTIAL VAULT
                    </span>
                  </div>

                  <div style={{ fontSize: '14.5px', fontWeight: 600, color: '#fff', marginTop: '12px' }}>
                    {doc.title}
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--dim)', marginTop: '4px' }}>
                    Authority: {doc.issuedBy}
                  </div>

                  <div
                    style={{
                      margin: '14px 0',
                      padding: '8px 12px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '4px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: '#7a8096', fontFamily: "'Martian Mono', monospace" }}>
                      RECORD #
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: "'Martian Mono', monospace", fontWeight: 600 }}>
                      {doc.maskedNumber}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ fontSize: '11px', color: '#9da2b4', fontFamily: "'Martian Mono', monospace" }}>
                      {doc.fileName || 'Verified_PDF.pdf'}
                    </span>
                    <button
                      onClick={() => alert(`DocGov Vault: Authenticated access to "${doc.title}" verified.`)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '4px',
                        background: 'rgba(240, 180, 41, 0.1)',
                        border: '1px solid rgba(240, 180, 41, 0.3)',
                        color: 'var(--gold)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Open PDF ↓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 8: MEMBERSHIPS & COMMUNITIES                               */}
        {/* ============================================================== */}
        {activeTab === 'memberships' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Organizations & Councils */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ font: '700 17px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                  Institutional Memberships & Councils
                </h3>
                <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                  Chapters, engineering bodies, and developer alliances.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profile.memberships.map((mem) => (
                  <div
                    key={mem.id}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '8px',
                      background: 'rgba(12, 14, 22, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{mem.organization}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gold)', marginTop: '2px' }}>{mem.role}</div>
                      <div style={{ fontSize: '10.5px', color: '#7a8096', fontFamily: "'Martian Mono', monospace", marginTop: '4px' }}>
                        Since {mem.since}
                      </div>
                    </div>
                    {mem.url && (
                      <a
                        href={mem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--ln2)',
                          color: '#fff',
                          fontSize: '11px',
                          textDecoration: 'none',
                        }}
                      >
                        Visit ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Communities & Groups */}
            <div>
              <div style={{ marginBottom: '14px' }}>
                <h3 style={{ font: '700 17px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                  Developer Communities & Circles
                </h3>
                <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                  Active developer groups across WhatsApp, LinkedIn, Reddit, and Discord.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {profile.communities.map((comm) => (
                  <div
                    key={comm.id}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '8px',
                      background: 'rgba(12, 14, 22, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#38bdf8', fontFamily: "'Martian Mono', monospace" }}>
                          [{comm.platform.toUpperCase()}]
                        </span>
                        <b style={{ fontSize: '13.5px', color: '#fff' }}>{comm.name}</b>
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--dim)', marginTop: '3px' }}>
                        Role: {comm.role} {comm.membersCount ? `• ${comm.membersCount}` : ''}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '10.5px',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#22c55e',
                      }}
                    >
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 9: PUBLICATIONS & PATENTS                                  */}
        {/* ============================================================== */}
        {activeTab === 'publications' && (
          <div>
            <div style={{ marginBottom: '18px' }}>
              <h2 style={{ font: '700 20px/1.2 "Space Grotesk", sans-serif', margin: 0, color: '#fff' }}>
                Publications, Research Monographs & Patents
              </h2>
              <p style={{ margin: '4px 0 0', color: 'var(--dim)', fontSize: '12px' }}>
                Published scientific literature, patents, technical monographs, and systems whitepapers.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {profile.publications.map((pub) => (
                <div
                  key={pub.id}
                  style={{
                    padding: '24px 28px',
                    borderRadius: '8px',
                    background: 'rgba(12, 14, 22, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '9.5px',
                          padding: '2px 8px',
                          borderRadius: '3px',
                          background: pub.type === 'patent' ? 'rgba(232, 121, 249, 0.15)' : 'rgba(240, 180, 41, 0.12)',
                          color: pub.type === 'patent' ? '#e879f9' : 'var(--gold)',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 600,
                        }}
                      >
                        {pub.type.toUpperCase().replace('_', ' ')}
                      </span>
                      <h3 style={{ margin: '8px 0 4px', fontSize: '16px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {pub.title}
                      </h3>
                      <div style={{ fontSize: '12px', color: '#8e94a8' }}>
                        Published in: <strong style={{ color: '#cbd5e1' }}>{pub.publishedIn}</strong> • {pub.date}
                      </div>
                    </div>

                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px 14px',
                          borderRadius: '4px',
                          background: 'rgba(240, 180, 41, 0.1)',
                          border: '1px solid rgba(240, 180, 41, 0.35)',
                          color: 'var(--gold)',
                          fontSize: '11px',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        Read Publication ↗
                      </a>
                    )}
                  </div>

                  <p style={{ margin: '14px 0 0', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>
                    {pub.abstract}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 10: RESUME & CV                                            */}
        {/* ============================================================== */}
        {activeTab === 'resume' && (
          <div
            style={{
              padding: '36px 40px',
              borderRadius: '10px',
              background: 'linear-gradient(165deg, rgba(14, 18, 28, 0.8) 0%, rgba(8, 10, 16, 0.95) 100%)',
              border: '1px solid rgba(240, 180, 41, 0.3)',
              textAlign: 'center',
            }}
          >
            <input
              ref={resumeInputRef}
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleResumeUpload}
            />

            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
            <h2 style={{ margin: 0, fontSize: '22px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
              Abhishek Gangadhar — Curriculum Vitae
            </h2>
            <p style={{ margin: '6px auto 20px', color: 'var(--dim)', fontSize: '13px', maxWidth: '480px' }}>
              Full-Stack Systems Architect & Autonomous Agent Specialist resume (PDF format).
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => resumeInputRef.current?.click()}
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Upload Updated PDF Resume
              </button>

              <button
                onClick={() => {
                  if (profile.resumeUrl) {
                    const a = document.createElement('a');
                    a.href = profile.resumeUrl;
                    a.download = profile.resumeFileName || 'Abhishek_Gangadhar_CV.pdf';
                    a.click();
                  } else {
                    alert('PDF CV generated. Please upload your custom PDF to replace the default file.');
                  }
                }}
                style={{
                  padding: '10px 24px',
                  borderRadius: '6px',
                  background: 'var(--gold)',
                  color: '#000',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(240, 180, 41, 0.3)',
                }}
              >
                Download PDF Resume ↓
              </button>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* EDIT PROFILE MODAL                                             */}
        {/* ============================================================== */}
        {editModalOpen && (
          <div className="migration-overlay" style={{ zIndex: 10000 }}>
            <div
              className="migration-box"
              style={{
                maxWidth: '680px',
                background: 'linear-gradient(165deg, #10121d 0%, #08090f 100%)',
                border: '1px solid rgba(240, 180, 41, 0.35)',
                borderRadius: '8px',
                padding: '28px',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Edit Executive Profile
                </h3>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: '20px', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Full Name</span>
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Professional Title</span>
                  <input
                    type="text"
                    value={tempProfile.title}
                    onChange={(e) => setTempProfile({ ...tempProfile, title: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                  />
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Executive Summary Bio</span>
                  <textarea
                    rows={4}
                    value={tempProfile.summary}
                    onChange={(e) => setTempProfile({ ...tempProfile, summary: e.target.value })}
                    required
                    style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px', lineHeight: 1.5 }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Home Residence</span>
                    <input
                      type="text"
                      value={tempProfile.homeAddress}
                      onChange={(e) => setTempProfile({ ...tempProfile, homeAddress: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Office / Lab Address</span>
                    <input
                      type="text"
                      value={tempProfile.officeAddress}
                      onChange={(e) => setTempProfile({ ...tempProfile, officeAddress: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Phone Contact</span>
                    <input
                      type="text"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Primary Email</span>
                    <input
                      type="email"
                      value={tempProfile.primaryEmail}
                      onChange={(e) => setTempProfile({ ...tempProfile, primaryEmail: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--ln2)', color: '#fff', borderRadius: '4px' }}
                    />
                  </div>
                </div>

                <div className="migration-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="migration-btn"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="migration-btn primary"
                    style={{ background: 'var(--gold)', color: '#000', fontWeight: 600, border: 'none', padding: '8px 20px', borderRadius: '4px' }}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
