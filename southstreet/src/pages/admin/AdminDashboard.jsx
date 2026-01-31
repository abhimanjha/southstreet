
const AdminDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Revenue', value: '$124,500', change: '+12%', isPositive: true },
        { title: 'Active Orders', value: '45', change: '+5%', isPositive: true },
        { title: 'Total Customers', value: '1,203', change: '+18%', isPositive: true },
        { title: 'Low Stock Items', value: '8', change: '-2%', isPositive: false },
    ];

    const recentOrders = [
        { id: '#ORD-7829', customer: 'Alex Johnson', date: 'Oct 24, 2023', total: '$145.00', status: 'Pending' },
        { id: '#ORD-7828', customer: 'Sarah Williams', date: 'Oct 24, 2023', total: '$290.50', status: 'Shipped' },
        { id: '#ORD-7827', customer: 'Michael Brown', date: 'Oct 23, 2023', total: '$85.00', status: 'Delivered' },
        { id: '#ORD-7826', customer: 'Emily Davis', date: 'Oct 23, 2023', total: '$450.00', status: 'Processing' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Dashboard</h1>
                <p style={{ color: '#666' }}>Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {stats.map((stat, index) => (
                    <div key={index} style={{
                        backgroundColor: '#fff',
                        padding: '25px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
                        border: '1px solid #eee'
                    }}>
                        <h3 style={{ fontSize: '0.9rem', color: '#888', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>{stat.title}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <span style={{ fontSize: '2rem', fontWeight: '600' }}>{stat.value}</span>
                            <span style={{
                                fontSize: '0.9rem',
                                color: stat.isPositive ? '#2ecc71' : '#e74c3c',
                                backgroundColor: stat.isPositive ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontWeight: '500'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '20px', fontWeight: '600' }}>Recent Orders</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                                <th style={thStyle}>Order ID</th>
                                <th style={thStyle}>Customer</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Total</th>
                                <th style={thStyle}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                    <td style={tdStyle}>{order.id}</td>
                                    <td style={{ ...tdStyle, fontWeight: '500' }}>{order.customer}</td>
                                    <td style={{ ...tdStyle, color: '#888' }}>{order.date}</td>
                                    <td style={tdStyle}>{order.total}</td>
                                    <td style={tdStyle}>
                                        <span style={{
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '500',
                                            backgroundColor: getStatusColor(order.status).bg,
                                            color: getStatusColor(order.status).text
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default AdminDashboard;
