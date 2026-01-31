import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { formatCurrency } from '../utils/format';

const Cart = () => {
    const { getCartItems, removeFromCart, updateCartItemQuantity, getCartTotal, loading } = useContext(ShopContext);
    const cartItems = getCartItems();
    const totalAmount = getCartTotal();

    const handleRemove = async (itemId) => {
        const result = await removeFromCart(itemId);
        if (!result.success) {
            alert(result.message);
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        const result = await updateCartItemQuantity(itemId, newQuantity);
        if (!result.success) {
            alert(result.message);
        }
    };

    if (loading) {
        return (
            <div className="section" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
                <p>Loading cart...</p>
            </div>
        );
    }

    return (
        <div className="section cart-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div className="section-header">
                <h2 className="section-title">Your Bag</h2>
            </div>

            <div className="cart-items" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                {cartItems.length > 0 ? (
                    cartItems.map((item) => {
                        const product = item.product;
                        const price = product.discountPrice || product.price;
                        const image = product.images && product.images.length > 0
                            ? product.images[0]
                            : 'https://via.placeholder.com/100';

                        return (
                            <div key={item.id} className="cart-item" style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px',
                                borderBottom: '1px solid #eee',
                                paddingBottom: '20px'
                            }}>
                                <img
                                    src={image}
                                    alt={product.name}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        marginRight: '20px',
                                        borderRadius: '8px'
                                    }}
                                />
                                <div className="description" style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{product.name}</p>
                                    <p style={{ color: '#666', marginTop: '5px' }}>
                                        {formatCurrency(Number(price || 0))}
                                        {product.discountPrice && (
                                            <span style={{
                                                textDecoration: 'line-through',
                                                marginLeft: '10px',
                                                color: '#999'
                                            }}>
                                                {formatCurrency(Number(product.price || 0))}
                                            </span>
                                        )}
                                    </p>
                                    {item.size && <p style={{ fontSize: '0.9rem', color: '#666' }}>Size: {item.size}</p>}
                                    {item.color && <p style={{ fontSize: '0.9rem', color: '#666' }}>Color: {item.color}</p>}

                                    <div className="countHandler" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                padding: '0.42rem 0.8rem',
                                                background: '#eee',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            -
                                        </button>
                                        <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '500' }}>
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                padding: '0.42rem 0.8rem',
                                                background: '#eee',
                                                border: 'none',
                                                cursor: 'pointer',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            style={{
                                                marginLeft: 'auto',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#dc2626',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px'
                                            }}
                                        >
                                            <Trash2 size={18} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '50px' }}>
                        <h3>Your bag is empty</h3>
                        <Link to="/shop" style={{ textDecoration: "underline", color: "black", marginTop: "20px", display: "inline-block" }}>
                            Start Shopping
                        </Link>
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="checkout" style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '40px' }}>
                    <p style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '600' }}>
                        Subtotal: {formatCurrency(totalAmount)}
                    </p>
                    <Link to="/checkout">
                        <button className="btn-primary" style={{
                            backgroundColor: 'black',
                            color: 'white',
                            marginRight: '10px',
                            padding: '12px 32px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Checkout
                        </button>
                    </Link>
                    <Link to="/shop">
                        <button className="btn-primary" style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: '1px solid black',
                            padding: '12px 32px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem'
                        }}>
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
