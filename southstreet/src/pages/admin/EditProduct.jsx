import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI, categoriesAPI } from '../../services/api';
import { Upload, X } from 'lucide-react';

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        description: '',
        price: '',
        discountPrice: '',
        categoryId: '',
        subCategory: '',
        stock: '',
        weight: '',
        sizes: [],
        colors: [],
        isActive: true
    });

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const availableColors = ['Black', 'White', 'Charcoal', 'Beige', 'Navy', 'Olive', 'Brown', 'Grey'];

    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            const cats = response.data.data.categories || [];
            setCategories(cats);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await productsAPI.getById(id);
            const product = response.data.data.product;
            setFormData({
                name: product.name,
                sku: product.sku,
                description: product.description,
                price: product.price,
                discountPrice: product.discountPrice || '',
                categoryId: product.categoryId,
                subCategory: product.subCategory || '',
                stock: product.stock,
                weight: product.weight || '',
                sizes: product.sizes || [],
                colors: product.colors || [],
                isActive: product.isActive
            });
            setExistingImages(product.images || []);
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Failed to load product');
            navigate('/admin/products');
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleArrayToggle = (list, item, field) => {
        const newList = list.includes(item)
            ? list.filter(i => i !== item)
            : [...list, item];
        setFormData({ ...formData, [field]: newList });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files]);
    };

    const removeImageFile = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            formDataToSend.append('name', formData.name);
            formDataToSend.append('sku', formData.sku);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price);
            if (formData.discountPrice) formDataToSend.append('discountPrice', formData.discountPrice);
            formDataToSend.append('categoryId', formData.categoryId);
            if (formData.subCategory) formDataToSend.append('subCategory', formData.subCategory);
            formDataToSend.append('stock', formData.stock);
            if (formData.weight) formDataToSend.append('weight', formData.weight);
            formDataToSend.append('sizes', JSON.stringify(formData.sizes));
            formDataToSend.append('colors', JSON.stringify(formData.colors));
            formDataToSend.append('isActive', formData.isActive);

            existingImages.forEach(img => formDataToSend.append('images', img));

            imageFiles.forEach((file) => {
                formDataToSend.append('images', file);
            });

            await productsAPI.update(id, formDataToSend);
            alert('Product updated successfully');
            navigate('/admin/products');
        } catch (error) {
            console.error('Error saving product:', error);
            const errorMessage = error.response?.data?.errors
                ? error.response.data.errors.map(e => e.msg).join('\n')
                : (error.response?.data?.message || 'Failed to save product');
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const cardStyle = {
        backgroundColor: '#fff',
        padding: '24px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    };

    const sectionTitleStyle = {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '20px'
    };

    const inputGroupStyle = {
        marginBottom: '20px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '500',
        fontSize: '0.95rem'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '1rem'
    };

    if (!formData.name && !loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <button
                        onClick={() => navigate('/admin/products')}
                        style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}
                    >
                        ← Back to Products
                    </button>
                    <h1 style={{ fontSize: '2rem', fontWeight: '600' }}>Edit Product</h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: loading ? '#ccc' : '#111',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Saving...' : 'Update Product'}
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Basic Information */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Basic Information</h2>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Product Name *</label>
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
                            <label style={labelStyle}>SKU *</label>
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
                            <label style={labelStyle}>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
                                required
                            />
                        </div>
                    </div>

                    {/* Media */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Product Images</h2>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                padding: '40px',
                                border: '2px dashed #d1d5db',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                backgroundColor: '#f9fafb'
                            }}>
                                <Upload size={24} />
                                <span>Click to upload new images</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            {/* Existing Images */}
                            {existingImages.map((url, index) => (
                                <div key={`existing-${index}`} style={{ position: 'relative' }}>
                                    <img
                                        src={url.startsWith('http') ? url : `http://localhost:5000${url}`}
                                        alt={`Existing ${index + 1}`}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '28px',
                                            height: '28px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        }}
                                        title="Remove image"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}

                            {/* New Files */}
                            {imageFiles.map((file, index) => (
                                <div key={`new-${index}`} style={{ position: 'relative' }}>
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #4CAF50' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImageFile(index)}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '28px',
                                            height: '28px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Pricing</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={inputGroupStyle}>
                                <label style={labelStyle}>Price (INR) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    style={inputStyle}
                                    step="0.01"
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
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    {/* Organization */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Organization</h2>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Category *</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Sub Category</label>
                            <input
                                type="text"
                                name="subCategory"
                                value={formData.subCategory}
                                onChange={handleInputChange}
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Inventory */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Inventory</h2>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={inputGroupStyle}>
                            <label style={labelStyle}>Weight (kg)</label>
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleInputChange}
                                style={inputStyle}
                                step="0.1"
                            />
                        </div>
                    </div>

                    {/* Variants */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Sizes</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {availableSizes.map(size => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleArrayToggle(formData.sizes, size, 'sizes')}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: formData.sizes.includes(size) ? '#111' : '#fff',
                                        color: formData.sizes.includes(size) ? '#fff' : '#111',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Colors</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {availableColors.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => handleArrayToggle(formData.colors, color, 'colors')}
                                    style={{
                                        padding: '8px 16px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        backgroundColor: formData.colors.includes(color) ? '#111' : '#fff',
                                        color: formData.colors.includes(color) ? '#fff' : '#111',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div style={cardStyle}>
                        <h2 style={sectionTitleStyle}>Status</h2>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={formData.isActive}
                                onChange={handleInputChange}
                            />
                            <span>Active (visible in store)</span>
                        </label>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
