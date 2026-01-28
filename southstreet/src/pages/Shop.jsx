import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Shop = () => {
    const { products } = useContext(ShopContext);

    return (
        <section className="section" id="shop">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Shop All</h2>
                <p className="section-subtitle">
                    Explore our complete collection of premium essentials
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {products.map((product) => (
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

export default Shop;
