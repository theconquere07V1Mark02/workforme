import React, { useState, useEffect, useRef } from 'react';
import { Project, ProjectDocument } from '../../types';
import { api } from '../../lib/api';

interface StorageManagerProps {
  projects: Project[];
}

function formatBytes(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function getFileIcon(type?: string | null, mime?: string | null, url?: string): string {
  const m = (mime || '').toLowerCase();
  const u = (url || '').toLowerCase();
  if (m.startsWith('image/') || u.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i)) return '🖼️';
  if (m.includes('pdf') || u.endsWith('.pdf')) return '📄';
  if (m.includes('word') || m.includes('document') || u.match(/\.(doc|docx|rtf|txt|md)$/i)) return '📝';
  if (m.includes('zip') || m.includes('compressed') || u.match(/\.(zip|tar|gz|7z|rar)$/i)) return '📦';
  if (m.includes('json') || m.includes('javascript') || m.includes('typescript') || u.match(/\.(json|ts|tsx|js|py)$/i)) return '⚡';
  if (type === 'diagram') return '📐';
  return '📁';
}

export function StorageManager({ projects }: StorageManagerProps) {
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadMode, setUploadMode] = useState<'local' | 'url'>('local');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);

  const [newDoc, setNewDoc] = useState<{
    title: string;
    doc_type: ProjectDocument['doc_type'];
    file_url: string;
    file_size: number | null;
    mime_type: string | null;
    file_name: string;
    is_public: boolean;
    project_id: string | null;
  }>({
    title: '',
    doc_type: 'spec',
    file_url: '',
    file_size: null,
    mime_type: null,
    file_name: '',
    is_public: false,
    project_id: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.documents
      .list()
      .then((data) => setDocuments(data))
      .catch((err) => console.warn('Could not load documents:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsReadingFile(true);

    const baseName = file.name.replace(/\.[^/.]+$/, '');
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    let inferredType: ProjectDocument['doc_type'] = 'spec';
    if (isImage) inferredType = 'asset';
    else if (isPdf) inferredType = 'spec';
    else if (file.name.toLowerCase().includes('diagram') || file.name.toLowerCase().endsWith('.svg')) inferredType = 'diagram';

    // Read as Data URL so it is fully self-contained and persists permanently
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (isImage) {
        setFilePreview(dataUrl);
      } else {
        setFilePreview(null);
      }
      setNewDoc((prev) => ({
        ...prev,
        title: prev.title.trim() ? prev.title : baseName,
        file_url: dataUrl,
        file_size: file.size,
        mime_type: file.type || 'application/octet-stream',
        file_name: file.name,
        doc_type: inferredType,
      }));
      setIsReadingFile(false);
    };
    reader.onerror = () => {
      alert('Error reading local file.');
      setIsReadingFile(false);
    };
    reader.readAsDataURL(file);
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title.trim()) {
      alert('Please enter a document title.');
      return;
    }
    if (!newDoc.file_url.trim()) {
      alert('Please select a local file or provide a valid URL.');
      return;
    }

    try {
      const created = await api.documents.create({
        title: newDoc.title.trim(),
        doc_type: newDoc.doc_type,
        file_url: newDoc.file_url,
        file_size: newDoc.file_size,
        mime_type: newDoc.mime_type,
        is_public: newDoc.is_public,
        project_id: newDoc.project_id || null,
        metadata: {
          file_name: newDoc.file_name || newDoc.title,
          uploaded_at: new Date().toISOString(),
          is_local_upload: uploadMode === 'local',
        },
      });

      setDocuments((prev) => [created, ...prev]);
      setShowAddModal(false);
      resetForm();
    } catch (err: any) {
      alert(`Error saving document: ${err.message}`);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setNewDoc({
      title: '',
      doc_type: 'spec',
      file_url: '',
      file_size: null,
      mime_type: null,
      file_name: '',
      is_public: false,
      project_id: null,
    });
  };

  const handleTogglePublic = async (doc: ProjectDocument) => {
    const nextPublic = !doc.is_public;
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, is_public: nextPublic } : d))
    );
    await api.documents.update(doc.id, { is_public: nextPublic });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete document "${title}" permanently? This cannot be undone.`)) return;
    try {
      await api.documents.delete(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err: any) {
      alert(`Failed to delete document: ${err.message}`);
    }
  };

  const totalSize = documents.reduce((acc, d) => acc + (d.file_size || 0), 0);
  const publicCount = documents.filter((d) => d.is_public).length;

  const filteredDocs = documents.filter((d) => {
    if (filterProject !== 'all' && d.project_id !== filterProject) return false;
    if (filterType !== 'all' && d.doc_type !== filterType) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const inTitle = (d.title || '').toLowerCase().includes(q);
      const inName = (d.metadata?.file_name || '').toLowerCase().includes(q);
      if (!inTitle && !inName) return false;
    }
    return true;
  });

  return (
    <div className="page" style={{ height: '100%', overflowY: 'auto', padding: '36px 44px 100px', fontFamily: "'Inter', sans-serif" }}>
      <div className="wrap" style={{ maxWidth: '1080px', margin: '0 auto' }}>
        {/* Header section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>💾</span>
              <h1 style={{ font: '400 38px/1.1 var(--ser)', margin: 0, letterSpacing: '-0.02em', color: '#fff' }}>
                Storage & Documents
              </h1>
            </div>
            <p style={{ color: 'var(--dim)', margin: '8px 0 0', fontSize: '12px' }}>
              Upload local specifications, architecture assets, diagrams, images, and project documentation. Persists until deleted.
            </p>

            {/* Metrics Chips */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '11px',
                  color: '#9da2b4',
                  fontFamily: "'Martian Mono', monospace",
                }}
              >
                FILES: <span style={{ color: '#fff', fontWeight: 600 }}>{documents.length}</span>
              </div>
              <div
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '11px',
                  color: '#9da2b4',
                  fontFamily: "'Martian Mono', monospace",
                }}
              >
                VOLUME: <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{formatBytes(totalSize)}</span>
              </div>
              <div
                style={{
                  padding: '5px 12px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '11px',
                  color: '#9da2b4',
                  fontFamily: "'Martian Mono', monospace",
                }}
              >
                SHOWCASE PUBLIC: <span style={{ color: '#22c55e', fontWeight: 600 }}>{publicCount}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            style={{
              padding: '10px 20px',
              border: '1px solid var(--gold)',
              background: 'var(--gold)',
              color: '#000',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(240, 180, 41, 0.25)',
              transition: 'all 0.15s ease',
            }}
          >
            <span>+</span>
            <span>Upload File or Link</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            marginBottom: '20px',
            padding: '14px 18px',
            borderRadius: '6px',
            background: 'rgba(8, 10, 16, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents by title or file name…"
              style={{
                width: '100%',
                padding: '7px 12px',
                borderRadius: '4px',
                border: '1px solid var(--ln2)',
                background: 'rgba(0, 0, 0, 0.35)',
                color: 'var(--tx)',
                fontSize: '11.5px',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Project:</span>
            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '1px solid var(--ln2)',
                background: '#090a10',
                color: 'var(--tx)',
                fontSize: '11px',
                borderRadius: '4px',
              }}
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--dim)' }}>Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '1px solid var(--ln2)',
                background: '#090a10',
                color: 'var(--tx)',
                fontSize: '11px',
                borderRadius: '4px',
              }}
            >
              <option value="all">All Types</option>
              <option value="spec">Technical Specs</option>
              <option value="diagram">Diagrams & Architecture</option>
              <option value="asset">Media Assets</option>
              <option value="guide">Guides</option>
              <option value="other">Other / Archives</option>
            </select>
          </div>
        </div>

        {/* Document list */}
        {loading ? (
          <div style={{ color: 'var(--mut)', padding: '40px 0', textAlign: 'center', fontSize: '12px' }}>
            Scanning storage registry…
          </div>
        ) : filteredDocs.length === 0 ? (
          <div
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.01)',
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📁</div>
            <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>No documents found</div>
            <p style={{ color: 'var(--mut)', fontSize: '11.5px', maxWidth: '420px', margin: '6px auto 16px' }}>
              Upload local specifications, architecture diagrams, images, or assets from your device.
            </p>
            <button
              onClick={() => {
                resetForm();
                setShowAddModal(true);
              }}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--gold)',
                background: 'rgba(240, 180, 41, 0.1)',
                color: 'var(--gold)',
                fontSize: '11px',
                fontWeight: 600,
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              + Upload Your First Document
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredDocs.map((doc) => {
              const proj = projects.find((p) => p.id === doc.project_id);
              const isDataUrl = doc.file_url.startsWith('data:');
              const isImage = (doc.mime_type || '').startsWith('image/') || doc.file_url.match(/\.(jpg|jpeg|png|webp|gif|svg)/i);
              const fileName = doc.metadata?.file_name || (isDataUrl ? doc.title : doc.file_url.split('/').pop() || doc.title);

              return (
                <div
                  key={doc.id}
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(180deg, rgba(14, 16, 24, 0.8) 0%, rgba(8, 10, 15, 0.9) 100%)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0, marginRight: '16px' }}>
                    {/* Thumbnail or File Icon */}
                    {isImage && isDataUrl ? (
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          background: '#000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img src={doc.file_url} alt={doc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          flexShrink: 0,
                        }}
                      >
                        {getFileIcon(doc.doc_type, doc.mime_type, doc.file_url)}
                      </div>
                    )}

                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <b style={{ color: '#fff', fontSize: '13.5px', letterSpacing: '-0.01em' }}>
                          {doc.title}
                        </b>

                        <span
                          style={{
                            fontSize: '9px',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: 'var(--dim)',
                            textTransform: 'uppercase',
                            fontFamily: "'Martian Mono', monospace",
                          }}
                        >
                          {doc.doc_type}
                        </span>

                        {doc.file_size ? (
                          <span
                            style={{
                              fontSize: '9.5px',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              background: 'rgba(255, 255, 255, 0.04)',
                              color: 'var(--dim)',
                              fontFamily: "'Martian Mono', monospace",
                            }}
                          >
                            {formatBytes(doc.file_size)}
                          </span>
                        ) : null}

                        {proj && (
                          <span
                            style={{
                              fontSize: '10.5px',
                              color: 'var(--gold)',
                              background: 'rgba(240, 180, 41, 0.08)',
                              padding: '1px 7px',
                              borderRadius: '3px',
                              border: '1px solid rgba(240, 180, 41, 0.25)',
                            }}
                          >
                            {proj.name}
                          </span>
                        )}

                        {doc.is_public && (
                          <span
                            style={{
                              fontSize: '9px',
                              padding: '1px 5px',
                              borderRadius: '2px',
                              background: 'rgba(34, 197, 94, 0.12)',
                              border: '1px solid rgba(34, 197, 94, 0.35)',
                              color: '#22c55e',
                              fontWeight: 600,
                            }}
                          >
                            PUBLIC
                          </span>
                        )}
                      </div>

                      <div
                        style={{
                          fontSize: '11px',
                          color: 'var(--mut)',
                          marginTop: '4px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '650px',
                          fontFamily: "'Martian Mono', monospace",
                        }}
                      >
                        {isDataUrl ? `Local File: ${fileName}` : doc.file_url}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => handleTogglePublic(doc)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '4px',
                        border: doc.is_public ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid var(--ln2)',
                        background: doc.is_public ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                        color: doc.is_public ? '#4ade80' : 'var(--dim)',
                        fontSize: '10.5px',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}
                    >
                      {doc.is_public ? 'Public in Showcase' : 'Private'}
                    </button>

                    {isDataUrl ? (
                      <a
                        href={doc.file_url}
                        download={fileName}
                        style={{
                          padding: '5px 12px',
                          borderRadius: '4px',
                          border: '1px solid rgba(240, 180, 41, 0.35)',
                          background: 'rgba(240, 180, 41, 0.08)',
                          color: 'var(--gold)',
                          fontSize: '11px',
                          fontWeight: 500,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>Download</span>
                        <span>↓</span>
                      </a>
                    ) : (
                      <a
                        href={doc.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '5px 12px',
                          borderRadius: '4px',
                          border: '1px solid var(--ln2)',
                          color: '#fff',
                          fontSize: '11px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>Open</span>
                        <span>↗</span>
                      </a>
                    )}

                    <button
                      onClick={() => handleDelete(doc.id, doc.title)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '4px',
                        border: '1px solid rgba(226, 54, 54, 0.3)',
                        background: 'transparent',
                        color: 'var(--red)',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add/Upload Document Modal */}
        {showAddModal && (
          <div className="migration-overlay" style={{ zIndex: 1000 }}>
            <div
              className="migration-box"
              style={{
                maxWidth: '580px',
                background: 'linear-gradient(165deg, #10121d 0%, #08090f 100%)',
                border: '1px solid rgba(240, 180, 41, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.85)',
                borderRadius: '8px',
                padding: '24px 28px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Add Project Document & Asset
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--dim)', fontSize: '18px', cursor: 'pointer' }}
                >
                  ×
                </button>
              </div>

              {/* Mode Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px' }}>
                <button
                  type="button"
                  onClick={() => setUploadMode('local')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '4px',
                    background: uploadMode === 'local' ? 'var(--gold)' : 'transparent',
                    color: uploadMode === 'local' ? '#000' : 'var(--dim)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                  }}
                >
                  📁 Upload Local File from Device
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '4px',
                    background: uploadMode === 'url' ? 'var(--gold)' : 'transparent',
                    color: uploadMode === 'url' ? '#000' : 'var(--dim)',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                  }}
                >
                  🔗 Link External URL
                </button>
              </div>

              <form onSubmit={handleAddDocument} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Upload or URL Selector */}
                {uploadMode === 'local' ? (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileSelect(f);
                      }}
                    />

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const f = e.dataTransfer.files?.[0];
                        if (f) handleFileSelect(f);
                      }}
                      style={{
                        padding: '24px 20px',
                        border: '2px dashed rgba(240, 180, 41, 0.35)',
                        borderRadius: '6px',
                        background: 'rgba(240, 180, 41, 0.03)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {selectedFile ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
                          {filePreview ? (
                            <img src={filePreview} alt="Preview" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }} />
                          ) : (
                            <span style={{ fontSize: '28px' }}>📄</span>
                          )}
                          <div style={{ textAlign: 'left' }}>
                            <div style={{ color: '#fff', fontSize: '12.5px', fontWeight: 600 }}>{selectedFile.name}</div>
                            <div style={{ color: 'var(--gold)', fontSize: '11px', marginTop: '2px' }}>
                              {formatBytes(selectedFile.size)} • {selectedFile.type || 'Binary Document'}
                            </div>
                            <span style={{ fontSize: '10px', color: 'var(--dim)', textDecoration: 'underline' }}>Click to change file</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontSize: '28px', marginBottom: '8px' }}>☁️</div>
                          <div style={{ color: '#fff', fontSize: '12.5px', fontWeight: 600 }}>
                            Click to browse or drop any file from your device
                          </div>
                          <div style={{ color: 'var(--dim)', fontSize: '11px', marginTop: '4px' }}>
                            Supports JPG, PNG, WEBP, PDF, Word, DOCX, ZIP, JSON, CAD, etc.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--mut)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      File URL (Google Drive, GitHub, Figma, etc.)
                    </span>
                    <input
                      type="url"
                      value={newDoc.file_url}
                      onChange={(e) => setNewDoc({ ...newDoc, file_url: e.target.value })}
                      required
                      placeholder="https://drive.google.com/... or https://..."
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid var(--ln2)',
                        color: 'var(--tx)',
                        borderRadius: '4px',
                        fontSize: '12px',
                      }}
                    />
                  </div>
                )}

                {/* Title */}
                <div>
                  <span style={{ fontSize: '10.5px', color: 'var(--mut)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Document Title *
                  </span>
                  <input
                    type="text"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                    required
                    placeholder="e.g. System Architecture Diagram v2"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--ln2)',
                      color: 'var(--tx)',
                      borderRadius: '4px',
                      fontSize: '12px',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--mut)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Document Type
                    </span>
                    <select
                      value={newDoc.doc_type}
                      onChange={(e) => setNewDoc({ ...newDoc, doc_type: e.target.value as any })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: '1px solid var(--ln2)',
                        background: '#090a10',
                        color: 'var(--tx)',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                      }}
                    >
                      <option value="spec">Technical Spec</option>
                      <option value="diagram">Diagram & Architecture</option>
                      <option value="guide">User Guide</option>
                      <option value="asset">Media Asset</option>
                      <option value="license">License</option>
                      <option value="other">Other / Archive</option>
                    </select>
                  </div>

                  <div>
                    <span style={{ fontSize: '10.5px', color: 'var(--mut)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      Attach to Project
                    </span>
                    <select
                      value={newDoc.project_id || ''}
                      onChange={(e) => setNewDoc({ ...newDoc, project_id: e.target.value || null })}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        border: '1px solid var(--ln2)',
                        background: '#090a10',
                        color: 'var(--tx)',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                      }}
                    >
                      <option value="">(None / General Document)</option>
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '4px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={newDoc.is_public}
                      onChange={(e) => setNewDoc({ ...newDoc, is_public: e.target.checked })}
                    />
                    <span style={{ fontSize: '11.5px', color: 'var(--tx)' }}>
                      Publish in Public Showcase Project Deliverables
                    </span>
                  </label>
                </div>

                <div className="migration-actions" style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="migration-btn"
                    onClick={() => {
                      resetForm();
                      setShowAddModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="migration-btn primary"
                    disabled={isReadingFile || (uploadMode === 'local' && !selectedFile && !newDoc.file_url)}
                    style={{
                      background: 'var(--gold)',
                      color: '#000',
                      fontWeight: 600,
                      border: 'none',
                      padding: '8px 18px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {isReadingFile ? 'Reading file…' : 'Save Document'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
