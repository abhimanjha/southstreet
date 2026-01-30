import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ image, name, price, id }) {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <Link to={`/product/${id}`}>
                    <img src={image} alt={name} className="product-image" />
                </Link>

                <div className="product-overlay">
                    <div className="size-selector">
                        <button className="size-option">XS</button>
                        <button className="size-option">S</button>
                        <button className="size-option">M</button>
                        <button className="size-option">L</button>
                        <button className="size-option">XL</button>
                    </div>
                    <button className="quick-add-btn" onClick={() => addToCart(id)}>Quick Add</button>
                </div>
            </div>

            <div className="product-info">
                <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className="product-name">{name}</h3>
                </Link>
                <p className="product-price">${price}</p>
            </div>
        </div>
    );
}


