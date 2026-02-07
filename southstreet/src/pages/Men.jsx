import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Men = () => {
    const { products, fetchProducts } = useContext(ShopContext);

    useEffect(() => {
        fetchProducts();
    }, []);
    const menProducts = products.filter(product => {
        const category = product.category?.name || product.category;
        return typeof category === 'string' && category.toLowerCase() === 'men';
    });

    return (
        <section className="section" id="men">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Men's Collection</h2>
                <p className="section-subtitle">
                    Timeless pieces for the modern man
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {menProducts.map((product) => {
                    const image = product.images && product.images.length > 0
                        ? product.images[0]
                        : 'https://via.placeholder.com/300';

                    return (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            image={image}
                            name={product.name}
                            price={product.price}
                        />
                    );
                })}
            </div>
        </section>
    );
};


export default Men;
