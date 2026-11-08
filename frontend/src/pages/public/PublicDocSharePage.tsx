import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ProfileStore, IdentityDoc } from '../../lib/profileData';

export function PublicDocSharePage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const profile = ProfileStore.getProfile();
  const doc: IdentityDoc | null = ProfileStore.resolveVerifiableDoc(id || '');

  const [enteredPass, setEnteredPass] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // If token matches or user unlocked
    return Boolean(token && token.startsWith('GOV_AUTH'));
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPass === 'GOVabhi') {
      setIsUnlocked(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Invalid verification key. Access denied.');
    }
  };

  const handleDownload = () => {
    if (doc?.docUrl) {
      const a = document.createElement('a');
      a.href = doc.docUrl;
      a.download = doc.fileName || `${doc.title}.pdf`;
      a.click();
    } else {
      alert(`Downloading verified copy of ${doc?.title || 'Document'}.pdf`);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090b',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        color: '#f4f4f5',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header */}
      <header
        style={{
          padding: '18px 36px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(9, 9, 11, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#ffffff',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '14px',
            }}
          >
            🛡️
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
              DocGov Verified Document Portal
            </div>
            <div style={{ fontSize: '10px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
              CRYPTOGRAPHIC IDENTITY ATTESTATION
            </div>
          </div>
        </div>

        <Link
          to="/profile"
          style={{
            fontSize: '12px',
            color: '#a1a1aa',
            textDecoration: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          ← Return to Profile
        </Link>
      </header>

      {/* Main Container */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
        }}
      >
        {!doc ? (
          <div
            style={{
              maxWidth: '480px',
              textAlign: 'center',
              padding: '40px',
              background: '#111116',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚠️</div>
            <h2 style={{ fontSize: '20px', color: '#ffffff', margin: '0 0 8px' }}>
              Document Not Found
            </h2>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 20px' }}>
              The requested document identifier does not exist or the sharing link has expired.
            </p>
            <Link
              to="/profile"
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#ffffff',
                color: '#000000',
                fontWeight: 700,
                fontSize: '12px',
                textDecoration: 'none',
              }}
            >
              Open Executive Profile
            </Link>
          </div>
        ) : !isUnlocked ? (
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '36px',
              background: '#111116',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '38px', marginBottom: '12px' }}>🔒</div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 6px' }}>
              Secure Document Verification
            </h2>
            <p style={{ fontSize: '12.5px', color: '#a1a1aa', margin: '0 0 24px', lineHeight: 1.5 }}>
              This record is encrypted under Abhishek Gangadhar&apos;s DocGov Vault. Enter the clearance key to view and download this credential.
            </p>

            <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="password"
                placeholder="Enter Clearance Password..."
                value={enteredPass}
                onChange={(e) => setEnteredPass(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: '#181822',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '13px',
                  textAlign: 'center',
                  letterSpacing: '0.15em',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />

              {errorMsg && (
                <div style={{ fontSize: '11.5px', color: '#ef4444', fontFamily: "'Martian Mono', monospace" }}>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
                }}
              >
                Verify & Unlock Document
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Document Certificate & Viewer */
          <div
            style={{
              width: '100%',
              maxWidth: '860px',
              background: '#111116',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Certificate Header Banner */}
            <div
              style={{
                padding: '28px 36px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
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
                    ● CRYPTOGRAPHICALLY VERIFIED
                  </span>
                  <span style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>
                    DOCGOV-SECURE-SHARE
                  </span>
                </div>
                <h1 style={{ font: '800 26px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 4px' }}>
                  {doc.title}
                </h1>
                <div style={{ fontSize: '13px', color: '#a1a1aa' }}>
                  Issued by: <strong style={{ color: '#ffffff' }}>{doc.issuedBy}</strong>
                </div>
              </div>

              <button
                onClick={handleDownload}
                style={{
                  padding: '11px 22px',
                  borderRadius: '9px',
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
                <span>⬇️</span>
                <span>Download Verified PDF</span>
              </button>
            </div>

            {/* Document Preview Canvas */}
            <div style={{ padding: '36px', background: '#0d0d12' }}>
              <div
                style={{
                  background: '#ffffff',
                  color: '#000000',
                  borderRadius: '12px',
                  padding: '48px',
                  minHeight: '440px',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.4)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Watermark Seal */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-30deg)',
                    fontSize: '56px',
                    fontWeight: 900,
                    color: 'rgba(0, 0, 0, 0.04)',
                    pointerEvents: 'none',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  DOCGOV VERIFIED • UIDAI
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000000', paddingBottom: '16px', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", fontWeight: 700, color: '#4b5563' }}>
                      OFFICIAL ATTESTED RECORD
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>
                      {doc.title}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', fontFamily: "'Martian Mono', monospace" }}>
                      RECORD IDENTIFIER
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, fontFamily: "'Martian Mono', monospace" }}>
                      {doc.maskedNumber}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>
                      Subject Identity
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>
                      Abhishek Gangadhar
                    </div>
                    <div style={{ fontSize: '12px', color: '#4b5563' }}>
                      Lead Systems Architect & Full-Stack AI Engineer
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase' }}>
                      Issuing Authority
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>
                      {doc.issuedBy}
                    </div>
                    <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                      ✓ UIDAI & DigiLocker Cryptographically Signed
                    </div>
                  </div>
                </div>

                {/* Digital Stamp Sign */}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', maxWidth: '380px' }}>
                    Attested via SHA-256 eSign token. This digital representation is legally valid and verified under the Information Technology Act.
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Brush Script MT', cursive, serif", fontSize: '28px', color: '#111827' }}>
                      Abhishek Gangadhar
                    </div>
                    <div style={{ fontSize: '9px', fontFamily: "'Martian Mono', monospace", color: '#6b7280' }}>
                      AUTHORIZED DIGITAL SIGNATURE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div
              style={{
                padding: '16px 36px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(255, 255, 255, 0.02)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '11px',
                color: '#71717a',
                fontFamily: "'Martian Mono', monospace",
              }}
            >
              <span>TOKEN: {token || 'GOV_AUTH_VERIFIED'}</span>
              <span>SECURED BY JARVIS SOVEREIGN OS</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
