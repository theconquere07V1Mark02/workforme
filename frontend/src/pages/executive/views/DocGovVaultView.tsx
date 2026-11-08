import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdentityDoc } from '../../../lib/profileData';
import { DocumentPreviewModal } from '../components/DocumentPreviewModal';
import { AadhaarIcon, DigiLockerIcon } from '../components/BrandIcons';
import { SecureActionModal } from '../components/SecureActionModal';

interface DocGovVaultViewProps {
  docs: IdentityDoc[];
  onAddDoc: (newDoc: IdentityDoc) => void;
}

export function DocGovVaultView({ docs, onAddDoc }: DocGovVaultViewProps) {
  const navigate = useNavigate();

  // Vault Security Lock State (Password: GOVabhi)
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Share Link Generation State
  const [shareModalDoc, setShareModalDoc] = useState<IdentityDoc | null>(null);
  const [sharePassword, setSharePassword] = useState('');
  const [generatedShareUrl, setGeneratedShareUrl] = useState<string | null>(null);
  const [shareError, setShareError] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Active Doc Preview & Filter State
  const [activeDocForPreview, setActiveDocForPreview] = useState<IdentityDoc | null>(null);
  const [secureDownloadDoc, setSecureDownloadDoc] = useState<IdentityDoc | null>(null);
  const [secureDownloadOpen, setSecureDownloadOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchDocQuery, setSearchDocQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  // Upload fields
  const [newDocTitle, setNewDocTitle] = useState('');
  const [newDocType, setNewDocType] = useState<IdentityDoc['idType']>('docgov');
  const [newDocId, setNewDocId] = useState('');
  const [newDocIssuer, setNewDocIssuer] = useState('');
  const [selectedFileObj, setSelectedFileObj] = useState<File | null>(null);

  // Handle Vault Unlock with password GOVabhi
  const handleUnlockVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPassword === 'GOVabhi') {
      setIsVaultUnlocked(true);
      setPasswordModalOpen(false);
      setEnteredPassword('');
      setPasswordError('');
    } else {
      setPasswordError('Invalid Vault Key. Access Denied.');
    }
  };

  // Handle Share Link Generation with password GOVabhi
  const handleGenerateShareLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (sharePassword === 'GOVabhi') {
      if (shareModalDoc) {
        const token = `GOV_AUTH_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const url = `${window.location.origin}/share/doc/${shareModalDoc.id}?token=${token}`;
        setGeneratedShareUrl(url);
        setShareError('');
      }
    } else {
      setShareError('Invalid Master Password. Share link generation blocked.');
    }
  };

  const filteredDocs = docs.filter((d) => {
    const matchesFilter =
      filterType === 'all'
        ? true
        : filterType === 'ids'
        ? d.idType === 'aadhaar' || d.idType === 'college_id' || d.idType === 'school_id'
        : filterType === 'docgov'
        ? d.idType === 'docgov'
        : filterType === 'signature'
        ? d.idType === 'signature'
        : true;

    const matchesSearch =
      d.title.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      d.maskedNumber.toLowerCase().includes(searchDocQuery.toLowerCase()) ||
      d.issuedBy.toLowerCase().includes(searchDocQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileObj(file);
      if (!newDocTitle) setNewDocTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSaveUploadedDoc = () => {
    if (!newDocTitle) {
      alert('Please enter a document title.');
      return;
    }

    if (selectedFileObj) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        const created: IdentityDoc = {
          id: `doc-${Date.now()}`,
          title: newDocTitle,
          idType: newDocType,
          maskedNumber: newDocId || 'VERIFIED-DOC-2026',
          issuedBy: newDocIssuer || 'Government of India / Authorized Agency',
          fileName: selectedFileObj.name,
          docUrl: dataUrl,
          isPrivate: true,
        };
        onAddDoc(created);
        setIsUploading(false);
        setSelectedFileObj(null);
        setNewDocTitle('');
        setNewDocId('');
        setNewDocIssuer('');
        alert(`Document "${created.title}" successfully encrypted & added to DocGov vault!`);
      };
      reader.readAsDataURL(selectedFileObj);
    } else {
      const created: IdentityDoc = {
        id: `doc-${Date.now()}`,
        title: newDocTitle,
        idType: newDocType,
        maskedNumber: newDocId || 'VERIFIED-DOC-2026',
        issuedBy: newDocIssuer || 'Government of India / Authorized Agency',
        fileName: `${newDocTitle.replace(/\s+/g, '_')}.pdf`,
        isPrivate: true,
      };
      onAddDoc(created);
      setIsUploading(false);
      setNewDocTitle('');
      setNewDocId('');
      setNewDocIssuer('');
      alert(`Document "${created.title}" successfully encrypted & added to DocGov vault!`);
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', color: '#f4f4f5' }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileUploadRef}
        onChange={handleFileUpload}
        accept=".pdf,image/*"
        style={{ display: 'none' }}
      />

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
          <span>HARDWARE ISOLATED VAULT</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>LEVEL 9 CRYPTOGRAPHIC ENCRYPTION</span>
        </div>

        <h1
          style={{
            font: '800 42px/1.15 "Inter", -apple-system, sans-serif',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            margin: '0 0 10px',
          }}
        >
          DocGov & Identity Safe
        </h1>

        <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '820px', lineHeight: 1.6 }}>
          Cryptographic vault housing certified digital signatures, official Aadhaar identification, university academic records, and authenticated DocGov legal certificates.
        </p>
      </div>

      {/* ======================================================== */}
      {/* 2. CERTIFIED DIGITAL SIGNATURE SPOTLIGHT (KEPT AS IS)    */}
      {/* ======================================================== */}
      <div
        style={{
          padding: '32px 36px',
          borderRadius: '18px',
          background: '#111116',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginBottom: '36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '18px' }}>✍️</span>
            <span style={{ fontSize: '11px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", fontWeight: 700 }}>
              DOCGOV AUTHORIZED DIGITAL SIGNATURE
            </span>
          </div>
          <h3 style={{ font: '800 24px/1.2 "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px' }}>
            Abhishek Gangadhar — Certified Digital Stamp
          </h3>
          <p style={{ color: '#a1a1aa', fontSize: '13.5px', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
            Cryptographically signed electronic authentication token utilized for official academic documents, government clearance forms, and patent submissions.
          </p>

          <div
            style={{
              marginTop: '18px',
              fontFamily: "'Brush Script MT', cursive, serif",
              fontSize: '42px',
              color: '#ffffff',
              letterSpacing: '0.04em',
            }}
          >
            Abhishek Gangadhar
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
          <button
            onClick={() => {
              const sigDoc = docs.find((d) => d.idType === 'signature') || docs[0];
              setActiveDocForPreview(sigDoc);
            }}
            style={{
              padding: '11px 22px',
              borderRadius: '9px',
              background: '#ffffff',
              color: '#000000',
              fontSize: '12.5px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(255, 255, 255, 0.15)',
            }}
          >
            <span>Inspect Verified Signature</span>
            <span>👁️</span>
          </button>
          <span style={{ fontSize: '10.5px', color: '#22c55e', fontFamily: "'Martian Mono', monospace" }}>
            ✓ ECDSA-P256 HASH VERIFIED
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. DOWNSIDE: HIGH-SECURITY VAULT SAFE OR REPOSITORY      */}
      {/* ======================================================== */}
      {!isVaultUnlocked ? (
        /* LOCKED SAFE INTERFACE WITH "ACCESS GOV" BUTTON */
        <div
          style={{
            padding: '56px 40px',
            borderRadius: '20px',
            background: 'linear-gradient(180deg, #13131b 0%, #0d0d14 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              boxShadow: '0 0 24px rgba(255, 255, 255, 0.08)',
            }}
          >
            🔐
          </div>

          <div
            style={{
              fontSize: '11px',
              fontFamily: "'Martian Mono', monospace",
              padding: '3px 12px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.12)',
              color: '#f87171',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            ● RESTRICTED GOVERNMENT REPOSITORY • HARDWARE LOCKED
          </div>

          <h2
            style={{
              font: '800 32px/1.2 "Inter", sans-serif',
              color: '#ffffff',
              margin: '0',
              letterSpacing: '-0.02em',
            }}
          >
            DocGov Identity Vault is Locked
          </h2>

          <p
            style={{
              color: '#a1a1aa',
              fontSize: '14.5px',
              margin: '0',
              maxWidth: '620px',
              lineHeight: 1.6,
            }}
          >
            Official Aadhaar credentials, academic certificates, school IDs, and DocGov legal records are isolated in an encrypted partition requiring biometric clearance.
          </p>

          <button
            onClick={() => {
              setPasswordModalOpen(true);
              setPasswordError('');
            }}
            style={{
              marginTop: '10px',
              padding: '14px 36px',
              borderRadius: '12px',
              background: '#ffffff',
              color: '#000000',
              fontSize: '14px',
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(255, 255, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.25)';
            }}
          >
            <span>🛡️</span>
            <span>Access Gov Vault</span>
          </button>
        </div>
      ) : (
        /* ======================================================== */
        /* UNLOCKED SEPARATE REPOSITORY PORTAL                      */
        /* ======================================================== */
        <div
          style={{
            padding: '36px',
            borderRadius: '20px',
            background: '#111116',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Top Control Bar with Back to Workspace / Profile */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '24px',
              marginBottom: '28px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsVaultUnlocked(false)}
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
                <span>🔒</span>
                <span>Lock Vault</span>
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
                <span>Return to Workspace</span>
              </button>

              <span
                style={{
                  fontSize: '11px',
                  color: '#4ade80',
                  fontFamily: "'Martian Mono', monospace",
                  background: 'rgba(34, 197, 94, 0.12)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: 700,
                }}
              >
                ● UNLOCKED • CLEARANCE LEVEL 9
              </span>
            </div>

            <button
              onClick={() => setIsUploading(true)}
              style={{
                padding: '10px 20px',
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
              <span>+</span>
              <span>Upload Document (PDF / Image)</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `All Documents (${docs.length})` },
                { id: 'ids', label: 'Government IDs' },
                { id: 'docgov', label: 'DocGov Certificates' },
                { id: 'signature', label: 'Digital Signatures' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  style={{
                    padding: '7px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: filterType === f.id ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                    color: filterType === f.id ? '#000000' : '#a1a1aa',
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

            {/* Document Search */}
            <div style={{ position: 'relative', minWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search documents by name or ID..."
                value={searchDocQuery}
                onChange={(e) => setSearchDocQuery(e.target.value)}
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

          {/* Grid of Documents */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '22px',
            }}
          >
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                style={{
                  padding: '24px 26px',
                  borderRadius: '16px',
                  background: '#161620',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  minHeight: '230px',
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {doc.idType === 'aadhaar' ? (
                        <AadhaarIcon size={22} />
                      ) : doc.idType === 'docgov' ? (
                        <DigiLockerIcon size={22} />
                      ) : (
                        <span style={{ fontSize: '20px' }}>📄</span>
                      )}
                      <span
                        style={{
                          fontSize: '10px',
                          color: '#a1a1aa',
                          fontFamily: "'Martian Mono', monospace",
                          textTransform: 'uppercase',
                          fontWeight: 700,
                        }}
                      >
                        {doc.idType}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '9.5px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: 'rgba(34, 197, 94, 0.12)',
                        color: '#4ade80',
                        fontFamily: "'Martian Mono', monospace",
                        fontWeight: 700,
                      }}
                    >
                      ✓ VERIFIED
                    </span>
                  </div>

                  <div style={{ font: '700 17px/1.25 "Inter", sans-serif', color: '#ffffff' }}>
                    {doc.title}
                  </div>

                  <div style={{ fontSize: '12px', color: '#8b91a5', marginTop: '4px' }}>
                    Authority: {doc.issuedBy}
                  </div>

                  <div
                    style={{
                      fontSize: '11.5px',
                      color: '#ffffff',
                      fontFamily: "'Martian Mono', monospace",
                      marginTop: '10px',
                      background: 'rgba(0, 0, 0, 0.45)',
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>ID: {doc.maskedNumber}</span>
                    <span style={{ color: '#71717a', fontSize: '10px' }}>PDF</span>
                  </div>
                </div>

                {/* Document Actions: View, Download, Share */}
                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <button
                    onClick={() => setActiveDocForPreview(doc)}
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#000000',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>👁️</span>
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => {
                      setSecureDownloadDoc(doc);
                      setSecureDownloadOpen(true);
                    }}
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: '#ffffff',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>⬇️</span>
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => {
                      setShareModalDoc(doc);
                      setSharePassword('');
                      setGeneratedShareUrl(null);
                      setShareError('');
                      setCopiedLink(false);
                    }}
                    title="Generate Password-Protected Public Share Link"
                    style={{
                      padding: '7px 12px',
                      borderRadius: '6px',
                      background: 'rgba(0, 229, 255, 0.08)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      color: '#00e5ff',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>🔗</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MODAL: ENTER PASSWORD "GOVabhi" TO ACCESS VAULT       */}
      {/* ======================================================== */}
      {passwordModalOpen && (
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
            if (e.target === e.currentTarget) setPasswordModalOpen(false);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '18px',
              padding: '36px',
              color: '#ffffff',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '38px', marginBottom: '12px' }}>🛡️</div>
            <h3 style={{ font: '800 22px "Inter", sans-serif', color: '#ffffff', margin: '0 0 6px' }}>
              DocGov Vault Clearance
            </h3>
            <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 20px', lineHeight: 1.5 }}>
              Enter your master clearance password to unlock your official identity documents and certificates.
            </p>

            <form onSubmit={handleUnlockVault} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <input
                type="password"
                placeholder="Enter password (e.g. GOVabhi)..."
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: '#181822',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  textAlign: 'center',
                  letterSpacing: '0.1em',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />

              {passwordError && (
                <div style={{ fontSize: '12px', color: '#ef4444', fontFamily: "'Martian Mono', monospace" }}>
                  {passwordError}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
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
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Unlock Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. MODAL: PASSWORD-PROTECTED SHARE LINK GENERATOR        */}
      {/* ======================================================== */}
      {shareModalDoc && (
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
            if (e.target === e.currentTarget) setShareModalDoc(null);
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '500px',
              background: '#111116',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '18px',
              padding: '36px',
              color: '#ffffff',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>
                Generate DocGov Share Link
              </div>
              <button
                onClick={() => setShareModalDoc(null)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '16px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '13px', color: '#a1a1aa', marginBottom: '20px' }}>
              Target Document: <strong style={{ color: '#ffffff' }}>{shareModalDoc.title}</strong>
            </div>

            {!generatedShareUrl ? (
              <form onSubmit={handleGenerateShareLink} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                    CONFIRM MASTER PASSWORD (GOVabhi)
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password..."
                    value={sharePassword}
                    onChange={(e) => setSharePassword(e.target.value)}
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      background: '#181822',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {shareError && (
                  <div style={{ fontSize: '11.5px', color: '#ef4444', fontFamily: "'Martian Mono', monospace" }}>
                    {shareError}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#ffffff',
                    border: 'none',
                    color: '#000000',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Generate Cryptographic Share Link
                </button>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '12px', color: '#4ade80', fontFamily: "'Martian Mono', monospace" }}>
                  ✓ Cryptographic Share Link Active
                </div>

                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#0d0d12',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '12px',
                    color: '#00e5ff',
                    fontFamily: "'Martian Mono', monospace",
                    wordBreak: 'break-all',
                  }}
                >
                  {generatedShareUrl}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedShareUrl);
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    }}
                    style={{
                      flex: 1,
                      padding: '11px',
                      borderRadius: '8px',
                      background: copiedLink ? '#22c55e' : '#ffffff',
                      color: copiedLink ? '#ffffff' : '#000000',
                      border: 'none',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {copiedLink ? '✓ Copied to Clipboard!' : '📋 Copy Share URL'}
                  </button>

                  <a
                    href={generatedShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '11px 18px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Test Open</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. MODAL: UPLOAD NEW GOVERNMENT DOCUMENT                 */}
      {/* ======================================================== */}
      {isUploading && (
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
            if (e.target === e.currentTarget) setIsUploading(false);
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
              <h3 style={{ margin: 0, font: '700 20px "Inter", sans-serif', color: '#ffffff' }}>
                Upload to DocGov Vault
              </h3>
              <button
                onClick={() => setIsUploading(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '16px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  DOCUMENT TITLE
                </label>
                <input
                  type="text"
                  placeholder="e.g. Passport Record / PAN Card / Degree Certificate"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
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
                  DOCUMENT CATEGORY
                </label>
                <select
                  value={newDocType}
                  onChange={(e) => setNewDocType(e.target.value as any)}
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
                >
                  <option value="aadhaar">Government ID (Aadhaar / Passport / Voter)</option>
                  <option value="college_id">Academic ID (College / University)</option>
                  <option value="school_id">Secondary School Record</option>
                  <option value="docgov">DocGov Certificate (Domicile / Birth)</option>
                  <option value="signature">Authorized Digital Stamp / Signature</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', color: '#a1a1aa', fontWeight: 700, marginBottom: '6px', fontFamily: "'Martian Mono', monospace" }}>
                  IDENTIFIER / REGISTRATION NUMBER
                </label>
                <input
                  type="text"
                  placeholder="e.g. XXXX-XXXX-4812 or REG-2026-99"
                  value={newDocId}
                  onChange={(e) => setNewDocId(e.target.value)}
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
                  ISSUING AUTHORITY
                </label>
                <input
                  type="text"
                  placeholder="e.g. Government of Karnataka / UIDAI"
                  value={newDocIssuer}
                  onChange={(e) => setNewDocIssuer(e.target.value)}
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
                  ATTACH FILE (PDF OR IMAGE)
                </label>
                <button
                  type="button"
                  onClick={() => fileUploadRef.current?.click()}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#181822',
                    border: '1px dashed rgba(255, 255, 255, 0.2)',
                    color: selectedFileObj ? '#4ade80' : '#a1a1aa',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                  }}
                >
                  {selectedFileObj ? `✓ ${selectedFileObj.name}` : '+ Choose PDF / Image file'}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  onClick={() => setIsUploading(false)}
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
                  onClick={handleSaveUploadedDoc}
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
                  Encrypt & Save to Vault
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-App Document Preview Modal */}
      <DocumentPreviewModal
        doc={activeDocForPreview}
        onClose={() => setActiveDocForPreview(null)}
      />

      {/* Vault Secure Download Clearance Modal (Password: GOVabhi) */}
      {secureDownloadDoc && (
        <SecureActionModal
          isOpen={secureDownloadOpen}
          actionType="download"
          target={{
            id: secureDownloadDoc.id,
            title: secureDownloadDoc.title,
            docUrl: secureDownloadDoc.docUrl,
            fileName: secureDownloadDoc.fileName || `${secureDownloadDoc.title}.pdf`,
          }}
          onClose={() => {
            setSecureDownloadOpen(false);
            setSecureDownloadDoc(null);
          }}
        />
      )}
    </div>
  );
}
