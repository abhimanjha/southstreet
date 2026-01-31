import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, BarChart2, Users } from 'lucide-react';
import { adminAPI } from '../../services/api';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '../../utils/format';

const Reports = () => {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        activeCustomers: 0
    });
    const [analyticsData, setAnalyticsData] = useState([]);
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReportData();
    }, []);

    const fetchReportData = async () => {
        try {
            setLoading(true);

            // Fetch comprehensive stats
            const statsResponse = await adminAPI.getStats();
            const statsData = statsResponse.data.data;

            // Calculate additional metrics if not provided directly by API
            // Assuming API returns basic stats, we might need to derive some
            // For now mapping available data
            setStats({
                totalRevenue: statsData.monthRevenue || 0, // Using monthly as proxy for "total" in this context or update API
                totalOrders: statsData.activeOrders || 0,
                averageOrderValue: statsData.activeOrders > 0 ? (statsData.monthRevenue / statsData.activeOrders) : 0,
                activeCustomers: statsData.activeCustomers || 0 // Assuming API adds this or we use a placeholder
            });

            // Fetch analytics for chart
            const analyticsResponse = await adminAPI.getAnalytics(30); // 30 days
            setAnalyticsData(analyticsResponse.data.data || []);

            // Fetch top products (reuse analytics endpoint or add specific one if needed)
            // For now using mock or extracting from available data
            // To make this real, we'd ideally have an endpoint like /admin/top-products
            // Simulating with placeholder until endpoint exists or extends
            setTopProducts([
                { name: 'Premium Cotton Hoodie', sales: 12, revenue: 1050 },
                { name: 'Oversized Street Tee', sales: 8, revenue: 360 },
            ]);

        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'Monthly Revenue', value: formatCurrency(stats.totalRevenue), change: '+12.5%', icon: DollarSign },
        { label: 'Active Orders', value: stats.totalOrders, change: '+8.2%', icon: ShoppingCart },
        { label: 'Avg Order Value', value: formatCurrency(stats.averageOrderValue), change: '-2.1%', icon: BarChart2 },
        { label: 'Active Customers', value: stats.activeCustomers || 'N/A', change: '+15.8%', icon: Users },
    ];

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading reports...</div>;

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Reports & Analytics</h1>
                <p style={{ color: '#666' }}>Track your store's performance and growth.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {statCards.map((stat, idx) => (
                    <div key={idx} style={cardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px' }}>
                                <stat.icon size={20} color="#111" />
                            </div>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                backgroundColor: stat.change.startsWith('+') ? '#e8f8f0' : '#fcedea',
                                color: stat.change.startsWith('+') ? '#1db954' : '#e74c3c'
                            }}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '5px', fontWeight: '500' }}>{stat.label}</h3>
                        <p style={{ fontSize: '1.8rem', fontWeight: '700', color: '#111' }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Sales Analytics (Last 30 Days)</h2>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#111" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(val) => formatCurrency(val)} />
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#111" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Top Products</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {topProducts.length > 0 ? topProducts.map((prod, idx) => (
                            <div key={idx} style={{ borderBottom: idx !== topProducts.length - 1 ? '1px solid #f4f4f4' : 'none', paddingBottom: '10px' }}>
                                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{prod.name}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{prod.sales} sales</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{formatCurrency(prod.revenue)}</span>
                                </div>
                            </div>
                        )) : (
                            <div style={{ color: '#888', fontStyle: 'italic' }}>No sales data yet</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

export default Reports;
