import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { ProfileStore, ExecutiveProfile, IdentityDoc } from '../../lib/profileData';
import { ExecutiveSidebar } from './components/ExecutiveSidebar';
import { ExecutiveViewId } from './components/ExecutiveNav';
import { EditProfileModal } from './components/EditProfileModal';

// Views
import { DossierOverviewView } from './views/DossierOverviewView';
import { LiveSitesView } from './views/LiveSitesView';
import { AtmosphereMatrixView } from './views/AtmosphereMatrixView';
import { DocGovVaultView } from './views/DocGovVaultView';
import { AcademicsView } from './views/AcademicsView';
import { CredentialsView } from './views/CredentialsView';
import { SocialsView } from './views/SocialsView';
import { CommunitiesView } from './views/CommunitiesView';
import { PublicationsView } from './views/PublicationsView';
import { ResumeView } from './views/ResumeView';
import { MyPublicView } from './views/MyPublicView';
import { FieldExpertsView } from './views/FieldExpertsView';
import { SecureActionModal } from './components/SecureActionModal';

export function ExecutivePortal() {
  const { projects } = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const mainScrollRef = useRef<HTMLElement>(null);

  const [profile, setProfile] = useState<ExecutiveProfile>(() => ProfileStore.getProfile());
  const [activeView, setActiveView] = useState<ExecutiveViewId>(() => {
    const v = searchParams.get('view') as ExecutiveViewId;
    const validViews: ExecutiveViewId[] = [
      'overview',
      'sites',
      'atmosphere',
      'my_public',
      'field_experts',
      'vault',
      'academics',
      'credentials',
      'socials',
      'communities',
      'publications',
      'resume',
    ];
    return validViews.includes(v) ? v : 'overview';
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [secureCvDownloadOpen, setSecureCvDownloadOpen] = useState(false);
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Sync activeView with searchParams & fix scroll position
  const handleViewChange = (view: ExecutiveViewId) => {
    setActiveView(view);
    setSearchParams({ view });
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Profile update handlers
  const handleSaveProfile = (updates: Partial<ExecutiveProfile>) => {
    const updated = ProfileStore.updateProfile(updates);
    setProfile(updated);
  };

  const handleUpdateAvatar = (dataUrl: string) => {
    const updated = ProfileStore.updateProfile({ avatarUrl: dataUrl });
    setProfile(updated);
  };

  const handleUpdateResume = (dataUrl: string, fileName: string) => {
    const updated = ProfileStore.updateProfile({
      resumeUrl: dataUrl,
      resumeFileName: fileName,
    });
    setProfile(updated);
  };

  const handleAddVaultDoc = (newDoc: IdentityDoc) => {
    const currentDocs = profile.identityDocs || [];
    const nextDocs = [newDoc, ...currentDocs];
    const updated = ProfileStore.updateProfile({ identityDocs: nextDocs });
    setProfile(updated);
  };

  const counts = {
    sites: profile.liveSites.length,
    atmospheres: profile.emailAtmospheres.length,
    vaultDocs: profile.identityDocs.length,
    certifications: profile.certifications.length,
    socials: profile.socials.length,
    publications: profile.publications.length,
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: '#09090b',
        color: '#f4f4f5',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ======================================================== */}
      {/* DEDICATED EXECUTIVE SIDEBAR (Fixed Left, 300px)          */}
      {/* ======================================================== */}
      <ExecutiveSidebar
        activeView={activeView}
        onChangeView={handleViewChange}
        onOpenEdit={() => setEditModalOpen(true)}
        counts={counts}
        clock={clock}
      />

      {/* ======================================================== */}
      {/* SCROLLABLE MAIN CONTENT CANVAS (Nettools-style)           */}
      {/* ======================================================== */}
      <main
        ref={mainScrollRef}
        style={{
          flex: 1,
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          background: '#09090b',
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0',
          position: 'relative',
        }}
      >
        {/* Top Floating Action Pill Bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            padding: '16px 48px',
            background: 'rgba(9, 9, 11, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Breadcrumb Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
            <span style={{ color: '#71717a', fontFamily: "'Martian Mono', monospace" }}>ABHISHEK GANGADHAR</span>
            <span style={{ color: '#3f3f46' }}>/</span>
            <span style={{ color: '#ffffff', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif" }}>
              {activeView.toUpperCase()}
            </span>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setEditModalOpen(true)}
              style={{
                padding: '7px 14px',
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
              <span>✏️</span>
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setSecureCvDownloadOpen(true)}
              style={{
                padding: '7px 16px',
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
                boxShadow: '0 2px 10px rgba(255, 255, 255, 0.15)',
              }}
            >
              <span>📄</span>
              <span>Download CV (PDF)</span>
            </button>
          </div>
        </div>

        {/* Viewport Content with Generous, Adaptive Width */}
        <div
          style={{
            maxWidth: activeView === 'atmosphere' || activeView === 'my_public' || activeView === 'field_experts' ? '1640px' : '1440px',
            margin: '0 auto',
            padding: '32px 40px 120px',
            transition: 'max-width 0.2s ease',
          }}
        >
          {activeView === 'overview' && (
            <DossierOverviewView
              profile={profile}
              totalProjects={projects.length || 28}
              onUpdateAvatar={handleUpdateAvatar}
              onNavigateView={handleViewChange}
            />
          )}

          {activeView === 'sites' && (
            <LiveSitesView liveSites={profile.liveSites} />
          )}

          {activeView === 'atmosphere' && (
            <AtmosphereMatrixView atmospheres={profile.emailAtmospheres} />
          )}

          {activeView === 'my_public' && (
            <MyPublicView
              profile={profile}
              onUpdateProfile={handleSaveProfile}
            />
          )}

          {activeView === 'field_experts' && (
            <FieldExpertsView />
          )}

          {activeView === 'vault' && (
            <DocGovVaultView
              docs={profile.identityDocs}
              onAddDoc={handleAddVaultDoc}
            />
          )}

          {activeView === 'academics' && (
            <AcademicsView education={profile.education} />
          )}

          {activeView === 'credentials' && (
            <CredentialsView certifications={profile.certifications} />
          )}

          {activeView === 'socials' && (
            <SocialsView socials={profile.socials} />
          )}

          {activeView === 'communities' && (
            <CommunitiesView
              memberships={profile.memberships}
              communities={profile.communities}
            />
          )}

          {activeView === 'publications' && (
            <PublicationsView publications={profile.publications} />
          )}

          {activeView === 'resume' && (
            <ResumeView
              profile={profile}
              onUpdateResume={handleUpdateResume}
            />
          )}
        </div>
      </main>

      {/* Global Edit Profile Modal */}
      <EditProfileModal
        profile={profile}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* Global CV Secure Download Modal */}
      <SecureActionModal
        isOpen={secureCvDownloadOpen}
        actionType="download"
        target={{
          id: 'resume',
          title: 'Curriculum Vitae (Master Resume)',
          docUrl: profile.resumeUrl,
          fileName: profile.resumeFileName || 'Abhishek_Gangadhar_CV.pdf',
        }}
        onClose={() => setSecureCvDownloadOpen(false)}
      />
    </div>
  );
}
