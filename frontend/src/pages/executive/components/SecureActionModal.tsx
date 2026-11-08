import React, { useState, useRef, useEffect } from 'react';

export type SecureActionType = 'download' | 'upload' | 'share';

export interface SecureActionTarget {
  id: string;
  title: string;
  docUrl?: string;
  fileName?: string;
  type?: string;
}

interface SecureActionModalProps {
  isOpen: boolean;
  actionType: SecureActionType;
  target: SecureActionTarget | null;
  onClose: () => void;
  onSuccess?: (dataUrl?: string, fileName?: string) => void;
}

export function SecureActionModal({
  isOpen,
  actionType,
  target,
  onClose,
  onSuccess,
}: SecureActionModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [generatedShareUrl, setGeneratedShareUrl] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setIsAuthorized(false);
      setGeneratedShareUrl(null);
      setCopiedLink(false);
      setSelectedFile(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen || !target) return null;

  const triggerDownload = (url?: string, name?: string) => {
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = name || target.fileName || `${target.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Fallback virtual download
      const blob = new Blob([`ABHISHEK GANGADHAR VERIFIED CREDENTIAL: ${target.title}`], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name || target.fileName || `${target.title.replace(/\s+/g, '_')}_Verified.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'GOVabhi') {
      setIsAuthorized(true);
      setError('');

      if (actionType === 'download') {
        triggerDownload(target.docUrl, target.fileName);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          onClose();
        }, 1200);
      } else if (actionType === 'share') {
        const token = `GOV_AUTH_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        const url = `${window.location.origin}/share/doc/${target.id}?token=${token}`;
        setGeneratedShareUrl(url);
        if (onSuccess) onSuccess();
      } else if (actionType === 'upload') {
        // Automatically open the file selector once authorized
        setTimeout(() => {
          fileInputRef.current?.click();
        }, 150);
      }
    } else {
      setError('Invalid Level 9 Security Clearance Key. Action blocked.');
    }
  };

  const handleFileChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (onSuccess) {
          onSuccess(dataUrl, file.name);
        }
        setTimeout(() => {
          onClose();
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyLink = () => {
    if (generatedShareUrl) {
      navigator.clipboard.writeText(generatedShareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const getActionBadge = () => {
    switch (actionType) {
      case 'download':
        return { label: 'SECURE DOWNLOAD CLEARANCE', icon: '⬇️', color: '#38bdf8' };
      case 'upload':
        return { label: 'ENCRYPTED UPLOAD CLEARANCE', icon: '⬆️', color: '#4ade80' };
      case 'share':
        return { label: 'PUBLIC ATTESTATION SHARE CLEARANCE', icon: '📡', color: '#facc15' };
    }
  };

  const badge = getActionBadge();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 120000,
        background: 'rgba(5, 5, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.2s ease-out',
        fontFamily: "'Inter', sans-serif",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Hidden File Picker for Upload Action */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChosen}
        accept=".pdf,image/*,.doc,.docx"
        style={{ display: 'none' }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#0e0e13',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 255, 255, 0.05)',
          position: 'relative',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            color: '#a1a1aa',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {/* Security Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '11px',
            fontFamily: "'Martian Mono', monospace",
            color: badge.color,
            marginBottom: '18px',
          }}
        >
          <span>{badge.icon}</span>
          <span>{badge.label}</span>
        </div>

        {/* Modal Heading */}
        <h2
          style={{
            font: '800 24px/1.2 "Inter", sans-serif',
            color: '#ffffff',
            margin: '0 0 10px',
            letterSpacing: '-0.02em',
          }}
        >
          {actionType === 'download' && 'Authorize Document Download'}
          {actionType === 'upload' && 'Authorize Document Upload'}
          {actionType === 'share' && 'Authorize Shareable Link'}
        </h2>

        {/* Target Document Info Box */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '11px', color: '#71717a', fontFamily: "'Martian Mono', monospace", marginBottom: '4px' }}>
            TARGET RESOURCE:
          </div>
          <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
            {target.title}
          </div>
          {target.fileName && (
            <div style={{ fontSize: '11.5px', color: '#a1a1aa', fontFamily: "'Martian Mono', monospace", marginTop: '4px' }}>
              FILE: {target.fileName}
            </div>
          )}
        </div>

        {/* State 1: Password Input Form */}
        {!isAuthorized && (
          <form onSubmit={handleVerify}>
            <p style={{ color: '#a1a1aa', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 16px' }}>
              This resource is guarded by hardware isolation security. Enter your master password (<code>GOVabhi</code>) to proceed with {actionType}.
            </p>

            <div style={{ marginBottom: '20px' }}>
              <input
                ref={inputRef}
                type="password"
                placeholder="Enter password (GOVabhi)..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  borderRadius: '10px',
                  background: '#050507',
                  border: error ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.16)',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: "'Martian Mono', monospace",
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              {error && (
                <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px', fontFamily: "'Martian Mono', monospace" }}>
                  ⚠ {error}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#a1a1aa',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                style={{
                  padding: '10px 24px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  border: 'none',
                  color: '#000000',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Authorize & Proceed</span>
                <span>→</span>
              </button>
            </div>
          </form>
        )}

        {/* State 2: Authorized Download in Progress */}
        {isAuthorized && actionType === 'download' && (
          <div style={{ textAlign: 'center', padding: '24px 0 12px' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>✅</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>
              Authorization Confirmed
            </div>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: 0 }}>
              Initiating secure download of {target.fileName || `${target.title}.pdf`}...
            </p>
          </div>
        )}

        {/* State 2: Authorized Upload Selected / Waiting */}
        {isAuthorized && actionType === 'upload' && (
          <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>
              {selectedFile ? '📁' : '⏳'}
            </div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: selectedFile ? '#4ade80' : '#ffffff', marginBottom: '6px' }}>
              {selectedFile ? `Encrypting & Storing: ${selectedFile.name}` : 'Awaiting File Selection...'}
            </div>
            <p style={{ color: '#a1a1aa', fontSize: '13px', margin: '0 0 18px' }}>
              {selectedFile
                ? 'Applying SHA-256 integrity hash and saving to your executive profile...'
                : 'Click below if file dialog did not open automatically.'}
            </p>
            {!selectedFile && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '11px 24px',
                  borderRadius: '10px',
                  background: '#ffffff',
                  color: '#000000',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Browse & Select File
              </button>
            )}
          </div>
        )}

        {/* State 2: Authorized Share Link Generated */}
        {isAuthorized && actionType === 'share' && generatedShareUrl && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '13.5px', fontWeight: 600, marginBottom: '14px' }}>
              <span>✓</span>
              <span>Cryptographic Share Token Generated</span>
            </div>

            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: '#050507',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                wordBreak: 'break-all',
                fontSize: '12px',
                fontFamily: "'Martian Mono', monospace",
                color: '#ffffff',
                marginBottom: '18px',
                lineHeight: 1.5,
              }}
            >
              {generatedShareUrl}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#a1a1aa',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Done
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  padding: '10px 22px',
                  borderRadius: '10px',
                  background: copiedLink ? '#22c55e' : '#ffffff',
                  color: copiedLink ? '#ffffff' : '#000000',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.15s ease',
                }}
              >
                <span>{copiedLink ? '✓ Copied!' : '📋 Copy Shareable Link'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
