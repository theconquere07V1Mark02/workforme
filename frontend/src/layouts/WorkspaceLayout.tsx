import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { useTimer } from '../hooks/useTimer';
import { useAvis } from '../context/AvisContext';
import { AppSidebar } from '../components/Layout/AppSidebar';
import { AppHeader } from '../components/Layout/AppHeader';
import { HUD } from '../components/Layout/HUD';
import { Timer } from '../components/Timer/Timer';
import { AvisFloatingWidget } from '../components/Avis/AvisFloatingWidget';
import { AvisSettingsModal } from '../components/Avis/AvisSettingsModal';
import { MigrationWizard } from '../components/Migration/MigrationWizard';

interface WorkspaceLayoutProps {
  onIntro: () => void;
}

const LS_MIGRATION = 'migrationDone';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

function hms(ms: number): string {
  const s = Math.floor(ms / 1000);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

export function WorkspaceLayout({ onIntro }: WorkspaceLayoutProps) {
  const { signOut } = useAuth();
  const { projects } = useProjects();
  const { timer } = useTimer();
  const { isSettingsOpen, setIsSettingsOpen, refreshKeyStatus } = useAvis();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark';
  });

  const [showTimer, setShowTimer] = useState(false);
  const [showMigration, setShowMigration] = useState(
    () => localStorage.getItem(LS_MIGRATION) !== 'true'
  );

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <div
      id="app"
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Background HUD rotation elements */}
      <HUD />

      {/* Modern Executive Platform Sidebar */}
      <AppSidebar
        projects={projects}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onSignOut={async () => {
          await signOut();
        }}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Right Platform Column: Header + Scrollable Page Viewport */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: '100vh',
          overflow: 'hidden',
          minWidth: 0,
          position: 'relative',
        }}
      >
        <AppHeader
          onIntro={onIntro}
          onTimer={() => setShowTimer((prev) => !prev)}
          timerRunning={timer.run}
          timerDisplay={hms(timer.acc + (timer.run ? Date.now() - timer.at : 0))}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          onOpenSettings={() => setIsSettingsOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main
          style={{
            flex: 1,
            position: 'relative',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </main>
      </div>

      {/* Floating Circular A.V.I.S. Assistant Widget */}
      <AvisFloatingWidget projects={projects} />

      {/* Floating Timer Popup */}
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}

      {/* Gemini API Key Configuration Modal */}
      <AvisSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onKeySaved={refreshKeyStatus}
      />

      {/* Migration Wizard (First Run) */}
      {showMigration && (
        <MigrationWizard
          onDone={() => {
            setShowMigration(false);
            localStorage.setItem(LS_MIGRATION, 'true');
          }}
        />
      )}
    </div>
  );
}
