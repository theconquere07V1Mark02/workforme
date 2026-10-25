import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalyzer } from '../../hooks/useAnalyzer';
import { AnalyzerList } from '../../components/Analyzer/AnalyzerList';
import { AnalyzerDetail } from '../../components/Analyzer/AnalyzerDetail';

export function AnalyzerPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { topics, loading, createTopic, updateTopic, deleteTopic, upsertSection } = useAnalyzer();
  const [selectedId, setSelectedId] = useState<string | null>(id || null);

  useEffect(() => {
    if (id) {
      setSelectedId(id);
    } else if (topics.length > 0 && !selectedId) {
      setSelectedId(topics[0].id);
    }
  }, [id, topics]);

  const handleSelectTopic = (topicId: string) => {
    setSelectedId(topicId);
    navigate(`/analyzer/${topicId}`, { replace: true });
  };

  const handleNewTopic = async () => {
    const t = await createTopic('Untitled research');
    setSelectedId(t.id);
    navigate(`/analyzer/${t.id}`);
  };

  const selectedTopic = topics.find((t) => t.id === selectedId) || null;

  return (
    <div className="split" style={{ height: '100%' }}>
      <AnalyzerList
        topics={topics}
        selectedId={selectedId}
        onSelect={handleSelectTopic}
        onNew={handleNewTopic}
        loading={loading}
      />
      {selectedTopic ? (
        <AnalyzerDetail
          key={selectedTopic.id}
          topic={selectedTopic}
          onUpdateTitle={async (topicId, title) => {
            await updateTopic(topicId, title);
          }}
          onUpsertSection={async (topicId, key, content, sortOrder) => {
            await upsertSection(topicId, key, content, sortOrder);
          }}
          onDelete={async (deletedId) => {
            await deleteTopic(deletedId);
            const remaining = topics.filter((t) => t.id !== deletedId);
            const nextId = remaining.length > 0 ? remaining[0].id : null;
            setSelectedId(nextId);
            if (nextId) {
              navigate(`/analyzer/${nextId}`, { replace: true });
            } else {
              navigate('/analyzer', { replace: true });
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
          {loading ? 'Loading topics…' : 'Select or create a research topic.'}
        </div>
      )}
    </div>
  );
}
