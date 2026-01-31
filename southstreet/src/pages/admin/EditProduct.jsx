import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        price: '',
        discountPrice: '',
        category: 'Men',
        subCategory: '',
        stock: '',
        weight: '',
        images: [''],
        sizes: [],
        colors: []
    });

    // Mock Fetching Product Data
    useEffect(() => {
        // In a real app, you would fetch by ID: const data = await fetchProduct(id);
        const mockProducts = [
            { id: 1, name: 'Premium Cotton Hoodie', price: 89.00, discountPrice: 79.00, sku: 'SS-HOD-001', category: 'Men', subCategory: 'Hoodies', stock: 124, description: 'Premium heavyweight cotton hoodie with a relaxed fit.', sizes: ['S', 'M', 'L'], colors: ['Black', 'Charcoal'], images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500'] },
            { id: 2, name: 'Silk Blend Dress', price: 145.00, discountPrice: '', sku: 'SS-DRS-002', category: 'Women', subCategory: 'Dresses', stock: 45, description: 'Elegant silk blend dress for semi-formal occasions.', sizes: ['XS', 'S', 'M'], colors: ['White', 'Beige'], images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500'] },
        ];

        const product = mockProducts.find(p => p.id === parseInt(id)) || mockProducts[0];
        setFormData({
            ...product,
            price: product.price.toString(),
            discountPrice: product.discountPrice ? product.discountPrice.toString() : '',
            stock: product.stock.toString()
        });
    }, [id]);

    const categories = ['Men', 'Women', 'Unisex', 'Accessories', 'New Arrivals'];
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = ['Black', 'White', 'Charcoal', 'Beige', 'Navy', 'Olive'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayToggle = (list, item, field) => {
        const newList = list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item];
        setFormData({ ...formData, [field]: newList });
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated Product Data:', formData);
        alert('Product Updated Successfully (Mock)');
        navigate('/admin/products');
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <button
                        onClick={() => navigate('/admin/products')}
                        style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}
                    >
                        &larr; Back to Products
                    </button>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem' }}>Edit Product</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}
                >
                    Save Changes
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Basic Information */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Basic Information</h2>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Media (Images)</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {formData.images.map((url, index) => (
                                <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        style={inputStyle}
                                        placeholder="Image URL"
                                    />
                                    {url && (
                                        <img src={url} alt="Preview" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addImageField}
                                style={{ alignSelf: 'flex-start', background: 'none', border: '1px dashed #ccc', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', color: '#666' }}
                            >
                                + Add Another Image
                            </button>
                        </div>
                    </div>

                    {/* Inventory & Pricing */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Inventory & Pricing</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Price (INR)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Discount Price (INR)</label>
                                <input
                                    type="number"
                                    name="discountPrice"
                                    value={formData.discountPrice}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Stock Quantity</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Organization */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Organization</h2>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                style={inputStyle}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Sub-category</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Attributes */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Attributes</h2>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={labelStyle}>Available Sizes</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => handleArrayToggle(formData.sizes, size, 'sizes')}
                                        style={{
                                            padding: '8px 12px',
                                            border: '1px solid #eee',
                                            borderRadius: '4px',
                                            backgroundColor: formData.sizes.includes(size) ? '#111' : '#fff',
                                            color: formData.sizes.includes(size) ? '#fff' : '#111',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={labelStyle}>Available Colors</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                {availableColors.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleArrayToggle(formData.colors, color, 'colors')}
                                        style={{
                                            padding: '8px 12px',
                                            border: '1px solid #eee',
                                            borderRadius: '4px',
                                            backgroundColor: formData.colors.includes(color) ? '#111' : '#fff',
                                            color: formData.colors.includes(color) ? '#fff' : '#111',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    border: '1px solid #eee',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
};

const sectionTitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '20px',
    borderBottom: '1px solid #f4f4f4',
    paddingBottom: '10px'
};

const inputGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '15px'
};

const labelStyle = {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#333'
};

const inputStyle = {
    padding: '12px',
    border: '1px solid #eee',
    borderRadius: '4px',
    fontSize: '0.95rem',
    backgroundColor: '#fafafa',
    outline: 'none',
    width: '100%'
};

export default EditProduct;
