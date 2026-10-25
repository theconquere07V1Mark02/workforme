import { useProjects } from '../../hooks/useProjects';
import { GrowthDashboard } from '../../components/Profile/GrowthDashboard';

export function GrowthPage() {
  const { projects } = useProjects();
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
      <GrowthDashboard projects={projects} />
    </div>
  );
}
