import { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';

const CATEGORIES = ['All', 'Fried', 'Grilled', 'Burger', 'Combo', 'Beverage', 'Other'];

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMsg, setToastMsg] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setToastMsg('Could not load the menu. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  const handleAdd = (product) => {
    addToCart(product, 1);
    setToastMsg(`${product.name} added to cart`);
  };

  return (
    <>
      <div className="page-header">
        <h1>Our Menu</h1>
        <p>Crispy, juicy, and made fresh just for you</p>
      </div>

      <section className="products">
        <div className="section-center">
          <div className="menu-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">Loading menu...</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">No items available in this category yet.</div>
          ) : (
            <div className="clearfix">
              {filtered.map((product) => (
                <div className="product" key={product._id}>
                  <img
                    src={product.image || '/image/banner.jpg'}
                    alt={product.name}
                    className="product-img"
                  />
                  {product.category && <span className="product-category">{product.category}</span>}
                  <h4 className="product-title">{product.name}</h4>
                  {product.description && <p className="product-desc">{product.description}</p>}
                  <h4 className="product-price">₹{product.price}</h4>
                  <div className="product-card-actions">
                    <button className="btn" onClick={() => handleAdd(product)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </>
  );
};

export default Menu;
