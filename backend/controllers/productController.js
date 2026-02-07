const { Product, Category } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 12, category, search, minPrice, maxPrice, sort = 'createdAt', order = 'DESC' } = req.query;

        const offset = (page - 1) * limit;
        const where = { isActive: true };

        // Filter by category
        if (category) {
            const cat = await Category.findOne({ where: { slug: category } });
            if (cat) {
                where.categoryId = cat.id;
            }
        }

        // Search by name or description
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Price range filter
        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) where.price[Op.gte] = minPrice;
            if (maxPrice) where.price[Op.lte] = maxPrice;
        }

        const { count, rows } = await Product.findAndCountAll({
            where,
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'slug']
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[sort, order]]
        });

        res.json({
            success: true,
            data: {
                products: rows,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    pages: Math.ceil(count / limit)
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'slug']
            }]
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: { product }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
    try {
        console.log('Create Product Body:', req.body);
        const productData = { ...req.body };

        // Parse JSON fields from strings (FormData limitation)
        if (typeof productData.sizes === 'string') {
            try {
                productData.sizes = JSON.parse(productData.sizes);
            } catch (e) {
                productData.sizes = [];
            }
        }
        if (typeof productData.colors === 'string') {
            try {
                productData.colors = JSON.parse(productData.colors);
            } catch (e) {
                productData.colors = [];
            }
        }

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => `/uploads/products/${file.filename}`);
        }

        const product = await Product.create(productData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: { product }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Parse JSON fields from strings
        if (typeof req.body.sizes === 'string') {
            try {
                req.body.sizes = JSON.parse(req.body.sizes);
            } catch (e) {
                req.body.sizes = [];
            }
        }
        if (typeof req.body.colors === 'string') {
            try {
                req.body.colors = JSON.parse(req.body.colors);
            } catch (e) {
                req.body.colors = [];
            }
        }

        // Handle file uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/products/${file.filename}`);
            req.body.images = [...(product.images || []), ...newImages];
        }

        await product.update(req.body);

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: { product }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await product.destroy();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get low stock products
// @route   GET /api/products/low-stock
// @access  Private/Admin
const getLowStockProducts = async (req, res, next) => {
    try {
        const threshold = req.query.threshold || 20;

        const products = await Product.findAll({
            where: {
                stock: { [Op.lte]: threshold },
                isActive: true
            },
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }],
            order: [['stock', 'ASC']]
        });

        res.json({
            success: true,
            data: { products }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts
};
