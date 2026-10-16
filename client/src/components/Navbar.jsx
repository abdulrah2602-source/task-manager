import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">TaskManager</Link>
        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto align-items-md-center gap-md-2">
            {user ? (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/dashboard">Dashboard</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/tasks">Tasks</NavLink></li>
                <li className="nav-item text-secondary small px-2">Hi, {user.name}</li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link" to="/register">Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
