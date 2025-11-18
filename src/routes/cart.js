const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addToCart, updateCartItem, removeCartItem, getCartForUser } = require('../controllers/cartController');

router.use(auth);

router.post('/', addToCart);                // POST /cart
router.put('/:id', updateCartItem);         // PUT /cart/:id
router.delete('/:id', removeCartItem);      // DELETE /cart/:id
router.get('/', getCartForUser);            // GET /cart   (helpful)
module.exports = router;
