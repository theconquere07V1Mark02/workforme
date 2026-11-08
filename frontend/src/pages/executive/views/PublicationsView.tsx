import React, { useState } from 'react';
import { PublicationEntry, IdentityDoc, ProfileStore } from '../../../lib/profileData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { SecureActionModal, SecureActionType } from '../components/SecureActionModal';

interface PublicationsViewProps {
  publications: PublicationEntry[];
}

export function PublicationsView({ publications: initialPubs }: PublicationsViewProps) {
  const [pubList, setPubList] = useState<PublicationEntry[]>(initialPubs);
  const [filterType, setFilterType] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Document Inspection and Security Modals
  const [previewDoc, setPreviewDoc] = useState<IdentityDoc | null>(null);
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');
  const [activePub, setActivePub] = useState<PublicationEntry | null>(null);

  const filtered = pubList.filter((p) => {
    if (filterType === 'all') return true;
    return p.type === filterType;
  });

  const handleCopyCitation = (pub: PublicationEntry) => {
    const citation = `${pub.coAuthors?.join(', ') || 'Abhishek Gangadhar'}. "${pub.title}". ${pub.publishedIn}, ${pub.date}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInspectPub = (pub: PublicationEntry) => {
    const doc: IdentityDoc = {
      id: pub.id,
      title: `${pub.title} — Official Monograph & Manuscript`,
      idType: 'docgov',
      maskedNumber: `PUB-${pub.date.replace(/\s+/g, '-')}`,
      issuedBy: pub.publishedIn,
      fileName: pub.fileName || `${pub.title.replace(/\s+/g, '_')}_Manuscript.pdf`,
      docUrl: pub.docUrl || pub.url,
      isPrivate: true,
    };
    setPreviewDoc(doc);
  };

  const handleTriggerSecureAction = (pub: PublicationEntry, action: SecureActionType) => {
    setActivePub(pub);
    setSecureActionType(action);
    setSecureModalOpen(true);
  };

  const handleUploadSuccess = (dataUrl?: string, fileName?: string) => {
    if (activePub && dataUrl && fileName) {
      const updated = pubList.map((p) =>
        p.id === activePub.id ? { ...p, docUrl: dataUrl, fileName } : p
      );
      setPubList(updated);
      ProfileStore.updateProfile({ publications: updated });
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
          <span>INTELLECTUAL PROPERTY</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>PATENTS & RESEARCH</span>
        </div>

        <h1
          style={{
            font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          Publications & Patents
          <br />
          Engineering Monographs
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: '0 0 28px', maxWidth: '640px', lineHeight: 1.6 }}>
          Rare systems patent disclosures, in-browser 3D CAD research papers, and technical treatises establishing engineering authority.
        </p>

        {/* Filter Pills in Nettools Style */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['all', 'patent', 'research_paper', 'whitepaper'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                border: 'none',
                background: filterType === type ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                color: filterType === type ? '#000000' : '#a1a1aa',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.15s ease',
              }}
            >
              {type === 'all'
                ? `All (${pubList.length})`
                : type === 'patent'
                ? 'Patents'
                : type === 'research_paper'
                ? 'Papers'
                : 'Whitepapers'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Publications */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '60px' }}>
        {filtered.map((pub) => {
          const isCopied = copiedId === pub.id;

          return (
            <div
              key={pub.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '36px',
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontFamily: "'Martian Mono', monospace",
                      padding: '3px 10px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      fontWeight: 700,
                    }}
                  >
                    {pub.type.replace('_', ' ').toUpperCase()}
                  </span>

                  <span style={{ fontSize: '12px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    PUBLISHED: {pub.date}
                  </span>

                  {pub.docUrl && (
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
                      ✓ PDF ARCHIVED
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>
                  Author: <span style={{ color: '#ffffff' }}>{pub.coAuthors?.join(', ') || 'Abhishek Gangadhar'}</span>
                </div>
              </div>

              <h3 style={{ font: '800 24px/1.25 "Inter", sans-serif', color: '#ffffff', margin: '0 0 10px' }}>
                {pub.title}
              </h3>

              <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600, marginBottom: '16px' }}>
                Venue: {pub.publishedIn}
              </div>

              <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#a1a1aa', margin: '0 0 24px' }}>
                {pub.abstract}
              </p>

              {/* Bottom Action Ribbon */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <button
                  onClick={() => handleCopyCitation(pub)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: isCopied ? '#22c55e' : '#a1a1aa',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    fontFamily: "'Martian Mono', monospace",
                  }}
                >
                  {isCopied ? '✓ Citation Copied' : '📑 Copy BibTeX Citation'}
                </button>

                {/* Operations: View, Upload, Share, Download (Requires GOVabhi) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleInspectPub(pub)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>👁️</span>
                    <span>View Monograph</span>
                  </button>

                  <button
                    onClick={() => handleTriggerSecureAction(pub, 'upload')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⬆️</span>
                    <span>Upload PDF</span>
                  </button>

                  <button
                    onClick={() => handleTriggerSecureAction(pub, 'share')}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>🔗</span>
                    <span>Share Link</span>
                  </button>

                  <button
                    onClick={() => handleTriggerSecureAction(pub, 'download')}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: '#ffffff',
                      border: 'none',
                      color: '#000000',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⬇️</span>
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* High-Fidelity Document Preview Modal */}
      <DocumentPreviewModal
        doc={previewDoc}
        onClose={() => setPreviewDoc(null)}
      />

      {/* Security Action Clearance Modal (Password: GOVabhi) */}
      {activePub && (
        <SecureActionModal
          isOpen={secureModalOpen}
          actionType={secureActionType}
          target={{
            id: activePub.id,
            title: `${activePub.title} — Official Monograph & Manuscript`,
            docUrl: activePub.docUrl || activePub.url,
            fileName: activePub.fileName || `${activePub.title.replace(/\s+/g, '_')}_Manuscript.pdf`,
          }}
          onClose={() => {
            setSecureModalOpen(false);
            setActivePub(null);
          }}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
