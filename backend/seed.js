const {
    sequelize,
    User,
    Category,
    Product
} = require('./models');

const seedDatabase = async () => {
    try {
        console.log('Starting database seed...');

        // Sync database (force: true will drop existing tables)
        await sequelize.sync({ force: true });
        console.log('✓ Database tables created');

        // Create admin user
        const admin = await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@southstreet.com',
            password: 'admin@123',
            role: 'admin',
            phone: '+1234567890'
        });
        console.log('✓ Admin user created (email: admin@southstreet.com, password: admin@123)');

        // Create regular user
        const user = await User.create({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'password123',
            role: 'user',
            phone: '+1987654321'
        });
        console.log('✓ Regular user created (email: john@example.com, password: password123)');

        // Create categories individually to ensure hooks run
        const menCategory = await Category.create({ name: 'Men', description: 'Apparel for men' });
        const womenCategory = await Category.create({ name: 'Women', description: 'Apparel for women' });
        const unisexCategory = await Category.create({ name: 'Unisex', description: 'Gender-neutral apparel' });
        const accessoriesCategory = await Category.create({ name: 'Accessories', description: 'Bags, belts, and more' });
        const newArrivalsCategory = await Category.create({ name: 'New Arrivals', description: 'Latest collections' });

        const categories = [menCategory, womenCategory, unisexCategory, accessoriesCategory, newArrivalsCategory];
        console.log('✓ Categories created');

        // Create products
        const products = await Product.bulkCreate([
            {
                name: 'Premium Cotton Hoodie',
                sku: 'SS-HOD-001',
                description: 'Comfortable and stylish cotton hoodie perfect for everyday wear. Features a relaxed fit and premium quality fabric.',
                price: 89.00,
                discountPrice: null,
                categoryId: categories[0].id,
                subCategory: 'Hoodies',
                stock: 124,
                weight: 0.5,
                images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Black', 'White', 'Charcoal'],
                isActive: true
            },
            {
                name: 'Silk Blend Dress',
                sku: 'SS-DRS-001',
                description: 'Elegant silk blend dress with a flattering silhouette. Perfect for evening events or sophisticated gatherings.',
                price: 145.00,
                discountPrice: 129.00,
                categoryId: categories[1].id,
                subCategory: 'Dresses',
                stock: 45,
                weight: 0.3,
                images: ['https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Beige', 'Black', 'Navy'],
                isActive: true
            },
            {
                name: 'Urban Leather Jacket',
                sku: 'SS-JKT-001',
                description: 'Premium leather jacket with modern cuts. Durable, stylish, and comfortable for any occasion.',
                price: 299.00,
                discountPrice: null,
                categoryId: categories[2].id,
                subCategory: 'Jackets',
                stock: 12,
                weight: 1.2,
                images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600'],
                sizes: ['M', 'L', 'XL'],
                colors: ['Black', 'Brown'],
                isActive: true
            },
            {
                name: 'Oversized Tee',
                sku: 'SS-TEE-001',
                description: 'Relaxed fit oversized t-shirt made from premium cotton. Perfect for casual everyday wear.',
                price: 45.00,
                discountPrice: 39.00,
                categoryId: categories[0].id,
                subCategory: 'T-Shirts',
                stock: 200,
                weight: 0.2,
                images: ['https://images.unsplash.com/photo-1521334884326-7543f23af066?w=600'],
                sizes: ['S', 'M', 'L', 'XL', 'XXL'],
                colors: ['White', 'Black', 'Olive'],
                isActive: true
            },
            {
                name: 'Cashmere Sweater',
                sku: 'SS-SWT-001',
                description: 'Luxuriously soft cashmere sweater in a versatile neutral tone. A winter essential.',
                price: 189.00,
                discountPrice: null,
                categoryId: categories[1].id,
                subCategory: 'Sweaters',
                stock: 35,
                weight: 0.4,
                images: ['https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600'],
                sizes: ['XS', 'S', 'M', 'L'],
                colors: ['Beige', 'Charcoal', 'Navy'],
                isActive: true
            },
            {
                name: 'Leather Handbag',
                sku: 'SS-BAG-001',
                description: 'Sophisticated leather handbag with minimalist design. Spacious and elegant.',
                price: 159.00,
                discountPrice: 139.00,
                categoryId: categories[3].id,
                subCategory: 'Bags',
                stock: 28,
                weight: 0.8,
                images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600'],
                sizes: [],
                colors: ['Black', 'Brown', 'Beige'],
                isActive: true
            },
            {
                name: 'Classic Denim Jeans',
                sku: 'SS-JNS-001',
                description: 'Timeless denim jeans with perfect fit. Made from premium denim fabric.',
                price: 79.00,
                discountPrice: null,
                categoryId: categories[2].id,
                subCategory: 'Jeans',
                stock: 85,
                weight: 0.6,
                images: ['https://images.unsplash.com/photo-1542272604-787c3835535d?w=600'],
                sizes: ['28', '30', '32', '34', '36'],
                colors: ['Blue', 'Black'],
                isActive: true
            },
            {
                name: 'Wool Overcoat',
                sku: 'SS-COT-001',
                description: 'Structured wool overcoat with precision tailoring. Maximum comfort and durability.',
                price: 349.00,
                discountPrice: 299.00,
                categoryId: categories[0].id,
                subCategory: 'Coats',
                stock: 18,
                weight: 1.5,
                images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600'],
                sizes: ['M', 'L', 'XL'],
                colors: ['Charcoal', 'Navy', 'Black'],
                isActive: true
            }
        ]);
        console.log('✓ Products created');

        console.log('\n=== Database Seed Complete ===');
        console.log(`✓ ${categories.length} categories created`);
        console.log(`✓ ${products.length} products created`);
        console.log(`✓ 2 users created (1 admin, 1 regular)`);
        console.log('\nAdmin Login:');
        console.log('  Email: admin@southstreet.com');
        console.log('  Password: admin123');
        console.log('\nUser Login:');
        console.log('  Email: john@example.com');
        console.log('  Password: password123');
        console.log('\nBackend API: http://localhost:5000/api');
        console.log('================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
