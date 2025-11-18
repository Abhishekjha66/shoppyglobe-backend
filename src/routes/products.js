const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);

// optional product creation for seeding/testing
router.post('/', createProduct);

module.exports = router;
