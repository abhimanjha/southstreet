export default function ProductCard({ image, name, price }) {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={image} alt={name} className="product-image" />

                <div className="product-overlay">
                    <div className="size-selector">
                        <button className="size-option">XS</button>
                        <button className="size-option">S</button>
                        <button className="size-option">M</button>
                        <button className="size-option">L</button>
                        <button className="size-option">XL</button>
                    </div>
                    <button className="quick-add-btn">Quick Add</button>
                </div>
            </div>

            <div className="product-info">
                <h3 className="product-name">{name}</h3>
                <p className="product-price">${price}</p>
            </div>
        </div>
    );
}
