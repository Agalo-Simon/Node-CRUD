const Item = require("../models/item");

// ==========================================
// 1. READ OPERATIONS
// ==========================================

// GET all items (Home Page)
const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render("index", { items, title: "Home" });
  } catch (error) {
    res.status(500).send("Error loading items");
  }
};

// GET single item details
const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("details", { item, title: "Item Details" });
  } catch (error) {
    res.status(500).send("Error loading item details");
  }
};

// ==========================================
// 2. CREATE OPERATIONS
// ==========================================

// GET the blank creation form page
const getCreateForm = (req, res) => {
  // Pass errorMessage as null so the view knows there is no error initially
  res.render("add", { title: "Create Item", errorMessage: null, oldInput: {} });
};

// POST process form submission and save to DB
const createItem = async (req, res) => {
  try {
    const { name } = req.body;

    // 1. Look for an existing item with the same name (case-insensitive search)
    const existingItem = await Item.findOne({
      name: { $regex: new RegExp("^" + name.trim() + "$", "i") },
    });

    // 2. If it exists, block the creation and re-render the form with an error
    if (existingItem) {
      return res.render("add", {
        title: "Create Item",
        errorMessage: "An item with this name already exists in the database.",
        oldInput: req.body, // Pass back what they wrote so they don't have to re-type everything
      });
    }

    // 3. If it is unique, create it safely
    await Item.create(req.body);
    res.redirect("/items");
  } catch (error) {
    console.error(error);
    res.status(500).render("add", {
      title: "Create Item",
      errorMessage: "Error saving item: " + error.message,
      oldInput: req.body,
    });
  }
};

// ==========================================
// 3. UPDATE OPERATIONS
// ==========================================

// GET edit form populated with existing data
const getEditForm = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("edit", { item, title: "Edit Item" });
  } catch (error) {
    res.status(500).send("Error loading edit form");
  }
};

// POST/PUT save updated data
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.redirect("/items");
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
};

// ==========================================
// 4. DELETE OPERATION
// ==========================================

// GET or POST delete execution
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.redirect("/items");
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

module.exports = {
  getItems,
  getItem,
  getCreateForm,
  createItem,
  getEditForm,
  updateItem,
  deleteItem,
};
