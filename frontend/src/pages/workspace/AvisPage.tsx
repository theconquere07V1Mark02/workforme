import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { AvisAssistant } from '../../components/Avis/AvisAssistant';

export function AvisPage() {
  const { projects } = useProjects();
  const navigate = useNavigate();

  const handleNavigateTab = (tab: string) => {
    const routeMap: Record<string, string> = {
      projects: '/projects',
      showcase: '/showcase-cms',
      growth: '/growth',
      tasks: '/tasks',
      notes: '/notes',
      board: '/notes',
      analyzer: '/analyzer',
      storage: '/storage',
      dashboard: '/dashboard',
    };
    navigate(routeMap[tab] || '/dashboard');
  };

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <AvisAssistant projects={projects} onNavigateTab={handleNavigateTab} />
    </div>
  );
}
