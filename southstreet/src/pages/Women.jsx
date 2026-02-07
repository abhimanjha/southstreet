import { useContext, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { ShopContext } from "../context/ShopContext";

const Women = () => {
    const { products, fetchProducts } = useContext(ShopContext);

    useEffect(() => {
        fetchProducts();
    }, []);
    const womenProducts = products.filter(product => {
        const category = product.category?.name || product.category;
        return typeof category === 'string' && category.toLowerCase() === 'women';
    });

    return (
        <section className="section" id="women">
            <div className="section-header animate-on-scroll visible">
                <h2 className="section-title">Women's Collection</h2>
                <p className="section-subtitle">
                    Elegant essentials for her
                </p>
            </div>
            <div className="product-grid animate-on-scroll visible">
                {womenProducts.map((product) => {
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

export default Women;
