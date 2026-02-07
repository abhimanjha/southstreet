import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { formatCurrency } from '../../utils/format';
import {
    DollarSign, ShoppingCart, TrendingUp, Users
} from 'lucide-react';

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

            // Map data to display format
            setStats({
                totalRevenue: statsData.monthRevenue || 0,
                totalOrders: statsData.activeOrders || 0,
                averageOrderValue: statsData.activeOrders > 0 ? (statsData.monthRevenue / statsData.activeOrders) : 0,
                activeCustomers: statsData.activeCustomers || 0
            });

            // Fetch analytics for chart (30 days)
            const analyticsResponse = await adminAPI.getAnalytics(30);
            setAnalyticsData(analyticsResponse.data.data || []);

            // Mock top products for now (or fetch if API existed)
            setTopProducts([
                { name: 'Premium Cotton Hoodie', sales: 12, revenue: 1050 },
                { name: 'Oversized Street Tee', sales: 8, revenue: 360 },
                { name: 'Urban Cargo Pants', sales: 6, revenue: 450 },
                { name: 'Denim Jacket', sales: 4, revenue: 320 },
                { name: 'Beanie', sales: 15, revenue: 225 },
            ]);

        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Revenue', value: formatCurrency(stats.totalRevenue), change: '+12.5%', isPositive: true, icon: DollarSign },
        { title: 'Total Orders', value: stats.totalOrders.toString(), change: '+8.2%', isPositive: true, icon: ShoppingCart },
        { title: 'Avg Order Value', value: formatCurrency(stats.averageOrderValue), change: '-2.1%', isPositive: false, icon: TrendingUp },
        { title: 'Active Customers', value: (stats.activeCustomers || 0).toString(), change: '+15.8%', isPositive: true, icon: Users },
    ];

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading reports...</div>;

    return (
        <div>
            <div style={{ marginBottom: '35px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '8px' }}>Reports & Analytics</h1>
                <p style={{ color: '#666', margin: 0 }}>Detailed breakdown of your store's performance.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: '#fff',
                            padding: '25px',
                            borderRadius: '12px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                            border: '1px solid #eee',
                            transition: 'transform 0.2s',
                        }}
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

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Revenue Chart */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '25px' }}>Revenue Overview (30 Days)</h3>
                    <div style={{ height: '350px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#111" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#111" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(val) => `₹${val}`} />
                                <Tooltip
                                    formatter={(value) => formatCurrency(value)}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#111" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Products */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #eee' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '25px' }}>Top Products</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {topProducts.map((prod, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: idx !== topProducts.length - 1 ? '1px solid #f4f4f4' : 'none',
                                paddingBottom: idx !== topProducts.length - 1 ? '15px' : '0'
                            }}>
                                <div>
                                    <p style={{ fontWeight: '500', fontSize: '0.9rem', marginBottom: '4px' }}>{prod.name}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#888' }}>{prod.sales} sold</p>
                                </div>
                                <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{formatCurrency(prod.revenue)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports;
