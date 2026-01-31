import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProducts = () => {
    const navigate = useNavigate();
    // Mock Data
    const [products, setProducts] = useState([
        { id: 1, name: 'Premium Cotton Hoodie', price: 89.00, category: 'Men', stock: 124, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' },
        { id: 2, name: 'Silk Blend Dress', price: 145.00, category: 'Women', stock: 45, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' },
        { id: 3, name: 'Urban Leather Jacket', price: 299.00, category: 'Unisex', stock: 12, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
        { id: 4, name: 'Oversized Tee', price: 45.00, category: 'Men', stock: 200, image: 'https://images.unsplash.com/photo-1521334884326-7543f23af066?w=100' },
    ]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Products</h1>
                    <p style={{ color: '#666' }}>Manage your inventory and catalog.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/add')}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    <span>+</span> Add Product
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Product Name</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Stock</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background-color 0.2s' }}>
                                <td style={{ padding: '15px 10px' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                </td>
                                <td style={{ ...tdStyle, fontWeight: '500' }}>{product.name}</td>
                                <td style={tdStyle}>{product.category}</td>
                                <td style={tdStyle}>${product.price.toFixed(2)}</td>
                                <td style={tdStyle}>
                                    <span style={{
                                        color: product.stock < 20 ? '#e74c3c' : '#2ecc71',
                                        fontWeight: '500'
                                    }}>
                                        {product.stock} {product.stock < 20 ? '(Low)' : ''}
                                    </span>
                                </td>
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

export default AdminProducts;
