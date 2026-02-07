const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'southstreet_db',
    'root',
    '26062005@24122005',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

async function listIndexes() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const [results] = await sequelize.query("SHOW INDEX FROM users");
        console.log('Indexes on users table:');
        results.forEach(index => {
            console.log(`- Key_name: ${index.Key_name}, Column_name: ${index.Column_name}, Non_unique: ${index.Non_unique}`);
        });

        const [[{ count }]] = await sequelize.query("SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.STATISTICS WHERE TABLE_SCHEMA = 'southstreet_db' AND TABLE_NAME = 'users'");
        console.log(`\nTotal indexes: ${count}`);

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

listIndexes();
