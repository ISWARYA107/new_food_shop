import { useState, useEffect } from 'react';

const CATEGORIES = ['Fried', 'Grilled', 'Burger', 'Combo', 'Beverage', 'Other'];

const emptyForm = { name: '', description: '', price: '', category: 'Fried', image: '', isAvailable: true };

const ProductFormModal = ({ initialData, onClose, onSave, saving }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price ?? '',
        category: initialData.category || 'Fried',
        image: initialData.image || '',
        isAvailable: initialData.isAvailable ?? true,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: Number(form.price) });
  };

  return (
    <div className="admin-form-modal-backdrop" onClick={onClose}>
      <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
        <h3>{initialData ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="2" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (₹)</label>
            <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input id="isAvailable" name="isAvailable" type="checkbox" checked={form.isAvailable} onChange={handleChange} style={{ width: 'auto' }} />
            <label htmlFor="isAvailable" style={{ marginBottom: 0 }}>Available on menu</label>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving...' : initialData ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
