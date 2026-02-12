const { query, closePool } = require('../config/database');

async function addProfileImageColumn() {
  try {
    console.log('🚀 Adding profile_image column to users table...');

    await query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS profile_image TEXT
    `);

    console.log('✅ Successfully added profile_image column');
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('ℹ️  Column already exists');
    } else {
      console.error('❌ Error adding column:', error);
    }
  } finally {
    await closePool();
  }
}

addProfileImageColumn();
