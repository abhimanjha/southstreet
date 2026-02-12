import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { isAuthenticated } from '../utils/auth';
import { formatCurrency } from '../utils/format';
import { getImageUrl } from '../utils/imageUrl';
import { ShoppingBag, Package, Truck, CheckCircle } from 'lucide-react';

const OrderTracking = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
            return;
        }

        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await ordersAPI.getById(orderId);
                if (response.data.success) {
                    setOrder(response.data.data.order || response.data.data);
                } else {
                    setError('Order not found');
                }
            } catch (error) {
                console.error('Error fetching order:', error);
                setError('Failed to fetch order details');
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId, navigate]);

    const getStatusStep = (status) => {
        const steps = ['pending', 'processing', 'shipped', 'delivered'];
        const currentLower = status?.toLowerCase() || '';

        if (currentLower === 'placed') return 0;

        let index = steps.indexOf(currentLower);
        if (index === -1) {
            if (currentLower === 'cancelled') return -1;
            return 0;
        }
        return index;
    };

    const steps = [
        { label: 'Order Placed', date: order?.createdAt },
        { label: 'Processing', date: null },
        { label: 'Shipped', date: null },
        { label: 'Delivered', date: order?.deliveryDate }
    ];

    const currentStep = order ? getStatusStep(order.status) : 0;

    if (loading) return (
        <div style={{ padding: '80px', textAlign: 'center' }}>Loading order details...</div>
    );

    if (error || !order) return (
        <div style={{ padding: '80px', textAlign: 'center' }}>
            <h2>{error || 'Order not found'}</h2>
            <button
                onClick={() => navigate('/account/orders')}
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
                Back to Orders
            </button>
        </div>
    );

    return (
        <div className="orders-page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '40px' }}>
            {/* Sidebar */}
            <div className="orders-sidebar" style={{ width: '250px', flexShrink: 0 }}>
                <div style={{ marginBottom: '20px' }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <a href="/account/orders" style={{ textDecoration: 'none', color: '#111', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ borderBottom: '2px solid #111', paddingBottom: '2px' }}>Orders</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="orders-content" style={{ flex: 1 }}>

                {/* Back Link */}
                <div style={{ marginBottom: '20px' }}>
                    <button
                        onClick={() => navigate('/account/orders')}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#757575', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', padding: 0 }}
                    >
                        ← Back to Orders
                    </button>
                </div>

                {/* Order Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '5px' }}>Order #{order.orderNumber}</h1>
                        <p style={{ color: '#757575', fontSize: '14px' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '18px', fontWeight: '500' }}>{formatCurrency(order.totalAmount)}</p>
                        <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: order.status === 'delivered' ? '#e6f4ea' : '#f1f3f4',
                            color: order.status === 'delivered' ? '#1e8e3e' : '#202124',
                            marginTop: '5px',
                            textTransform: 'capitalize'
                        }}>
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Tracker */}
                {order.status !== 'cancelled' && (
                    <div style={{ marginBottom: '40px', padding: '0 10px' }}>
                        <div style={{ display: 'flex', position: 'relative', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Progress Line Background */}
                            <div style={{ position: 'absolute', left: 0, right: 0, top: '20px', height: '2px', backgroundColor: '#e5e5e5', zIndex: 0 }}></div>

                            {/* Progress Line Active */}
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                top: '20px',
                                height: '2px',
                                backgroundColor: '#111',
                                zIndex: 0,
                                transition: 'width 0.5s ease'
                            }}></div>

                            {steps.map((step, index) => {
                                const isCompleted = index <= currentStep;
                                const isCurrent = index === currentStep;

                                let StepIcon = ShoppingBag;
                                if (index === 1) StepIcon = Package;
                                if (index === 2) StepIcon = Truck;
                                if (index === 3) StepIcon = CheckCircle;

                                return (
                                    <div key={index} style={{ position: 'relative', zIndex: 1, textAlign: 'center', flex: 1 }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            backgroundColor: isCompleted ? '#111' : '#fff',
                                            border: isCompleted ? 'none' : '2px solid #e5e5e5',
                                            color: isCompleted ? '#fff' : '#e5e5e5',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 10px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s ease'
                                        }}>
                                            <StepIcon size={18} />
                                        </div>
                                        <div style={{ fontSize: '13px', fontWeight: isCurrent ? '600' : '400', color: isCompleted ? '#111' : '#999' }}>
                                            {step.label}
                                        </div>
                                        {step.date && isCompleted && (
                                            <div style={{ fontSize: '11px', color: '#757575', marginTop: '2px' }}>
                                                {new Date(step.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Order Items */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '20px', borderBottom: '1px solid #e5e5e5', paddingBottom: '10px' }}>Items</h3>
                    <div>
                        {order.items && order.items.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                                <img
                                    src={getImageUrl(item.product?.images?.[0])}
                                    alt={item.product?.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f5f5f5' }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '500' }}>{item.product?.name}</h4>
                                    <p style={{ margin: '0 0 5px 0', color: '#757575', fontSize: '14px' }}>
                                        {item.size && `Size: ${item.size}`} {item.size && item.color && '|'} {item.color && `Color: ${item.color}`}
                                    </p>
                                    <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Qty: {item.quantity}</p>
                                    <p style={{ fontWeight: '500' }}>{formatCurrency(item.price || item.product?.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', borderTop: '1px solid #e5e5e5', paddingTop: '30px' }}>
                    {/* Shipping Address */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px' }}>Shipping Address</h4>
                        <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                            <p style={{ fontWeight: '500', color: '#111', margin: 0 }}>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress?.address}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress?.country}</p>
                            <p style={{ margin: '10px 0 0 0' }}>{order.shippingAddress?.phone}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '15px' }}>Payment Information</h4>
                        <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.6' }}>
                            <p style={{ margin: '0 0 5px 0' }}>Method: <span style={{ color: '#111', textTransform: 'capitalize' }}>{order.paymentMethod}</span></p>
                            <div style={{ margin: '15px 0 0 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Subtotal</span>
                                    <span style={{ color: '#111' }}>{formatCurrency(order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0))}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>Shipping</span>
                                    <span style={{ color: '#111' }}>{order.shippingCharges === 0 ? 'Free' : formatCurrency(order.shippingCharges)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #eee', fontWeight: '500', color: '#111' }}>
                                    <span>Total</span>
                                    <span>{formatCurrency(order.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
