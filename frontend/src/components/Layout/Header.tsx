import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type WorkspaceTab =
  | 'dashboard'
  | 'board'
  | 'projects'
  | 'tasks'
  | 'analyzer'
  | 'growth'
  | 'showcase'
  | 'storage'
  | 'avis';

interface HeaderProps {
  activeTab?: WorkspaceTab;
  onTabChange?: (tab: WorkspaceTab) => void;
  onIntro: () => void;
  onTimer: () => void;
  timerRunning: boolean;
  timerDisplay: string;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  onSignOut: () => void;
  onOpenPublicShowcase?: () => void;
}

export function Header({
  activeTab,
  onTabChange,
  onIntro,
  onTimer,
  timerRunning,
  timerDisplay,
  theme,
  onThemeToggle,
  onSignOut,
  onOpenPublicShowcase,
}: HeaderProps) {
  const [clock, setClock] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const path = location.pathname;
  const currentTab: WorkspaceTab = activeTab || (
    path.startsWith('/projects')
      ? 'projects'
      : path.startsWith('/tasks')
      ? 'tasks'
      : path.startsWith('/notes') || path.startsWith('/board')
      ? 'board'
      : path.startsWith('/analyzer')
      ? 'analyzer'
      : path.startsWith('/growth')
      ? 'growth'
      : path.startsWith('/showcase-cms')
      ? 'showcase'
      : path.startsWith('/storage')
      ? 'storage'
      : path.startsWith('/avis')
      ? 'avis'
      : 'dashboard'
  );

  const handleNav = (tab: WorkspaceTab, targetUrl: string) => {
    if (onTabChange) onTabChange(tab);
    navigate(targetUrl);
  };

  const handlePublicClick = () => {
    if (onOpenPublicShowcase) {
      onOpenPublicShowcase();
    } else {
      navigate('/showcase');
    }
  };

  return (
    <header>
      <div
        className="brand"
        onClick={() => handleNav('dashboard', '/dashboard')}
        style={{ display: 'flex', alignItems: 'baseline', gap: '8px', cursor: 'pointer' }}
      >
        <span>Workspace<i> / yours</i></span>
      </div>

      <nav id="nav" style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <button
          className={currentTab === 'dashboard' ? 'on' : ''}
          onClick={() => handleNav('dashboard', '/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={currentTab === 'board' ? 'on' : ''}
          onClick={() => handleNav('board', '/notes')}
        >
          Notesboard
        </button>
        <button
          className={currentTab === 'projects' ? 'on' : ''}
          onClick={() => handleNav('projects', '/projects')}
        >
          Projects
        </button>
        <button
          className={currentTab === 'tasks' ? 'on' : ''}
          onClick={() => handleNav('tasks', '/tasks')}
        >
          Tasks
        </button>
        <button
          className={currentTab === 'analyzer' ? 'on' : ''}
          onClick={() => handleNav('analyzer', '/analyzer')}
        >
          Analyzer
        </button>
        <button
          className={currentTab === 'growth' ? 'on' : ''}
          onClick={() => handleNav('growth', '/growth')}
        >
          Growth
        </button>
        <button
          className={currentTab === 'showcase' ? 'on' : ''}
          onClick={() => handleNav('showcase', '/showcase-cms')}
        >
          Showcase CMS
        </button>
        <button
          className={currentTab === 'storage' ? 'on' : ''}
          onClick={() => handleNav('storage', '/storage')}
        >
          Storage
        </button>
        <button
          className={currentTab === 'avis' ? 'on' : ''}
          onClick={() => handleNav('avis', '/avis')}
          style={{ color: currentTab === 'avis' ? '#000' : 'var(--gold)' }}
        >
          A.V.I.S.
        </button>
      </nav>

      <div className="meta">
        <button
          onClick={handlePublicClick}
          className="tg"
          style={{
            color: 'var(--tx)',
            border: '1px solid var(--ln2)',
            marginRight: '6px',
            fontSize: '10px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
          title="Open Public Showcase Platform"
        >
          <span>Public Showcase</span>
          <span style={{ color: '#00e5ff' }}>↗</span>
        </button>
        <span className="pulse" />
        <span id="clock">{clock}</span>
        <button
          className={`tg tm ${timerRunning ? 'run' : ''}`}
          id="tm"
          aria-label="Work timer"
          onClick={onTimer}
        >
          <span className="rec" />
          <span id="tt">{timerRunning ? timerDisplay : 'Timer'}</span>
        </button>
        <button className="tg" id="rp" onClick={onIntro}>
          Intro
        </button>
        <button className="tg" id="tg" onClick={onThemeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <button
          className="tg"
          onClick={onSignOut}
          title="Sign out"
          style={{ opacity: 0.6 }}
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
