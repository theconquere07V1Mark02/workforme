import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProjects } from '../hooks/useProjects';
import { useTimer } from '../hooks/useTimer';
import { Header } from '../components/Layout/Header';
import { HUD } from '../components/Layout/HUD';
import { Timer } from '../components/Timer/Timer';
import { AvisFloatingWidget } from '../components/Avis/AvisFloatingWidget';
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
  const navigate = useNavigate();

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
    <div id="app">
      <HUD />

      <Header
        onIntro={onIntro}
        onTimer={() => setShowTimer((prev) => !prev)}
        timerRunning={timer.run}
        timerDisplay={hms(timer.acc + (timer.run ? Date.now() - timer.at : 0))}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onSignOut={async () => {
          await signOut();
        }}
        onOpenPublicShowcase={() => {
          navigate('/showcase');
        }}
      />

      <main style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <Outlet />
      </main>

      {/* Floating Circular A.V.I.S. Assistant Widget */}
      <AvisFloatingWidget projects={projects} />

      {/* Floating Timer Popup */}
      {showTimer && <Timer onClose={() => setShowTimer(false)} />}

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
