import { useMemo, useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, X, Save,
  Archive, Filter
} from 'lucide-react';
import './AdminContentModule.css';

export type AdminField = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'select';
  options?: string[];
  required?: boolean;
};

export type AdminRecord = {
  id: string;
  [key: string]: string;
};

type Props = {
  title: string;
  description: string;
  fields: AdminField[];
};

export default function AdminContentModule({
  title,
  description,
  fields
}: Props) {
  const [records, setRecords] = useState<AdminRecord[]>([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminRecord | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = useMemo(() => {
    return records.filter(record => {
      const matchesSearch = Object.values(record)
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  function openCreate() {
    setEditing(null);
    setForm({});
    setModalOpen(true);
  }

  function openEdit(record: AdminRecord) {
    setEditing(record);
    setForm({ ...record });
    setModalOpen(true);
  }

  function saveRecord() {
    const missingRequired = fields.some(
      field => field.required && !form[field.name]?.trim()
    );

    if (missingRequired) {
      alert('Please complete all required fields.');
      return;
    }

    const record: AdminRecord = {
      ...form,
      id: editing?.id ?? `${Date.now()}`,
      status: form.status || 'draft'
    };

    if (editing) {
      setRecords(previous =>
        previous.map(item => item.id === editing.id ? record : item)
      );
    } else {
      setRecords(previous => [record, ...previous]);
    }

    setModalOpen(false);
    setEditing(null);
    setForm({});
  }

  function deleteRecord(id: string) {
    if (!window.confirm('Delete this record? This action cannot be undone.')) {
      return;
    }
    setRecords(previous => previous.filter(item => item.id !== id));
  }

  function updateField(name: string, value: string) {
    setForm(previous => ({ ...previous, [name]: value }));
  }

  return (
    <div className="admin-content-module">
      <header className="module-heading">
        <div>
          <span className="module-eyebrow">CONTENT MANAGEMENT</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <button className="module-add-button" onClick={openCreate}>
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </header>

      <div className="module-toolbar">
        <div className="module-search">
          <Search size={17} />
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder={`Search ${title.toLowerCase()}...`}
          />
        </div>

        <div className="module-filter">
          <Filter size={16} />
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
          >
            <option value="all">All records</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="module-record-count">
        {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
      </div>

      {filtered.length === 0 ? (
        <div className="module-empty">
          <div className="module-empty-icon"><Archive size={25} /></div>
          <h3>No records found</h3>
          <p>
            {search
              ? 'No records match your search. Try another keyword.'
              : `Start adding ${title.toLowerCase()} to your corps records.`}
          </p>
          {!search && (
            <button onClick={openCreate} className="module-empty-action">
              <Plus size={16} /> Create First Record
            </button>
          )}
        </div>
      ) : (
        <div className="module-record-list">
          {filtered.map(record => (
            <article className="module-record" key={record.id}>
              <div className="module-record-main">
                <div className="module-record-title">
                  {record.title || record.name || record.fullName || 'Untitled record'}
                </div>
                <div className="module-record-subtitle">
                  {record.description || record.details || record.date || 'No additional details'}
                </div>
                <span className={`module-status status-${record.status || 'draft'}`}>
                  {record.status || 'draft'}
                </span>
              </div>

              <div className="module-record-actions">
                <button title="Edit" onClick={() => openEdit(record)}>
                  <Pencil size={16} />
                </button>
                <button title="Delete" onClick={() => deleteRecord(record.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="module-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="module-modal" onClick={event => event.stopPropagation()}>
            <div className="module-modal-header">
              <div>
                <span className="module-eyebrow">
                  {editing ? 'EDIT RECORD' : 'NEW RECORD'}
                </span>
                <h2>{editing ? 'Update entry' : `Add to ${title}`}</h2>
              </div>
              <button className="module-close" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="module-form">
              {fields.map(field => (
                <label className="module-form-field" key={field.name}>
                  <span>
                    {field.label}
                    {field.required && <b className="required-mark"> *</b>}
                  </span>

                  {field.type === 'textarea' ? (
                    <textarea
                      value={form[field.name] || ''}
                      required={field.required}
                      onChange={event => updateField(field.name, event.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      rows={4}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={form[field.name] || ''}
                      required={field.required}
                      onChange={event => updateField(field.name, event.target.value)}
                    >
                      <option value="">Select {field.label}</option>
                      {(field.options || []).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      value={form[field.name] || ''}
                      required={field.required}
                      onChange={event => updateField(field.name, event.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  )}
                </label>
              ))}

              <label className="module-form-field">
                <span>Record status</span>
                <select
                  value={form.status || 'draft'}
                  onChange={event => updateField('status', event.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>

            <div className="module-modal-footer">
              <button className="module-cancel" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button className="module-save" onClick={saveRecord}>
                <Save size={17} />
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
