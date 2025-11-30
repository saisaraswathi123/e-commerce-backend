const express = require("express");
const router = express.Router();

// Temporary simple routes
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Categories route is working!",
    data: {
      categories: [
        { id: '1', name: 'Action Figures' },
        { id: '2', name: 'Apparel' },
        { id: '3', name: 'Posters' }
      ]
    }
  });
});

router.get("/:id", (req, res) => {
  res.json({
    success: true,
    message: `Category details for ${req.params.id}`,
    data: { category: {} }
  });
});

module.exports = router;