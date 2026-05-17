const Item = require("../models/item");

// GET all items
const getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

// GET single item
const getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

// CREATE item
const createItem = async (req, res) => {
  try {
    console.log(req.body);

    const item = await Item.create(req.body);

    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {returnDocument: "after"});
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    } 
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
};

// DELETE item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully!." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};

module.exports = {
  getItems,
  getItem,  
  createItem,
  updateItem,
  deleteItem,
};  

