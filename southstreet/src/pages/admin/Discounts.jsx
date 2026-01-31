import { useState } from 'react';

const Discounts = () => {
    const [discounts, setDiscounts] = useState([
        { id: 1, code: 'WINTER20', type: 'Percentage', value: '20%', status: 'Active', usage: 145 },
        { id: 2, code: 'FREESHIP', type: 'Shipping', value: 'Free', status: 'Active', usage: 890 },
        { id: 3, code: 'WELCOME10', type: 'Percentage', value: '10%', status: 'Active', usage: 2310 },
        { id: 4, code: 'EXPIRED15', type: 'Percentage', value: '15%', status: 'Expired', usage: 50 },
    ]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Discounts</h1>
                    <p style={{ color: '#666' }}>Manage promotional codes and special offers.</p>
                </div>
                <button
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer'
                    }}
                >
                    + Create Discount
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                            <th style={thStyle}>Promo Code</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Value</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Usage</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount) => (
                            <tr key={discount.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ ...tdStyle, fontWeight: '700', color: '#111', letterSpacing: '1px' }}>{discount.code}</td>
                                <td style={tdStyle}>{discount.type}</td>
                                <td style={tdStyle}>{discount.value}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        backgroundColor: discount.status === 'Active' ? '#e8f8f0' : '#fcedea',
                                        color: discount.status === 'Active' ? '#1db954' : '#e74c3c'
                                    }}>
                                        {discount.status}
                                    </span>
                                </td>
                                <td style={tdStyle}>{discount.usage} times</td>
                                <td style={tdStyle}>
                                    <button style={{ marginRight: '10px', background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '500' }}>Edit</button>
                                    <button style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Delete</button>
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

export default Discounts;
