import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { ordersAPI } from "../services/api";
import { isAuthenticated } from "../utils/auth";
import { formatCurrency } from '../utils/format';

const Checkout = () => {
    const { getCartItems, getCartTotal, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();
    const cartItems = getCartItems();
    const totalAmount = getCartTotal();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        paymentMethod: 'Credit Card'
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated()) {
            alert('Please login to place an order');
            navigate('/login');
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Prepare order data
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                shippingAddress: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                paymentMethod: formData.paymentMethod
            };

            // Create order
            const response = await ordersAPI.create(orderData);

            if (response.data.success) {
                // Clear cart
                await clearCart();

                // Redirect to success page or orders page
                alert('Order placed successfully!');
                navigate('/orders');
            }
        } catch (err) {
            console.error('Error placing order:', err);
            setError(err.response?.data?.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section checkout-page" style={{ paddingTop: '120px', minHeight: '80vh' }}>
            <div className="section-header">
                <h2 className="section-title">Checkout</h2>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                {/* Shipping Form */}
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Shipping Information</h3>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />

                        <input
                            type="text"
                            name="address"
                            placeholder="Street Address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            <input
                                type="text"
                                name="zipCode"
                                placeholder="ZIP Code"
                                value={formData.zipCode}
                                onChange={handleChange}
                                required
                                style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>

                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        />

                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>

                        {error && (
                            <div style={{ padding: '12px', background: '#fee', color: '#c00', borderRadius: '4px' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '14px',
                                backgroundColor: loading ? '#ccc' : 'black',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginTop: '10px'
                            }}
                        >
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </form>
                </div>

                {/* Order Summary */}
                <div>
                    <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
                    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px' }}>
                        {cartItems.map((item) => {
                            const product = item.product;
                            const price = product.discountPrice || product.price;

                            return (
                                <div key={item.id} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: '15px',
                                    paddingBottom: '15px',
                                    borderBottom: '1px solid #eee'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: '500' }}>{product.name}</p>
                                        <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                            Qty: {item.quantity}
                                            {item.size && ` • Size: ${item.size}`}
                                            {item.color && ` • Color: ${item.color}`}
                                        </p>
                                    </div>
                                    <p style={{ fontWeight: '600' }}>
                                        {formatCurrency(price * item.quantity)}
                                    </p>
                                </div>
                            );
                        })}

                        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #000' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <p>Subtotal:</p>
                                <p>{formatCurrency(totalAmount)}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <p>Shipping:</p>
                                <p>Free</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', marginTop: '15px' }}>
                                <p>Total:</p>
                                <p>{formatCurrency(totalAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
