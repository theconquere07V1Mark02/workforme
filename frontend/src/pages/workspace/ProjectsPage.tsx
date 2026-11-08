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
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jarvis_project_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('jarvis_project_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

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
    <div
      className="split"
      style={{
        height: '100%',
        gridTemplateColumns: sidebarCollapsed ? '0px 1fr' : '320px 1fr',
        transition: 'grid-template-columns 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: sidebarCollapsed ? '0px' : '320px',
          overflow: 'hidden',
          transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRight: sidebarCollapsed ? 'none' : '1px solid var(--ln)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <ProjectList
          projects={projects}
          selectedId={selectedId}
          onSelect={handleSelectProject}
          onNew={handleNewProject}
          loading={loading}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      <div style={{ height: '100%', overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {sidebarCollapsed && (
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 30,
            }}
          >
            <button
              onClick={toggleSidebar}
              title="Expand project sidebar"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 14px',
                background: 'rgba(10, 12, 18, 0.92)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(240, 180, 41, 0.4)',
                borderRadius: '6px',
                color: 'var(--gold)',
                fontSize: '11px',
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(240, 180, 41, 0.15)';
                e.currentTarget.style.borderColor = 'var(--gold)';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 12, 18, 0.92)';
                e.currentTarget.style.borderColor = 'rgba(240, 180, 41, 0.4)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <span>▶</span>
              <span>Projects ({projects.length})</span>
            </button>
          </div>
        )}

        {selectedProject ? (
          <div style={{ flex: 1, height: '100%', overflowY: 'auto', paddingTop: sidebarCollapsed ? '42px' : '0px' }}>
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
          </div>
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
    </div>
  );
}
