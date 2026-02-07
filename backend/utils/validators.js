const { body, param, query, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Validation Errors:', errors.array());
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// User registration validation
const registerValidation = [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validate
];

// User login validation
const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    validate
];

// Product validation
const productValidation = [
    body('name').trim().notEmpty().withMessage('Product name is required'),
    body('sku').trim().notEmpty().withMessage('SKU is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    // Relaxed validation to handle string inputs from FormData
    body('price').exists().withMessage('Price is required'),
    body('categoryId').exists().withMessage('Category is required'),
    body('stock').exists().withMessage('Stock is required'),
    validate
];

// Category validation
const categoryValidation = [
    body('name').trim().notEmpty().withMessage('Category name is required'),
    body('description').optional().trim(),
    validate
];

// Order validation
const orderValidation = [
    body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
    body('shippingAddress').isObject().withMessage('Shipping address is required'),
    body('shippingAddress.firstName').trim().notEmpty().withMessage('First name is required'),
    body('shippingAddress.lastName').trim().notEmpty().withMessage('Last name is required'),
    body('shippingAddress.email').isEmail().withMessage('Valid email is required'),
    body('shippingAddress.address').trim().notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
    body('shippingAddress.zipCode').trim().notEmpty().withMessage('Zip code is required'),
    body('shippingAddress.country').trim().notEmpty().withMessage('Country is required'),
    validate
];

// Review validation
const reviewValidation = [
    body('productId').isUUID().withMessage('Valid product ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().trim(),
    validate
];

// Discount validation
const discountValidation = [
    body('code').trim().notEmpty().withMessage('Discount code is required'),
    body('type').isIn(['percentage', 'fixed']).withMessage('Type must be percentage or fixed'),
    body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
    validate
];

module.exports = {
    validate,
    registerValidation,
    loginValidation,
    productValidation,
    categoryValidation,
    orderValidation,
    reviewValidation,
    discountValidation
};
