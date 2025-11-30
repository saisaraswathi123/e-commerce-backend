require('dotenv').config();

const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

// Define models for seeding
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'Categories',
  timestamps: true
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  animeSeries: {
    type: DataTypes.STRING,
    allowNull: true
  },
  character: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Products',
  timestamps: true
});

const seedData = async () => {
  try {
    console.log('Starting to seed sample anime data...');

    // Create categories
    const categories = await Category.bulkCreate([
      {
        name: 'Action Figures',
        description: 'Detailed action figures from popular anime series',
        image: '/images/categories/action-figures.jpg'
      },
      {
        name: 'Apparel',
        description: 'Anime-themed clothing and accessories',
        image: '/images/categories/apparel.jpg'
      },
      {
        name: 'Posters',
        description: 'High-quality anime posters and wall scrolls',
        image: '/images/categories/posters.jpg'
      },
      {
        name: 'Collectibles',
        description: 'Rare and exclusive anime collectibles',
        image: '/images/categories/collectibles.jpg'
      }
    ], { ignoreDuplicates: true });

    console.log('✅ Categories created:', categories.length);

    // Create sample products
    const products = await Product.bulkCreate([
      {
        name: 'Naruto Uzumaki Figurine',
        description: 'Highly detailed Naruto Uzumaki action figure with multiple accessories',
        price: 29.99,
        originalPrice: 39.99,
        image: '/images/products/naruto-figurine.jpg',
        categoryId: categories[0].id,
        stock: 50,
        animeSeries: 'Naruto',
        character: 'Naruto Uzumaki'
      },
      {
        name: 'Sasuke Uchiha Figurine',
        description: 'Cool Sasuke Uchiha figure with sharingan eyes',
        price: 32.99,
        originalPrice: 42.99,
        image: '/images/products/sasuke-figurine.jpg',
        categoryId: categories[0].id,
        stock: 35,
        animeSeries: 'Naruto',
        character: 'Sasuke Uchiha'
      },
      {
        name: 'Attack on Titan Survey Corps Jacket',
        description: 'Official Survey Corps jacket from Attack on Titan',
        price: 59.99,
        originalPrice: 79.99,
        image: '/images/products/aot-jacket.jpg',
        categoryId: categories[1].id,
        stock: 25,
        animeSeries: 'Attack on Titan',
        character: 'Survey Corps'
      },
      {
        name: 'My Hero Academia UA Uniform Hoodie',
        description: 'Comfortable hoodie featuring UA High School design',
        price: 45.99,
        originalPrice: 55.99,
        image: '/images/products/mha-hoodie.jpg',
        categoryId: categories[1].id,
        stock: 40,
        animeSeries: 'My Hero Academia',
        character: 'UA Students'
      },
      {
        name: 'Demon Slayer Poster Set',
        description: 'Set of 3 high-quality Demon Slayer character posters',
        price: 19.99,
        originalPrice: 24.99,
        image: '/images/products/demon-slayer-posters.jpg',
        categoryId: categories[2].id,
        stock: 100,
        animeSeries: 'Demon Slayer',
        character: 'Multiple'
      },
      {
        name: 'One Piece Wanted Posters Set',
        description: 'Collection of iconic wanted posters from One Piece',
        price: 22.99,
        image: '/images/products/one-piece-posters.jpg',
        categoryId: categories[2].id,
        stock: 75,
        animeSeries: 'One Piece',
        character: 'Straw Hat Pirates'
      },
      {
        name: 'Dragon Ball Z Senzu Beans',
        description: 'Replica Senzu Beans from Dragon Ball Z',
        price: 14.99,
        originalPrice: 19.99,
        image: '/images/products/senzu-beans.jpg',
        categoryId: categories[3].id,
        stock: 200,
        animeSeries: 'Dragon Ball Z',
        character: 'Korin'
      },
      {
        name: 'Death Note Notebook Replica',
        description: 'High-quality replica of the Death Note notebook',
        price: 24.99,
        originalPrice: 29.99,
        image: '/images/products/death-note.jpg',
        categoryId: categories[3].id,
        stock: 60,
        animeSeries: 'Death Note',
        character: 'Ryuk'
      }
    ], { ignoreDuplicates: true });

    console.log('✅ Products created:', products.length);
    console.log('🎉 Sample data seeded successfully!');

    // Show summary
    console.log('\n📊 Seeding Summary:');
    console.log('   - Categories: 4');
    console.log('   - Products: 8');
    console.log('\n🎮 Anime Series Included:');
    console.log('   - Naruto');
    console.log('   - Attack on Titan');
    console.log('   - My Hero Academia');
    console.log('   - Demon Slayer');
    console.log('   - One Piece');
    console.log('   - Dragon Ball Z');
    console.log('   - Death Note');

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
  } finally {
    process.exit(0);
  }
};

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;