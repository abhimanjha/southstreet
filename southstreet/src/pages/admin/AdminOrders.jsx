
import { useState } from 'react';

const AdminOrders = () => {
    // Mock Data
    const [orders, setOrders] = useState([
        { id: '#ORD-7832', customer: 'James Wilson', email: 'james@example.com', date: 'Oct 25, 2023', total: '$120.00', items: 2, status: 'Pending' },
        { id: '#ORD-7831', customer: 'Linda Taylor', email: 'linda@example.com', date: 'Oct 25, 2023', total: '$850.50', items: 5, status: 'Processing' },
        { id: '#ORD-7830', customer: 'Robert Martinez', email: 'robert@example.com', date: 'Oct 24, 2023', total: '$45.00', items: 1, status: 'Shipped' },
        { id: '#ORD-7829', customer: 'Alex Johnson', email: 'alex@example.com', date: 'Oct 24, 2023', total: '$145.00', items: 3, status: 'Delivered' },
        { id: '#ORD-7828', customer: 'Sarah Williams', email: 'sarah@example.com', date: 'Oct 24, 2023', total: '$290.50', items: 2, status: 'Cancelled' },
    ]);

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Orders</h1>
                <p style={{ color: '#666' }}>View and manage customer orders.</p>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                            <th style={thStyle}>Order ID</th>
                            <th style={thStyle}>Customer</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Items</th>
                            <th style={thStyle}>Total</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background-color 0.2s' }}>
                                <td style={{ ...tdStyle, fontWeight: '600' }}>{order.id}</td>
                                <td style={tdStyle}>
                                    <div style={{ fontWeight: '500' }}>{order.customer}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>{order.email}</div>
                                </td>
                                <td style={tdStyle}>{order.date}</td>
                                <td style={tdStyle}>{order.items}</td>
                                <td style={tdStyle}>{order.total}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '500',
                                        backgroundColor: getStatusColor(order.status).bg,
                                        color: getStatusColor(order.status).text,
                                        display: 'inline-block',
                                        minWidth: '80px',
                                        textAlign: 'center'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        style={{
                                            padding: '6px',
                                            borderRadius: '4px',
                                            border: '1px solid #ddd',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle = {
    padding: '15px 10px',
    color: '#888',
    fontSize: '0.85rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const tdStyle = {
    padding: '15px 10px',
    fontSize: '0.95rem',
    color: '#333'
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered': return { bg: 'rgba(46, 204, 113, 0.1)', text: '#2ecc71' }; // Green
        case 'Processing': return { bg: 'rgba(52, 152, 219, 0.1)', text: '#3498db' }; // Blue
        case 'Shipped': return { bg: 'rgba(241, 196, 15, 0.1)', text: '#f1c40f' }; // Yellow
        case 'Pending': return { bg: 'rgba(231, 76, 60, 0.1)', text: '#e74c3c' }; // Red
        case 'Cancelled': return { bg: '#f4f4f4', text: '#888' }; // Gray
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default AdminOrders;
