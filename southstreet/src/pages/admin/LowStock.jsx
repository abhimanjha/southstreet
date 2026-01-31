import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    AlertTriangle,
    Package,
    Plus,
    Minus,
    RefreshCw,
    Search
} from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const LowStock = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: 'Premium Cotton Hoodie', category: 'Men', stock: 8, threshold: 20, price: 89.00, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100' },
        { id: 2, name: 'Urban Leather Jacket', category: 'Unisex', stock: 12, threshold: 25, price: 299.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100' },
        { id: 3, name: 'Silk Blend Dress', category: 'Women', stock: 4, threshold: 15, price: 145.00, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=100' },
        { id: 4, name: 'Minimalist Tote Bag', category: 'Accessories', stock: 15, threshold: 30, price: 120.00, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100' },
    ]);

    const handleRestock = (id, amount) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, stock: p.stock + amount } : p
        ));
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '20px', fontSize: '0.9rem' }}
            >
                <ChevronLeft size={18} /> Back to Dashboard
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '15px' }}>
                        Low Stock Alert <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '0.8rem', padding: '4px 12px', borderRadius: '50px' }}>{products.length} Items</span>
                    </h1>
                    <p style={{ color: '#888', marginTop: '8px' }}>Products below the minimum stock threshold are listed here.</p>
                </div>
                <button style={{
                    padding: '12px 24px',
                    backgroundColor: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <RefreshCw size={18} /> Order from Suppliers
                </button>
            </div>

            <div style={{ marginBottom: '25px', position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px 15px 15px 45px',
                        borderRadius: '12px',
                        border: '1px solid #eee',
                        fontSize: '0.95rem',
                        outline: 'none',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#111'}
                    onBlur={(e) => e.target.style.borderColor = '#eee'}
                />
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}>
                            <th style={thStyle}>Product</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Stock Status</th>
                            <th style={thStyle}>Threshold</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Quick Restock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #f9f9f9', transition: 'all 0.2s' }}>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <div style={{ fontWeight: '600', color: '#111' }}>{product.name}</div>
                                    </div>
                                </td>
                                <td style={tdStyle}>{product.category}</td>
                                <td style={tdStyle}>{formatCurrency(product.price)}</td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <span style={{
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            color: product.stock < 10 ? '#ef4444' : '#f59e0b'
                                        }}>
                                            {product.stock} units left
                                        </span>
                                        <div style={{ width: '120px', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', position: 'relative' }}>
                                            <div style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                height: '100%',
                                                backgroundColor: product.stock < 10 ? '#ef4444' : '#f59e0b',
                                                width: `${(product.stock / product.threshold) * 100}%`,
                                                borderRadius: '3px'
                                            }}></div>
                                        </div>
                                    </div>
                                </td>
                                <td style={tdStyle}>{product.threshold} units</td>
                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ display: 'flex', border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden' }}>
                                            <button
                                                onClick={() => handleRestock(product.id, 10)}
                                                style={restockBtnStyle}
                                            >+10</button>
                                            <button
                                                onClick={() => handleRestock(product.id, 50)}
                                                style={restockBtnStyle}
                                            >+50</button>
                                        </div>
                                    </div>
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
    padding: '18px 25px',
    color: '#888',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.8px'
};

const tdStyle = {
    padding: '20px 25px',
    fontSize: '0.9rem',
    color: '#333'
};

const restockBtnStyle = {
    padding: '8px 12px',
    border: 'none',
    backgroundColor: '#fff',
    color: '#111',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    borderLeft: '1px solid #eee',
    transition: 'all 0.2s',
};

export default LowStock;
