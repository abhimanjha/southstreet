import { useState } from 'react';

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Men', description: 'Apparel for men', productCount: 45 },
        { id: 2, name: 'Women', description: 'Apparel for women', productCount: 32 },
        { id: 3, name: 'Unisex', description: 'Gender-neutral apparel', productCount: 18 },
        { id: 4, name: 'Accessories', description: 'Bags, belts, and more', productCount: 12 },
        { id: 5, name: 'New Arrivals', description: 'Latest collections', productCount: 8 },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    const handleAddCategory = () => {
        if (newCategory.name && newCategory.description) {
            setCategories([...categories, { ...newCategory, id: Date.now(), productCount: 0 }]);
            setNewCategory({ name: '', description: '' });
            setShowModal(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', marginBottom: '10px' }}>Categories</h1>
                    <p style={{ color: '#666' }}>Organize your products into logical collections.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
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
                    <span>+</span> Add Category
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #eee' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f4f4f4' }}>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Description</th>
                            <th style={thStyle}>Products</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ ...tdStyle, fontWeight: '600' }}>{cat.name}</td>
                                <td style={tdStyle}>{cat.description}</td>
                                <td style={tdStyle}>{cat.productCount} Items</td>
                                <td style={tdStyle}>
                                    <button style={{ marginRight: '10px', background: 'none', border: 'none', color: '#111', cursor: 'pointer', fontWeight: '500' }}>Edit</button>
                                    <button style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '20px' }}>Add New Category</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={labelStyle}>Category Name</label>
                                <input
                                    style={inputStyle}
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    placeholder="e.g. Winter Wear"
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Description</label>
                                <textarea
                                    style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                                    value={newCategory.description}
                                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                    placeholder="Briefly describe the category..."
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '30px', justifyContent: 'flex-end' }}>
                            <button onClick={() => setShowModal(false)} style={{ padding: '10px 20px', border: '1px solid #eee', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                            <button onClick={handleAddCategory} style={{ padding: '10px 24px', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Create Category</button>
                        </div>
                    </div>
                </div>
            )}
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

const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#111'
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '4px',
    fontSize: '0.95rem',
    backgroundColor: '#fafafa'
};

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
};

export default Categories;
