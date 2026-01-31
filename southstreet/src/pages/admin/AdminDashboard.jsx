import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';
import {
    TrendingUp, TrendingDown, Package, ShoppingCart,
    Users, DollarSign, ArrowRight, MoreVertical
} from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [chartTimeframe, setChartTimeframe] = useState('7');

    // Mock Data for Charts
    const salesData7Days = [
        { name: 'Mon', sales: 4000, orders: 24 },
        { name: 'Tue', sales: 3000, orders: 18 },
        { name: 'Wed', sales: 2000, orders: 29 },
        { name: 'Thu', sales: 2780, orders: 23 },
        { name: 'Fri', sales: 1890, orders: 15 },
        { name: 'Sat', sales: 2390, orders: 38 },
        { name: 'Sun', sales: 3490, orders: 43 },
    ];

    const salesData30Days = [
        { name: 'Week 1', sales: 15400, orders: 120 },
        { name: 'Week 2', sales: 12200, orders: 98 },
        { name: 'Week 3', sales: 18900, orders: 145 },
        { name: 'Week 4', sales: 21000, orders: 160 },
    ];

    const topProducts = [
        { id: 1, name: 'Premium Cotton Hoodie', sales: 145, revenue: '$12,905', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' },
        { id: 2, name: 'Silk Blend Dress', sales: 120, revenue: '$17,400', image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' },
        { id: 3, name: 'Urban Leather Jacket', sales: 85, revenue: '$25,415', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
    ];

    const recentProducts = [
        { id: 5, name: 'Linen Summer Shirt', price: '$65.00', date: '2 hours ago', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100' },
        { id: 6, name: 'Classic Denim Jeans', price: '$89.00', date: '5 hours ago', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=100' },
    ];

    const stats = [
        { title: 'Today\'s Revenue', value: '$3,450', change: '+12.5%', isPositive: true, icon: DollarSign },
        { title: 'This Month', value: '$124,500', change: '+18.2%', isPositive: true, icon: TrendingUp },
        { title: 'Active Orders', value: '45', change: '+5%', isPositive: true, icon: ShoppingCart },
        { title: 'Low Stock', value: '8', change: '-2%', isPositive: false, icon: Package, link: '/admin/low-stock' },
    ];

    const recentOrders = [
        { id: '#ORD-7829', customer: 'Alex Johnson', date: 'Oct 24, 2023', total: '$145.00', status: 'Pending' },
        { id: '#ORD-7828', customer: 'Sarah Williams', date: 'Oct 24, 2023', total: '$290.50', status: 'Shipped' },
        { id: '#ORD-7827', customer: 'Michael Brown', date: 'Oct 23, 2023', total: '$85.00', status: 'Delivered' },
        { id: '#ORD-7826', customer: 'Emily Davis', date: 'Oct 23, 2023', total: '$450.00', status: 'Processing' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '8px' }}>Dashboard Overview</h1>
                    <p style={{ color: '#666', margin: 0 }}>Welcome back, Admin. Here's a summary of your performance.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={btnStyle}>Download Report</button>
                    <button style={{ ...btnStyle, backgroundColor: '#111', color: '#fff' }}>Add Product</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        onClick={() => stat.link && navigate(stat.link)}
                        style={{
                            backgroundColor: '#fff',
                            padding: '25px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                            border: '1px solid #eee',
                            cursor: stat.link ? 'pointer' : 'default',
                            transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) => stat.link && (e.currentTarget.style.transform = 'translateY(-5px)')}
                        onMouseLeave={(e) => stat.link && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px' }}>
                                <stat.icon size={20} color="#111" />
                            </div>
                            <span style={{
                                fontSize: '0.8rem',
                                color: stat.isPositive ? '#2ecc71' : '#e74c3c',
                                fontWeight: '600'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '8px', fontWeight: 500 }}>{stat.title}</h3>
                        <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111' }}>{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '40px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Revenue & Sales</h2>
                        <div style={{ display: 'flex', backgroundColor: '#f0f0f0', padding: '4px', borderRadius: '8px' }}>
                            <button
                                onClick={() => setChartTimeframe('7')}
                                style={toggleBtnStyle(chartTimeframe === '7')}
                            >7 Days</button>
                            <button
                                onClick={() => setChartTimeframe('30')}
                                style={toggleBtnStyle(chartTimeframe === '30')}
                            >30 Days</button>
                        </div>
                    </div>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartTimeframe === '7' ? salesData7Days : salesData30Days}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#111" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#111" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '30px' }}>Order Volume</h2>
                    <div style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData7Days}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: '#f8f9fa' }}
                                />
                                <Bar dataKey="orders" fill="#111" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
                {/* Recent Orders */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>Recent Orders</h2>
                        <button onClick={() => navigate('/admin/orders')} style={{ background: 'none', border: 'none', color: '#111', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            View All <ArrowRight size={14} />
                        </button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #eee' }}>
                                    <th style={thStyle}>ID</th>
                                    <th style={thStyle}>Customer</th>
                                    <th style={thStyle}>Total</th>
                                    <th style={thStyle}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f9f9f9', cursor: 'pointer' }} onClick={() => navigate(`/admin/orders/${order.id.replace('#', '')}`)}>
                                        <td style={tdStyle}>{order.id}</td>
                                        <td style={{ ...tdStyle, fontWeight: '500' }}>{order.customer}</td>
                                        <td style={tdStyle}>{order.total}</td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
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

                {/* Top Selling Products */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '25px' }}>Top Selling Products</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {topProducts.map(product => (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', borderRadius: '12px', border: '1px solid #f9f9f9' }}>
                                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', margin: '0 0 4px 0', fontWeight: 600 }}>{product.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>{product.sales} sales</p>
                                </div>
                                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{product.revenue}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recently Added */}
                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '25px' }}>Recently Added</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {recentProducts.map(product => (
                            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: '0.9rem', margin: '0 0 4px 0', fontWeight: 600 }}>{product.name}</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0 }}>{product.price}</p>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#999' }}>{product.date}</span>
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button style={{ width: '100%', padding: '12px', marginTop: '20px', backgroundColor: '#f8f9fa', border: '1px solid #eee', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
                        View All Products
                    </button>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
    border: '1px solid #eee'
};

const btnStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
};

const toggleBtnStyle = (isActive) => ({
    padding: '6px 15px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: isActive ? '#fff' : 'transparent',
    color: isActive ? '#111' : '#888',
    fontSize: '0.8rem',
    fontWeight: isActive ? 600 : 500,
    cursor: 'pointer',
    boxShadow: isActive ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
    transition: 'all 0.2s'
});

const thStyle = {
    padding: '12px 10px',
    color: '#888',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const tdStyle = {
    padding: '15px 10px',
    fontSize: '0.85rem',
    color: '#333'
};

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered': return { bg: 'rgba(46, 204, 113, 0.1)', text: '#2ecc71' };
        case 'Processing': return { bg: 'rgba(52, 152, 219, 0.1)', text: '#3498db' };
        case 'Shipped': return { bg: 'rgba(241, 196, 15, 0.1)', text: '#f1c40f' };
        case 'Pending': return { bg: 'rgba(231, 76, 60, 0.1)', text: '#e74c3c' };
        default: return { bg: '#f4f4f4', text: '#888' };
    }
};

export default AdminDashboard;
