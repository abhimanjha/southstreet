import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cartItems, products, removeFromCart, addToCart, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div className="section cart-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div className="section-header">
                <h2 className="section-title">Your Bag</h2>
            </div>

            <div className="cart-items" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                {products.map((product) => {
                    if (cartItems[product.id] !== 0 && cartItems[product.id] !== undefined) {
                        return (
                            <div key={product.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }} />
                                <div className="description" style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{product.name}</p>
                                    <p>${product.price}</p>
                                    <div className="countHandler" style={{ marginTop: '10px' }}>
                                        <button onClick={() => removeFromCart(product.id)} style={{ padding: '0.42rem 0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}> - </button>
                                        <input value={cartItems[product.id]} onChange={() => { }} style={{ width: '40px', textAlign: 'center', margin: '0 5px', border: '1px solid #ddd' }} />
                                        <button onClick={() => addToCart(product.id)} style={{ padding: '0.42rem 0.5rem', background: '#eee', border: 'none', cursor: 'pointer' }}> + </button>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>

            {totalAmount > 0 ? (
                <div className="checkout" style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Subtotal: ${totalAmount}</p>
                    <Link to="/checkout">
                        <button className="btn-primary" style={{ backgroundColor: 'black', color: 'white', marginRight: '10px' }}> Checkout </button>
                    </Link>
                    <Link to="/shop">
                        <button className="btn-primary" style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}> Continue Shopping </button>
                    </Link>
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>Your bag is empty</h3>
                    <Link to="/shop" style={{ textDecoration: "underline", color: "black", marginTop: "20px", display: "inline-block" }}>Start Shopping</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
