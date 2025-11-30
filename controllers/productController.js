const db = require('../models/index.js');
const { Op } = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      where: { isActive: true },
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name', 'image']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await db.Product.findOne({
      where: { id, isActive: true },
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name', 'image']
      }]
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: { product }
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message
    });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const products = await db.Product.findAll({
      where: { 
        categoryId: id
      },
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name', 'image']
      }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message
    });
  }
};
exports.getProductsByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const products = await db.Product.findAll({
      where: { 
        categoryId: id
      },
      include: [{
        model: db.Category,
        as: 'category',
        attributes: ['id', 'name', 'image']
      }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: { products }
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products by category",
      error: error.message
    });
  }
};