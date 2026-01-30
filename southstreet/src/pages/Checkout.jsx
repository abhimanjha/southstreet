
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const Checkout = () => {
    const { getTotalCartAmount, cartItems, products } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    return (
        <div className="section checkout-page" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--color-light-grey)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Checkout</h2>
                    <p className="section-subtitle">Please enter your shipping details to complete your order.</p>
                </div>

                <div className="checkout-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)', alignItems: 'start' }}>
                    {/* Left Column: Shipping Info */}
                    <div className="billing-details">
                        <h3 style={{ marginBottom: 'var(--space-md)', fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', color: 'var(--color-black)' }}>Shipping Address</h3>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                                <input type="text" placeholder="First Name" style={inputStyle} />
                                <input type="text" placeholder="Last Name" style={inputStyle} />
                            </div>
                            <input type="email" placeholder="Email Address" style={inputStyle} />
                            <input type="text" placeholder="Street Address" style={inputStyle} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)' }}>
                                <input type="text" placeholder="City" style={inputStyle} />
                                <input type="text" placeholder="Zip Code" style={inputStyle} />
                            </div>
                            <input type="text" placeholder="Country" style={inputStyle} />
                            <input type="tel" placeholder="Phone Number" style={inputStyle} />
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="order-summary" style={{ backgroundColor: 'var(--color-white)', padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                        <h3 style={{ marginBottom: 'var(--space-md)', fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', color: 'var(--color-black)' }}>Order Summary</h3>
                        <div className="summary-items" style={{ marginBottom: 'var(--space-lg)' }}>
                            {products.map((product) => {
                                if (cartItems[product.id] > 0) {
                                    return (
                                        <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-sm)', borderBottom: '1px solid var(--color-soft-grey)', paddingBottom: 'var(--space-xs)' }}>
                                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)' }}>{product.name} (x{cartItems[product.id]})</span>
                                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-black)', fontWeight: '500' }}>${product.price * cartItems[product.id]}</span>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-lg)', borderTop: '2px solid var(--color-soft-grey)', paddingTop: 'var(--space-md)' }}>
                            <span style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: 'var(--color-black)' }}>Total</span>
                            <span style={{ fontSize: 'var(--text-lg)', fontWeight: '600', color: 'var(--color-black)' }}>${totalAmount}</span>
                        </div>
                        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '1rem',
    border: '1px solid var(--color-medium-grey)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-charcoal)',
    transition: 'border-color 0.3s ease'
};

export default Checkout;
