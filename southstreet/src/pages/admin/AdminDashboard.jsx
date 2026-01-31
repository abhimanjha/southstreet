import { useState, useEffect } from 'react';
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
import { adminAPI, ordersAPI, productsAPI } from '../../services/api';
import { formatCurrency } from '../../utils/format';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [chartTimeframe, setChartTimeframe] = useState('7');
    const [stats, setStats] = useState({
        todayRevenue: '0',
        monthRevenue: '0',
        activeOrders: 0,
        lowStockItems: 0
    });
    const [analyticsData, setAnalyticsData] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, [chartTimeframe]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch stats
            const statsResponse = await adminAPI.getStats();
            setStats(statsResponse.data.data);

            // Fetch analytics
            const analyticsResponse = await adminAPI.getAnalytics(parseInt(chartTimeframe));
            setAnalyticsData(analyticsResponse.data.data || []);

            // Fetch recent orders
            const ordersResponse = await ordersAPI.getAll({ page: 1, limit: 5 });
            setRecentOrders(ordersResponse.data.data.orders || []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statsCards = [
        { title: 'Today\'s Revenue', value: formatCurrency(parseFloat(stats.todayRevenue || 0)), change: '+12.5%', isPositive: true, icon: DollarSign },
        { title: 'This Month', value: formatCurrency(parseFloat(stats.monthRevenue || 0)), change: '+18.2%', isPositive: true, icon: TrendingUp },
        { title: 'Active Orders', value: stats.activeOrders.toString(), change: '+5%', isPositive: true, icon: ShoppingCart },
        { title: 'Low Stock', value: stats.lowStockItems.toString(), change: '-2%', isPositive: false, icon: Package, link: '/admin/products' },
    ];

    const btnStyle = {
        padding: '10px 20px',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500'
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#fbbf24',
            processing: '#3b82f6',
            shipped: '#8b5cf6',
            delivered: '#10b981',
            cancelled: '#ef4444'
        };
        return colors[status.toLowerCase()] || '#6b7280';
    };

    if (loading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '8px' }}>Dashboard Overview</h1>
                    <p style={{ color: '#666', margin: 0 }}>Welcome back, Admin. Here's a summary of your performance.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => navigate('/admin/products/add')}
                        style={{ ...btnStyle, backgroundColor: '#111', color: '#fff' }}
                    >
                        Add Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                {statsCards.map((stat, index) => (
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
                        <div>
                            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '5px' }}>{stat.title}</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>{stat.value}</h2>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '40px' }}>
                {/* Sales Chart */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Sales Overview</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => setChartTimeframe('7')}
                                style={{
                                    padding: '6px 14px',
                                    backgroundColor: chartTimeframe === '7' ? '#111' : '#f8f9fa',
                                    color: chartTimeframe === '7' ? '#fff' : '#666',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                7 Days
                            </button>
                            <button
                                onClick={() => setChartTimeframe('30')}
                                style={{
                                    padding: '6px 14px',
                                    backgroundColor: chartTimeframe === '30' ? '#111' : '#f8f9fa',
                                    color: chartTimeframe === '30' ? '#fff' : '#666',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem'
                                }}
                            >
                                30 Days
                            </button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={analyticsData}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#111" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#111" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" style={{ fontSize: '0.85rem' }} />
                            <YAxis
                                stroke="#666"
                                style={{ fontSize: '0.85rem' }}
                                tickFormatter={(value) => `₹${value}`}
                            />
                            <Tooltip
                                formatter={(value) => [formatCurrency(value), 'Sales']}
                            />
                            <Area type="monotone" dataKey="sales" stroke="#111" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '25px' }}>Orders</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" style={{ fontSize: '0.85rem' }} />
                            <YAxis stroke="#666" style={{ fontSize: '0.85rem' }} />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#111" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders */}
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>Recent Orders</h3>
                    <button
                        onClick={() => navigate('/admin/orders')}
                        style={{ ...btnStyle, display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        View All <ArrowRight size={16} />
                    </button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>Order ID</th>
                            <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>Customer</th>
                            <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>Date</th>
                            <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>Total</th>
                            <th style={{ textAlign: 'left', padding: '12px 0', color: '#666', fontWeight: '600', fontSize: '0.85rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.map((order) => (
                            <tr key={order.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '16px 0', fontWeight: '500' }}>{order.orderNumber}</td>
                                <td style={{ padding: '16px 0' }}>
                                    {order.user ? `${order.user.firstName} ${order.user.lastName}` : 'Guest'}
                                </td>
                                <td style={{ padding: '16px 0', color: '#666' }}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '16px 0', fontWeight: '600' }}>
                                    {formatCurrency(parseFloat(order.totalAmount))}
                                </td>
                                <td style={{ padding: '16px 0' }}>
                                    <span style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        backgroundColor: `${getStatusColor(order.status)}20`,
                                        color: getStatusColor(order.status)
                                    }}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {recentOrders.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        No orders yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
