import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { CommandDashboard } from '../../components/Dashboard/CommandDashboard';

export function DashboardPage() {
  const { projects, createProject } = useProjects();
  const navigate = useNavigate();

  const handleNewProject = async () => {
    const p = await createProject({ name: '', description: null, status: 'planned' });
    navigate(`/projects/${p.id}`);
  };

  return <CommandDashboard projects={projects} onNewProject={handleNewProject} />;
}
