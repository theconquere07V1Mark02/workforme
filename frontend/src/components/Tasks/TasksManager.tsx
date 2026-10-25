import { useState, useEffect } from 'react';
import { Project, ProjectTask, ProjectMilestone, TaskStatus, ProjectPriority } from '../../types';
import { api } from '../../lib/api';

interface TasksManagerProps {
  projects: Project[];
}

export function TasksManager({ projects }: TasksManagerProps) {
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterProjectId, setFilterProjectId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskProject, setNewTaskProject] = useState(projects[0]?.id || '');
  const [newTaskPriority, setNewTaskPriority] = useState<ProjectPriority>('medium');
  const [showAddForm, setShowAddForm] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tList, mList] = await Promise.all([
        api.tasks.list(filterProjectId === 'all' ? undefined : filterProjectId),
        api.milestones.list(filterProjectId === 'all' ? undefined : filterProjectId),
      ]);
      setTasks(tList);
      setMilestones(mList);
    } catch (err) {
      console.warn('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterProjectId]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const created = await api.tasks.create({
        title: newTaskTitle.trim(),
        project_id: newTaskProject || (projects[0]?.id ?? null),
        status: 'todo',
        priority: newTaskPriority,
      });
      setTasks((prev) => [created, ...prev]);
      setNewTaskTitle('');
      setShowAddForm(false);
    } catch (err: any) {
      alert(`Could not create task: ${err.message}`);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    try {
      await api.tasks.update(taskId, { status: newStatus });
    } catch (err: any) {
      console.warn('Failed to persist task status update:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Remove this task?')) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    try {
      await api.tasks.delete(taskId);
    } catch (err: any) {
      console.warn('Failed to delete task:', err);
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const getProjectName = (projId: string | null) => {
    if (!projId) return 'General';
    return projects.find((p) => p.id === projId)?.name || 'General';
  };

  const statusCols: { key: TaskStatus; label: string }[] = [
    { key: 'todo', label: 'To Do' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'blocked', label: 'Blocked' },
    { key: 'done', label: 'Completed' },
  ];

  return (
    <div className="page" style={{ height: '100%', overflowY: 'auto' }}>
      <div className="wrap" style={{ maxWidth: '1100px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 className="ttl">Tasks & Milestones</h1>
            <p className="desc">Ecosystem engineering tasks, execution roadmaps, and delivery milestones.</p>
          </div>
          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            style={{
              border: '1px solid var(--ln2)',
              padding: '8px 14px',
              color: 'var(--tx)',
              fontSize: '11px',
              fontFamily: 'var(--mono)',
            }}
          >
            {showAddForm ? '✕ Cancel' : '+ New Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <form
            onSubmit={handleCreateTask}
            style={{
              border: '1px solid var(--ln2)',
              padding: '16px',
              background: 'var(--s1)',
              marginBottom: '24px',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr auto',
              gap: '12px',
              alignItems: 'end',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--dim)', marginBottom: '4px' }}>
                TASK DESCRIPTION
              </label>
              <input
                type="text"
                placeholder="e.g. Implement OAuth callback flow..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{
                  borderBottom: '1px solid var(--ln2)',
                  width: '100%',
                  padding: '6px 0',
                  color: 'var(--tx)',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--dim)', marginBottom: '4px' }}>
                ASSIGNED PROJECT
              </label>
              <select
                value={newTaskProject}
                onChange={(e) => setNewTaskProject(e.target.value)}
                style={{
                  width: '100%',
                  border: '1px solid var(--ln2)',
                  padding: '6px',
                  color: 'var(--tx)',
                  background: '#000',
                }}
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '10px', color: 'var(--dim)', marginBottom: '4px' }}>
                PRIORITY
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as ProjectPriority)}
                style={{
                  width: '100%',
                  border: '1px solid var(--ln2)',
                  padding: '6px',
                  color: 'var(--tx)',
                  background: '#000',
                }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                border: '1px solid var(--tx)',
                background: 'var(--tx)',
                color: '#000',
                padding: '7px 18px',
                fontWeight: 500,
              }}
            >
              Add Task
            </button>
          </form>
        )}

        {/* Filters Bar */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--dim)', fontSize: '11px' }}>Project:</span>
            <select
              value={filterProjectId}
              onChange={(e) => setFilterProjectId(e.target.value)}
              style={{
                border: '1px solid var(--ln2)',
                padding: '4px 8px',
                color: 'var(--tx)',
                background: '#000',
                fontSize: '11px',
              }}
            >
              <option value="all">All Projects ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--dim)', fontSize: '11px' }}>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                border: '1px solid var(--ln2)',
                padding: '4px 8px',
                color: 'var(--tx)',
                background: '#000',
                fontSize: '11px',
              }}
            >
              <option value="all">All ({tasks.length})</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="done">Completed</option>
            </select>
          </div>
        </div>

        {/* Kanban Board View */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            alignItems: 'start',
          }}
        >
          {statusCols.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid var(--ln)',
                  borderRadius: '2px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '340px',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px',
                    borderBottom: '1px solid var(--ln)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: 'var(--tx)', fontWeight: 500, letterSpacing: '0.04em' }}>
                    {col.label}
                  </span>
                  <span
                    style={{
                      background: 'var(--ln)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      fontSize: '10px',
                      color: 'var(--dim)',
                    }}
                  >
                    {colTasks.length}
                  </span>
                </div>

                <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  {loading && colTasks.length === 0 ? (
                    <div style={{ color: 'var(--mut)', fontSize: '10px', padding: '8px' }}>Syncing...</div>
                  ) : colTasks.length === 0 ? (
                    <div style={{ color: 'var(--mut)', fontSize: '10px', padding: '12px 6px', textAlign: 'center' }}>
                      No tasks in {col.label.toLowerCase()}
                    </div>
                  ) : (
                    colTasks.map((t) => (
                      <div
                        key={t.id}
                        style={{
                          background: 'linear-gradient(160deg, #101016, #060608 60%)',
                          border: '1px solid var(--ln2)',
                          padding: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          borderRadius: '2px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              fontSize: '9.5px',
                              color: 'var(--gold)',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {getProjectName(t.project_id)}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(t.id)}
                            style={{ color: 'var(--mut)', fontSize: '12px', lineHeight: 1 }}
                            title="Remove task"
                          >
                            ×
                          </button>
                        </div>

                        <div style={{ color: 'var(--tx)', fontSize: '12px', lineHeight: '1.4' }}>
                          {t.title}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '6px',
                            paddingTop: '6px',
                            borderTop: '1px solid var(--ln)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '9px',
                              color:
                                t.priority === 'critical'
                                  ? 'var(--red)'
                                  : t.priority === 'high'
                                  ? 'var(--gold)'
                                  : 'var(--dim)',
                              textTransform: 'uppercase',
                            }}
                          >
                            {t.priority}
                          </span>

                          <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value as TaskStatus)}
                            style={{
                              fontSize: '9.5px',
                              color: 'var(--dim)',
                              border: '1px solid var(--ln)',
                              padding: '2px 4px',
                              background: '#000',
                            }}
                          >
                            <option value="todo">Move: To Do</option>
                            <option value="in_progress">Move: In Prog</option>
                            <option value="blocked">Move: Blocked</option>
                            <option value="done">Move: Done</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestones Overview */}
        {milestones.length > 0 && (
          <div style={{ marginTop: '48px' }}>
            <h4 style={{ margin: '0 0 16px 0' }}>PROJECT MILESTONES</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
              {milestones.map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: '1px solid var(--ln2)',
                    padding: '14px',
                    background: 'var(--s1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <b style={{ color: 'var(--tx)', fontSize: '13px', fontFamily: 'var(--ser)' }}>{m.title}</b>
                    <span
                      style={{
                        fontSize: '9px',
                        color: m.status === 'completed' ? 'var(--gold)' : 'var(--dim)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {m.status}
                    </span>
                  </div>
                  {m.description && <p style={{ color: 'var(--dim)', fontSize: '10.5px', margin: '4px 0' }}>{m.description}</p>}
                  <div style={{ fontSize: '9.5px', color: 'var(--mut)', marginTop: '8px' }}>
                    {getProjectName(m.project_id)} {m.due_date ? `· Due ${m.due_date}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
