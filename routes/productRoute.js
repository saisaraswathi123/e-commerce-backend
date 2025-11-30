const express = require("express");
const router = express.Router();

// Temporary simple routes - we'll add controllers later
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Products route is working!",
    data: {
      products: [
        { id: '1', name: 'Naruto Figurine', price: 29.99 },
        { id: '2', name: 'Attack on Titan Jacket', price: 59.99 }
      ]
    }
  });
});

router.get("/category/:categoryId", (req, res) => {
  res.json({
    success: true,
    message: `Products for category ${req.params.categoryId}`,
    data: { products: [] }
  });
});

router.get("/:id", (req, res) => {
  res.json({
    success: true,
    message: `Product details for ${req.params.id}`,
    data: { product: {} }
  });
});

module.exports = router;