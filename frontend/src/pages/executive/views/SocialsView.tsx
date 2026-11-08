import React, { useState } from 'react';
import { SocialAccount, MultiAccountProfile } from '../../../lib/profileData';
import {
  LinkedInIcon,
  InstagramIcon,
  GitHubIcon,
  XTwitterIcon,
  SnapchatIcon,
  FacebookIcon,
  UpworkIcon,
  IndeedIcon,
  DiscordIcon,
  YouTubeIcon,
} from '../components/BrandIcons';

interface SocialsViewProps {
  socials: SocialAccount[];
}

export function SocialsView({ socials }: SocialsViewProps) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [selectedFocusPlatformId, setSelectedFocusPlatformId] = useState<string>(socials[0]?.id || 'soc-li');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  // Modal to link a new sub-account in focus mode
  const [isAddingSubAccount, setIsAddingSubAccount] = useState(false);
  const [subAccountName, setSubAccountName] = useState('');
  const [subAccountHandle, setSubAccountHandle] = useState('');
  const [subAccountUrl, setSubAccountUrl] = useState('');
  const [subAccountEmail, setSubAccountEmail] = useState('');
  const [subAccountPhone, setSubAccountPhone] = useState('');
  const [subAccountDevices, setSubAccountDevices] = useState('Windows 11 Rig, iPhone 15 Pro');
  const [subAccountRole, setSubAccountRole] = useState('');

  const selectedPlatform = socials.find((s) => s.id === selectedFocusPlatformId) || socials[0];

  const filtered = socials.filter((s) => {
    if (filterCategory === 'all') return true;
    return s.category === filterCategory;
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHandle(label);
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  const renderOfficialLogo = (platform: string, size = 24) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <LinkedInIcon size={size} />;
      case 'instagram':
        return <InstagramIcon size={size} />;
      case 'github':
        return <GitHubIcon size={size} />;
      case 'x':
      case 'twitter':
        return <XTwitterIcon size={size} />;
      case 'snapchat':
        return <SnapchatIcon size={size} />;
      case 'facebook':
        return <FacebookIcon size={size} />;
      case 'upwork':
        return <UpworkIcon size={size} />;
      case 'indeed':
        return <IndeedIcon size={size} />;
      case 'discord':
        return <DiscordIcon size={size} />;
      case 'youtube':
        return <YouTubeIcon size={size} />;
      default:
        return <span style={{ fontSize: `${size}px` }}>🌐</span>;
    }
  };

  const handleSaveSubAccount = () => {
    if (!subAccountHandle) {
      alert('Please enter an account handle or username.');
      return;
    }
    const created: MultiAccountProfile = {
      id: `sub-${Date.now()}`,
      accountName: subAccountName || subAccountHandle,
      handle: subAccountHandle,
      url: subAccountUrl || `https://${selectedPlatform.platform.toLowerCase()}.com/${subAccountHandle.replace('@', '')}`,
      email: subAccountEmail || 'primary@abhishek.engineering',
      phone: subAccountPhone || '+91 (Verified)',
      devices: subAccountDevices.split(',').map((d) => d.trim()),
      roleOrType: subAccountRole || 'Secondary Managed Profile',
      isActive: true,
    };

    if (!selectedPlatform.subAccounts) {
      selectedPlatform.subAccounts = [];
    }
    selectedPlatform.subAccounts.push(created);
    setIsAddingSubAccount(false);
    setSubAccountName('');
    setSubAccountHandle('');
    setSubAccountUrl('');
    setSubAccountEmail('');
    setSubAccountPhone('');
    setSubAccountRole('');
    alert(`Account ${created.handle} attached to ${selectedPlatform.platform} in Focus Mode!`);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', color: '#f4f4f5' }}>
      {/* ======================================================== */}
      {/* 1. NETTOOLS HEADER BLOCK (NO "EVERY..." SLOGANS)         */}
      {/* ======================================================== */}
      <div style={{ padding: '0 0 28px' }}>
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
          <span>VERIFIED SOCIAL ECOSYSTEM</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>{socials.length} PLATFORMS CONNECTED</span>
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
              Social & Network Directory
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '820px', lineHeight: 1.6 }}>
              Centralized hub for all verified professional networks, developer organizations, talent profiles, and multi-account identity endpoints.
            </p>
          </div>

          {/* Toggle Button for Focus Mode */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              style={{
                padding: '11px 22px',
                borderRadius: '10px',
                background: isFocusMode ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                color: isFocusMode ? '#000000' : '#ffffff',
                border: isFocusMode ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isFocusMode ? '0 4px 18px rgba(255, 255, 255, 0.25)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{isFocusMode ? '📋' : '🎯'}</span>
              <span>{isFocusMode ? 'Exit Focus Mode' : 'Network Focus Mode'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MODE A: NETWORK FOCUS MODE (MULTI-ACCOUNT DRILLDOWN)  */}
      {/* ======================================================== */}
      {isFocusMode ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '320px 1fr',
            gap: '28px',
            alignItems: 'start',
          }}
        >
          {/* Left: Platform Selector Rail */}
          <div
            style={{
              padding: '24px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontFamily: "'Martian Mono', monospace",
                color: '#71717a',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0 8px 12px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '4px',
              }}
            >
              SELECT PLATFORM
            </div>

            {socials.map((platform) => {
              const isSelected = platform.id === selectedPlatform.id;
              const subCount = platform.subAccounts ? platform.subAccounts.length : 1;

              return (
                <button
                  key={platform.id}
                  onClick={() => setSelectedFocusPlatformId(platform.id)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: isSelected ? '#ffffff' : 'transparent',
                    color: isSelected ? '#000000' : '#a1a1aa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#a1a1aa';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {renderOfficialLogo(platform.platform, 20)}
                    <span style={{ fontSize: '13.5px', fontWeight: isSelected ? 800 : 600 }}>
                      {platform.platform}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: "'Martian Mono', monospace",
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#ffffff' : '#71717a',
                      fontWeight: 700,
                    }}
                  >
                    {subCount} accts
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Multi-Account Inspector */}
          <div
            style={{
              padding: '36px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header of Active Platform */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '20px',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {renderOfficialLogo(selectedPlatform.platform, 36)}
                <div>
                  <h2 style={{ font: '800 28px "Inter", sans-serif', color: '#ffffff', margin: '0 0 4px' }}>
                    {selectedPlatform.platform} Multi-Account Focus
                  </h2>
                  <div style={{ fontSize: '13px', color: '#a1a1aa' }}>
                    Active profiles, registered credentials, and authenticated devices for this network.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsAddingSubAccount(true)}
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.15)',
                }}
              >
                <span>+</span>
                <span>Link Another Account</span>
              </button>
            </div>

            {/* List of Sub-Accounts for this Platform */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {(selectedPlatform.subAccounts && selectedPlatform.subAccounts.length > 0
                ? selectedPlatform.subAccounts
                : [
                    {
                      id: selectedPlatform.id,
                      accountName: selectedPlatform.handle,
                      handle: selectedPlatform.handle,
                      url: selectedPlatform.url,
                      email: 'theconquere07@gmail.com',
                      phone: '+91 (Verified)',
                      devices: ['Windows 11 JARVIS Rig', 'iPhone 15 Pro'],
                      roleOrType: 'Primary Verified Account',
                      isActive: true,
                      notes: 'Default connected profile for this platform.',
                    },
                  ]
              ).map((acct) => (
                <div
                  key={acct.id}
                  style={{
                    padding: '24px 28px',
                    borderRadius: '14px',
                    background: '#161620',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
                >
                  {/* Top Row: Account Role & Active Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontFamily: "'Martian Mono', monospace",
                          padding: '3px 10px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          fontWeight: 700,
                        }}
                      >
                        {acct.roleOrType}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: acct.isActive ? 'rgba(34, 197, 94, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                          color: acct.isActive ? '#4ade80' : '#a1a1aa',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        {acct.isActive ? '● ACTIVE & BOUND' : '● SECONDARY'}
                      </span>
                    </div>

                    <a
                      href={acct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        background: '#ffffff',
                        color: '#000000',
                        fontSize: '12px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Open Account</span>
                      <span>↗</span>
                    </a>
                  </div>

                  {/* Account Name & Handle */}
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>
                      {acct.accountName}
                    </div>
                    <div style={{ fontSize: '13px', color: '#00e5ff', fontFamily: "'Martian Mono', monospace", marginTop: '2px' }}>
                      {acct.handle}
                    </div>
                  </div>

                  {/* Registered Info Grid: Email, Phone, Devices */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '14px',
                      padding: '14px',
                      borderRadius: '10px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '10px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                        REGISTERED EMAIL
                      </div>
                      <div
                        onClick={() => handleCopy(acct.email, `Email: ${acct.email}`)}
                        style={{ fontSize: '12.5px', color: '#ffffff', fontWeight: 600, marginTop: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <span>{acct.email}</span>
                        <span style={{ fontSize: '11px', color: '#71717a' }}>📋</span>
                      </div>
                    </div>

                    {acct.phone && (
                      <div>
                        <div style={{ fontSize: '10px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                          REGISTERED MOBILE
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#ffffff', fontWeight: 600, marginTop: '3px' }}>
                          {acct.phone}
                        </div>
                      </div>
                    )}

                    <div>
                      <div style={{ fontSize: '10px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                        ACTIVE DEVICES
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {acct.devices.map((dev, dIdx) => (
                          <span
                            key={dIdx}
                            style={{
                              fontSize: '10.5px',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              color: '#d4d4d8',
                              fontFamily: "'Martian Mono', monospace",
                            }}
                          >
                            💻 {dev}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {acct.notes && (
                    <div style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.5 }}>
                      Purpose & Details: {acct.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 3. MODE B: STANDARD DIRECTORY GRID VIEW                  */
        /* ======================================================== */
        <div>
          {/* Filter Pills in Nettools Style */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {['all', 'professional', 'developer', 'freelance', 'social'].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterCategory(filter)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: filterCategory === filter ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  color: filterCategory === filter ? '#000000' : '#a1a1aa',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'all 0.15s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Social Platforms Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '28px',
                  borderRadius: '16px',
                  background: '#111116',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '20px',
                  minHeight: '210px',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
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
                      {renderOfficialLogo(item.platform, 26)}
                      <div>
                        <div style={{ font: '700 18px "Inter", sans-serif', color: '#ffffff' }}>
                          {item.platform}
                        </div>
                        <div
                          style={{
                            fontSize: '10.5px',
                            color: '#a1a1aa',
                            textTransform: 'uppercase',
                            fontFamily: "'Martian Mono', monospace",
                          }}
                        >
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {item.verified && (
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          background: 'rgba(34, 197, 94, 0.12)',
                          color: '#4ade80',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        ✓ VERIFIED
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => handleCopy(item.handle, item.handle)}
                    title="Click to copy handle"
                    style={{
                      fontSize: '12.5px',
                      color: '#ffffff',
                      fontFamily: "'Martian Mono', monospace",
                      background: 'rgba(0, 0, 0, 0.45)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{item.handle}</span>
                    <span style={{ color: '#71717a', fontSize: '11px' }}>
                      {copiedHandle === item.handle ? '✓ Copied' : 'Copy'}
                    </span>
                  </div>
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
                  <button
                    onClick={() => {
                      setSelectedFocusPlatformId(item.id);
                      setIsFocusMode(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#a1a1aa',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>🎯 Focus Accounts</span>
                    <span style={{ fontSize: '10px' }}>({item.subAccounts?.length || 1})</span>
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
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
                    <span>Open {item.platform}</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MODAL: LINK ANOTHER SUB-ACCOUNT IN FOCUS MODE         */}
      {/* ======================================================== */}
      {isAddingSubAccount && (
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
            if (e.target === e.currentTarget) setIsAddingSubAccount(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '18px',
              padding: '36px',
              color: '#ffffff',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: 0, font: '800 22px "Inter", sans-serif', color: '#ffffff' }}>
                  Link {selectedPlatform.platform} Account
                </h3>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                  Add a secondary, company, or personal account to Focus Mode.
                </div>
              </div>
              <button
                onClick={() => setIsAddingSubAccount(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  ACCOUNT NAME OR PURPOSE
                </label>
                <input
                  type="text"
                  placeholder="e.g. StarkForge Company Admin / Creative Profile"
                  value={subAccountName}
                  onChange={(e) => setSubAccountName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  HANDLE OR USERNAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. @abhii_secondary or in/starkforge-tech"
                  value={subAccountHandle}
                  onChange={(e) => setSubAccountHandle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  BOUND EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  placeholder="e.g. founder@starkforge.io"
                  value={subAccountEmail}
                  onChange={(e) => setSubAccountEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
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
                  AUTHORIZED DEVICES (COMMA SEPARATED)
                </label>
                <input
                  type="text"
                  placeholder="Windows 11 Rig, iPhone 15 Pro, MacBook"
                  value={subAccountDevices}
                  onChange={(e) => setSubAccountDevices(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setIsAddingSubAccount(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSubAccount}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Link to Focus Mode
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
