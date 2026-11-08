import React, { useState } from 'react';
import { CertificationEntry, IdentityDoc, ProfileStore } from '../../../lib/profileData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { SecureActionModal, SecureActionType } from '../components/SecureActionModal';

interface CredentialsViewProps {
  certifications: CertificationEntry[];
}

export function CredentialsView({ certifications: initialCerts }: CredentialsViewProps) {
  const [certList, setCertList] = useState<CertificationEntry[]>(initialCerts);
  const [filter, setFilter] = useState<'all' | 'course' | 'hackathon_win' | 'workshop'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Document Inspection and Security Modals
  const [previewDoc, setPreviewDoc] = useState<IdentityDoc | null>(null);
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');
  const [activeCert, setActiveCert] = useState<CertificationEntry | null>(null);

  const filteredCerts = certList.filter((c) => {
    if (filter === 'all') return true;
    return c.category === filter;
  });

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'hackathon_win':
        return '🥇 HACKATHON WIN';
      case 'workshop':
        return '🛠️ WORKSHOP & EVENT';
      case 'course':
        return '🎓 COURSE COMPLETION';
      default:
        return '🏆 HONOR & AWARD';
    }
  };

  const handleInspectCert = (cert: CertificationEntry) => {
    const doc: IdentityDoc = {
      id: cert.id,
      title: `${cert.title} — Verified Credential Record`,
      idType: 'docgov',
      maskedNumber: cert.credentialId || 'ACCREDITED-VERIFIED',
      issuedBy: cert.issuer,
      fileName: cert.fileName || `${cert.title.replace(/\s+/g, '_')}_Certificate.pdf`,
      docUrl: cert.certificateUrl,
      isPrivate: true,
    };
    setPreviewDoc(doc);
  };

  const handleTriggerSecureAction = (cert: CertificationEntry, action: SecureActionType) => {
    setActiveCert(cert);
    setSecureActionType(action);
    setSecureModalOpen(true);
  };

  const handleUploadSuccess = (dataUrl?: string, fileName?: string) => {
    if (activeCert && dataUrl && fileName) {
      const updated = certList.map((c) =>
        c.id === activeCert.id ? { ...c, certificateUrl: dataUrl, fileName } : c
      );
      setCertList(updated);
      ProfileStore.updateProfile({ certifications: updated });
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
          <span>VERIFIED ACCREDITATIONS</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>{certList.length} CREDENTIALS</span>
        </div>

        <h1
          style={{
            font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          Accreditations & Honors
          <br />
          Technical Certifications
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: '0 0 28px', maxWidth: '640px', lineHeight: 1.6 }}>
          Verified course completions, 1st prize national hackathon awards, and specialized technology workshop credentials.
        </p>

        {/* Filter Pills in Nettools Style */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['all', 'course', 'hackathon_win', 'workshop'] as const).map((tab) => (
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
              {tab === 'all'
                ? `All (${certList.length})`
                : tab === 'hackathon_win'
                ? 'Wins'
                : tab === 'course'
                ? 'Courses'
                : 'Workshops'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Certifications */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px',
          paddingBottom: '60px',
        }}
      >
        {filteredCerts.map((cert) => {
          const isCopied = copiedId === cert.credentialId;

          return (
            <div
              key={cert.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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
                    {getCategoryLabel(cert.category)}
                  </span>

                  <span
                    style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      background: 'rgba(34, 197, 94, 0.12)',
                      color: '#4ade80',
                      border: '1px solid rgba(34, 197, 94, 0.25)',
                      fontFamily: "'Martian Mono', monospace",
                    }}
                  >
                    ✓ VERIFIED
                  </span>
                </div>

                <h3 style={{ font: '700 20px/1.25 "Inter", sans-serif', color: '#ffffff', margin: '0 0 8px' }}>
                  {cert.title}
                </h3>

                <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: 600 }}>
                  Issuer: {cert.issuer}
                </div>

                <div style={{ fontSize: '12px', color: '#71717a', fontFamily: "'Martian Mono', monospace", marginTop: '4px' }}>
                  YEAR: {cert.date}
                </div>

                {cert.certificateUrl && (
                  <div style={{ marginTop: '8px', fontSize: '11px', color: '#38bdf8', fontFamily: "'Martian Mono', monospace" }}>
                    ✓ ATTACHED PDF / IMAGE ARCHIVED
                  </div>
                )}
              </div>

              {/* Bottom Credential Bar */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {cert.credentialId ? (
                    <button
                      onClick={() => handleCopy(cert.credentialId!)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.45)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        color: isCopied ? '#22c55e' : '#a1a1aa',
                        fontFamily: "'Martian Mono', monospace",
                        cursor: 'pointer',
                      }}
                    >
                      {isCopied ? '✓ ID Copied' : `ID: ${cert.credentialId}`}
                    </button>
                  ) : (
                    <span style={{ fontSize: '11px', color: '#71717a' }}>Accredited Direct</span>
                  )}

                  <button
                    onClick={() => handleInspectCert(cert)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
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
                    <span>View Certificate</span>
                  </button>
                </div>

                {/* Operations Ribbon: Upload, Share, Download (All Require GOVabhi) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleTriggerSecureAction(cert, 'upload')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '7px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#d4d4d8',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⬆️</span>
                    <span>Upload</span>
                  </button>

                  <button
                    onClick={() => handleTriggerSecureAction(cert, 'share')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '7px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#d4d4d8',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>🔗</span>
                    <span>Share</span>
                  </button>

                  <button
                    onClick={() => handleTriggerSecureAction(cert, 'download')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '7px',
                      background: '#ffffff',
                      border: 'none',
                      color: '#000000',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>⬇️</span>
                    <span>Download</span>
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
      {activeCert && (
        <SecureActionModal
          isOpen={secureModalOpen}
          actionType={secureActionType}
          target={{
            id: activeCert.id,
            title: `${activeCert.title} — Verified Credential Record`,
            docUrl: activeCert.certificateUrl,
            fileName: activeCert.fileName || `${activeCert.title.replace(/\s+/g, '_')}_Certificate.pdf`,
          }}
          onClose={() => {
            setSecureModalOpen(false);
            setActiveCert(null);
          }}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
