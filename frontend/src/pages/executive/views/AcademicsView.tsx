import React, { useState } from 'react';
import { EducationEntry, IdentityDoc, ProfileStore } from '../../../lib/profileData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { SecureActionModal, SecureActionType } from '../components/SecureActionModal';

interface AcademicsViewProps {
  education: EducationEntry[];
}

export function AcademicsView({ education: initialEducation }: AcademicsViewProps) {
  const [educationList, setEducationList] = useState<EducationEntry[]>(initialEducation);
  const [previewDoc, setPreviewDoc] = useState<IdentityDoc | null>(null);

  // Secure Action Modal State (Requires Password: GOVabhi)
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');
  const [activeItem, setActiveItem] = useState<EducationEntry | null>(null);

  const handleInspectDoc = (item: EducationEntry) => {
    const doc: IdentityDoc = {
      id: item.id,
      title: `${item.title} — Official Transcript`,
      idType: 'college_id',
      maskedNumber: `${item.level.toUpperCase()}-${item.year.slice(0, 4)}`,
      issuedBy: `${item.institution} (${item.boardOrUniversity})`,
      fileName: item.fileName || `${item.level}_Transcript_Verified.pdf`,
      docUrl: item.docUrl,
      isPrivate: true,
    };
    setPreviewDoc(doc);
  };

  const handleTriggerSecureAction = (item: EducationEntry, action: SecureActionType) => {
    setActiveItem(item);
    setSecureActionType(action);
    setSecureModalOpen(true);
  };

  const handleUploadSuccess = (dataUrl?: string, fileName?: string) => {
    if (activeItem && dataUrl && fileName) {
      const updated = educationList.map((e) =>
        e.id === activeItem.id ? { ...e, docUrl: dataUrl, fileName } : e
      );
      setEducationList(updated);
      ProfileStore.updateProfile({ education: updated });
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
          <span>FORMAL PEDIGREE</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>SIT CAMPUS / VTU</span>
        </div>

        <h1
          style={{
            font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            margin: '0 0 16px',
          }}
        >
          Academic Journey
          <br />
          & Foundational Rigor
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Comprehensive record of formal Computer Science studies at Siddaganga Institute of Technology / VTU, Pre-University PCMC, and State Secondary Board achievements.
        </p>
      </div>

      {/* Timeline Layout (Nettools Cards) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', paddingBottom: '60px' }}>
        {educationList.map((item) => {
          const isOngoing = item.year.includes('Ongoing') || item.year.includes('Present');

          return (
            <div
              key={item.id}
              style={{
                borderRadius: '16px',
                background: '#111116',
                border: isOngoing ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '36px',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isOngoing ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: "'Martian Mono', monospace",
                        padding: '3px 10px',
                        borderRadius: '8px',
                        background: isOngoing ? '#ffffff' : 'rgba(255, 255, 255, 0.08)',
                        color: isOngoing ? '#000000' : '#a1a1aa',
                        fontWeight: 700,
                      }}
                    >
                      {item.level.toUpperCase()} EDUCATION
                    </span>

                    {isOngoing && (
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          background: 'rgba(34, 197, 94, 0.12)',
                          color: '#4ade80',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        ● CURRENTLY ENROLLED
                      </span>
                    )}

                    {item.docUrl && (
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#38bdf8',
                          fontFamily: "'Martian Mono', monospace",
                          fontWeight: 700,
                        }}
                      >
                        ✓ ATTACHED PDF ARCHIVED
                      </span>
                    )}
                  </div>

                  <h3 style={{ font: '800 24px/1.2 "Inter", sans-serif', color: '#ffffff', margin: 0 }}>
                    {item.title}
                  </h3>

                  <div style={{ fontSize: '15px', color: '#ffffff', fontWeight: 600, marginTop: '4px' }}>
                    {item.institution}
                  </div>

                  <div style={{ fontSize: '13px', color: '#a1a1aa', marginTop: '2px' }}>
                    Affiliation: <span style={{ color: '#ffffff' }}>{item.boardOrUniversity}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
                    {item.scoreOrGrade}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#71717a', fontFamily: "'Martian Mono', monospace", marginTop: '2px' }}>
                    PERIOD: {item.year}
                  </div>
                </div>
              </div>

              {/* Highlights & Modules */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '20px', marginTop: '16px', marginBottom: '22px' }}>
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", fontWeight: 700, marginBottom: '12px' }}>
                  CURRICULUM HIGHLIGHTS & KEY MODULES:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                  {item.highlights.map((hl, hIdx) => (
                    <div
                      key={hIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: '#16161d',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        fontSize: '13px',
                        color: '#d4d4d8',
                      }}
                    >
                      <span style={{ color: '#ffffff', fontSize: '14px' }}>✓</span>
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Management Action Bar (Viewable, Downloadable, Uploadable, Sharable with GOVabhi) */}
              <div
                style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                  <span>SECURITY: GOV_AUTH PROTECTED</span>
                  <span>•</span>
                  <span>PASSWORD REQUIRED</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {/* View Document */}
                  <button
                    onClick={() => handleInspectDoc(item)}
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
                      gap: '6px',
                    }}
                  >
                    <span>👁️</span>
                    <span>View Transcript</span>
                  </button>

                  {/* Upload / Replace Document (Password: GOVabhi) */}
                  <button
                    onClick={() => handleTriggerSecureAction(item, 'upload')}
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
                      gap: '6px',
                    }}
                  >
                    <span>⬆️</span>
                    <span>Upload Record</span>
                  </button>

                  {/* Share Document Link (Password: GOVabhi) */}
                  <button
                    onClick={() => handleTriggerSecureAction(item, 'share')}
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
                      gap: '6px',
                    }}
                  >
                    <span>🔗</span>
                    <span>Share Link</span>
                  </button>

                  {/* Download Document (Password: GOVabhi) */}
                  <button
                    onClick={() => handleTriggerSecureAction(item, 'download')}
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
                      gap: '6px',
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
      {activeItem && (
        <SecureActionModal
          isOpen={secureModalOpen}
          actionType={secureActionType}
          target={{
            id: activeItem.id,
            title: `${activeItem.title} — Official Academic Record`,
            docUrl: activeItem.docUrl,
            fileName: activeItem.fileName || `${activeItem.level}_Transcript_Verified.pdf`,
          }}
          onClose={() => {
            setSecureModalOpen(false);
            setActiveItem(null);
          }}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
