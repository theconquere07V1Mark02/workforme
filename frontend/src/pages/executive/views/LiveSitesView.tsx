import React, { useState } from 'react';
import { LiveSite } from '../../../lib/profileData';
import { NetlifyIcon, RenderIcon, SupabaseIcon } from '../components/BrandIcons';

interface LiveSitesViewProps {
  liveSites: LiveSite[];
}

export function LiveSitesView({ liveSites }: LiveSitesViewProps) {
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredSites = liveSites.filter((site) => {
    if (filter === 'public') return site.visibility === 'public';
    if (filter === 'private') return site.visibility === 'private';
    return true;
  });

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderCloudLogo = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'netlify':
        return <NetlifyIcon size={20} />;
      case 'render':
        return <RenderIcon size={20} />;
      case 'supabase':
        return <SupabaseIcon size={20} />;
      default:
        return <span>☁️</span>;
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
          <span>PRODUCTION INSTANCES</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>{liveSites.length} DEPLOYMENTS</span>
        </div>

        <h1
          style={{
            font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          Live Sites & Ventures
          <br />
          Production Deployments
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: '0 0 28px', maxWidth: '640px', lineHeight: 1.6 }}>
          All verified web deployments, production e-commerce platforms, and internal systems across Netlify, Render, and Supabase.
        </p>

        {/* Filter Buttons in Nettools Pill Style */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['all', 'public', 'private'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                border: 'none',
                background: filter === tab ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                color: filter === tab ? '#000000' : '#a1a1aa',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.15s ease',
              }}
            >
              {tab === 'all' ? `All (${liveSites.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Master Showcase Card */}
      <div
        style={{
          padding: '36px 40px',
          borderRadius: '18px',
          background: '#111116',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>🌟</span>
            <span style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
              CENTRAL PUBLIC PORTFOLIO
            </span>
          </div>
          <h3 style={{ font: '800 24px/1.2 "Inter", sans-serif', color: '#ffffff', margin: 0 }}>
            JARVIS Ecosystem Public Showcase Platform
          </h3>
          <p style={{ color: '#a1a1aa', fontSize: '13.5px', margin: '8px 0 0', maxWidth: '640px', lineHeight: 1.6 }}>
            The public-facing showcase platform replicating the complete project catalog, architecture research, and interactive engineering demonstrations.
          </p>
        </div>

        <a
          href="/showcase"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '12px 24px',
            borderRadius: '10px',
            background: '#ffffff',
            color: '#000000',
            fontWeight: 700,
            fontSize: '13px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
          }}
        >
          <span>Launch Public Showcase</span>
          <span>↗</span>
        </a>
      </div>

      {/* Grid of Live Sites */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '24px',
          paddingBottom: '60px',
        }}
      >
        {filteredSites.map((site) => {
          const isCopied = copiedId === site.id;

          return (
            <div
              key={site.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
                {/* Header Pills */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {renderCloudLogo(site.cloudProvider)}
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        fontWeight: 700,
                      }}
                    >
                      {site.cloudProvider.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: '#a1a1aa',
                      }}
                    >
                      {site.visibility.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '2px 8px',
                        borderRadius: '10px',
                        background: 'rgba(34, 197, 94, 0.12)',
                        color: '#4ade80',
                      }}
                    >
                      ● {site.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h4 style={{ font: '700 20px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 8px' }}>
                  {site.name}
                </h4>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#a1a1aa', margin: '0 0 18px' }}>
                  {site.description}
                </p>

                {/* Viewport Simulation Bar */}
                <div
                  style={{
                    borderRadius: '8px',
                    background: '#07070a',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '10px 14px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '10.5px', fontFamily: "'Martian Mono', monospace", color: '#71717a', marginLeft: '8px', wordBreak: 'break-all' }}>
                      🔒 https://{site.url.replace(/^https?:\/\//, '')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={() => handleCopy(site.url, site.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: isCopied ? '#22c55e' : '#a1a1aa',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    fontSize: '11px',
                    cursor: 'pointer',
                  }}
                >
                  {isCopied ? '✓ Copied' : '📋 Copy URL'}
                </button>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Launch Site</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
