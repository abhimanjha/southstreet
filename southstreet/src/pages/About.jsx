const About = () => {
    return (
        <div className="about-page">
            <section className="brand-story" style={{ paddingTop: '120px' }}>
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                    alt="Brand Story"
                    className="brand-image"
                />
                <div className="brand-content animate-on-scroll visible">
                    <h2 className="brand-title">
                        Crafted for the Modern Connoisseur
                    </h2>
                    <p className="brand-text">
                        SouthStreet represents the intersection of timeless design and
                        contemporary innovation. Each piece in our collection is
                        meticulously crafted to embody the essence of refined luxury.
                    </p>
                    <p className="brand-text">
                        We believe in creating fashion that transcends trends, focusing
                        on quality, sustainability, and the art of understated elegance.
                    </p>
                    <p className="brand-text">
                        Founded in 2024, our mission has been simple: to provide high-quality
                        garments that look as good as they feel.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default About;
