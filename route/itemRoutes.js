const express = require("express");
const router = express.Router();

const {
  getItems,
  getCreateForm,
  getEditForm,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemControllers");

// Read List
router.get("/", getItems);

// Create Routes
router.get("/add", getCreateForm);
router.post("/", createItem);

// Edit Routes
router.get("/edit/:id", getEditForm);
router.post("/edit/:id", updateItem); // Using POST here makes standard HTML forms happy without method-override plugins

// Delete Route
router.get("/delete/:id", deleteItem); // Simple GET trigger for native anchor tags
router.delete("/:id", deleteItem);     // Kept for API clients/AJAX calls

module.exports = router;