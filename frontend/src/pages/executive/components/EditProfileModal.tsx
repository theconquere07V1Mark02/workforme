import React, { useState } from 'react';
import { ExecutiveProfile } from '../../../lib/profileData';

interface EditProfileModalProps {
  profile: ExecutiveProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Partial<ExecutiveProfile>) => void;
}

export function EditProfileModal({ profile, isOpen, onClose, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState<ExecutiveProfile>(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 110000,
        background: 'rgba(2, 3, 6, 0.88)',
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
          maxWidth: '740px',
          maxHeight: '90vh',
          background: 'linear-gradient(165deg, #101322 0%, #07080e 100%)',
          border: '1px solid rgba(240, 180, 41, 0.4)',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(240, 180, 41, 0.1)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Inter', sans-serif",
          color: '#f0f2fa',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>✏️</span>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gold)', fontFamily: "'Space Grotesk', sans-serif" }}>
                Edit Executive Dossier
              </div>
              <div style={{ fontSize: '11px', color: '#8b91a5', fontFamily: "'Martian Mono', monospace" }}>
                AUTHENTICATED AS CHIEF ARCHITECT ABHISHEK GANGADHAR
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#fff',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                FULL NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                OFFICIAL TITLE / ROLE
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
              VISIONARY TAGLINE
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '13px',
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
              EXECUTIVE SUMMARY / BIO PARAGRAPH
            </label>
            <textarea
              rows={4}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '13px',
                lineHeight: 1.6,
                fontFamily: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                PRIMARY EMAIL
              </label>
              <input
                type="email"
                value={formData.primaryEmail}
                onChange={(e) => setFormData({ ...formData, primaryEmail: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                VERIFIED PHONE / CONTACT
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                HOME RESIDENCE ADDRESS
              </label>
              <input
                type="text"
                value={formData.homeAddress}
                onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
                OFFICE / LAB HQ ADDRESS
              </label>
              <input
                type="text"
                value={formData.officeAddress}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--gold)', fontWeight: 600, marginBottom: '6px' }}>
              CORE PILLAR SKILLS (comma-separated)
            </label>
            <input
              type="text"
              value={formData.skills.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#fff',
                fontSize: '13px',
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '10px 24px',
                borderRadius: '6px',
                background: 'var(--gold)',
                border: 'none',
                color: '#000',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Save Profile Changes ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
