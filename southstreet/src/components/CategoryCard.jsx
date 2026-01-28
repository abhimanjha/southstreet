export default function CategoryCard({ image, name }) {
    return (
        <div className="category-card">
            <img src={image} alt={name} className="category-image" />

            <div className="category-overlay">
                <h3 className="category-name">{name}</h3>
                <button className="category-cta">Explore</button>
            </div>
        </div>
    );
}
