import { useProjects } from '../../hooks/useProjects';
import { TasksManager } from '../../components/Tasks/TasksManager';

export function TasksPage() {
  const { projects } = useProjects();
  return <TasksManager projects={projects} />;
}
