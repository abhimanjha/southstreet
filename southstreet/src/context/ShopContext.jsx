import { createContext, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products] = useState([
        { id: 1, name: 'Leather Jacket', price: 899, image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_jacket_1_1769601137269.png', category: 'men' },
        { id: 2, name: 'Silk Midi Dress', price: 649, image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_dress_beige_1769601164537.png', category: 'women' },
        { id: 3, name: 'Wool Overcoat', price: 1299, image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_coat_grey_1769601192016.png', category: 'men' },
        { id: 4, name: 'Premium Sneakers', price: 399, image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_sneakers_white_1769601222724.png', category: 'men' },
        { id: 5, name: 'Leather Handbag', price: 799, image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_bag_taupe_1769601252148.png', category: 'women' },
        { id: 6, name: 'Cashmere Sweater', price: 549, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600', category: 'women' },
    ]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState("");

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            const newCart = { ...prev };
            if (newCart[itemId] > 0) {
                newCart[itemId] -= 1;
            }
            if (newCart[itemId] === 0) {
                delete newCart[itemId];
            }
            return newCart;
        });
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {
        products,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
        getTotalCartItems,
        searchQuery,
        setSearchQuery
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
