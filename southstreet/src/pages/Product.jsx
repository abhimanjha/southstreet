import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { formatCurrency } from '../utils/format';
import { getImageUrl } from '../utils/imageUrl';

const Product = () => {
    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const [product, setProduct] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const foundProduct = products.find((item) => item.id === productId);
        if (foundProduct) {
            setProduct(foundProduct);
            // Handle images array from backend
            const firstImage = foundProduct.images && foundProduct.images.length > 0
                ? foundProduct.images[0]
                : 'https://via.placeholder.com/500';
            setImage(firstImage);
            // Simple logic for related products: items with same category, excluding current
            const related = products.filter(
                (item) => item.category?.id === foundProduct.category?.id && item.id !== foundProduct.id
            ).slice(0, 4);
            setRelatedProducts(related);
        }
    }, [productId, products]);

    // Cleanup or reset state when productId changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [productId]);

    if (!product) {
        return <div className="section" style={{ paddingTop: '150px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div className="product-page section" style={{ paddingTop: '140px' }}>
            <div className="product-container" style={{ display: 'flex', gap: '50px', maxWidth: '1200px', margin: '0 auto', padding: '0 20px', flexWrap: 'wrap' }}>

                {/* Image Section */}
                <div className="product-images" style={{ flex: 1, display: 'flex', gap: '20px', flexDirection: 'column-reverse' }}>
                    <div className="thumbnail-list" style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
                        {product.images && product.images.map((img, index) => (
                            <img
                                key={index}
                                src={getImageUrl(img)}
                                onClick={() => setImage(img)}
                                alt={`Thumbnail ${index}`}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                    cursor: 'pointer',
                                    border: image === img ? '2px solid black' : '1px solid #eee'
                                }}
                            />
                        ))}
                    </div>
                    <div className="main-image-container" style={{ width: '100%' }}>
                        <img src={getImageUrl(image)} alt={product.name} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
                    </div>
                </div>

                {/* Details Section */}
                <div className="product-details" style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px' }}>{formatCurrency(product.price)}</p>
                    <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>{product.description}</p>

                    <div className="size-selector" style={{ marginBottom: '30px' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Select Size</p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setSize(s)}
                                    style={{
                                        width: '45px',
                                        height: '45px',
                                        border: size === s ? '2px solid black' : '1px solid #ddd',
                                        backgroundColor: size === s ? 'black' : 'white',
                                        color: size === s ? 'white' : 'black',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            if (!size) {
                                alert('Please select a size');
                                return;
                            }
                            addToCart(product.id, 1, size);
                        }}
                        className="btn-primary"
                        style={{
                            backgroundColor: 'black',
                            color: 'white',
                            width: '100%',
                            padding: '15px',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Add to Cart
                    </button>

                    <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>100% Original product.</p>
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>Cash on delivery is available on this product.</p>
                        <p style={{ fontSize: '0.9rem', color: '#777' }}>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="related-products section" style={{ marginTop: '80px' }}>
                <div className="section-header">
                    <h2 className="section-title">Explore More</h2>
                    <p className="section-subtitle">You might also like</p>
                </div>
                <div className="product-grid">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((item) => {
                            const image = item.images && item.images.length > 0
                                ? item.images[0]
                                : 'https://via.placeholder.com/300';

                            return (
                                <ProductCard
                                    key={item.id}
                                    id={item.id}
                                    image={image}
                                    name={item.name}
                                    price={item.price}
                                />
                            );
                        })
                    ) : (
                        <p style={{ textAlign: 'center' }}>No related products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
