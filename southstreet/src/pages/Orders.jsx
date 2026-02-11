import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { isAuthenticated } from '../utils/auth';
import { formatCurrency } from '../utils/format';
import { getImageUrl } from '../utils/imageUrl';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await ordersAPI.getAll({ scope: 'me' });
                if (response.data.success) {
                    setOrders(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    return (
        <div className="orders-page-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', display: 'flex', gap: '40px' }}>
            {/* Sidebar */}
            <div className="orders-sidebar" style={{ width: '250px', flexShrink: 0 }}>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '20px' }}>Orders</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '10px' }}>
                            <a href="/account/orders" style={{ textDecoration: 'none', color: '#111', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span>Orders</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="orders-content" style={{ flex: 1 }}>
                {/* Banner */}
                <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '4px', marginBottom: '30px', fontSize: '14px', color: '#111' }}>
                    For orders placed before 30 January 2026, <a href="#" style={{ color: '#111', textDecoration: 'underline' }}>you can track and manage them here.</a>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '10px' }}>No recent orders</h2>
                        <p style={{ color: '#757575' }}>Looks like you haven't made any order yet</p>
                    </div>
                ) : (
                    <div>
                        {orders.map(order => (
                            <div key={order.id} style={{ border: '1px solid #e5e5e5', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div>
                                        <p style={{ color: '#757575', fontSize: '14px' }}>Order Placed</p>
                                        <p style={{ fontWeight: '500' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#757575', fontSize: '14px' }}>Total</p>
                                        <p style={{ fontWeight: '500' }}>{formatCurrency(order.totalAmount)}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: '#757575', fontSize: '14px' }}>Order #</p>
                                        <p style={{ fontWeight: '500' }}>{order.orderNumber}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    {order.items && order.items.map((item, idx) => (
                                        <div key={idx} style={{ position: 'relative' }}>
                                            <img
                                                src={getImageUrl(item.product?.images?.[0])}
                                                alt={item.product?.name}
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                                            />
                                            {item.quantity > 1 && (
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '-5px',
                                                    right: '-5px',
                                                    backgroundColor: '#111',
                                                    color: '#fff',
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '12px'
                                                }}>
                                                    {item.quantity}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
