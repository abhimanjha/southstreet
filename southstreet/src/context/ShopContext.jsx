import { createContext, useState } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [products] = useState([
        {
            id: 1,
            name: 'Leather Jacket',
            price: 899,
            image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_jacket_1_1769601137269.png',
            category: 'men',
            description: 'A premium leather jacket crafted from the finest materials. Features a timeless design with modern cuts, perfect for any occasion. Durable, stylish, and comfortable.',
            images: [
                'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_jacket_1_1769601137269.png',
                'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600'
            ]
        },
        {
            id: 2,
            name: 'Silk Midi Dress',
            price: 649,
            image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_dress_beige_1769601164537.png',
            category: 'women',
            description: 'Elegant silk midi dress with a flattering silhouette. The soft fabric drapes beautifully, making it an ideal choice for evening events or sophisticated gatherings.',
            images: [
                'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_dress_beige_1769601164537.png',
                'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600'
            ]
        },
        {
            id: 3,
            name: 'Wool Overcoat',
            price: 1299,
            image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_coat_grey_1769601192016.png',
            category: 'men',
            description: 'Stay warm and stylish with this structured wool overcoat. Designed with precision tailoring and high-quality wool blend for maximum comfort and durability.',
            images: [
                'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_coat_grey_1769601192016.png',
                'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000',
                'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'
            ]
        },
        {
            id: 4,
            name: 'Premium Sneakers',
            price: 399,
            image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_sneakers_white_1769601222724.png',
            category: 'men',
            description: 'Handcrafted sneakers combining luxury and streetwear aesthetics. Made with premium leather and a comfortable sole for all-day wear.',
            images: [
                'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_sneakers_white_1769601222724.png',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
                'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600'
            ]
        },
        {
            id: 5,
            name: 'Leather Handbag',
            price: 799,
            image: 'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_bag_taupe_1769601252148.png',
            category: 'women',
            description: 'A sophisticated leather handbag featuring a minimalist design. spacious enough for your essentials while adding a touch of elegance to any outfit.',
            images: [
                'C:/Users/PRASHANT KUMAR JHA/.gemini/antigravity/brain/35bdb6fb-77d1-41a7-b015-2bb64c4127d2/product_bag_taupe_1769601252148.png',
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600'
            ]
        },
        {
            id: 6,
            name: 'Cashmere Sweater',
            price: 549,
            image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
            category: 'women',
            description: 'Luxuriously soft cashmere sweater in a versatile neutral tone. A winter essential that offers both warmth and timeless style.',
            images: [
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
                'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600'
            ]
        },
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
