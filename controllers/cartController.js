const db = require('../models');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    // For now, using a temporary user ID - you'll replace this with actual authentication
    const userId = req.query.userId || "temp-user-123";
    
    const cartItems = await db.Cart.findAll({
      where: { userId },
      include: [{
        model: db.Product,
        attributes: ['id', 'name', 'price', 'description']
      }]
    });

    const totalAmount = cartItems.reduce((total, item) => {
      return total + (item.quantity * parseFloat(item.Product.price));
    }, 0);

    res.json({
      success: true,
      data: {
        cartItems,
        totalAmount,
        totalItems: cartItems.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching cart',
      error: error.message
    });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.body.userId || "temp-user-123"; // Temporary user ID

    // Check if product exists
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if item already in cart
    const existingCartItem = await db.Cart.findOne({
      where: { userId, productId }
    });

    let cartItem;
    if (existingCartItem) {
      // Update quantity if already in cart
      cartItem = await existingCartItem.update({
        quantity: existingCartItem.quantity + quantity
      });
    } else {
      // Add new item to cart
      cartItem = await db.Cart.create({
        userId,
        productId,
        quantity
      });
    }

    // Get updated cart item with product details
    const cartItemWithProduct = await db.Cart.findOne({
      where: { id: cartItem.id },
      include: [{
        model: db.Product,
        attributes: ['id', 'name', 'price', 'description']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Product added to cart successfully',
      data: { cartItem: cartItemWithProduct }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to cart',
      error: error.message
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.body.userId || "temp-user-123";

    const cartItem = await db.Cart.findOne({
      where: { id, userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await cartItem.destroy();
      return res.json({
        success: true,
        message: 'Item removed from cart'
      });
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: { cartItem }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating cart item',
      error: error.message
    });
  }
};

// Remove from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || "temp-user-123";

    const cartItem = await db.Cart.findOne({
      where: { id, userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from cart',
      error: error.message
    });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.body.userId || "temp-user-123";

    await db.Cart.destroy({
      where: { userId }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error clearing cart',
      error: error.message
    });
  }
};
// Buy Now - Add to cart and proceed to checkout
exports.buyNow = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.body.userId || "temp-user-123";

    // Add item to cart first
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Clear existing cart and add this single item
    await db.Cart.destroy({ where: { userId } });
    
    const cartItem = await db.Cart.create({
      userId,
      productId,
      quantity
    });

    const cartItemWithProduct = await db.Cart.findOne({
      where: { id: cartItem.id },
      include: [{
        model: db.Product,
        attributes: ['id', 'name', 'price', 'description']
      }]
    });

    res.status(201).json({
      success: true,
      message: 'Ready for checkout',
      data: { 
        cartItem: cartItemWithProduct,
        checkoutReady: true
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error processing Buy Now',
      error: error.message
    });
  }
};