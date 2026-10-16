import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Name is required');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setError(''); setLoading(true);
    try { await register(form.name, form.email, form.password); navigate('/dashboard'); }
    catch (err) { setError(errMsg(err)); }
    finally { setLoading(false); }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 420 }}>
      <h2 className="mb-3">Create account</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit} noValidate>
        <input className="form-control mb-3" name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input className="form-control mb-3" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input className="form-control mb-3" name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={onChange} />
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
