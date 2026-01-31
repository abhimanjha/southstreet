import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const NewArrivals = () => {
    const { products } = useContext(ShopContext);
    // For now, let's take the last 4 products as New Arrivals
    const newArrivals = products.slice(-4);

    return (
        <section className="section" id="new-arrivals">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">New Arrivals</h2>
                <p className="section-subtitle">
                    Discover our latest pieces and trending styles
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {newArrivals.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </section>
    );
};

export default NewArrivals;
