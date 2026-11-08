import React, { useState } from 'react';
import { ExecutiveProfile, IdentityDoc } from '../../../lib/profileData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { SecureActionModal, SecureActionType } from '../components/SecureActionModal';

interface DossierOverviewViewProps {
  profile: ExecutiveProfile;
  totalProjects: number;
  onUpdateAvatar: (dataUrl: string) => void;
  onNavigateView: (viewId: any) => void;
}

export function DossierOverviewView({
  profile,
  totalProjects,
  onUpdateAvatar,
  onNavigateView,
}: DossierOverviewViewProps) {
  const [previewDoc, setPreviewDoc] = useState<IdentityDoc | null>(null);
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');

  const handleInspectAvatar = () => {
    const doc: IdentityDoc = {
      id: 'avatar',
      title: 'Abhishek Gangadhar — Executive Portrait',
      idType: 'signature',
      maskedNumber: 'UIDAI-VERIFIED-AG07',
      issuedBy: 'Official Identity Authority',
      fileName: 'Abhishek_Gangadhar_Portrait.jpg',
      docUrl: profile.avatarUrl,
      isPrivate: true,
    };
    setPreviewDoc(doc);
  };

  const handleTriggerAvatarAction = (action: SecureActionType) => {
    setSecureActionType(action);
    setSecureModalOpen(true);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', color: '#f4f4f5' }}>
      {/* ======================================================== */}
      {/* 1. MASTER IDENTITY PROFILE CARD (PLACED UPSIDE / TOP)    */}
      {/* ======================================================== */}
      <div
        style={{
          borderRadius: '18px',
          background: '#111116',
          border: '1px solid rgba(255, 255, 255, 0.09)',
          padding: '36px 40px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '36px',
          alignItems: 'center',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          position: 'relative',
        }}
      >
        {/* Left: Interactive Avatar Carrying Box */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div
            onClick={handleInspectAvatar}
            title="Click to inspect executive portrait"
            style={{
              width: '136px',
              height: '136px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #181c2e 0%, #0d0f1a 100%)',
              border: '2.5px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 0 24px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span
                style={{
                  fontSize: '44px',
                  fontWeight: 800,
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                AG
              </span>
            )}

            {/* Hover overlay hint */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.65)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.15s ease',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 600,
                textAlign: 'center',
                padding: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
            >
              👁️ Inspect
            </div>
          </div>

          <div
            style={{
              fontSize: '10px',
              fontFamily: "'Martian Mono', monospace",
              padding: '2px 8px',
              borderRadius: '12px',
              background: 'rgba(34, 197, 94, 0.12)',
              color: '#4ade80',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
            <span>LEVEL 9 • VERIFIED</span>
          </div>

          {/* Quick Portrait Security Actions (View, Upload, Download, Share with GOVabhi) */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleInspectAvatar}
              title="Inspect Portrait"
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d4d4d8',
                fontSize: '10.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              👁️ View
            </button>
            <button
              onClick={() => handleTriggerAvatarAction('upload')}
              title="Upload New Portrait (Password Required)"
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d4d4d8',
                fontSize: '10.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⬆️ Upload
            </button>
            <button
              onClick={() => handleTriggerAvatarAction('share')}
              title="Share Portrait Link (Password Required)"
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#d4d4d8',
                fontSize: '10.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🔗 Share
            </button>
            <button
              onClick={() => handleTriggerAvatarAction('download')}
              title="Download Portrait (Password Required)"
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: '#ffffff',
                border: 'none',
                color: '#000000',
                fontSize: '10.5px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ⬇️ Download
            </button>
          </div>
        </div>

        {/* Center: Identity Details & Verification Seals */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '10.5px',
                fontFamily: "'Martian Mono', monospace",
                padding: '3px 10px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                letterSpacing: '0.12em',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              PRIMARY IDENTIFIER
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Martian Mono', monospace",
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(34, 197, 94, 0.14)',
                color: '#22c55e',
                fontWeight: 700,
              }}
            >
              ● UIDAI & DIGILOCKER VERIFIED
            </span>
            <span
              style={{
                fontSize: '10px',
                fontFamily: "'Martian Mono', monospace",
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(0, 229, 255, 0.12)',
                color: '#00e5ff',
                fontWeight: 700,
              }}
            >
              ● HARDWARE ENCRYPTED
            </span>
          </div>

          <h1
            style={{
              font: '800 38px/1.15 "Inter", -apple-system, sans-serif',
              color: '#ffffff',
              letterSpacing: '-0.03em',
              margin: '0 0 6px',
            }}
          >
            {profile.name}
          </h1>

          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: '#a1a1aa',
              marginBottom: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {profile.title}
          </div>

          {/* Quick Contact & Geographic Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div
              onClick={() => copyToClipboard(profile.primaryEmail, 'Primary Email')}
              title="Click to copy primary email"
              style={{
                fontSize: '12px',
                color: '#d4d4d8',
                background: '#181822',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
              }}
            >
              <span>✉️</span>
              <span style={{ fontFamily: "'Martian Mono', monospace", fontSize: '11px' }}>{profile.primaryEmail}</span>
              <span style={{ color: '#71717a', fontSize: '10px' }}>📋</span>
            </div>

            <div
              style={{
                fontSize: '12px',
                color: '#d4d4d8',
                background: '#181822',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>📍</span>
              <span>{profile.homeAddress}</span>
            </div>

            <div
              style={{
                fontSize: '12px',
                color: '#d4d4d8',
                background: '#181822',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🔬</span>
              <span>{profile.officeAddress}</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Pill Triggers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '180px' }}>
          <button
            onClick={() => onNavigateView('resume')}
            style={{
              padding: '11px 18px',
              borderRadius: '9px',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
            }}
          >
            <span>📄</span>
            <span>Download CV (PDF)</span>
          </button>

          <button
            onClick={() => onNavigateView('vault')}
            style={{
              padding: '10px 18px',
              borderRadius: '9px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>🛡️</span>
            <span>DocGov Vault</span>
          </button>

          <a
            href="/showcase"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 18px',
              borderRadius: '9px',
              background: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              color: '#00e5ff',
              fontSize: '12.5px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span>Public Showcase</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ARCHITECTURAL MANIFESTO & MISSION (PLACED AT DWN/BELOW)*/}
      {/* ======================================================== */}
      <div
        style={{
          borderRadius: '18px',
          background: '#111116',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '36px 40px',
          marginBottom: '32px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '10.5px',
            fontFamily: "'Martian Mono', monospace",
            color: '#a1a1aa',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}
        >
          <span>EXECUTIVE MISSION & SYSTEM ARCHITECTURE</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>AUTONOMOUS ECOSYSTEM</span>
        </div>

        <h2
          style={{
            font: '800 32px/1.22 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.025em',
            margin: '0 0 16px',
            maxWidth: '980px',
          }}
        >
          Building Sovereign Intelligence, High-Throughput CAD & Cloud Distributed Engines
        </h2>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: '#a1a1aa',
            margin: '0 0 28px',
            maxWidth: '1000px',
          }}
        >
          {profile.summary}
        </p>

        {/* Action Buttons in Nettools Pill Style */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => onNavigateView('sites')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.15)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <span>Live Sites & Ventures ({profile.liveSites.length})</span>
            <span>↗</span>
          </button>

          <button
            onClick={() => onNavigateView('atmosphere')}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            <span>Email Atmospheres ({profile.emailAtmospheres.length})</span>
            <span>⚡</span>
          </button>

          <button
            onClick={() => onNavigateView('vault')}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            <span>DocGov & ID Vault ({profile.identityDocs.length})</span>
            <span>🛡️</span>
          </button>

          <button
            onClick={() => onNavigateView('socials')}
            style={{
              padding: '12px 22px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
          >
            <span>Social & Networks ({profile.socials.length})</span>
            <span>📱</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. TELEMETRY METRIC RIBBON BAR                           */}
      {/* ======================================================== */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontFamily: "'Martian Mono', monospace",
          fontSize: '11px',
          color: '#71717a',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '36px',
          background: 'rgba(255, 255, 255, 0.01)',
          borderRadius: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#ffffff' }}>•</span>
          <span style={{ color: '#ffffff', fontWeight: 700 }}>{totalProjects} REPOSITORIES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#22c55e' }}>•</span>
          <span style={{ color: '#22c55e', fontWeight: 700 }}>{profile.liveSites.length} LIVE SITES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#00e5ff' }}>•</span>
          <span style={{ color: '#00e5ff', fontWeight: 700 }}>{profile.emailAtmospheres.length} ATMOSPHERES</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#f0b429' }}>•</span>
          <span style={{ color: '#f0b429', fontWeight: 700 }}>LEVEL 9 EXECUTIVE CLEARANCE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#e879f9' }}>•</span>
          <span style={{ color: '#e879f9', fontWeight: 700 }}>HARDWARE ENCRYPTED</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. CORE ARCHITECTURAL PILLARS & PLATFORMS                */}
      {/* ======================================================== */}
      <div
        style={{
          fontSize: '11px',
          fontFamily: "'Martian Mono', monospace",
          letterSpacing: '0.14em',
          color: '#71717a',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}
      >
        CORE ARCHITECTURAL PILLARS & PLATFORMS
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
        }}
      >
        {/* Card 1: StarkForge CAD */}
        <div
          onClick={() => onNavigateView('sites')}
          style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#111116',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>⚙️</span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '3px 8px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: '#a1a1aa',
                  fontWeight: 600,
                }}
              >
                WEBGL / 3D
              </span>
            </div>
            <h3 style={{ font: '700 22px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 8px' }}>
              StarkForge CAD Engine
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              Browser-native parametric CAD suite utilizing WebGL, WebAssembly SIMD, and custom GLSL vertex shaders for high-density topological meshing.
            </p>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', marginTop: '16px' }}>
            Inspect System →
          </div>
        </div>

        {/* Card 2: Sovereign OS */}
        <div
          onClick={() => onNavigateView('publications')}
          style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#111116',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>🛡️</span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '3px 8px',
                  borderRadius: '10px',
                  background: 'rgba(240, 180, 41, 0.1)',
                  color: 'var(--gold)',
                  fontWeight: 600,
                }}
              >
                PATENT PENDING
              </span>
            </div>
            <h3 style={{ font: '700 22px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 8px' }}>
              Sovereign Microkernel OS
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              Hardware-isolated distributed personal operating system architecture with cryptographic process IPC, memory sandboxing, and autonomous storage.
            </p>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', marginTop: '16px' }}>
            Read Patent Disclosure →
          </div>
        </div>

        {/* Card 3: Gauri Idols */}
        <div
          onClick={() => onNavigateView('sites')}
          style={{
            padding: '32px',
            borderRadius: '16px',
            background: '#111116',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '220px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '28px' }}>🛍️</span>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '3px 8px',
                  borderRadius: '10px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  color: '#22c55e',
                  fontWeight: 600,
                }}
              >
                LIVE COMMERCE
              </span>
            </div>
            <h3 style={{ font: '700 22px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 8px' }}>
              Gauri Idols Commercial Suite
            </h3>
            <p style={{ color: '#a1a1aa', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
              Production e-commerce platform deployed on Netlify Edge featuring real-time 3D model previews, Stripe payment processing, and inventory telemetry.
            </p>
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#ffffff', marginTop: '16px' }}>
            Launch Production Instance →
          </div>
        </div>
      </div>

      {/* High-Fidelity Portrait Preview Modal */}
      <DocumentPreviewModal
        doc={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />

      {/* Portrait Security Action Clearance Modal (Password: GOVabhi) */}
      <SecureActionModal
        isOpen={secureModalOpen}
        actionType={secureActionType}
        target={{
          id: 'avatar',
          title: 'Abhishek Gangadhar — Executive Portrait',
          docUrl: profile.avatarUrl,
          fileName: 'Abhishek_Gangadhar_Portrait.jpg',
        }}
        onClose={() => setSecureModalOpen(false)}
        onSuccess={(dataUrl) => {
          if (secureActionType === 'upload' && dataUrl) {
            onUpdateAvatar(dataUrl);
          }
        }}
      />
    </div>
  );
}
