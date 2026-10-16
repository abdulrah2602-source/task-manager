import { useEffect, useState } from 'react';
import api, { errMsg } from '../api';
import TaskForm from '../components/TaskForm';

const prioColor = { Low: 'secondary', Medium: 'warning', High: 'danger' };
const statusColor = { Pending: 'warning', 'In Progress': 'info', Completed: 'success' };

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // null | 'new' | task
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const flash = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 2500); };

  useEffect(() => {
    api.get('/tasks').then((r) => setTasks(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);

  const save = async (data) => {
    setSaving(true); setError('');
    try {
      if (editing === 'new') {
        const r = await api.post('/tasks', data);
        setTasks((t) => [...t, r.data]);
        flash('Task created');
      } else {
        const r = await api.put(`/tasks/${editing._id}`, data);
        setTasks((t) => t.map((x) => (x._id === r.data._id ? r.data : x)));
        flash('Task updated');
      }
      setEditing(null);
    } catch (e) { setError(errMsg(e)); }
    finally { setSaving(false); }
  };

  const changeStatus = async (task, status) => {
    try {
      const r = await api.put(`/tasks/${task._id}`, { status });
      setTasks((t) => t.map((x) => (x._id === r.data._id ? r.data : x)));
    } catch (e) { setError(errMsg(e)); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((t) => t.filter((x) => x._id !== id));
      flash('Task deleted');
    } catch (e) { setError(errMsg(e)); }
  };

  const shown = tasks
    .filter((t) => filter === 'All' || t.status === filter)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">My Tasks</h2>
        <button className="btn btn-primary" onClick={() => setEditing('new')}>+ New task</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {editing && (
        <TaskForm
          key={editing === 'new' ? 'new' : editing._id}
          initial={editing === 'new' ? null : editing}
          onSave={save}
          onCancel={() => setEditing(null)}
          saving={saving}
        />
      )}

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-8">
          <input className="form-control" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option><option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>
      </div>

      {shown.length === 0 && <p className="text-muted">No tasks to show.</p>}
      <div className="row g-3">
        {shown.map((t) => (
          <div className="col-12 col-md-6" key={t._id}>
            <div className="card h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title">{t.title}</h5>
                  <span className={`badge text-bg-${prioColor[t.priority]} align-self-start`}>{t.priority}</span>
                </div>
                <p className="card-text">{t.description}</p>
                <p className="small text-muted mb-2">Due: {new Date(t.dueDate).toLocaleDateString()}</p>
                <select
                  className={`form-select form-select-sm mb-2 border-${statusColor[t.status]}`}
                  value={t.status}
                  onChange={(e) => changeStatus(t, e.target.value)}
                >
                  <option>Pending</option><option>In Progress</option><option>Completed</option>
                </select>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setEditing(t)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => remove(t._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
