import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ExpertProfile,
  ExpertSector,
  ExpertTier,
  FieldExpertsStore,
  SECTOR_METADATA,
} from '../../../lib/fieldExpertsData';

export function FieldExpertsView() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState<ExpertProfile[]>(() => FieldExpertsStore.getExperts());
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);

  // Filters & Search
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Add Expert Modal State
  const [isAddingExpert, setIsAddingExpert] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newSector, setNewSector] = useState<ExpertSector>('tech_coding');
  const [newTier, setNewTier] = useState<ExpertTier>('achiever');
  const [newAge, setNewAge] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOutreachAngle, setNewOutreachAngle] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newWhyInList, setNewWhyInList] = useState('');
  const [newWhatToLearn, setNewWhatToLearn] = useState('');
  const [newHowHelp, setNewHowHelp] = useState('');

  const selectedExpert = experts.find((e) => e.id === selectedExpertId) || null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const filteredExperts = experts.filter((expert) => {
    const matchesSector =
      selectedSector === 'all' ? true : expert.sector === selectedSector;
    const matchesTier =
      selectedTier === 'all' ? true : expert.tier === selectedTier;
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.whyInMyList.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.biography.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSector && matchesTier && matchesSearch;
  });

  const handleSaveExpert = () => {
    if (!newName) {
      alert('Please enter an expert name.');
      return;
    }
    const created: ExpertProfile = {
      id: `exp-${Date.now()}`,
      name: newName,
      slug: newName.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle || 'Field Expert & Practitioner',
      organization: newOrg || 'Independent / Research',
      sector: newSector,
      tier: newTier,
      ageOrEra: newAge || 'Active Era',
      location: newLocation || 'Global',
      nationality: 'Global',
      status: 'Living & Active',
      reachOutChannel: 'Cold Email / Technical Outreach',
      emailOrContact: newEmail,
      socials: {},
      coldOutreachAngle: newOutreachAngle || 'Thoughtful cold email citing their work with a specific question.',
      biography: newBio || 'Accomplished contributor in their domain.',
      breakthroughContributions: ['Notable contributions to their field and industry'],
      currentWork: 'Actively researching and building in their domain.',
      whyInMyList: newWhyInList || 'High-value thinker offering architectural and tactical mental models.',
      whatICanLearn: newWhatToLearn ? newWhatToLearn.split(',').map((s) => s.trim()) : ['Disciplined execution', 'Domain mastery'],
      howTheyCanHelpMe: newHowHelp || 'Provides technical blueprints and strategic insight.',
      recommendedMaterials: ['Key publications and technical notes'],
    };

    const updated = FieldExpertsStore.addExpert(created);
    setExperts(updated);
    setIsAddingExpert(false);
    setNewName('');
    setNewTitle('');
    setNewOrg('');
    setNewAge('');
    setNewLocation('');
    setNewEmail('');
    setNewOutreachAngle('');
    setNewBio('');
    setNewWhyInList('');
    setNewWhatToLearn('');
    setNewHowHelp('');
    alert(`Expert "${created.name}" added to your Field Experts Directory!`);
  };

  return (
    <div style={{ width: '100%', color: '#f4f4f5' }}>
      {/* ======================================================== */}
      {/* IF AN EXPERT IS SELECTED: SHOW FULL INDIVIDUAL DOSSIER   */}
      {/* ======================================================== */}
      {selectedExpert ? (
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Top Control Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '20px',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setSelectedExpertId(null)}
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
                }}
              >
                <span>←</span>
                <span>Back to Field Experts Directory</span>
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>←</span>
                <span>Workspace</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: "'Martian Mono', monospace",
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                {SECTOR_METADATA[selectedExpert.sector]?.icon} {SECTOR_METADATA[selectedExpert.sector]?.label}
              </span>

              <span
                style={{
                  fontSize: '10.5px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background:
                    selectedExpert.tier === 'titan'
                      ? 'rgba(240, 180, 41, 0.15)'
                      : selectedExpert.tier === 'achiever'
                      ? 'rgba(0, 229, 255, 0.12)'
                      : 'rgba(34, 197, 94, 0.12)',
                  color:
                    selectedExpert.tier === 'titan'
                      ? 'var(--gold)'
                      : selectedExpert.tier === 'achiever'
                      ? '#00e5ff'
                      : '#4ade80',
                  fontFamily: "'Martian Mono', monospace",
                  fontWeight: 700,
                  textTransform: 'uppercase',
                }}
              >
                ★ {selectedExpert.tier}
              </span>
            </div>
          </div>

          {/* Master Individual Header Box */}
          <div
            style={{
              padding: '36px 40px',
              borderRadius: '20px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 36px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    DOSSIER ID: {selectedExpert.id.toUpperCase()}
                  </span>
                  <span style={{ color: '#3f3f46' }}>•</span>
                  <span style={{ fontSize: '11px', color: '#a1a1aa' }}>
                    {selectedExpert.ageOrEra} • {selectedExpert.location} ({selectedExpert.nationality})
                  </span>
                  <span style={{ color: '#3f3f46' }}>•</span>
                  <span style={{ fontSize: '10.5px', color: '#22c55e', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                    ● {selectedExpert.status.toUpperCase()}
                  </span>
                </div>

                <h1 style={{ font: '800 38px/1.15 "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px', letterSpacing: '-0.025em' }}>
                  {selectedExpert.name}
                </h1>

                <div style={{ fontSize: '18px', fontWeight: 600, color: '#00e5ff', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {selectedExpert.title} — <span style={{ color: '#ffffff' }}>{selectedExpert.organization}</span>
                </div>
              </div>

              {/* Outreach & Coordinates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '280px', alignItems: 'flex-end' }}>
                {selectedExpert.emailOrContact && (
                  <button
                    onClick={() => handleCopy(selectedExpert.emailOrContact!, 'Contact')}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span>✉️</span>
                    <span>{copiedText === 'Contact' ? 'Copied to Clipboard!' : selectedExpert.emailOrContact}</span>
                    <span style={{ fontSize: '10px', color: '#71717a' }}>📋</span>
                  </button>
                )}

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedExpert.socials.xTwitter && (
                    <a
                      href={selectedExpert.socials.xTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '11.5px',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      𝕏 Twitter ↗
                    </a>
                  )}

                  {selectedExpert.socials.github && (
                    <a
                      href={selectedExpert.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '11.5px',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      🐙 GitHub ↗
                    </a>
                  )}

                  {selectedExpert.socials.website && (
                    <a
                      href={selectedExpert.socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        fontSize: '11.5px',
                        textDecoration: 'none',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      🌐 Website ↗
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Cold Email Outreach Angle */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ fontSize: '10.5px', color: '#00e5ff', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                ⚡ OPTIMAL COLD OUTREACH ANGLE &amp; ICEBREAKER FOR ABHISHEK:
              </div>
              <div style={{ fontSize: '13.5px', color: '#e4e4e7', lineHeight: 1.6 }}>
                &quot;{selectedExpert.coldOutreachAngle}&quot;
              </div>
            </div>
          </div>

          {/* Detailed Content Grid: 2 Columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '28px',
            }}
          >
            {/* Box 1: Biography & Breakthrough Contributions */}
            <div
              style={{
                padding: '32px',
                borderRadius: '18px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '8px' }}>
                  BIOGRAPHY &amp; SECTOR CONTRIBUTION
                </div>
                <p style={{ color: '#d4d4d8', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
                  {selectedExpert.biography}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '10px' }}>
                  KEY BREAKTHROUGHS &amp; IMPACT:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedExpert.breakthroughContributions.map((contrib, cIdx) => (
                    <div key={cIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#ffffff' }}>
                      <span style={{ color: '#22c55e' }}>✓</span>
                      <span>{contrib}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '4px' }}>
                  CURRENT ACTIVE FRONTIER:
                </div>
                <div style={{ fontSize: '13px', color: '#a1a1aa', lineHeight: 1.6 }}>
                  {selectedExpert.currentWork}
                </div>
              </div>
            </div>

            {/* Box 2: Personalized Intelligence for Abhishek Gangadhar */}
            <div
              style={{
                padding: '32px',
                borderRadius: '18px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#f0b429', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '8px' }}>
                  WHY THIS PERSON IS IN ABHISHEK&apos;S LIST:
                </div>
                <p style={{ color: '#ffffff', fontSize: '14px', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
                  {selectedExpert.whyInMyList}
                </p>
              </div>

              <div>
                <div style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '10px' }}>
                  WHAT ABHISHEK CAN LEARN &amp; ADOPT:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedExpert.whatICanLearn.map((lesson, lIdx) => (
                    <div key={lIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#e4e4e7' }}>
                      <span style={{ color: '#f0b429' }}>◆</span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '16px',
                  background: 'rgba(34, 197, 94, 0.03)',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.15)',
                }}
              >
                <div style={{ fontSize: '10.5px', color: '#4ade80', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '4px' }}>
                  HOW THEY CAN HELP ME / STRATEGIC SYNERGY:
                </div>
                <div style={{ fontSize: '13px', color: '#ffffff', lineHeight: 1.6 }}>
                  {selectedExpert.howTheyCanHelpMe}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10.5px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '8px' }}>
                  RECOMMENDED STUDY MATERIALS:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {selectedExpert.recommendedMaterials.map((mat, mIdx) => (
                    <span
                      key={mIdx}
                      style={{
                        fontSize: '11px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#d4d4d8',
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      📚 {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* MASTER DIRECTORY VIEW: SECTORS, TIERS & EXPERT CARDS     */
        /* ======================================================== */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Header Block */}
          <div style={{ padding: '0 0 10px' }}>
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
              <span>INTELLECTUAL COMPENDIUM</span>
              <span style={{ color: '#52525b' }}>•</span>
              <span>{experts.length} CURATED MINDS &amp; MENTORS</span>
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
                  Field Experts &amp; Mentors Compendium
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '880px', lineHeight: 1.6 }}>
                  Curated intelligence compendium of world-class Titans, contemporary achievers, and grounded mentors across software architecture, AI, economics, hardware, space, geopolitics, and human performance. Click any person to inspect their complete life dossier, biography, and tailored outreach strategy.
                </p>
              </div>

              <button
                onClick={() => setIsAddingExpert(true)}
                style={{
                  padding: '11px 22px',
                  borderRadius: '9px',
                  background: '#ffffff',
                  border: 'none',
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(255, 255, 255, 0.15)',
                }}
              >
                <span>+</span>
                <span>Add Field Expert</span>
              </button>
            </div>
          </div>

          {/* Controls Deck: Sector Carousel, Tier Pills & Search */}
          <div
            style={{
              padding: '24px 28px',
              borderRadius: '18px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {/* Sector Filters (Categorized exactly as requested) */}
            <div>
              <div style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: '#71717a', fontWeight: 700, marginBottom: '10px' }}>
                SELECT SECTOR / FIELD:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedSector('all')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedSector === 'all' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedSector === 'all' ? '#000000' : '#a1a1aa',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: "'Space Grotesk', sans-serif",
                    transition: 'all 0.12s ease',
                  }}
                >
                  All Sectors ({experts.length})
                </button>

                {(Object.keys(SECTOR_METADATA) as ExpertSector[]).map((secKey) => {
                  const meta = SECTOR_METADATA[secKey];
                  const count = experts.filter((e) => e.sector === secKey).length;

                  return (
                    <button
                      key={secKey}
                      onClick={() => setSelectedSector(secKey)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: selectedSector === secKey ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                        color: selectedSector === secKey ? '#000000' : '#a1a1aa',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: "'Space Grotesk', sans-serif",
                        transition: 'all 0.12s ease',
                      }}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span style={{ fontSize: '10px', opacity: 0.6 }}>({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tier Filters & Search Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                paddingTop: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { id: 'all', label: 'All Tiers' },
                  { id: 'titan', label: '🏆 Legendary Titans' },
                  { id: 'achiever', label: '🚀 Contemporary Achievers' },
                  { id: 'grounded', label: '🌱 Grounded Mentors' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: selectedTier === t.id ? '#ffffff' : 'rgba(255, 255, 255, 0.04)',
                      color: selectedTier === t.id ? '#000000' : '#8e94a8',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', minWidth: '320px' }}>
                <input
                  type="text"
                  placeholder="Search by name, company, or concept..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            </div>
          </div>

          {/* Grid of Expert Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredExperts.map((expert) => (
              <div
                key={expert.id}
                onClick={() => setSelectedExpertId(expert.id)}
                style={{
                  padding: '28px 30px',
                  borderRadius: '18px',
                  background: '#111116',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '18px',
                  minHeight: '260px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.28)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(0, 0, 0, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.35)';
                }}
              >
                <div>
                  {/* Top Badges: Sector & Tier */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span
                      style={{
                        fontSize: '10.5px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '3px 9px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <span>{SECTOR_METADATA[expert.sector]?.icon}</span>
                      <span>{SECTOR_METADATA[expert.sector]?.label.toUpperCase()}</span>
                    </span>

                    <span
                      style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background:
                          expert.tier === 'titan'
                            ? 'rgba(240, 180, 41, 0.15)'
                            : expert.tier === 'achiever'
                            ? 'rgba(0, 229, 255, 0.12)'
                            : 'rgba(34, 197, 94, 0.12)',
                        color:
                          expert.tier === 'titan'
                            ? 'var(--gold)'
                            : expert.tier === 'achiever'
                            ? '#00e5ff'
                            : '#4ade80',
                        fontFamily: "'Martian Mono', monospace",
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      ★ {expert.tier}
                    </span>
                  </div>

                  {/* Expert Name */}
                  <div style={{ font: '800 22px/1.2 "Inter", sans-serif', color: '#ffffff' }}>
                    {expert.name}
                  </div>

                  <div style={{ fontSize: '13px', color: '#00e5ff', marginTop: '4px', fontWeight: 600 }}>
                    {expert.title}
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#8b91a5', marginTop: '2px' }}>
                    {expert.organization} • {expert.location}
                  </div>

                  {/* Why in list teaser */}
                  <div
                    style={{
                      marginTop: '14px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0, 0, 0, 0.45)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#f0b429', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '3px' }}>
                      WHY IN ABHISHEK&apos;S COMPENDIUM:
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#d4d4d8', lineHeight: 1.55 }}>
                      {expert.whyInMyList}
                    </div>
                  </div>
                </div>

                {/* Bottom Channel & Inspect Button */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    Reach: {expert.reachOutChannel}
                  </span>

                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Inspect Dossier</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD FIELD EXPERT MODAL                                   */}
      {/* ======================================================== */}
      {isAddingExpert && (
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
            if (e.target === e.currentTarget) setIsAddingExpert(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '580px',
              maxHeight: '90vh',
              overflowY: 'auto',
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
                  Add Field Expert / Mentor
                </h3>
                <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>
                  Curate an achiever, grounded mentor, or titan into your personal compendium.
                </div>
              </div>
              <button
                onClick={() => setIsAddingExpert(false)}
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
                    placeholder="e.g. John Carmack"
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
                    placeholder="e.g. id Software / OpenAI"
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  PRIMARY TITLE / ROLE
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3D Engine Architect & Founder"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    SECTOR / FIELD
                  </label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value as any)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    {(Object.keys(SECTOR_METADATA) as ExpertSector[]).map((sec) => (
                      <option key={sec} value={sec}>
                        {SECTOR_METADATA[sec].label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    TIER / LEVEL
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  >
                    <option value="titan">🏆 Legendary Titan / Master</option>
                    <option value="achiever">🚀 Contemporary High-Impact Leader</option>
                    <option value="grounded">🌱 Grounded Practitioner / Reachable Mentor</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    EMAIL / OUTREACH HANDLE
                  </label>
                  <input
                    type="text"
                    placeholder="email@domain.com or @handle"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    LOCATION
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dallas, Texas / Bengaluru"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  WHY IN MY LIST (WHAT THEY SIGNIFY)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Master of WebGL graphics algorithms, prime role model for StarkForge CAD..."
                  value={newWhyInList}
                  onChange={(e) => setNewWhyInList(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  WHAT I CAN LEARN FROM THEM
                </label>
                <input
                  type="text"
                  placeholder="e.g. Relentless coding focus, Low-level C optimization, First-principles thinking"
                  value={newWhatToLearn}
                  onChange={(e) => setNewWhatToLearn(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  HOW THEY CAN HELP ME / STRATEGIC SYNERGY
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blueprint for StarkForge CAD 60 FPS meshing pipeline"
                  value={newHowHelp}
                  onChange={(e) => setNewHowHelp(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', background: '#181822', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#ffffff', fontSize: '13px', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => setIsAddingExpert(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.06)', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveExpert}
                  style={{ padding: '10px 24px', borderRadius: '8px', background: '#ffffff', border: 'none', color: '#000000', fontWeight: 700, cursor: 'pointer' }}
                >
                  Save to Compendium
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
