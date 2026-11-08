import React from 'react';
import { MembershipEntry, CommunityEntry } from '../../../lib/profileData';

interface CommunitiesViewProps {
  memberships: MembershipEntry[];
  communities: CommunityEntry[];
}

export function CommunitiesView({ memberships, communities }: CommunitiesViewProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'WhatsApp':
        return '🟢';
      case 'LinkedIn':
        return '💼';
      case 'Reddit':
        return '🔴';
      case 'Discord':
        return '💬';
      case 'Telegram':
        return '✈️';
      default:
        return '🌐';
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', color: '#f4f4f5' }}>
      {/* Nettools Header Block */}
      <div style={{ padding: '24px 0 36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '11px',
            fontFamily: "'Martian Mono', monospace",
            color: '#a1a1aa',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          <span>ENGINEERING GUILDS</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>COMMUNITY NETWORKS</span>
        </div>

        <h1
          style={{
            font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          Memberships & Guilds
          <br />
          Engineering Networks
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Professional organization memberships including Google Developer Groups and IEEE, alongside active developer networks across WhatsApp, LinkedIn, Reddit, and Discord.
        </p>
      </div>

      {/* Section 1: Official Memberships */}
      <div style={{ marginBottom: '48px' }}>
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
          OFFICIAL INSTITUTIONAL MEMBERSHIPS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {memberships.map((mem) => (
            <div
              key={mem.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'all 0.2s ease',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: "'Martian Mono', monospace",
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    {mem.category.replace('_', ' ').toUpperCase()}
                  </span>
                  <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    SINCE {mem.since}
                  </span>
                </div>

                <h4 style={{ font: '700 20px/1.25 "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px' }}>
                  {mem.organization}
                </h4>

                <div style={{ fontSize: '14px', color: '#a1a1aa' }}>
                  Role: <strong style={{ color: '#ffffff' }}>{mem.role}</strong>
                </div>
              </div>

              {mem.url && (
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                  <a
                    href={mem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ffffff',
                      fontSize: '12px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Visit Organization</span>
                    <span>↗</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Communities & Groups */}
      <div style={{ paddingBottom: '60px' }}>
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
          ACTIVE DEVELOPER NETWORKS & HUBS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {communities.map((comm) => (
            <div
              key={comm.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'all 0.2s ease',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{getPlatformIcon(comm.platform)}</span>
                    <span style={{ fontSize: '11.5px', color: '#ffffff', fontWeight: 600 }}>{comm.platform}</span>
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontFamily: "'Martian Mono', monospace",
                    }}
                  >
                    {comm.role.toUpperCase()}
                  </span>
                </div>

                <h4 style={{ font: '700 19px/1.25 "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px' }}>
                  {comm.name}
                </h4>

                {comm.membersCount && (
                  <div style={{ fontSize: '12px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    SIZE: {comm.membersCount}
                  </div>
                )}
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11.5px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                  {comm.handleOrLink}
                </span>

                <button
                  onClick={() => alert(`Connecting to community: ${comm.name} on ${comm.platform}`)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Join Hub ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
