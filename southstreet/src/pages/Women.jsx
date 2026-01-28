import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Women = () => {
    const { products } = useContext(ShopContext);
    const womenProducts = products.filter(product => product.category === 'women');

    return (
        <section className="section" id="women">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Women's Collection</h2>
                <p className="section-subtitle">
                    Elegant essentials for her
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {womenProducts.map((product) => (
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

export default Women;
