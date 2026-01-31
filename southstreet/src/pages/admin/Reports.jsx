import { useState } from 'react';
import { DollarSign, ShoppingCart, BarChart2, Users } from 'lucide-react';

const Reports = () => {
    const stats = [
        { label: 'Total Revenue', value: '$128,430', change: '+12.5%', icon: DollarSign },
        { label: 'Total Orders', value: '1,420', change: '+8.2%', icon: ShoppingCart },
        { label: 'Average Order Value', value: '$90.44', change: '-2.1%', icon: BarChart2 },
        { label: 'Active Customers', value: '892', change: '+15.8%', icon: Users },
    ];

    const topProducts = [
        { name: 'Premium Cotton Hoodie', sales: 450, revenue: '$40,050' },
        { name: 'Oversized Street Tee', sales: 380, revenue: '$17,100' },
        { name: 'Urban Cargo Pants', sales: 310, revenue: '$27,590' },
        { name: 'Silk Blend Shirt', sales: 240, revenue: '$28,800' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Reports & Analytics</h1>
                <p style={{ color: '#666' }}>Track your store's performance and growth.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {stats.map((stat, idx) => (
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
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Sales Analytics (Mock Chart)</h2>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '15px', padding: '10px 0' }}>
                        {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 85].map((val, idx) => (
                            <div key={idx} style={{
                                flex: 1,
                                height: `${val}%`,
                                backgroundColor: '#111',
                                borderRadius: '4px 4px 0 0',
                                opacity: 0.1 + (val / 100)
                            }}></div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#aaa', fontSize: '0.75rem' }}>
                        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
                    </div>
                </div>

                <div style={cardStyle}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>Top Products</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {topProducts.map((prod, idx) => (
                            <div key={idx} style={{ borderBottom: idx !== topProducts.length - 1 ? '1px solid #f4f4f4' : 'none', paddingBottom: '10px' }}>
                                <p style={{ fontWeight: '500', fontSize: '0.9rem' }}>{prod.name}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#888' }}>{prod.sales} sales</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{prod.revenue}</span>
                                </div>
                            </div>
                        ))}
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
