const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'southstreet_db',
};

async function fixIndexes() {
    let connection;
    try {
        console.log('Connecting to database...');
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected.');

        const tableName = 'users'; // The table giving error

        // 1. List existing indexes
        const [rows] = await connection.execute(`SHOW INDEX FROM ${tableName}`);
        console.log(`Found ${rows.length} indexes on table '${tableName}'`);

        // Group indexes by key_name
        const indexes = {};
        rows.forEach(row => {
            if (!indexes[row.Key_name]) {
                indexes[row.Key_name] = [];
            }
            indexes[row.Key_name].push(row.Column_name);
        });

        // 2. Identify redundant indexes
        // We want to keep PRIMARY and maybe one unique index on email
        // Sequelize often creates email_2, email_3, etc. or users_email_unique...

        const activeIndexes = Object.keys(indexes);
        console.log('Index names:', activeIndexes);

        // Filter for email related indexes that are not useful or duplicates
        const emailIndexes = activeIndexes.filter(name =>
            (name.includes('email') || name.includes('unique')) && name !== 'PRIMARY'
        );

        console.log('Potential redundant indexes:', emailIndexes);

        // Drop all email-related indexes except one (if we want to be safe, we can drop all and let sequelize recreate the correct one)
        // Since sequelize sync is failing because it tries to ADD one, it implies we might have too many already.
        // It's safer to drop ALL email unique indexes and let Sequelize create the one it needs.

        for (const indexName of emailIndexes) {
            console.log(`Dropping index: ${indexName}`);
            try {
                await connection.execute(`DROP INDEX \`${indexName}\` ON ${tableName}`);
                console.log(`✓ Dropped ${indexName}`);
            } catch (err) {
                console.error(`✗ Failed to drop ${indexName}:`, err.message);
            }
        }

        // Also check redundant indexes on other columns if any, but error specifically mentioned keys limit (max 64)
        // If there are many other random indexes, we might need to be more aggressive.

        // Let's also check if 'deliveryOTP' exists in 'orders' table, just in case
        try {
            const [columns] = await connection.execute(`SHOW COLUMNS FROM orders LIKE 'deliveryOTP'`);
            if (columns.length === 0) {
                console.log('deliveryOTP column missing in orders. Adding it manually...');
                await connection.execute(`ALTER TABLE orders ADD COLUMN deliveryOTP VARCHAR(6) NULL`);
                console.log('✓ Added deliveryOTP column');
            } else {
                console.log('✓ deliveryOTP column already exists');
            }
        } catch (err) {
            console.error('Error checking/adding deliveryOTP:', err.message);
        }

    } catch (error) {
        console.error('Database Error:', error);
    } finally {
        if (connection) await connection.end();
    }
}

fixIndexes();
