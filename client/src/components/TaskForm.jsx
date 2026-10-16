import { useState } from 'react';

export default function TaskForm({ initial, onSave, onCancel, saving }) {
  const [f, setF] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    dueDate: initial?.dueDate ? initial.dueDate.slice(0, 10) : '',
    priority: initial?.priority || 'Medium',
    status: initial?.status || 'Pending'
  });
  const [error, setError] = useState('');
  const onChange = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!f.title.trim()) return setError('Title is required');
    if (!f.dueDate) return setError('Due date is required');
    setError('');
    onSave(f);
  };

  return (
    <form onSubmit={submit} className="card card-body mb-4" noValidate>
      <h5>{initial ? 'Edit task' : 'New task'}</h5>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <input className="form-control mb-2" name="title" placeholder="Title" value={f.title} onChange={onChange} />
      <textarea className="form-control mb-2" name="description" rows="2" placeholder="Description" value={f.description} onChange={onChange} />
      <div className="row g-2 mb-3">
        <div className="col-12 col-md-4"><input className="form-control" type="date" name="dueDate" value={f.dueDate} onChange={onChange} /></div>
        <div className="col-6 col-md-4">
          <select className="form-select" name="priority" value={f.priority} onChange={onChange}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
        <div className="col-6 col-md-4">
          <select className="form-select" name="status" value={f.status} onChange={onChange}>
            <option>Pending</option><option>In Progress</option><option>Completed</option>
          </select>
        </div>
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
