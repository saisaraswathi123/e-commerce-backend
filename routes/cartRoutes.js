const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Get cart items
router.get("/", cartController.getCart);

// Add to cart
router.post("/add", cartController.addToCart);

// Buy Now
router.post("/buy-now", cartController.buyNow);

// Update cart item quantity
router.put("/update/:id", cartController.updateCartItem);

// Remove from cart
router.delete("/remove/:id", cartController.removeFromCart);

// Clear entire cart
router.delete("/clear", cartController.clearCart);

module.exports = router;