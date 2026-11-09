import React, { useState } from 'react';
import { EmailAtmosphere, ConnectedService } from '../../../lib/profileData';
import {
  SupabaseIcon,
  RenderIcon,
  NetlifyIcon,
  GitHubIcon,
  GoogleCloudIcon,
  YouTubeIcon,
  DigiLockerIcon,
} from '../components/BrandIcons';

interface AtmosphereMatrixViewProps {
  atmospheres: EmailAtmosphere[];
}

export function AtmosphereMatrixView({ atmospheres }: AtmosphereMatrixViewProps) {
  const [selectedId, setSelectedId] = useState<string>(atmospheres[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPurpose, setFilterPurpose] = useState<string>('all');
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // New service add modal state
  const [isAddingService, setIsAddingService] = useState(false);
  const [newSvcName, setNewSvcName] = useState('');
  const [newSvcCategory, setNewSvcCategory] = useState<ConnectedService['category']>('backend');
  const [newSvcAccount, setNewSvcAccount] = useState('');
  const [newSvcUrl, setNewSvcUrl] = useState('');

  const selected = atmospheres.find((a) => a.id === selectedId) || atmospheres[0];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard!`);
  };

  const getWebmailUrl = (email: string) => {
    if (email.includes('@sit.ac.in')) return 'https://mail.google.com/a/sit.ac.in';
    if (email.includes('@outlook.com') || email.includes('@hotmail.com')) return 'https://outlook.live.com';
    return 'https://mail.google.com';
  };

  const renderServiceLogo = (svc: ConnectedService) => {
    const name = svc.name.toLowerCase();
    if (name.includes('supabase')) return <SupabaseIcon size={26} />;
    if (name.includes('render')) return <RenderIcon size={26} />;
    if (name.includes('netlify')) return <NetlifyIcon size={26} />;
    if (name.includes('github') || name.includes('git')) return <GitHubIcon size={26} />;
    if (name.includes('google') || name.includes('gcp') || name.includes('analytics')) return <GoogleCloudIcon size={26} />;
    if (name.includes('youtube')) return <YouTubeIcon size={26} />;
    if (name.includes('digilocker')) return <DigiLockerIcon size={26} />;

    switch (svc.category) {
      case 'database':
        return <span style={{ fontSize: '24px' }}>🗄️</span>;
      case 'hosting':
        return <span style={{ fontSize: '24px' }}>☁️</span>;
      case 'backend':
        return <span style={{ fontSize: '24px' }}>⚙️</span>;
      case 'git':
        return <span style={{ fontSize: '24px' }}>🐙</span>;
      case 'media':
        return <span style={{ fontSize: '24px' }}>🎥</span>;
      case 'finance':
        return <span style={{ fontSize: '24px' }}>💳</span>;
      default:
        return <span style={{ fontSize: '24px' }}>🔗</span>;
    }
  };

  // Filter 20+ atmospheres by search query and purpose
  const filteredAtmospheres = atmospheres.filter((atm) => {
    const matchesSearch =
      atm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atm.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      atm.connectedServices.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPurpose =
      filterPurpose === 'all' || atm.purpose.toLowerCase().includes(filterPurpose.toLowerCase());

    return matchesSearch && matchesPurpose;
  });

  const filteredServices = (selected?.connectedServices || []).filter((s) => {
    if (activeFilterCategory === 'all') return true;
    return s.category === activeFilterCategory;
  });

  // Telemetry counts for the selected atmosphere
  const dbCount = selected?.connectedServices.filter((s) => s.category === 'database').length || 0;
  const hostingCount = selected?.connectedServices.filter((s) => s.category === 'hosting').length || 0;
  const backendCount = selected?.connectedServices.filter((s) => s.category === 'backend').length || 0;
  const gitCount = selected?.connectedServices.filter((s) => s.category === 'git').length || 0;
  const financeCount = selected?.connectedServices.filter((s) => s.category === 'finance' || s.category === 'media').length || 0;

  const handleSaveNewService = () => {
    if (!newSvcName) {
      alert('Please enter a service name.');
      return;
    }
    const created: ConnectedService = {
      name: newSvcName,
      category: newSvcCategory,
      accountName: newSvcAccount || 'Active Account',
      url: newSvcUrl || 'https://google.com',
      status: 'active',
    };
    if (selected) {
      selected.connectedServices.push(created);
    }
    setIsAddingService(false);
    setNewSvcName('');
    setNewSvcAccount('');
    setNewSvcUrl('');
    alert(`Service "${created.name}" attached to ${selected?.email}!`);
  };

  return (
    <div style={{ width: '100%', color: '#f4f4f5' }}>
      {/* ======================================================== */}
      {/* 1. TOP HEADER BLOCK (SPACIOUS, NETTOOLS STYLE)           */}
      {/* ======================================================== */}
      <div style={{ padding: '0 0 32px' }}>
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
            marginBottom: '16px',
          }}
        >
          <span>MULTI-CLOUD IDENTITY MATRIX</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>{atmospheres.length} REGISTERED ATMOSPHERES</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1
              style={{
                font: '800 42px/1.15 "Inter", -apple-system, sans-serif',
                color: '#ffffff',
                letterSpacing: '-0.03em',
                margin: '0 0 10px',
              }}
            >
              Email Atmosphere Matrix
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '880px', lineHeight: 1.6 }}>
              Comprehensive infrastructure directory mapping each of your 20+ email accounts to its bound cloud backends, Supabase databases, Netlify edges, GitHub orgs, payment gateways, and telemetry endpoints.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsAddingService(true)}
              style={{
                padding: '11px 22px',
                borderRadius: '9px',
                background: '#ffffff',
                border: 'none',
                color: '#000000',
                fontSize: '13px',
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(255, 255, 255, 0.15)',
              }}
            >
              <span>+</span>
              <span>Attach Cloud Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. EXPANDED MASTER-DETAIL GRID (420px Left | 1fr Right) */}
      {/* ======================================================== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(380px, 420px) 1fr',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* ======================================================== */}
        {/* LEFT RAIL: 20+ ACCOUNTS EXPLORER & QUICK FILTERS         */}
        {/* ======================================================== */}
        <div
          style={{
            borderRadius: '18px',
            background: '#111116',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header & Match Counter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: '#a1a1aa', fontWeight: 700, letterSpacing: '0.1em' }}>
              DIRECTORIES ({filteredAtmospheres.length}/{atmospheres.length})
            </span>
            <span style={{ fontSize: '11px', color: '#22c55e', fontFamily: "'Martian Mono', monospace" }}>
              ● ALL ACTIVE
            </span>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by email, service or label..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: '10px',
                background: '#181822',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '13px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <span style={{ position: 'absolute', left: '13px', top: '13px', color: '#71717a', fontSize: '14px' }}>
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '11px',
                  background: 'none',
                  border: 'none',
                  color: '#a1a1aa',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Purpose Filters */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All', count: atmospheres.length },
              { id: 'Developer', label: 'Dev', count: atmospheres.filter((a) => a.purpose.includes('Developer')).length },
              { id: 'Academic', label: 'Acad', count: atmospheres.filter((a) => a.purpose.includes('Academic')).length },
              { id: 'Business', label: 'Biz', count: atmospheres.filter((a) => a.purpose.includes('Business')).length },
              { id: 'Personal', label: 'Personal', count: atmospheres.filter((a) => a.purpose.includes('Personal')).length },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterPurpose(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '7px',
                  border: 'none',
                  background: filterPurpose === cat.id ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: filterPurpose === cat.id ? '#000000' : '#a1a1aa',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'all 0.12s ease',
                }}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Scrollable List of 20+ Emails (Expansive & Un-crunched) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: 'calc(100vh - 340px)',
              overflowY: 'auto',
              paddingRight: '6px',
            }}
          >
            {filteredAtmospheres.map((atm) => {
              const isSelected = atm.id === selected?.id;

              return (
                <div
                  key={atm.id}
                  onClick={() => setSelectedId(atm.id)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: '12px',
                    background: isSelected ? '#ffffff' : '#171720',
                    color: isSelected ? '#000000' : '#ffffff',
                    border: isSelected ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 20px rgba(255, 255, 255, 0.12)' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                      e.currentTarget.style.background = '#20202c';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.background = '#171720';
                    }
                  }}
                >
                  {/* Top Row: Purpose Tag & Service Count */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: isSelected ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.08)',
                        color: isSelected ? '#000000' : '#a1a1aa',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {atm.purpose}
                    </span>

                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: "'Martian Mono', monospace",
                        color: isSelected ? '#3f3f46' : '#71717a',
                        fontWeight: 600,
                      }}
                    >
                      {atm.connectedServices.length} linked svcs
                    </span>
                  </div>

                  {/* Email Address - Bold & Legible */}
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      wordBreak: 'break-all',
                      lineHeight: 1.35,
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {atm.email}
                  </div>

                  {/* Atmosphere Label */}
                  <div
                    style={{
                      fontSize: '12px',
                      color: isSelected ? '#4b5563' : '#8b91a5',
                      marginTop: '4px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {atm.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COMMAND DECK: ENLARGED, SPACIOUS & RICH COCKPIT    */}
        {/* ======================================================== */}
        {selected && (
          <div
            style={{
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '36px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header of Active Deck */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '28px',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: "'Martian Mono', monospace",
                      padding: '3px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                    }}
                  >
                    {selected.purpose.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(34, 197, 94, 0.12)',
                      color: '#4ade80',
                      fontFamily: "'Martian Mono', monospace",
                      fontWeight: 700,
                    }}
                  >
                    ● OAUTH 2FA ACTIVE
                  </span>
                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(0, 229, 255, 0.1)',
                      color: '#00e5ff',
                      fontFamily: "'Martian Mono', monospace",
                      fontWeight: 700,
                    }}
                  >
                    ● TLS 1.3 SECURED
                  </span>
                </div>

                <h2
                  style={{
                    font: '800 34px/1.2 "Inter", -apple-system, sans-serif',
                    color: '#ffffff',
                    margin: '0 0 6px',
                    wordBreak: 'break-all',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {selected.email}
                </h2>

                <div style={{ color: '#a1a1aa', fontSize: '15px' }}>
                  {selected.label}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleCopyEmail(selected.email)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: copiedEmail ? '#22c55e' : '#ffffff',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{copiedEmail ? '✓' : '📋'}</span>
                  <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Address'}</span>
                </button>

                <a
                  href={getWebmailUrl(selected.email)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    color: '#ffffff',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>🌐</span>
                  <span>Open Webmail</span>
                  <span style={{ fontSize: '11px' }}>↗</span>
                </a>

                <button
                  onClick={() => setIsAddingService(true)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <span>+</span>
                  <span>Attach Service</span>
                </button>
              </div>
            </div>

            {/* ======================================================== */}
            {/* ATMOSPHERE TELEMETRY STRIP (4 Large Stat Metric Cards)   */}
            {/* ======================================================== */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
              }}
            >
              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#16161f',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                  DATABASES & STORAGE
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#3ECF8E', marginTop: '6px' }}>
                  {dbCount}
                </div>
                <div style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '4px' }}>
                  PostgreSQL, Supabase instances
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#16161f',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                  HOSTING & EDGE COMPUTE
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#00e5ff', marginTop: '6px' }}>
                  {hostingCount + backendCount}
                </div>
                <div style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '4px' }}>
                  Render, Netlify & Cloud VMs
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#16161f',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                  REPOSITORIES & GIT
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '6px' }}>
                  {gitCount}
                </div>
                <div style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '4px' }}>
                  GitHub Orgs & Deploy Keys
                </div>
              </div>

              <div
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: '#16161f',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                  GATEWAYS & CHANNELS
                </div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f0b429', marginTop: '6px' }}>
                  {financeCount}
                </div>
                <div style={{ fontSize: '11.5px', color: '#a1a1aa', marginTop: '4px' }}>
                  Stripe, YouTube & Merchant APIs
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* CATEGORY FILTER PILLS & SERVICES GRID                    */}
            {/* ======================================================== */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                  CONNECTED CLOUD INFRASTRUCTURE ({filteredServices.length} ACTIVE SERVICES)
                </div>

                <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '8px' }}>
                  {['all', 'database', 'hosting', 'backend', 'git', 'media', 'finance'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilterCategory(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        background: activeFilterCategory === cat ? '#ffffff' : 'transparent',
                        color: activeFilterCategory === cat ? '#000000' : '#8e94a8',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Large, Spacious Service Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '22px',
                }}
              >
                {filteredServices.map((svc, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '26px 28px',
                      borderRadius: '16px',
                      background: '#161620',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '18px',
                      minHeight: '210px',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {renderServiceLogo(svc)}
                          <span
                            style={{
                              fontSize: '11px',
                              color: '#a1a1aa',
                              fontFamily: "'Martian Mono', monospace",
                              textTransform: 'uppercase',
                              fontWeight: 700,
                            }}
                          >
                            {svc.category}
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: '10px',
                            padding: '3px 9px',
                            borderRadius: '10px',
                            background: 'rgba(34, 197, 94, 0.12)',
                            color: '#4ade80',
                            fontFamily: "'Martian Mono', monospace",
                            fontWeight: 700,
                          }}
                        >
                          ● PRODUCTION ACTIVE
                        </span>
                      </div>

                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
                        {svc.name}
                      </div>

                      <div
                        onClick={() => copyToClipboard(svc.accountName, 'Service Account Identifier')}
                        title="Click to copy identifier"
                        style={{
                          fontSize: '12px',
                          color: '#ffffff',
                          fontFamily: "'Martian Mono', monospace",
                          marginTop: '10px',
                          background: 'rgba(0, 0, 0, 0.5)',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.07)',
                          wordBreak: 'break-all',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <span>{svc.accountName}</span>
                        <span style={{ color: '#71717a', fontSize: '11px' }}>📋</span>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                        STATUS: ONLINE
                      </span>

                      <a
                        href={svc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          borderRadius: '7px',
                          background: '#ffffff',
                          color: '#000000',
                          fontSize: '12px',
                          fontWeight: 700,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <span>Launch Console</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                ))}

                {/* Prominent Quick-Add Card in the Grid */}
                <div
                  onClick={() => setIsAddingService(true)}
                  style={{
                    padding: '26px 28px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '2px dashed rgba(255, 255, 255, 0.14)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    minHeight: '210px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#ffffff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      color: '#ffffff',
                    }}
                  >
                    +
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                    Attach Additional Service
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717a', textAlign: 'center', maxWidth: '240px' }}>
                    Connect Supabase, Render, Netlify, AWS or custom APIs to this atmosphere.
                  </div>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 3. ATMOSPHERE SECURITY & ARCHITECTURAL DOSSIER PANEL     */}
            {/* (Eliminates All Blank Space with Rich Executive Data)    */}
            {/* ======================================================== */}
            <div
              style={{
                borderRadius: '16px',
                background: '#161620',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '28px 32px',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'Martian Mono', monospace",
                  letterSpacing: '0.12em',
                  color: '#71717a',
                  textTransform: 'uppercase',
                  marginBottom: '18px',
                }}
              >
                ATMOSPHERE ARCHITECTURE & ACCESS POLICIES
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", marginBottom: '6px' }}>
                    AUTHENTICATION & IAM POLICY
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#ffffff', fontWeight: 600 }}>
                    Enforced 2FA (TOTP + WebAuthn FIDO2)
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                    Root identity owner with hardware security key requirement for production modifications.
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", marginBottom: '6px' }}>
                    DEPLOYMENT TELEMETRY
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#ffffff', fontWeight: 600 }}>
                    Continuous Automated CI/CD Webhooks
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                    Real-time build status synchronized with JARVIS.OS Growth Telemetry engine.
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", marginBottom: '6px' }}>
                    DOMAIN & SPF/DKIM STATUS
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#22c55e', fontWeight: 600 }}>
                    100% DNS Cryptographic Verification
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                    2048-bit RSA DKIM keys configured with DMARC rejection policy for unauthenticated traffic.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 4. MODAL: ATTACH NEW SERVICE TO THIS ATMOSPHERE          */}
      {/* ======================================================== */}
      {isAddingService && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 110000,
            background: 'rgba(2, 3, 6, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddingService(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '540px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '18px',
              padding: '36px',
              color: '#ffffff',
              boxShadow: '0 12px 48px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
              <div>
                <h3 style={{ margin: 0, font: '700 22px "Inter", sans-serif', color: '#ffffff' }}>
                  Attach Service to Atmosphere
                </h3>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                  {selected?.email}
                </div>
              </div>
              <button
                onClick={() => setIsAddingService(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  SERVICE NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Supabase Production / AWS S3 Bucket"
                  value={newSvcName}
                  onChange={(e) => setNewSvcName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  CATEGORY
                </label>
                <select
                  value={newSvcCategory}
                  onChange={(e) => setNewSvcCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="database">Database (Supabase, Postgres, Redis)</option>
                  <option value="hosting">Hosting / Edge (Netlify, Vercel, Cloudflare)</option>
                  <option value="backend">Backend / Cloud (Render, AWS, GCP, Fly.io)</option>
                  <option value="git">Version Control (GitHub, GitLab, Bitbucket)</option>
                  <option value="media">Media / Video (YouTube, OBS, CDN)</option>
                  <option value="finance">Finance / Billing (Stripe, Razorpay, PayPal)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  ACCOUNT / REPO IDENTIFIER
                </label>
                <input
                  type="text"
                  placeholder="e.g. project-id-8821 or org-name"
                  value={newSvcAccount}
                  onChange={(e) => setNewSvcAccount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  DASHBOARD / CONSOLE URL
                </label>
                <input
                  type="text"
                  placeholder="https://dashboard.supabase.com/..."
                  value={newSvcUrl}
                  onChange={(e) => setNewSvcUrl(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  onClick={() => setIsAddingService(false)}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewService}
                  style={{
                    padding: '11px 26px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
                  }}
                >
                  Attach to Atmosphere
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
