const Item = require("../models/item");

// GET all items
exports.getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

// GET single item
exports.getItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
};

// CREATE item
exports.createItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
};

// UPDATE item
exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
};

// DELETE item
exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};