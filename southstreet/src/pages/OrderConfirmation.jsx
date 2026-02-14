import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { formatCurrency } from '../utils/format';
import { getImageUrl } from '../utils/imageUrl';
import { Package, CheckCircle, Truck, MapPin } from 'lucide-react';
import OrderTracker from '../components/OrderTracker';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderError, setOrderError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await ordersAPI.getById(orderId);
                if (response.data.success) {
                    setOrder(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching order:', error);

                // Extract error details if available
                const msg = error.response?.data?.message || error.message || 'Unknown error';
                const debugInfo = error.response?.data?.debug || null;

                setOrderError({ message: msg, debug: debugInfo });
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId, navigate]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '120px'
            }}>
                <p>Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '120px',
                textAlign: 'center'
            }}>
                <h2>Order Processing or Not Found</h2>
                <p style={{ margin: '10px 0 20px', color: '#666' }}>
                    We couldn't retrieve your order details immediately. <br />
                    It might still be processing. Please check your order history.
                </p>

                {orderError && (
                    <div style={{
                        margin: '10px 0 20px',
                        padding: '10px',
                        background: '#f9f9f9',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: 'red',
                        maxWidth: '600px'
                    }}>
                        <strong>Error:</strong> {orderError.message}
                        {orderError.debug && (
                            <pre style={{ textAlign: 'left', marginTop: '5px' }}>
                                {JSON.stringify(orderError.debug, null, 2)}
                            </pre>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/account/orders">
                        <button style={{
                            padding: '12px 24px',
                            backgroundColor: '#111',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}>
                            View My Orders
                        </button>
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: 'white',
                            color: '#111',
                            border: '1px solid #111',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            paddingTop: '120px',
            paddingBottom: '80px',
            backgroundColor: '#f9fafb'
        }}>
            {/* Order Details Content */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                {/* Success Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px',
                    padding: '40px 20px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 20px' }} />
                    <h1 style={{
                        fontSize: '2rem',
                        marginBottom: '10px',
                        color: '#111'
                    }}>
                        Order Confirmed!
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        marginBottom: '20px'
                    }}>
                        Thank you for your purchase
                    </p>
                    <div style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        marginTop: '10px'
                    }}>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                            Order Number
                        </p>
                        <p style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: '#111',
                            fontFamily: 'monospace'
                        }}>
                            {order.orderNumber}
                        </p>
                    </div>
                </div>

                {/* Order Status Timeline */}
                <div style={{ marginBottom: '30px' }}>
                    <OrderTracker orderId={orderId} initialOrder={order} />
                </div>

                {/* Order Items */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '30px',
                    marginBottom: '30px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#111' }}>
                        Order Items
                    </h2>
                    {order.items && order.items.map((item, index) => {
                        const product = item.product || {};
                        const image = product.images && product.images.length > 0
                            ? product.images[0]
                            : 'https://via.placeholder.com/100';

                        return (
                            <div key={index} style={{
                                display: 'flex',
                                gap: '20px',
                                padding: '15px 0',
                                borderBottom: index < order.items.length - 1 ? '1px solid #f3f4f6' : 'none'
                            }}>
                                <img
                                    src={getImageUrl(image)}
                                    alt={product.name}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        objectFit: 'cover',
                                        borderRadius: '8px'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '5px', color: '#111' }}>
                                        {product.name}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                                        Quantity: {item.quantity}
                                        {item.size && ` • Size: ${item.size}`}
                                        {item.color && ` • Color: ${item.color}`}
                                    </p>
                                    <p style={{ fontSize: '1rem', fontWeight: '600', color: '#111' }}>
                                        {formatCurrency((product.discountPrice || product.price) * item.quantity)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Shipping & Payment Info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    {/* Shipping Address */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '25px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#111' }}>
                            Shipping Address
                        </h3>
                        {order.shippingAddress && (
                            <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>
                                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                <p>{order.shippingAddress.country}</p>
                                {order.shippingAddress.phone && <p>Phone: {order.shippingAddress.phone}</p>}
                            </div>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '25px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#111' }}>
                            Payment Details
                        </h3>
                        <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6' }}>
                            <p><strong>Method:</strong> {order.paymentMethod}</p>
                            <p><strong>Status:</strong> <span style={{
                                color: order.paymentStatus === 'paid' ? '#10b981' : '#f59e0b',
                                fontWeight: '600'
                            }}>
                                {order.paymentStatus?.toUpperCase()}
                            </span></p>
                            <div style={{
                                marginTop: '20px',
                                paddingTop: '20px',
                                borderTop: '2px solid #111'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Subtotal:</span>
                                    <span>{formatCurrency(order.totalAmount)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span>Shipping:</span>
                                    <span>Free</span>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                    color: '#111'
                                }}>
                                    <span>Total:</span>
                                    <span>{formatCurrency(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Link to="/shop">
                        <button style={{
                            padding: '14px 32px',
                            backgroundColor: '#111',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}>
                            Continue Shopping
                        </button>
                    </Link>
                    <Link to="/account/orders">
                        <button style={{
                            padding: '14px 32px',
                            backgroundColor: 'white',
                            color: '#111',
                            border: '2px solid #111',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}>
                            View All Orders
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Status Step Component
const StatusStep = ({ icon, label, active }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        minWidth: '80px'
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: active ? '#10b981' : '#e5e7eb',
            color: active ? 'white' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
        }}>
            {icon}
        </div>
        <span style={{
            fontSize: '0.85rem',
            color: active ? '#111' : '#9ca3af',
            fontWeight: active ? '600' : '400',
            textAlign: 'center'
        }}>
            {label}
        </span>
    </div>
);

export default OrderConfirmation;
