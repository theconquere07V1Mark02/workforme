import React, { useState } from 'react';
import { ExecutiveProfile, StrategicContact, PublicPresenceAsset } from '../../../lib/profileData';

interface MyPublicViewProps {
  profile: ExecutiveProfile;
  onUpdateProfile?: (updates: Partial<ExecutiveProfile>) => void;
}

export function MyPublicView({ profile, onUpdateProfile }: MyPublicViewProps) {
  const [activeTab, setActiveTab] = useState<'serp' | 'network'>('serp');
  const [contactCategoryFilter, setContactCategoryFilter] = useState<string>('all');
  const [searchContactQuery, setSearchContactQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // New Contact Modal State
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newCategory, setNewCategory] = useState<StrategicContact['category']>('investor_hnw');
  const [newInfluence, setNewInfluence] = useState<StrategicContact['influenceLevel']>('High Leverage');
  const [newChannel, setNewChannel] = useState('');
  const [newRationale, setNewRationale] = useState('');
  const [newNextMove, setNewNextMove] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const contacts = profile.strategicNetwork || [];
  const publicAssets = profile.publicAssets || [];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesCategory =
      contactCategoryFilter === 'all' ? true : c.category === contactCategoryFilter;

    const matchesSearch =
      c.name.toLowerCase().includes(searchContactQuery.toLowerCase()) ||
      c.organization.toLowerCase().includes(searchContactQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchContactQuery.toLowerCase()) ||
      c.importanceRationale.toLowerCase().includes(searchContactQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleSaveContact = () => {
    if (!newName) {
      alert('Please enter a contact name.');
      return;
    }
    const created: StrategicContact = {
      id: `contact-${Date.now()}`,
      name: newName,
      title: newTitle || 'Key Strategic Ally',
      organization: newOrg || 'Independent / Strategic Venture',
      category: newCategory,
      influenceLevel: newInfluence,
      connectionChannel: newChannel || 'Direct WhatsApp / LinkedIn',
      relationshipStatus: 'Active Ally',
      importanceRationale: newRationale || 'High-value connection for future ventures and executive moves.',
      nextBestMove: newNextMove || 'Schedule a strategic catch-up coffee / call.',
      email: newEmail,
      phone: newPhone,
    };

    const nextContacts = [created, ...contacts];
    if (onUpdateProfile) {
      onUpdateProfile({ strategicNetwork: nextContacts });
    }
    setIsAddingContact(false);
    setNewName('');
    setNewTitle('');
    setNewOrg('');
    setNewChannel('');
    setNewRationale('');
    setNewNextMove('');
    setNewEmail('');
    setNewPhone('');
    alert(`Strategic ally "${created.name}" logged into your Peoples Engine!`);
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
          <span>PUBLIC RELATIONS & STRATEGIC PEOPLES ENGINE</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>AUTONOMOUS LEVERAGE GRAPH</span>
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
              My Public & Network Engine
            </h1>
            <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '880px', lineHeight: 1.6 }}>
              Dual-engine intelligence platform monitoring your public digital persona, Google search perception, and orchestrating high-leverage relationships with investors, founders, and academic leaders.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '5px', borderRadius: '10px' }}>
            <button
              onClick={() => setActiveTab('serp')}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'serp' ? '#ffffff' : 'transparent',
                color: activeTab === 'serp' ? '#000000' : '#a1a1aa',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.12s ease',
              }}
            >
              🌐 Google SERP & Public Persona
            </button>

            <button
              onClick={() => setActiveTab('network')}
              style={{
                padding: '9px 18px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'network' ? '#ffffff' : 'transparent',
                color: activeTab === 'network' ? '#000000' : '#a1a1aa',
                fontSize: '12.5px',
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.12s ease',
              }}
            >
              👥 Strategic Peoples Engine ({contacts.length})
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TAB A: GOOGLE SERP & PUBLIC FOOTPRINT SIMULATOR       */}
      {/* ======================================================== */}
      {activeTab === 'serp' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Google Search Simulator Card */}
          <div
            style={{
              padding: '36px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '24px' }}>🔍</span>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: '#a1a1aa', fontWeight: 700 }}>
                    SEARCH ENGINE PERCEPTION
                  </div>
                  <div style={{ font: '800 20px "Inter", sans-serif', color: '#ffffff' }}>
                    Google Knowledge Graph for &quot;Abhishek Gangadhar&quot;
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(34, 197, 94, 0.12)',
                  color: '#4ade80',
                  fontWeight: 700,
                }}
              >
                ● 100% REPUTATION SCORE • TIER-1 TECH ENTITY
              </div>
            </div>

            {/* Simulated Google Search Result */}
            <div
              style={{
                background: '#181822',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#4285F4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
                  G
                </div>
                <div style={{ fontSize: '12px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace" }}>
                  https://abhishek.engineering › abhishek-gangadhar
                </div>
              </div>

              <a
                href="/showcase"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#8ab4f8',
                  textDecoration: 'none',
                  lineHeight: 1.3,
                }}
              >
                Abhishek Gangadhar — Lead Systems Architect, Founder &amp; AI Engineer
              </a>

              <p style={{ color: '#d4d4d8', fontSize: '14px', lineHeight: 1.65, margin: 0, maxWidth: '820px' }}>
                Abhishek Gangadhar is a visionary systems engineer and computer scientist associated with <strong>Gauri Idols</strong> commercial platform, creator of <strong>StarkForge CAD</strong> (browser-native WebGL 3D modeling suite), and author of <strong>Sovereign OS</strong>. Engineering lead conducting autonomous AI and distributed infrastructure research at SIT Innovation Hub, Karnataka.
              </p>

              {/* Sitelinks Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '14px',
                  marginTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '16px',
                }}
              >
                <div>
                  <a href="https://gauriidols.netlify.app" target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    Gauri Idols Commercial Suite ↗
                  </a>
                  <div style={{ fontSize: '11.5px', color: '#71717a', marginTop: '2px' }}>
                    Production e-commerce &amp; cultural artistry storefront with real-time 3D model previews.
                  </div>
                </div>

                <div>
                  <a href="https://starkforge.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    StarkForge CAD Engine ↗
                  </a>
                  <div style={{ fontSize: '11.5px', color: '#71717a', marginTop: '2px' }}>
                    Parametric WebGL in-browser 3D modeling suite built on WebAssembly SIMD shaders.
                  </div>
                </div>

                <div>
                  <a href="/showcase" target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    Public Project Showcase ↗
                  </a>
                  <div style={{ fontSize: '11.5px', color: '#71717a', marginTop: '2px' }}>
                    Independent portfolio exhibiting 28 verified repositories, milestones, and architectural specs.
                  </div>
                </div>

                <div>
                  <a href="https://github.com/theconquere07V1Mark02" target="_blank" rel="noopener noreferrer" style={{ color: '#8ab4f8', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
                    Sovereign Research Monographs ↗
                  </a>
                  <div style={{ fontSize: '11.5px', color: '#71717a', marginTop: '2px' }}>
                    Autonomous multi-agent treatises and microkernel process sandboxing patent disclosures.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Public vs Encrypted Boundary Radar */}
          <div
            style={{
              padding: '36px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: '#71717a', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              PUBLIC ASSETS VS. PRIVATE VAULT BOUNDARY
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '20px',
              }}
            >
              {publicAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{
                    padding: '24px',
                    borderRadius: '14px',
                    background: '#161620',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(34, 197, 94, 0.12)',
                          color: '#4ade80',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        ● {asset.visibility.toUpperCase()}
                      </span>

                      <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                        {asset.trafficOrIndexStatus}
                      </span>
                    </div>

                    <h3 style={{ font: '700 17px/1.25 "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px' }}>
                      {asset.name}
                    </h3>

                    <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0, lineHeight: 1.55 }}>
                      {asset.publicPerception}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11.5px', color: '#f0b429', fontFamily: "'Martian Mono', monospace" }}>
                      Brand: {asset.associatedBrand}
                    </span>

                    <a
                      href={asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#ffffff',
                        color: '#000000',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>Inspect Live</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 3. TAB B: STRATEGIC PEOPLES & LEVERAGE ENGINE            */
        /* ======================================================== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Controls Bar: Search, Category Filters, Add Contact Button */}
          <div
            style={{
              padding: '28px 32px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `All Allies (${contacts.length})` },
                { id: 'investor_hnw', label: '💎 Investors & HNW' },
                { id: 'founder_cto', label: '🚀 Founders & CTOs' },
                { id: 'tech_referral', label: '💼 Tech Referrals (Google/MSFT)' },
                { id: 'academic_topper', label: '🎓 Academic Toppers & Deans' },
                { id: 'gov_institutional', label: '🏛️ Gov & Policy' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setContactCategoryFilter(f.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: contactCategoryFilter === f.id ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    color: contactCategoryFilter === f.id ? '#000000' : '#a1a1aa',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: 'all 0.12s ease',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative', minWidth: '260px' }}>
                <input
                  type="text"
                  placeholder="Search allies by name or org..."
                  value={searchContactQuery}
                  onChange={(e) => setSearchContactQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 34px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontSize: '12.5px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <span style={{ position: 'absolute', left: '11px', top: '10px', color: '#71717a', fontSize: '13px' }}>
                  🔍
                </span>
              </div>

              <button
                onClick={() => setIsAddingContact(true)}
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
                  boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>+</span>
                <span>Add Strategic Contact</span>
              </button>
            </div>
          </div>

          {/* Grid of Strategic Contacts */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                style={{
                  padding: '28px 30px',
                  borderRadius: '18px',
                  background: '#111116',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                  transition: 'all 0.15s ease',
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
                  {/* Top Status & Influence Level */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background:
                          contact.influenceLevel === 'VIP / Critical'
                            ? 'rgba(240, 180, 41, 0.15)'
                            : 'rgba(0, 229, 255, 0.12)',
                        color: contact.influenceLevel === 'VIP / Critical' ? 'var(--gold)' : '#00e5ff',
                        fontWeight: 700,
                      }}
                    >
                      ★ {contact.influenceLevel}
                    </span>

                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(34, 197, 94, 0.12)',
                        color: '#4ade80',
                        fontFamily: "'Martian Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      ● {contact.relationshipStatus.toUpperCase()}
                    </span>
                  </div>

                  {/* Contact Identity */}
                  <div style={{ font: '800 20px/1.25 "Inter", sans-serif', color: '#ffffff' }}>
                    {contact.name}
                  </div>

                  <div style={{ fontSize: '13px', color: '#a1a1aa', marginTop: '3px' }}>
                    {contact.title} • <strong style={{ color: '#ffffff' }}>{contact.organization}</strong>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#71717a', fontFamily: "'Martian Mono', monospace", marginTop: '8px' }}>
                    Channel: {contact.connectionChannel}
                  </div>

                  {/* Why They Matter (Strategic Importance) */}
                  <div
                    style={{
                      marginTop: '14px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#f0b429', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '4px' }}>
                      STRATEGIC LEVERAGE &amp; WHY THEY HOLD VALUE:
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#e4e4e7', lineHeight: 1.55 }}>
                      {contact.importanceRationale}
                    </div>
                  </div>

                  {/* AI Behavioral Engine: Next Best Move */}
                  <div
                    style={{
                      marginTop: '10px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(34, 197, 94, 0.05)',
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#4ade80', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '4px' }}>
                      ⚡ NEXT RECOMMENDED STRATEGIC MOVE:
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#ffffff', fontWeight: 600, lineHeight: 1.5 }}>
                      {contact.nextBestMove}
                    </div>
                  </div>
                </div>

                {/* Direct Action Channels */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {contact.email && (
                      <button
                        onClick={() => handleCopy(contact.email!, `Email for ${contact.name}`)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>✉️</span>
                        <span>{copiedText === `Email for ${contact.name}` ? 'Copied' : 'Copy Email'}</span>
                      </button>
                    )}

                    {contact.phone && (
                      <button
                        onClick={() => handleCopy(contact.phone!, `Phone for ${contact.name}`)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#ffffff',
                          fontSize: '11px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>📱</span>
                        <span>{contact.phone}</span>
                      </button>
                    )}
                  </div>

                  {contact.linkedInUrl && (
                    <a
                      href={contact.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '6px',
                        background: '#ffffff',
                        color: '#000000',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>LinkedIn Profile</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MODAL: ADD STRATEGIC CONTACT TO PEOPLES ENGINE        */}
      {/* ======================================================== */}
      {isAddingContact && (
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
            if (e.target === e.currentTarget) setIsAddingContact(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '560px',
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
                  Log Strategic Connection
                </h3>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                  Add a high-value investor, founder, academic dean, or corporate referral ally.
                </div>
              </div>
              <button
                onClick={() => setIsAddingContact(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vikramaditya Rao"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    ORGANIZATION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Google / PeakForge / SIT"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  ROLE OR DESIGNATION
                </label>
                <input
                  type="text"
                  placeholder="e.g. General Partner / Principal Staff Engineer"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    STRATEGIC CATEGORY
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="investor_hnw">💎 Investor / Angel / HNW</option>
                    <option value="founder_cto">🚀 Founder / CTO</option>
                    <option value="tech_referral">💼 Tech Referral (Google/MSFT)</option>
                    <option value="academic_topper">🎓 Academic Topper / Dean</option>
                    <option value="gov_institutional">🏛️ Government / Institution</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    LEVERAGE LEVEL
                  </label>
                  <select
                    value={newInfluence}
                    onChange={(e) => setNewInfluence(e.target.value as any)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="VIP / Critical">VIP / Critical Ally</option>
                    <option value="High Leverage">High Leverage</option>
                    <option value="Strategic Partner">Strategic Partner</option>
                    <option value="Emerging Key Contact">Emerging Contact</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  STRATEGIC IMPORTANCE RATIONALE (WHY THEY HOLD VALUE)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Can write pre-seed check or holds direct referral authority at Google Cloud..."
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  NEXT BEST MOVE (ACTIONABLE STEP)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Send 2-min StarkForge CAD demo video on WhatsApp"
                  value={newNextMove}
                  onChange={(e) => setNewNextMove(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setIsAddingContact(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContact}
                  style={{ padding: '10px 24px', borderRadius: '8px', background: '#ffffff', border: 'none', color: '#000000', fontWeight: 700, cursor: 'pointer' }}
                >
                  Log into Peoples Engine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
