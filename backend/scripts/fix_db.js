const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function fixDatabase() {
    console.log('Starting database fix...');

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        console.log('Connected to database.');

        // Get all indexes for categories table
        const [rows] = await connection.execute("SHOW INDEX FROM categories");

        // Filter for duplicates of 'name' and 'slug'
        // Indexes are usually named 'name', 'name_2', 'name_3', etc.
        const indexesToDrop = rows
            .filter(row => row.Key_name !== 'PRIMARY' && (row.Key_name.startsWith('name') || row.Key_name.startsWith('slug')))
            .map(row => row.Key_name);

        // Deduplicate key names
        const uniqueIndexes = [...new Set(indexesToDrop)];

        console.log(`Found ${uniqueIndexes.length} indexes to potential cleanup.`);

        // Drop all of them except one? Or just drop all and let Sequelize recreate the correct one?
        // Safest is to drop all duplicate looking ones.
        // Actually, if we drop ALL of them, Sequelize will recreate the necessary ones on restart.

        for (const indexName of uniqueIndexes) {
            console.log(`Dropping index: ${indexName}`);
            await connection.execute(`DROP INDEX \`${indexName}\` ON categories`);
        }

        console.log('All conflicting indexes dropped. Sequelize will recreate necessary ones on next start.');
        await connection.end();

    } catch (error) {
        console.error('Error fixing database:', error);
    }
}

fixDatabase();
