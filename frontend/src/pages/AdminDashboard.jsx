import { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { getAllOrders, updateOrderStatus } from '../api/orderApi';
import ProductFormModal from '../components/ProductFormModal';
import Toast from '../components/Toast';

const STATUS_OPTIONS = ['Pending', 'Preparing', 'Ready', 'Delivered'];

const AdminDashboard = () => {
  const [tab, setTab] = useState('orders');

  // products state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const [toastMsg, setToastMsg] = useState('');

  const loadProducts = () => {
    setProductsLoading(true);
    getProducts(true)
      .then(setProducts)
      .catch(() => setToastMsg('Could not load products'))
      .finally(() => setProductsLoading(false));
  };

  const loadOrders = (status = '') => {
    setOrdersLoading(true);
    getAllOrders(status)
      .then(setOrders)
      .catch(() => setToastMsg('Could not load orders'))
      .finally(() => setOrdersLoading(false));
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  useEffect(() => {
    if (tab === 'orders') loadOrders(statusFilter);
  }, [statusFilter, tab]);

  const handleSaveProduct = async (data) => {
    setSaving(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
        setToastMsg('Product updated');
      } else {
        await createProduct(data);
        setToastMsg('Product added — it now appears on the customer menu');
      }
      setShowModal(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      setToastMsg(err.response?.data?.message || 'Could not save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    try {
      await deleteProduct(id);
      setToastMsg('Product deleted');
      loadProducts();
    } catch {
      setToastMsg('Could not delete product');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
      setToastMsg(`Order marked as ${newStatus}`);
    } catch {
      setToastMsg('Could not update order status');
    }
  };

  const pendingCount = orders.filter((o) => o.status === 'Pending').length;
  const preparingCount = orders.filter((o) => o.status === 'Preparing').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage products and track orders</p>
      </div>

      <div className="admin-page">
        <div className="section-center">
          <div className="admin-stats">
            <div className="stat-card"><h2>{orders.length}</h2><p>Total Orders</p></div>
            <div className="stat-card"><h2>{pendingCount}</h2><p>Pending</p></div>
            <div className="stat-card"><h2>{preparingCount}</h2><p>Preparing</p></div>
            <div className="stat-card"><h2>₹{totalRevenue}</h2><p>Revenue</p></div>
          </div>

          <div className="admin-tabs">
            <button className={`admin-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>Orders</button>
            <button className={`admin-tab ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>Products</button>
          </div>

          {tab === 'orders' && (
            <>
              <div className="menu-filters">
                {['', ...STATUS_OPTIONS].map((s) => (
                  <button
                    key={s || 'all'}
                    className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s || 'All'}
                  </button>
                ))}
              </div>

              <div className="admin-table-wrap">
                {ordersLoading ? (
                  <div className="loading-state">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="empty-state">No orders found.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Update Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>#{order._id.slice(-8).toUpperCase()}</td>
                          <td>{order.customer?.name || 'Unknown'}<br /><small style={{ color: 'var(--clr-grey-2)' }}>{order.customer?.phone}</small></td>
                          <td>{order.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}</td>
                          <td>₹{order.totalAmount}</td>
                          <td><span className={`status-badge status-${order.status}`}>{order.status}</span></td>
                          <td>
                            <select
                              className="status-select"
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {tab === 'products' && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <button className="btn" onClick={() => { setEditingProduct(null); setShowModal(true); }}>
                  + Add New Product
                </button>
              </div>

              <div className="admin-table-wrap">
                {productsLoading ? (
                  <div className="loading-state">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="empty-state">No products yet. Add your first item.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p._id}>
                          <td><img className="thumb" src={p.image || '/image/banner.jpg'} alt={p.name} /></td>
                          <td>{p.name}</td>
                          <td>{p.category}</td>
                          <td>₹{p.price}</td>
                          <td>{p.isAvailable ? 'Yes' : 'No'}</td>
                          <td>
                            <button className="action-btn action-edit" onClick={() => { setEditingProduct(p); setShowModal(true); }}>Edit</button>{' '}
                            <button className="action-btn action-delete" onClick={() => handleDeleteProduct(p._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showModal && (
        <ProductFormModal
          initialData={editingProduct}
          onClose={() => { setShowModal(false); setEditingProduct(null); }}
          onSave={handleSaveProduct}
          saving={saving}
        />
      )}

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </>
  );
};

export default AdminDashboard;
