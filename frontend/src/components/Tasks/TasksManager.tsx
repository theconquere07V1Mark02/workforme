import React, { useState, useEffect } from 'react';
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

  const statusCols: { key: TaskStatus; label: string; accent: string }[] = [
    { key: 'todo', label: 'To Do', accent: '#9aa0b6' },
    { key: 'in_progress', label: 'In Progress', accent: 'var(--gold)' },
    { key: 'blocked', label: 'Blocked', accent: 'var(--red)' },
    { key: 'done', label: 'Completed', accent: '#22c55e' },
  ];

  return (
    <div className="page">
      <div className="wrap">
        {/* Header Banner */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="ttl">Tasks & Roadmap</h1>
            <p className="desc" style={{ maxWidth: '680px' }}>
              Engineering task boards, milestone deadlines, and sprint execution tracking across all repositories.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm((prev) => !prev)}
            style={{
              background: showAddForm ? 'rgba(255, 255, 255, 0.08)' : 'var(--gold)',
              border: `1px solid ${showAddForm ? 'rgba(255, 255, 255, 0.2)' : 'var(--gold)'}`,
              color: showAddForm ? '#fff' : '#000',
              fontWeight: 600,
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s',
            }}
          >
            <span>{showAddForm ? '✕' : '+'}</span>
            <span>{showAddForm ? 'Cancel' : 'New Task'}</span>
          </button>
        </div>

        {/* Add Task Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleCreateTask}
            style={{
              padding: '24px',
              borderRadius: '8px',
              background: 'linear-gradient(165deg, rgba(18, 20, 30, 0.9) 0%, rgba(8, 9, 14, 0.95) 100%)',
              border: '1px solid rgba(240, 180, 41, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              marginBottom: '32px',
              display: 'grid',
              gridTemplateColumns: '2fr 1.2fr 1fr auto',
              gap: '16px',
              alignItems: 'end',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a90a6', marginBottom: '6px', textTransform: 'uppercase' }}>
                TASK DESCRIPTION
              </label>
              <input
                type="text"
                placeholder="e.g. Implement OAuth callback flow for StarkForge…"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a90a6', marginBottom: '6px', textTransform: 'uppercase' }}>
                ASSIGNED REPOSITORY
              </label>
              <select
                value={newTaskProject}
                onChange={(e) => setNewTaskProject(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: '#090a10',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
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
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#8a90a6', marginBottom: '6px', textTransform: 'uppercase' }}>
                PRIORITY
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as ProjectPriority)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  background: '#090a10',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  fontSize: '13px',
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
                background: 'var(--gold)',
                color: '#000',
                fontWeight: 600,
                padding: '11px 24px',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              Add Task
            </button>
          </form>
        )}

        {/* Filters Bar */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '28px',
            flexWrap: 'wrap',
            padding: '12px 18px',
            borderRadius: '6px',
            background: 'rgba(14, 16, 24, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#8a90a6', fontSize: '12px', fontWeight: 500 }}>Repository:</span>
            <select
              value={filterProjectId}
              onChange={(e) => setFilterProjectId(e.target.value)}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '6px 12px',
                color: '#fff',
                background: '#06070a',
                fontSize: '12px',
                borderRadius: '4px',
              }}
            >
              <option value="all">All Repositories ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#8a90a6', fontSize: '12px', fontWeight: 500 }}>Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '6px 12px',
                color: '#fff',
                background: '#06070a',
                fontSize: '12px',
                borderRadius: '4px',
              }}
            >
              <option value="all">All States ({tasks.length})</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="done">Completed</option>
            </select>
          </div>
        </div>

        {/* 4-Column Kanban Board */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
            alignItems: 'start',
          }}
        >
          {statusCols.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.key);
            return (
              <div
                key={col.key}
                style={{
                  background: 'rgba(12, 14, 22, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '400px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                }}
              >
                {/* Column Header */}
                <div
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: col.accent,
                        boxShadow: `0 0 8px ${col.accent}`,
                      }}
                    />
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: '13px', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {col.label}
                    </span>
                  </div>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      color: '#9da2b4',
                      fontFamily: "'Martian Mono', monospace",
                      fontWeight: 600,
                    }}
                  >
                    {colTasks.length}
                  </span>
                </div>

                {/* Cards List */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                  {loading && colTasks.length === 0 ? (
                    <div style={{ color: '#686d80', fontSize: '12px', padding: '14px', textAlign: 'center' }}>
                      Syncing…
                    </div>
                  ) : colTasks.length === 0 ? (
                    <div style={{ color: '#686d80', fontSize: '12px', padding: '24px 10px', textAlign: 'center' }}>
                      No tasks in {col.label.toLowerCase()}
                    </div>
                  ) : (
                    colTasks.map((t) => (
                      <div
                        key={t.id}
                        style={{
                          background: 'linear-gradient(160deg, #131520, #08090e 70%)',
                          border: '1px solid rgba(255, 255, 255, 0.09)',
                          padding: '14px 16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          borderRadius: '6px',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
                          e.currentTarget.style.transform = 'none';
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              fontSize: '10.5px',
                              color: 'var(--gold)',
                              fontWeight: 600,
                              letterSpacing: '0.04em',
                              fontFamily: "'Martian Mono', monospace",
                            }}
                          >
                            {getProjectName(t.project_id)}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(t.id)}
                            style={{ color: '#6e7387', fontSize: '14px', lineHeight: 1 }}
                            title="Remove task"
                          >
                            ×
                          </button>
                        </div>

                        <div style={{ color: '#f0f2fa', fontSize: '13px', lineHeight: 1.5, fontWeight: 500 }}>
                          {t.title}
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '8px',
                            paddingTop: '8px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '9.5px',
                              fontWeight: 600,
                              color:
                                t.priority === 'critical'
                                  ? 'var(--red)'
                                  : t.priority === 'high'
                                  ? 'var(--gold)'
                                  : '#8a90a6',
                              textTransform: 'uppercase',
                              fontFamily: "'Martian Mono', monospace",
                            }}
                          >
                            {t.priority}
                          </span>

                          <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value as TaskStatus)}
                            style={{
                              fontSize: '10.5px',
                              color: '#9aa0b6',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              padding: '3px 6px',
                              background: '#040508',
                              borderRadius: '3px',
                            }}
                          >
                            <option value="todo">Move: To Do</option>
                            <option value="in_progress">Move: In Progress</option>
                            <option value="blocked">Move: Blocked</option>
                            <option value="done">Move: Completed</option>
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

        {/* Milestones Roadmap Overview */}
        {milestones.length > 0 && (
          <div style={{ marginTop: '54px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '18px' }}>
              Project Milestones Roadmap
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {milestones.map((m) => (
                <div
                  key={m.id}
                  style={{
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '18px 20px',
                    background: 'rgba(14, 16, 24, 0.7)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <b style={{ color: '#fff', fontSize: '14px', fontFamily: "'Space Grotesk', sans-serif" }}>
                      {m.title}
                    </b>
                    <span
                      style={{
                        fontSize: '10px',
                        color: m.status === 'completed' ? '#22c55e' : 'var(--gold)',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        fontFamily: "'Martian Mono', monospace",
                      }}
                    >
                      {m.status}
                    </span>
                  </div>
                  {m.description && <p style={{ color: '#9aa0b6', fontSize: '12.5px', margin: '4px 0 10px', lineHeight: 1.5 }}>{m.description}</p>}
                  <div style={{ fontSize: '11px', color: '#686d80', fontFamily: "'Martian Mono', monospace" }}>
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
