const { body } = require('express-validator');

exports.registerValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
];

exports.loginValidator = [
  body('email').isEmail(),
  body('password').exists()
];

exports.addCartValidator = [
  body('productId').isMongoId().withMessage('Valid productId required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be >=1')
];
