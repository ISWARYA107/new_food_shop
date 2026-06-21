import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../api/orderApi';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    setError('');
    if (!address.trim()) {
      setError('Please enter a delivery address');
      return;
    }
    setPlacing(true);
    try {
      const payload = {
        items: items.map((i) => ({ productId: i._id, quantity: i.quantity })),
        deliveryAddress: address,
        phone,
      };
      await placeOrder(payload);
      clearCart();
      navigate('/my-orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <div className="page-header">
          <h1>Your Cart</h1>
        </div>
        <div className="cart-page">
          <div className="section-center">
            <div className="cart-empty">
              <p>Your cart is empty.</p>
              <Link to="/menu" className="btn">Browse Menu</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1>Your Cart</h1>
        <p>{totalItems} item{totalItems !== 1 ? 's' : ''} ready to order</p>
      </div>

      <div className="cart-page">
        <div className="section-center">
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    src={item.image || '/image/banner.jpg'}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">₹{item.price}</span>
                    <div className="qty-control" style={{ marginTop: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(item._id)} aria-label="Remove item">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3 style={{ color: 'var(--clr-grey-1)', fontSize: '1.1rem' }}>Order Summary</h3>

              {error && <div className="auth-error">{error}</div>}

              <div className="form-group" style={{ height: 'auto', position: 'static', marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Delivery Address</label>
                <textarea
                  rows="2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--clr-grey-2)', borderRadius: '4px' }}
                  required
                />
              </div>
              <div className="form-group" style={{ height: 'auto', position: 'static', marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--clr-grey-2)', borderRadius: '4px' }}
                />
              </div>

              <div className="cart-summary-row">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="cart-summary-row total">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              <button className="btn submit-btn" onClick={handlePlaceOrder} disabled={placing}>
                {placing ? 'Placing order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
