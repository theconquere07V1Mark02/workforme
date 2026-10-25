import { useProjects } from '../../hooks/useProjects';
import { ShowcaseCMS } from '../../components/Showcase/ShowcaseCMS';

export function ShowcaseCMSPage() {
  const { projects, updateProject } = useProjects();
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
      <ShowcaseCMS projects={projects} onUpdateProject={updateProject} />
    </div>
  );
}
