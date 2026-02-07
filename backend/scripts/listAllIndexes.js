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

async function listAllIndexes() {
    try {
        await sequelize.authenticate();
        const [results] = await sequelize.query("SHOW INDEX FROM users");
        console.log('Index Names:');
        const indexNames = [...new Set(results.map(index => index.Key_name))];
        indexNames.forEach(name => console.log(name));
        console.log(`\nTotal unique index names: ${indexNames.length}`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
}

listAllIndexes();
