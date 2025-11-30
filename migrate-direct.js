require('dotenv').config();

console.log('🚀 Starting direct migration...');
console.log('📋 Database:', process.env.DB_NAME);
console.log('🌐 Host:', process.env.DB_HOST);

const { sequelize } = require('./config/db.js');
const { DataTypes } = require('sequelize');

async function runMigration() {
  try {
    console.log('\n1. Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    console.log('2. Creating tables directly...');
    
    // Define and create tables directly
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
      },
      parentId: {
        type: DataTypes.UUID,
        allowNull: true
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
      images: {
        type: DataTypes.JSONB,
        defaultValue: []
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
      tags: {
        type: DataTypes.JSONB,
        defaultValue: []
      },
      animeSeries: {
        type: DataTypes.STRING,
        allowNull: true
      },
      character: {
        type: DataTypes.STRING,
        allowNull: true
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      material: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'Products',
      timestamps: true
    });

    const Cart = sequelize.define('Cart', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'Carts',
      timestamps: true
    });

    // Create all tables
    await Category.sync({ force: false });
    await Product.sync({ force: false });
    await Cart.sync({ force: false });
    
    console.log('✅ All tables created successfully!');
    console.log('📊 Created tables:');
    console.log('   - Categories');
    console.log('   - Products');
    console.log('   - Carts');
    
    console.log('\n🎉 Migration completed!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    process.exit(0);
  }
}

// Run the migration
runMigration();