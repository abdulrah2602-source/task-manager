import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return setError('Email and password are required');
    setError(''); setLoading(true);
    try { await login(form.email, form.password); navigate('/dashboard'); }
    catch (err) { setError(errMsg(err)); }
    finally { setLoading(false); }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <input className="form-control mb-3" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input className="form-control mb-3" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p className="mt-3">No account? <Link to="/register">Register</Link></p>
    </div>
  );
}
