require('dotenv').config();

const { sequelize } = require('./config/db.js');
const { DataTypes } = require('sequelize');

// Define models
const Category = sequelize.define('Category', {
  // ... same as before
}, { tableName: 'Categories', timestamps: true });

const Product = sequelize.define('Product', {
  // ... same as before  
}, { tableName: 'Products', timestamps: true });

// Define association
Product.belongsTo(Category, { foreignKey: 'categoryId' });

async function checkData() {
  try {
    console.log('🔍 Checking seeded data...\n');
    
    // Count categories
    const categoryCount = await Category.count();
    console.log(`📁 Total Categories: ${categoryCount}`);
    
    // Count products
    const productCount = await Product.count();
    console.log(`📦 Total Products: ${productCount}\n`);
    
    // List categories with product counts
    const categories = await Category.findAll({
      include: [{
        model: Product,
        attributes: []
      }],
      attributes: [
        'id', 'name',
        [sequelize.fn('COUNT', sequelize.col('Products.id')), 'productCount']
      ],
      group: ['Category.id', 'Category.name'],
      raw: true
    });
    
    console.log('📊 Categories with product counts:');
    categories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat.productCount} products`);
    });
    
    // Show some sample products
    console.log('\n🎯 Sample Products:');
    const sampleProducts = await Product.findAll({
      include: [Category],
      limit: 3
    });
    
    sampleProducts.forEach(product => {
      console.log(`   - ${product.name} (${product.Category.name}) - $${product.price}`);
    });
    
    console.log('\n✅ Data verification completed!');
    
  } catch (error) {
    console.error('❌ Error checking data:', error.message);
  } finally {
    process.exit(0);
  }
}

checkData();