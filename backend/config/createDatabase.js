const { Client } = require('pg');

// PostgreSQL connection
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'admin',
  port: 5432,
});

// Function to create db
async function createDatabase() {
  try {
    await client.connect();

    await client.query('CREATE DATABASE invent');

    console.log('Created database "invent"');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

createDatabase();