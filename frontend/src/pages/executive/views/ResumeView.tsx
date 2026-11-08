import React, { useState } from 'react';
import { ExecutiveProfile } from '../../../lib/profileData';
import { SecureActionModal, SecureActionType } from '../components/SecureActionModal';

interface ResumeViewProps {
  profile: ExecutiveProfile;
  onUpdateResume: (dataUrl: string, fileName: string) => void;
}

export function ResumeView({ profile, onUpdateResume }: ResumeViewProps) {
  const [zoom, setZoom] = useState(100);
  const [secureModalOpen, setSecureModalOpen] = useState(false);
  const [secureActionType, setSecureActionType] = useState<SecureActionType>('download');

  const handleDownload = () => {
    setSecureActionType('download');
    setSecureModalOpen(true);
  };

  const handleUpload = () => {
    setSecureActionType('upload');
    setSecureModalOpen(true);
  };

  const handleShare = () => {
    setSecureActionType('share');
    setSecureModalOpen(true);
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
          <span>CURRICULUM VITAE</span>
          <span style={{ color: '#52525b' }}>•</span>
          <span>MASTER RESUME (PDF)</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1
              style={{
                font: '800 52px/1.1 "Inter", -apple-system, sans-serif',
                color: '#ffffff',
                letterSpacing: '-0.04em',
                margin: '0 0 16px',
              }}
            >
              Curriculum Vitae
              <br />
              & Engineering Pedigree
            </h1>

            <p style={{ color: '#a1a1aa', fontSize: '15px', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
              Full executive resume and curriculum vitae with verifiable engineering achievements, academic credentials, and systems experience.
            </p>
          </div>

          {/* Action Controls in Nettools Pill Style */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Zoom */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#111116',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '4px 8px',
              }}
            >
              <button
                onClick={() => setZoom((z) => Math.max(z - 15, 60))}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '2px 8px' }}
              >
                −
              </button>
              <span style={{ fontSize: '11px', fontFamily: "'Martian Mono', monospace", color: '#ffffff', minWidth: '40px', textAlign: 'center' }}>
                {zoom}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(z + 15, 180))}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '2px 8px' }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleUpload}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>📁</span>
              <span>Upload New PDF</span>
            </button>

            <button
              onClick={handleShare}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🔗</span>
              <span>Share CV Link</span>
            </button>

            <button
              onClick={() => window.print()}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              🖨️ Print
            </button>

            <button
              onClick={handleDownload}
              style={{
                padding: '10px 22px',
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
              <span>⬇</span>
              <span>Download Active CV (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Resume Canvas Container */}
      <div
        style={{
          borderRadius: '18px',
          background: '#111116',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          padding: '48px 24px',
          display: 'flex',
          justifyContent: 'center',
          overflowX: 'auto',
          marginBottom: '60px',
        }}
      >
        {profile.resumeUrl ? (
          <div style={{ width: `${(800 * zoom) / 100}px`, height: `${(1100 * zoom) / 100}px` }}>
            <iframe
              src={profile.resumeUrl}
              title="Resume PDF Viewer"
              style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }}
            />
          </div>
        ) : (
          /* Formatted Clean CV Document */
          <div
            style={{
              width: `${(800 * zoom) / 100}px`,
              minHeight: `${(1120 * zoom) / 100}px`,
              background: '#ffffff',
              color: '#0f172a',
              borderRadius: '8px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
              padding: '48px 56px',
              fontFamily: "'Inter', sans-serif",
              transition: 'width 0.15s ease',
            }}
          >
            {/* CV Header */}
            <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '20px', marginBottom: '24px' }}>
              <h1
                style={{
                  font: '800 32px/1.1 "Inter", sans-serif',
                  color: '#0f172a',
                  letterSpacing: '-0.02em',
                  margin: '0 0 6px',
                }}
              >
                {profile.name}
              </h1>

              <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                {profile.title}
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginTop: '10px',
                  fontSize: '11.5px',
                  color: '#475569',
                }}
              >
                <span>📍 {profile.homeAddress}</span>
                <span>✉️ {profile.primaryEmail}</span>
                <span>📞 {profile.phone}</span>
                <span>🌐 {profile.portfolioUrl}</span>
              </div>
            </div>

            {/* Section: Executive Summary */}
            <div style={{ marginBottom: '22px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '4px',
                  marginBottom: '8px',
                }}
              >
                EXECUTIVE SUMMARY
              </div>
              <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#334155', margin: 0 }}>
                {profile.summary}
              </p>
            </div>

            {/* Section: Core Technical Competencies */}
            <div style={{ marginBottom: '22px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '4px',
                  marginBottom: '10px',
                }}
              >
                TECHNICAL COMPETENCIES & ARCHITECTURE
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11.5px', color: '#334155' }}>
                <div><strong>Systems & OS:</strong> Microkernel Architecture, POSIX, Memory Sandboxing, IPC</div>
                <div><strong>Graphics & 3D:</strong> WebGL, Three.js, WebAssembly, GLSL Shaders, CAD B-Rep</div>
                <div><strong>Cloud & Distributed:</strong> Supabase, Render, Netlify, Docker, Multi-Agent LLMs</div>
                <div><strong>Languages:</strong> TypeScript, Node.js, Python, Rust, C++, SQL, Go</div>
              </div>
            </div>

            {/* Section: Key Engineering Projects */}
            <div style={{ marginBottom: '22px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '4px',
                  marginBottom: '10px',
                }}
              >
                KEY ENGINEERING SYSTEMS & PLATFORMS
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>StarkForge CAD — Browser-Native 3D Engineering Suite</strong>
                    <span style={{ fontSize: '10.5px', color: '#64748b' }}>2024 – Present</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6, marginTop: '2px' }}>
                    Engineered in-browser WebGL parametric modeling viewport capable of real-time STEP geometry rendering and topological transformation.
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>JARVIS.OS Ecosystem — Executive AI Work Operating System</strong>
                    <span style={{ fontSize: '10.5px', color: '#64748b' }}>2025 – Present</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6, marginTop: '2px' }}>
                    Architected decoupled two-tier operating platform separating private executive workspace with A.V.I.S. neural intelligence from high-velocity public showcase.
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12.5px', color: '#0f172a' }}>Sovereign OS — Microkernel Security & Containerization Architecture</strong>
                    <span style={{ fontSize: '10.5px', color: '#64748b' }}>2025</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6, marginTop: '2px' }}>
                    Patent-pending microkernel operating framework for web-isolated micro-application execution with hardware cryptographic verification.
                  </div>
                </div>
              </div>
            </div>

            {/* Section: Academic Pedigree */}
            <div style={{ marginBottom: '22px' }}>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '4px',
                  marginBottom: '10px',
                }}
              >
                EDUCATION & ACADEMICS
              </div>

              {profile.education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '12px', color: '#0f172a' }}>{edu.title} — {edu.institution}</strong>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d' }}>{edu.scoreOrGrade}</span>
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                    {edu.boardOrUniversity} • {edu.year}
                  </div>
                </div>
              ))}
            </div>

            {/* Section: Honors & Publications */}
            <div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0f172a',
                  letterSpacing: '0.08em',
                  borderBottom: '1px solid #cbd5e1',
                  paddingBottom: '4px',
                  marginBottom: '10px',
                }}
              >
                PUBLICATIONS, HONORS & AFFILIATIONS
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11px', lineHeight: 1.7, color: '#334155' }}>
                <li><strong>Patent Specification:</strong> Microkernel Process Isolation in Web-Native Operating Environments (2025).</li>
                <li><strong>Research Monograph:</strong> High-Performance In-Browser CAD Rendering via WebAssembly & WebGL Shaders (2025).</li>
                <li><strong>Hackathon Victory:</strong> 1st Place National Level Engineering Hackathon Winner (2025).</li>
                <li><strong>Institutional Memberships:</strong> Google Developer Groups (GDG), IEEE Computer Society.</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Level 9 Master Password Clearance Modal */}
      <SecureActionModal
        isOpen={secureModalOpen}
        actionType={secureActionType}
        target={{
          id: 'resume',
          title: 'Curriculum Vitae (Master Resume)',
          docUrl: profile.resumeUrl,
          fileName: profile.resumeFileName || 'Abhishek_Gangadhar_CV.pdf',
        }}
        onClose={() => setSecureModalOpen(false)}
        onSuccess={(dataUrl, fileName) => {
          if (secureActionType === 'upload' && dataUrl && fileName) {
            onUpdateResume(dataUrl, fileName);
          }
        }}
      />
    </div>
  );
}
