import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { AvisProvider } from './context/AvisContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Intro } from './components/Intro/Intro';
import { WorkspaceLayout } from './layouts/WorkspaceLayout';
import { DashboardPage } from './pages/workspace/DashboardPage';
import { ProjectsPage } from './pages/workspace/ProjectsPage';
import { TasksPage } from './pages/workspace/TasksPage';
import { NotesPage } from './pages/workspace/NotesPage';
import { AnalyzerPage } from './pages/workspace/AnalyzerPage';
import { GrowthPage } from './pages/workspace/GrowthPage';
import { ShowcaseCMSPage } from './pages/workspace/ShowcaseCMSPage';
import { StoragePage } from './pages/workspace/StoragePage';
import { AvisPage } from './pages/workspace/AvisPage';
import { ExecutivePortal } from './pages/executive/ExecutivePortal';
import { PublicShowcase } from './components/Showcase/PublicShowcase';
import { PublicDocSharePage } from './pages/public/PublicDocSharePage';

function PrivateWorkspaceWrapper({
  children,
  onIntro,
}: {
  children: React.ReactNode;
  onIntro: () => void;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          color: 'var(--dim)',
          fontSize: 12,
          fontFamily: 'var(--mono)',
        }}
      >
        <span>Initialising JARVIS telemetry…</span>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuth={() => {}} />;
  }

  return <>{children}</>;
}

export default function App() {
  const [showIntro, setShowIntro] = useState(false);

  if (showIntro) {
    return <Intro onDone={() => setShowIntro(false)} />;
  }

  return (
    <BrowserRouter>
      <AvisProvider>
        <Routes>
          {/* ======================================================== */}
          {/* WEBSITE 2: PUBLIC PROJECT SHOWCASE                       */}
          {/* Unauthenticated, Independent URL & Experience            */}
          {/* ======================================================== */}
          <Route path="/showcase" element={<PublicShowcase />} />
          <Route path="/showcase/*" element={<PublicShowcase />} />
          <Route path="/share/doc/:id" element={<PublicDocSharePage />} />

          {/* ======================================================== */}
          {/* WEBSITE 1: JARVIS WORKSPACE (Private Control Center)     */}
          {/* Requires Authentication, HUD theme & Dedicated Layout    */}
          {/* ======================================================== */}
          <Route
            element={
              <PrivateWorkspaceWrapper onIntro={() => setShowIntro(true)}>
                <WorkspaceLayout onIntro={() => setShowIntro(true)} />
              </PrivateWorkspaceWrapper>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectsPage />} />
            <Route path="tasks" element={<TasksPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="board" element={<Navigate to="/notes" replace />} />
            <Route path="analyzer" element={<AnalyzerPage />} />
            <Route path="analyzer/:id" element={<AnalyzerPage />} />
            <Route path="growth" element={<GrowthPage />} />
            <Route path="showcase-cms" element={<ShowcaseCMSPage />} />
            <Route path="storage" element={<StoragePage />} />
            <Route path="avis" element={<AvisPage />} />
          </Route>

          {/* ======================================================== */}
          {/* WEBSITE 3: EXECUTIVE ARCHITECT PLATFORM (Standalone)     */}
          {/* Full-Viewport Command Dossier, Multi-Page Architecture   */}
          {/* ======================================================== */}
          <Route
            path="/profile"
            element={
              <PrivateWorkspaceWrapper onIntro={() => setShowIntro(true)}>
                <ExecutivePortal />
              </PrivateWorkspaceWrapper>
            }
          />
          <Route
            path="/executive"
            element={
              <PrivateWorkspaceWrapper onIntro={() => setShowIntro(true)}>
                <ExecutivePortal />
              </PrivateWorkspaceWrapper>
            }
          />

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AvisProvider>
    </BrowserRouter>
  );
}
