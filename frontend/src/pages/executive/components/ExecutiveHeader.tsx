import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExecutiveProfile } from '../../../lib/profileData';

interface ExecutiveHeaderProps {
  profile: ExecutiveProfile;
  onOpenEdit: () => void;
  onDownloadResume: () => void;
}

export function ExecutiveHeader({ profile, onOpenEdit, onDownloadResume }: ExecutiveHeaderProps) {
  const navigate = useNavigate();
  const [clock, setClock] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        height: '72px',
        padding: '0 36px',
        background: 'rgba(5, 7, 12, 0.88)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(240, 180, 41, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Left: Prominent Back to Workspace Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button
          onClick={() => navigate('/dashboard')}
          title="Return to JARVIS.OS Workspace Projects and Dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 18px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, rgba(240, 180, 41, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)',
            border: '1px solid rgba(240, 180, 41, 0.4)',
            color: 'var(--gold)',
            fontSize: '12.5px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(240, 180, 41, 0.22)';
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.transform = 'translateX(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(240, 180, 41, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%)';
            e.currentTarget.style.borderColor = 'rgba(240, 180, 41, 0.4)';
            e.currentTarget.style.transform = 'none';
          }}
        >
          <span style={{ fontSize: '15px' }}>←</span>
          <span>Return to Workspace</span>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Identity & Seal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f0b429 0%, #d97706 100%)',
              color: '#000',
              fontWeight: 800,
              fontSize: '14px',
              fontFamily: "'Space Grotesk', sans-serif",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(240, 180, 41, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            AG
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.03em',
                }}
              >
                {profile.name.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: '#4ade80',
                  fontFamily: "'Martian Mono', monospace",
                  fontWeight: 600,
                }}
              >
                LEVEL 9 EXECUTIVE ALPHA
              </span>
            </div>
            <div
              style={{
                fontSize: '11px',
                color: '#8e94a8',
                fontFamily: "'Martian Mono', monospace",
                marginTop: '1px',
              }}
            >
              CHIEF ARCHITECT • SOVEREIGN OPERATING DOSSIER
            </div>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Telemetry Clock */}
        <div
          style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '11px',
            fontFamily: "'Martian Mono', monospace",
            color: '#a0a6be',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
            }}
          />
          <span>{clock} IST</span>
        </div>

        {/* Edit Profile */}
        <button
          onClick={onOpenEdit}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <span>✏️</span>
          <span>Edit Profile</span>
        </button>

        {/* Download Resume CV */}
        <button
          onClick={onDownloadResume}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '6px',
            background: 'rgba(240, 180, 41, 0.12)',
            border: '1px solid rgba(240, 180, 41, 0.35)',
            color: 'var(--gold)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <span>📄</span>
          <span>Download CV</span>
        </button>

        {/* Public Showcase Platform Direct Link */}
        <a
          href="/showcase"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 16px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, #00e5ff 0%, #0099ff 100%)',
            color: '#000',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.02em',
            boxShadow: '0 0 16px rgba(0, 229, 255, 0.35)',
            transition: 'all 0.15s',
          }}
        >
          <span>Public Showcase</span>
          <span style={{ fontSize: '13px' }}>↗</span>
        </a>
      </div>
    </header>
  );
}
