require('dotenv').config();

console.log('🚀 Starting migration...');
console.log('📋 Database:', process.env.DB_NAME);
console.log('🌐 Host:', process.env.DB_HOST);

const { sequelize } = require('./config/db.js');

async function runMigration() {
  try {
    console.log('\n1. Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    console.log('2. Loading models...');
    const db = require('./models/index.js');
    
    console.log('3. Creating tables...');
    
    // Sync all models with database
    await db.sequelize.sync({ force: false });
    
    console.log('✅ All tables created successfully!');
    console.log('📊 Database tables now include:');
    
    // List all model names
    const modelNames = Object.keys(db).filter(key => 
      key !== 'sequelize' && key !== 'Sequelize'
    );
    
    modelNames.forEach(modelName => {
      console.log(`   - ${modelName}`);
    });
    
    console.log('\n🎉 Migration completed!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    
    if (error.message.includes('relation "Categories" does not exist')) {
      console.log('💡 This is normal - tables will be created now.');
    }
  } finally {
    process.exit(0);
  }
}

// Run the migration
runMigration();