const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// ADD TO CART
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });

    // find item of this user + this product
    let item = await CartItem.findOne({ user: req.user._id, product: productId });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({
        user: req.user._id,
        product: productId,
        quantity
      });
    }

    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

// UPDATE CART ITEM
exports.updateCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // id = cart item id
    const { quantity } = req.body;

    const item = await CartItem.findOne({ _id: id, user: req.user._id });
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    if (quantity <= 0)
      return res.status(400).json({ message: 'Quantity must be >= 1' });

    const product = await Product.findById(item.product);
    if (product.stock < quantity)
      return res.status(400).json({ message: 'Insufficient stock' });

    item.quantity = quantity;
    await item.save();

    return res.json(item);
  } catch (err) {
    next(err);
  }
};

// DELETE CART ITEM
exports.removeCartItem = async (req, res, next) => {
  try {
    const { id } = req.params; // cart item id

    const item = await CartItem.findOneAndDelete({
      _id: id,
      user: req.user._id
    });

    if (!item)
      return res.status(404).json({ message: 'Cart item not found' });

    return res.json({ message: 'Removed from cart' });
  } catch (err) {
    next(err);
  }
};

// GET CART FOR USER
exports.getCartForUser = async (req, res, next) => {
  try {
    const items = await CartItem.find({ user: req.user._id })
      .populate('product');

    return res.json(items);
  } catch (err) {
    next(err);
  }
};
