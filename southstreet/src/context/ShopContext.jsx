import { createContext, useState, useEffect } from "react";
import { productsAPI, cartAPI, categoriesAPI } from "../services/api";
import { getSessionId } from "../utils/auth";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize session ID for guest users
    useEffect(() => {
        getSessionId();
    }, []);

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchCart();
    }, []);

    const fetchProducts = async (params = {}) => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll(params);
            setProducts(response.data.data.products || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.response?.data?.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            setCategories(response.data.data.categories || []);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const fetchCart = async () => {
        try {
            const response = await cartAPI.get();
            setCart(response.data.data.cart);
        } catch (err) {
            console.error('Error fetching cart:', err);
        }
    };

    const addToCart = async (productId, quantity = 1, size = null, color = null) => {
        try {
            const response = await cartAPI.addItem({
                productId,
                quantity,
                size,
                color
            });
            setCart(response.data.data.cart);
            return { success: true };
        } catch (err) {
            console.error('Error adding to cart:', err);
            return {
                success: false,
                message: err.response?.data?.message || 'Failed to add to cart'
            };
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await cartAPI.removeItem(itemId);
            await fetchCart(); // Refresh cart
            return { success: true };
        } catch (err) {
            console.error('Error removing from cart:', err);
            return {
                success: false,
                message: err.response?.data?.message || 'Failed to remove from cart'
            };
        }
    };

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            await cartAPI.updateItem(itemId, { quantity });
            await fetchCart(); // Refresh cart
            return { success: true };
        } catch (err) {
            console.error('Error updating cart:', err);
            return {
                success: false,
                message: err.response?.data?.message || 'Failed to update cart'
            };
        }
    };

    const clearCart = async () => {
        try {
            await cartAPI.clear();
            setCart(null);
            return { success: true };
        } catch (err) {
            console.error('Error clearing cart:', err);
            return {
                success: false,
                message: err.response?.data?.message || 'Failed to clear cart'
            };
        }
    };

    const getCartItemsCount = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = () => {
        if (!cart || !cart.items) return 0;
        return cart.items.reduce((total, item) => {
            const price = item.product.discountPrice || item.product.price;
            return total + (price * item.quantity);
        }, 0);
    };

    const getCartItems = () => {
        if (!cart || !cart.items) return [];
        return cart.items.map(item => ({
            ...item,
            product: {
                ...item.product,
                // Ensure images is an array
                images: Array.isArray(item.product.images)
                    ? item.product.images
                    : (item.product.images ? [item.product.images] : [])
            }
        }));
    };

    const contextValue = {
        products,
        categories,
        cart,
        loading,
        error,
        fetchProducts,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        getCartItems,
        refreshCart: fetchCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
