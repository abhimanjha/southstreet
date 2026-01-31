import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Sale = () => {
    const { products } = useContext(ShopContext);
    // For now, let's take a few products for the Sale section
    const saleProducts = products.filter(p => p.id % 2 === 0);

    return (
        <section className="section" id="sale">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Exclusive Sale</h2>
                <p className="section-subtitle">
                    Premium style at exceptional value
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {saleProducts.map((product) => (
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

export default Sale;
