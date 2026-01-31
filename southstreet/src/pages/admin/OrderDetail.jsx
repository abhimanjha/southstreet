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
    AlertCircle,
    XCircle,
    Printer,
    Mail
} from 'lucide-react';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock Data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrder({
                id: `#ORD-${id}`,
                date: 'Oct 25, 2023, 10:45 AM',
                status: 'Processing',
                customer: {
                    name: 'James Wilson',
                    email: 'james@example.com',
                    phone: '+1 (555) 123-4567',
                    avatar: 'JW'
                },
                shippingAddress: {
                    street: '123 Fashion Ave, Apt 4B',
                    city: 'New York',
                    state: 'NY',
                    zip: '10001',
                    country: 'United States'
                },
                payment: {
                    method: 'Credit Card (Visa ending in 4242)',
                    status: 'Paid',
                    transactionId: 'TXN-987654321'
                },
                items: [
                    { id: 1, name: 'Premium Cotton Hoodie', size: 'L', color: 'Midnight Black', price: 89.00, quantity: 1, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' },
                    { id: 2, name: 'Urban Graphic Tee', size: 'M', color: 'White', price: 31.00, quantity: 1, image: 'https://images.unsplash.com/photo-1521334884326-7543f23af066?w=100' },
                ],
                subtotal: '$120.00',
                shipping: '$0.00',
                tax: '$10.20',
                total: '$130.20'
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const handleStatusChange = (newStatus) => {
        setOrder({ ...order, status: newStatus });
        // In real app, call API here
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading order details...</div>;

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
                        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Order {order.id}</h1>
                        <span style={{
                            padding: '6px 16px',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: getStatusColor(order.status).bg,
                            color: getStatusColor(order.status).text
                        }}>
                            {order.status}
                        </span>
                    </div>
                    <p style={{ color: '#888', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} /> {order.date}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={secondaryBtnStyle}><Printer size={16} /> Print Invoice</button>
                    <button style={secondaryBtnStyle}><Mail size={16} /> Email Customer</button>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '8px',
                                border: '1px solid #111',
                                backgroundColor: '#111',
                                color: '#fff',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
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
                            {order.items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem', fontWeight: 600 }}>{item.name}</h4>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Size: {item.size} | Color: {item.color}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: '0 0 5px 0', fontWeight: 600 }}>${item.price.toFixed(2)}</p>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Qty: {item.quantity}</p>
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                        <p style={{ margin: 0, fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                            <div style={summaryRowStyle}><span style={{ color: '#888' }}>Subtotal:</span> <span>{order.subtotal}</span></div>
                            <div style={summaryRowStyle}><span style={{ color: '#888' }}>Shipping:</span> <span>{order.shipping}</span></div>
                            <div style={summaryRowStyle}><span style={{ color: '#888' }}>Tax:</span> <span>{order.tax}</span></div>
                            <div style={{ ...summaryRowStyle, fontSize: '1.2rem', fontWeight: 700, marginTop: '10px', color: '#111' }}><span>Total:</span> <span>{order.total}</span></div>
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
                                date="Oct 25, 2023, 10:45 AM"
                                description="The customer has successfully placed the order."
                                isLast={false}
                                color="#2ecc71"
                            />
                            <TimelineItem
                                icon={CreditCard}
                                title="Payment Confirmed"
                                date="Oct 25, 2023, 10:46 AM"
                                description="Payment of $130.20 via Credit Card was confirmed."
                                isLast={false}
                                color="#2ecc71"
                            />
                            <TimelineItem
                                icon={Package}
                                title="Processing"
                                date="Oct 25, 2023, 02:30 PM"
                                description="Order is being prepared and packed."
                                isLast={true}
                                color="#3498db"
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Customer Info */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><User size={18} /> Customer</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#111' }}>
                                {order.customer.avatar}
                            </div>
                            <div>
                                <p style={{ margin: '0 0 2px 0', fontWeight: 600 }}>{order.customer.name}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>Customer since 2022</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={infoRowStyle}><Mail size={14} color="#888" /> {order.customer.email}</div>
                            <div style={infoRowStyle}><Clock size={14} color="#888" /> {order.customer.phone}</div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><MapPin size={18} /> Shipping Address</h2>
                        <div style={{ color: '#333', fontSize: '0.9rem', lineHeight: '1.6' }}>
                            <p style={{ margin: 0 }}>{order.customer.name}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress.street}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                            <p style={{ margin: 0 }}>{order.shippingAddress.country}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div style={cardStyle}>
                        <h2 style={sidebarHeadingStyle}><CreditCard size={18} /> Payment info</h2>
                        <div style={{ fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Method:</span>
                                <span style={{ fontWeight: 500 }}>{order.payment.method}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#888' }}>Status:</span>
                                <span style={{ color: '#2ecc71', fontWeight: 700 }}>{order.payment.status}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#888' }}>ID:</span>
                                <span style={{ color: '#666' }}>{order.payment.transactionId}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TimelineItem = ({ icon: Icon, title, date, description, isLast, color }) => (
    <div style={{ position: 'relative', marginBottom: isLast ? 0 : '30px' }}>
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
    switch (status) {
        case 'Delivered': return { bg: 'rgba(46, 204, 113, 0.12)', text: '#2ecc71' };
        case 'Processing': return { bg: 'rgba(52, 152, 219, 0.12)', text: '#3498db' };
        case 'Shipped': return { bg: 'rgba(241, 196, 15, 0.12)', text: '#f39c12' };
        case 'Pending': return { bg: 'rgba(231, 76, 60, 0.12)', text: '#e74c3c' };
        case 'Cancelled': return { bg: '#f1f2f6', text: '#7f8c8d' };
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default OrderDetail;
