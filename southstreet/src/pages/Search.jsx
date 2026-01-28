import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";

const Search = () => {
    const { products, searchQuery, setSearchQuery } = useContext(ShopContext);
    const location = useLocation();

    // If we navigated here, we might want to ensure the query is preserved or handled.
    // For now we rely on the global context state.

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <section className="section" id="search" style={{ paddingTop: '120px', minHeight: "80vh" }}>
            <div className="section-header">
                <h2 className="section-title">Search Results</h2>
                <div style={{ maxWidth: '500px', margin: '20px auto' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for products..."
                        style={{
                            width: '100%',
                            padding: '15px',
                            border: '1px solid #000',
                            fontSize: '1rem',
                            textAlign: 'center'
                        }}
                    />
                </div>
                <p className="section-subtitle">
                    {filteredProducts.length} results found for "{searchQuery}"
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="product-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            id={product.id}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <p>No products found fitting your description.</p>
                </div>
            )}
        </section>
    );
};

export default Search;
