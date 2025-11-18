const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Product not found' });
    res.json(p);
  } catch (err) { next(err); }
};

// Optional: create product route for seed/testing (not required but useful)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock } = req.body;
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) { next(err); }
};
