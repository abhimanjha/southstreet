const sequelize = require('../config/db');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const Review = require('./Review');
const Discount = require('./Discount');

// Define associations

// Category - Product (One-to-Many)
Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
    onDelete: 'RESTRICT'
});
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category'
});

// User - Order (One-to-Many)
User.hasMany(Order, {
    foreignKey: 'userId',
    as: 'orders',
    onDelete: 'CASCADE'
});
Order.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Order - OrderItem (One-to-Many)
Order.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'items',
    onDelete: 'CASCADE'
});
OrderItem.belongsTo(Order, {
    foreignKey: 'orderId',
    as: 'order'
});

// Product - OrderItem (One-to-Many)
Product.hasMany(OrderItem, {
    foreignKey: 'productId',
    as: 'orderItems',
    onDelete: 'RESTRICT'
});
OrderItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

// User - Cart (One-to-One)
User.hasOne(Cart, {
    foreignKey: 'userId',
    as: 'cart',
    onDelete: 'CASCADE'
});
Cart.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Cart - CartItem (One-to-Many)
Cart.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'items',
    onDelete: 'CASCADE'
});
CartItem.belongsTo(Cart, {
    foreignKey: 'cartId',
    as: 'cart'
});

// Product - CartItem (One-to-Many)
Product.hasMany(CartItem, {
    foreignKey: 'productId',
    as: 'cartItems',
    onDelete: 'CASCADE'
});
CartItem.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

// User - Review (One-to-Many)
User.hasMany(Review, {
    foreignKey: 'userId',
    as: 'reviews',
    onDelete: 'CASCADE'
});
Review.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Product - Review (One-to-Many)
Product.hasMany(Review, {
    foreignKey: 'productId',
    as: 'reviews',
    onDelete: 'CASCADE'
});
Review.belongsTo(Product, {
    foreignKey: 'productId',
    as: 'product'
});

module.exports = {
    sequelize,
    User,
    Category,
    Product,
    Order,
    OrderItem,
    Cart,
    CartItem,
    Review,
    Discount
};
