import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Men = () => {
    const { products } = useContext(ShopContext);
    const menProducts = products.filter(product => product.category === 'men');

    return (
        <section className="section" id="men">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Men's Collection</h2>
                <p className="section-subtitle">
                    Timeless pieces for the modern man
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {menProducts.map((product) => (
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


export default Men;
