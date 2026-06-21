import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../api/orderApi';

const STATUS_STEPS = ['Pending', 'Preparing', 'Ready', 'Delivered'];

const StatusTracker = ({ currentStatus }) => {
  const currentIndex = STATUS_STEPS.indexOf(currentStatus);
  return (
    <div className="status-tracker">
      {STATUS_STEPS.map((step, idx) => (
        <div key={step} className={`status-step ${idx <= currentIndex ? 'completed' : ''}`}>
          {step}
        </div>
      ))}
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>My Orders</h1>
        <p>Track the status of your recent orders</p>
      </div>

      <div className="orders-page">
        <div className="section-center">
          {loading ? (
            <div className="loading-state">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <p>You haven't placed any orders yet.</p>
              <Link to="/menu" className="btn">Browse Menu</Link>
            </div>
          ) : (
            orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-top">
                  <div>
                    <div className="order-id">Order #{order._id.slice(-8).toUpperCase()}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--clr-grey-2)' }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <span className={`status-badge status-${order.status}`}>{order.status}</span>
                </div>

                <ul className="order-items-list">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-total">Total: ₹{order.totalAmount}</div>

                <StatusTracker currentStatus={order.status} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
