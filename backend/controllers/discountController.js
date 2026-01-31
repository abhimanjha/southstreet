const { Discount } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all discounts
// @route   GET /api/discounts
// @access  Private/Admin
const getDiscounts = async (req, res, next) => {
    try {
        const discounts = await Discount.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            data: { discounts }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Validate discount code
// @route   GET /api/discounts/validate/:code
// @access  Public
const validateDiscount = async (req, res, next) => {
    try {
        const { code } = req.params;
        const { totalAmount } = req.query;

        const discount = await Discount.findOne({
            where: {
                code: code.toUpperCase(),
                isActive: true
            }
        });

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Invalid discount code'
            });
        }

        // Check if discount is within date range
        const now = new Date();
        if (discount.startDate && new Date(discount.startDate) > now) {
            return res.status(400).json({
                success: false,
                message: 'Discount not yet active'
            });
        }

        if (discount.endDate && new Date(discount.endDate) < now) {
            return res.status(400).json({
                success: false,
                message: 'Discount has expired'
            });
        }

        // Check usage limit
        if (discount.usageLimit && discount.usageCount >= discount.usageLimit) {
            return res.status(400).json({
                success: false,
                message: 'Discount usage limit reached'
            });
        }

        // Check minimum purchase
        if (discount.minPurchase && parseFloat(totalAmount) < parseFloat(discount.minPurchase)) {
            return res.status(400).json({
                success: false,
                message: `Minimum purchase of $${discount.minPurchase} required`
            });
        }

        // Calculate discount amount
        let discountAmount;
        if (discount.type === 'percentage') {
            discountAmount = (parseFloat(totalAmount) * parseFloat(discount.value)) / 100;
            if (discount.maxDiscount && discountAmount > parseFloat(discount.maxDiscount)) {
                discountAmount = parseFloat(discount.maxDiscount);
            }
        } else {
            discountAmount = parseFloat(discount.value);
        }

        res.json({
            success: true,
            data: {
                discount,
                discountAmount: discountAmount.toFixed(2)
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create discount
// @route   POST /api/discounts
// @access  Private/Admin
const createDiscount = async (req, res, next) => {
    try {
        const discountData = req.body;
        discountData.code = discountData.code.toUpperCase();

        const discount = await Discount.create(discountData);

        res.status(201).json({
            success: true,
            message: 'Discount created successfully',
            data: { discount }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update discount
// @route   PUT /api/discounts/:id
// @access  Private/Admin
const updateDiscount = async (req, res, next) => {
    try {
        const discount = await Discount.findByPk(req.params.id);

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Discount not found'
            });
        }

        if (req.body.code) {
            req.body.code = req.body.code.toUpperCase();
        }

        await discount.update(req.body);

        res.json({
            success: true,
            message: 'Discount updated successfully',
            data: { discount }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete discount
// @route   DELETE /api/discounts/:id
// @access  Private/Admin
const deleteDiscount = async (req, res, next) => {
    try {
        const discount = await Discount.findByPk(req.params.id);

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: 'Discount not found'
            });
        }

        await discount.destroy();

        res.json({
            success: true,
            message: 'Discount deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getDiscounts,
    validateDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount
};
