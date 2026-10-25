import { useProjects } from '../../hooks/useProjects';
import { StorageManager } from '../../components/Storage/StorageManager';

export function StoragePage() {
  const { projects } = useProjects();
  return (
    <div style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}>
      <StorageManager projects={projects} />
    </div>
  );
}
