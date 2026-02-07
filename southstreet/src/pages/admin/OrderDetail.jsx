import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Package,
    Truck,
    CreditCard,
    User,
    MapPin,
    Calendar,
    CheckCircle2,
    Clock,
    Printer,
    Mail,
    AlertCircle
} from 'lucide-react';
import { ordersAPI } from '../../services/api';
import { formatCurrency } from '../../utils/format';
import { getImageUrl } from '../../utils/imageUrl';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response = await ordersAPI.getById(id);
            if (response.data.success) {
                setOrder(response.data.data.order || response.data.data);
            } else {
                setError('Failed to fetch order details');
            }
        } catch (err) {
            console.error('Error fetching order:', err);
            setError('Error loading order details');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus) => {
        try {
            setUpdating(true);
            const response = await ordersAPI.updateStatus(id, newStatus);
            if (response.data.success) {
                // Refresh order data
                fetchOrder();
            }
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <p>Loading order details...</p>
        </div>
    );

    if (error || !order) return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '10px' }} />
            <p style={{ color: '#ef4444' }}>{error || 'Order not found'}</p>
            <button
                onClick={() => navigate('/admin/orders')}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Back to Orders
            </button>
        </div>
    );

    const user = order.user || {};
    const shippingAddress = order.shippingAddress || {};

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/orders')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px', fontSize: '0.9rem' }}
            >
                <ChevronLeft size={18} /> Back to Orders
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '8px' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>
                            Order #{order.orderNumber}
                        </h1>
                        <span style={{
                            padding: '6px 16px',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: getStatusColor(order.status).bg,
                            color: getStatusColor(order.status).text,
                            textTransform: 'capitalize'
                        }}>
                            {order.status}
                        </span>
                    </div>
                    <p style={{ color: '#888', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={secondaryBtnStyle} onClick={() => window.print()}>
                        <Printer size={16} /> Print Invoice
                    </button>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            disabled={updating}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: '1px solid #111',
                                backgroundColor: updating ? '#333' : '#111',
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                cursor: updating ? 'wait' : 'pointer',
                                outline: 'none',
                                opacity: updating ? 0.7 : 1
                            }}
                        >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Order Items */}
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Order Items</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {order.items && order.items.map((item, index) => {
                                const product = item.product || {};
                                const image = product.images && product.images.length > 0
                                    ? product.images[0]
                                    : 'placeholder';

                                return (
                                    <div key={index} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <img
                                            src={getImageUrl(image)}
                                            alt={product.name}
                                            style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 600 }}>
                                                {product.name || 'Product'}
                                            </h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
                                                {item.size && `Size: ${item.size}`}
                                                {item.size && item.color && ' | '}
                                                {item.color && `Color: ${item.color}`}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: 600 }}>
                                                {formatCurrency((product.discountPrice || product.price) || 0)}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Qty: {item.quantity}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                            <p style={{ margin: '0 0 5px 0', fontWeight: 700 }}>
                                                {formatCurrency(((product.discountPrice || product.price) || 0) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                            <div style={summaryRowStyle}>
                                <span style={{ color: '#888' }}>Subtotal:</span>
                                <span>{formatCurrency(order.totalAmount)}</span>
                            </div>
                            <div style={summaryRowStyle}>
                                <span style={{ color: '#888' }}>Shipping:</span>
                                <span>Free</span>
                            </div>
                            <div style={{ ...summaryRowStyle, fontSize: '1.2rem', fontWeight: 700, marginTop: '10px', color: '#111' }}>
                                <span>Total:</span>
                                <span>{formatCurrency(order.totalAmount)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div style={cardStyle}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '25px' }}>Order Timeline</h2>
                        <div style={{ position: 'relative', paddingLeft: '30px' }}>
                            <div style={{ position: 'absolute', left: '7px', top: '5px', bottom: '5px', width: '2px', backgroundColor: '#eee' }}></div>

                            <TimelineItem
                                icon={CheckCircle2}
                                title="Order Placed"
                                date={new Date(order.createdAt).toLocaleString()}
                                description="Order received successfully"
                                isLast={order.status === 'pending'}
                                color="#2ecc71"
                                active={true}
                            />

                            {order.status !== 'pending' && order.status !== 'cancelled' && (
                                <TimelineItem
                                    icon={Package}
                                    title="Processing"
                                    date={order.updatedAt ? new Date(order.updatedAt).toLocaleString() : ''}
                                    description="Order is being prepared"
                                    isLast={order.status === 'processing'}
                                    color="#3498db"
                                    active={true}
                                />
                            )}

                            {(order.status === 'shipped' || order.status === 'delivered') && (
                                <TimelineItem
                                    icon={Truck}
                                    title="Shipped"
                                    date=""
                                    description="Order is on the way"
                                    isLast={order.status === 'shipped'}
                                    color="#f39c12"
                                    active={true}
                                />
                            )}

                            {order.status === 'delivered' && (
                                <TimelineItem
                                    icon={MapPin}
                                    title="Delivered"
                                    date=""
                                    description="Order delivered to customer"
                                    isLast={true}
                                    color="#2ecc71"
                                    active={true}
                                />
                            )}

                            {order.status === 'cancelled' && (
                                <TimelineItem
                                    icon={AlertCircle}
                                    title="Cancelled"
                                    date={new Date(order.updatedAt).toLocaleString()}
                                    description="Order was cancelled"
                                    isLast={true}
                                    color="#ef4444"
                                    active={true}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Customer Info */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><User size={18} /> Customer</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#111' }}>
                                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'G'}
                            </div>
                            <div>
                                <p style={{ margin: '0 0 2px 0', fontWeight: 600 }}>
                                    {user.firstName ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                                </p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>
                                    ID: {user.id || 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={infoRowStyle}><Mail size={14} color="#888" /> {user.email || 'N/A'}</div>
                            {user.phone && (
                                <div style={infoRowStyle}><Clock size={14} color="#888" /> {user.phone}</div>
                            )}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><MapPin size={18} /> Shipping Address</h2>
                        {order.shippingAddress ? (
                            <div style={{ color: '#333', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                <p style={{ margin: 0, fontWeight: '600' }}>
                                    {shippingAddress.firstName} {shippingAddress.lastName}
                                </p>
                                <p style={{ margin: 0 }}>{shippingAddress.address}</p>
                                <p style={{ margin: 0 }}>
                                    {shippingAddress.city}, {shippingAddress.zipCode}
                                </p>
                                <p style={{ margin: 0 }}>{shippingAddress.country}</p>
                                {shippingAddress.phone && (
                                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>
                                        Phone: {shippingAddress.phone}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <p style={{ color: '#666' }}>No shipping address available</p>
                        )}
                    </div>

                    {/* Payment Info */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><CreditCard size={18} /> Payment info</h2>
                        <div style={{ fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Method:</span>
                                <span style={{ fontWeight: 500 }}>{order.paymentMethod}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Status:</span>
                                <span style={{
                                    color: order.paymentStatus === 'paid' ? '#2ecc71' : '#f59e0b',
                                    fontWeight: 700,
                                    textTransform: 'uppercase'
                                }}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div style={cardStyle}>
                            <h2 style={sidebarHeadingStyle}>Notes</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                                {order.notes}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ icon: Icon, title, date, description, isLast, color, active }) => (
    <div style={{ position: 'relative', marginBottom: isLast ? 0 : '30px', opacity: active ? 1 : 0.5 }}>
        <div style={{
            position: 'absolute',
            left: '-32px',
            top: '0',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            border: `2px solid ${color}`,
            zIndex: 1
        }}></div>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            {title}
        </h4>
        <span style={{ fontSize: '0.75rem', color: '#999', display: 'block', marginBottom: '8px' }}>{date}</span>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>{description}</p>
    </div>
);

const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    border: '1px solid #eee',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
};

const secondaryBtnStyle = {
    padding: '10px 18px',
    borderRadius: '8px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s'
};

const sidebarHeadingStyle = {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#111'
};

const summaryRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '250px',
    fontSize: '0.95rem'
};

const infoRowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    color: '#333'
};

const getStatusColor = (status) => {
    const s = status ? status.toLowerCase() : '';
    switch (s) {
        case 'delivered': return { bg: 'rgba(46, 204, 113, 0.12)', text: '#2ecc71' };
        case 'processing': return { bg: 'rgba(52, 152, 219, 0.12)', text: '#3498db' };
        case 'shipped': return { bg: 'rgba(241, 196, 15, 0.12)', text: '#f39c12' };
        case 'pending': return { bg: 'rgba(231, 76, 60, 0.12)', text: '#e74c3c' };
        case 'cancelled': return { bg: '#f1f2f6', text: '#7f8c8d' };
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default OrderDetail;
