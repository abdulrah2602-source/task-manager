import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errMsg } from '../api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/tasks').then((r) => setTasks(r.data)).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  const count = (s) => tasks.filter((t) => t.status === s).length;
  const done = tasks.length ? Math.round((count('Completed') / tasks.length) * 100) : 0;
  const cards = [
    ['Total', tasks.length, 'dark'],
    ['Pending', count('Pending'), 'warning'],
    ['In Progress', count('In Progress'), 'info'],
    ['Completed', count('Completed'), 'success']
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Dashboard</h2>
        <Link to="/tasks" className="btn btn-primary">Manage tasks</Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3 mb-4">
        {cards.map(([label, n, color]) => (
          <div className="col-6 col-md-3" key={label}>
            <div className={`card text-bg-${color} text-center`}>
              <div className="card-body">
                <div className="display-6">{n}</div>
                <div>{label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="progress" style={{ height: 24 }}>
        <div className="progress-bar bg-success" style={{ width: `${done}%` }}>{done}% complete</div>
      </div>
    </>
  );
}
