import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { ProjectList } from '../../components/Projects/ProjectList';
import { ProjectDetail } from '../../components/Projects/ProjectDetail';

export function ProjectsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  const [selectedId, setSelectedId] = useState<string | null>(id || null);

  useEffect(() => {
    if (id) {
      setSelectedId(id);
    } else if (projects.length > 0 && !selectedId) {
      setSelectedId(projects[0].id);
    }
  }, [id, projects]);

  const handleSelectProject = (projectId: string) => {
    setSelectedId(projectId);
    navigate(`/projects/${projectId}`, { replace: true });
  };

  const handleNewProject = async () => {
    const p = await createProject({ name: '', description: null, status: 'planned' });
    setSelectedId(p.id);
    navigate(`/projects/${p.id}`);
  };

  const selectedProject = projects.find((p) => p.id === selectedId) || null;

  return (
    <div className="split" style={{ height: '100%' }}>
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        onSelect={handleSelectProject}
        onNew={handleNewProject}
        loading={loading}
      />
      {selectedProject ? (
        <ProjectDetail
          key={selectedProject.id}
          project={selectedProject}
          onUpdate={updateProject}
          onDelete={async (deletedId) => {
            await deleteProject(deletedId);
            const remaining = projects.filter((p) => p.id !== deletedId);
            const nextId = remaining.length > 0 ? remaining[0].id : null;
            setSelectedId(nextId);
            if (nextId) {
              navigate(`/projects/${nextId}`, { replace: true });
            } else {
              navigate('/projects', { replace: true });
            }
          }}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: 'var(--mut)',
            fontSize: 12,
          }}
        >
          {loading ? 'Loading projects…' : 'No project selected. Select one from the sidebar or create a new project.'}
        </div>
      )}
    </div>
  );
}
