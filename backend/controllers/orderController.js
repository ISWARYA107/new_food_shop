const Order = require('../models/Order');
const Product = require('../models/Product');

// @route   POST /api/orders
// @access  Private (customer)
// Body: { items: [{ productId, quantity }], deliveryAddress, phone }
const placeOrder = async (req, res, next) => {
  try {
    const { items, deliveryAddress, phone } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item' });
    }

    // Re-fetch product details server-side so prices can't be tampered with from the client
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      if (!product.isAvailable) {
        return res.status(400).json({ message: `${product.name} is currently unavailable` });
      }

      const quantity = Number(item.quantity) || 1;
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
      totalAmount += product.price * quantity;
    }

    const order = await Order.create({
      customer: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      phone,
      status: 'Pending',
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/orders/my
// @access  Private (customer) - "My Orders" page
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/orders
// @access  Private/Admin - view all orders for the dashboard
const getAllOrders = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const orders = await Order.find(filter)
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// @route   GET /api/orders/:id
// @access  Private (owner or admin)
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email phone');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const isOwner = order.customer._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};

// @route   PUT /api/orders/:id/status
// @access  Private/Admin - move order through Pending -> Preparing -> Ready -> Delivered
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    const updated = await order.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};
