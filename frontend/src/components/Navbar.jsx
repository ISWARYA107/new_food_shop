import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  return (
    <>
      <div className="nav-btn" onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
      </div>

      {open && <div className="overlay" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 50 }} />}

      <nav className="navbar" style={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="navbar-header">
          <h3>Chiken</h3>
          <img src="/image/logo.png" alt="logo" onError={(e) => (e.target.style.display = 'none')} />
          <div className="nav-close" onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </div>
        </div>

        <ul className="nav-items">
          <li><Link className="nav-link" to="/" onClick={close}>Home</Link></li>
          <li><Link className="nav-link" to="/menu" onClick={close}>Menu</Link></li>
          {user && (
            <li><Link className="nav-link" to="/cart" onClick={close}>Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}</Link></li>
          )}
          {user && user.role !== 'admin' && (
            <li><Link className="nav-link" to="/my-orders" onClick={close}>My Orders</Link></li>
          )}
          {user && user.role === 'admin' && (
            <li><Link className="nav-link" to="/admin" onClick={close}>Admin Dashboard</Link></li>
          )}
        </ul>

        {user ? (
          <>
            <div className="nav-user">Signed in as <strong>{user.name}</strong> ({user.role})</div>
            <div className="nav-extra">
              <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : (
          <div className="nav-extra">
            <Link className="btn" to="/login" onClick={close}>Login</Link>
            <Link className="btn" to="/register" onClick={close}>Sign Up</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
