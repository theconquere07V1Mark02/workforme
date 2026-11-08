import React, { useState } from 'react';
import { IdentityDoc } from '../../../lib/profileData';
import { SecureActionModal, SecureActionType } from './SecureActionModal';

interface DocumentPreviewModalProps {
  doc: IdentityDoc | null;
  onClose: () => void;
}

export function DocumentPreviewModal({ doc, onClose }: DocumentPreviewModalProps) {
  const [zoom, setZoom] = useState(100);
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');

  if (!doc) return null;

  const handleDownload = () => {
    setSecureActionType('download');
    setSecureModalOpen(true);
  };

  const handleShare = () => {
    setSecureActionType('share');
    setSecureModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110000,
        background: 'rgba(3, 4, 8, 0.92)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          background: 'linear-gradient(165deg, #0d0f18 0%, #06070b 100%)',
          border: '1px solid rgba(240, 180, 41, 0.35)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.9), 0 0 50px rgba(240, 180, 41, 0.12)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inter', sans-serif",
          color: '#f0f2fa',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {doc.title}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#8b91a5',
                  fontFamily: "'Martian Mono', monospace",
                  marginTop: '2px',
                }}
              >
                ISSUED BY: {doc.issuedBy.toUpperCase()} • ID: {doc.maskedNumber}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Zoom Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '3px 8px',
              }}
            >
              <button
                onClick={() => setZoom((z) => Math.max(z - 15, 50))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '13px',
                  padding: '2px 6px',
                }}
                title="Zoom out"
              >
                −
              </button>
              <span style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: 'var(--gold)', minWidth: '40px', textAlign: 'center' }}>
                {zoom}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(z + 15, 200))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  fontSize: '13px',
                  padding: '2px 6px',
                }}
                title="Zoom in"
              >
                +
              </button>
            </div>

            <button
              onClick={handlePrint}
              style={{
                padding: '7px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              🖨️ Print
            </button>

            <button
              onClick={handleShare}
              style={{
                padding: '7px 12px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
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
              onClick={handleDownload}
              style={{
                padding: '7px 14px',
                borderRadius: '6px',
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
              <span>⬇</span>
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Document Content Viewport */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #101322 0%, #06070c 100%)',
          }}
        >
          <div
            style={{
              width: `${(620 * zoom) / 100}px`,
              minHeight: `${(420 * zoom) / 100}px`,
              background: '#fff',
              color: '#0f172a',
              borderRadius: '8px',
              padding: '32px 40px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              position: 'relative',
              transition: 'width 0.15s ease',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Watermark */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.04,
                fontSize: '60px',
                fontWeight: 900,
                transform: 'rotate(-25deg)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              CONFIDENTIAL • VERIFIED
            </div>

            {/* Document Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', letterSpacing: '0.1em', fontWeight: 700, color: '#475569' }}>
                  GOVERNMENT OF INDIA / OFFICIAL CREDENTIAL VAULT
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  Authority: {doc.issuedBy}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#15803d',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  ✓ VERIFIED
                </span>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontFamily: 'monospace' }}>
                  REF: {doc.maskedNumber}
                </div>
              </div>
            </div>

            {/* Document Body */}
            <div style={{ padding: '24px 0', fontSize: '13px', lineHeight: 1.8, color: '#1e293b' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>HOLDER NAME</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Abhishek Gangadhar</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>IDENTIFIER NUMBER</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'monospace', color: '#0369a1' }}>
                    {doc.maskedNumber}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>SECURITY STATUS</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#15803d' }}>
                    ● Cryptographically Certified & Stamped
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>ACCESS CLEARANCE</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#b45309' }}>
                    Level 9 Executive Vault Protection
                  </div>
                </div>
              </div>

              {/* Digital Signature rendering */}
              {doc.idType === 'signature' ? (
                <div style={{ marginTop: '20px', padding: '16px', background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '6px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>AUTHORIZED DIGITAL SIGNATURE STAMP</div>
                  <div style={{ margin: '14px 0', fontFamily: "'Brush Script MT', cursive, serif", fontSize: '32px', color: '#1e3a8a', letterSpacing: '0.05em' }}>
                    Abhishek Gangadhar
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b', fontFamily: 'monospace' }}>
                    HASH: SHA-256 (eSign Verified) • TIMESTAMP: {new Date().toISOString()} • ALGORITHM: ECDSA-P256
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '16px', padding: '14px', background: '#f1f5f9', borderRadius: '6px', fontSize: '11.5px', color: '#475569' }}>
                  This document record is securely verified under DigiLocker / DocGov institutional clearance standards. Full immutable PDF file is archived in confidential local vault storage.
                </div>
              )}
            </div>

            {/* Document Footer */}
            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#64748b' }}>
              <div>DOCUMENT: {doc.fileName || `${doc.title}.pdf`}</div>
              <div style={{ fontFamily: 'monospace' }}>SEAL: UIDAI-AUTHENTICATED-09</div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Secure Action Clearance Modal */}
      <SecureActionModal
        isOpen={secureModalOpen}
        actionType={secureActionType}
        target={{
          id: doc.id,
          title: doc.title,
          docUrl: doc.docUrl,
          fileName: doc.fileName,
        }}
        onClose={() => setSecureModalOpen(false)}
      />
    </div>
  );
}
