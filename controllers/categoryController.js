const { Category, Service } = require('../models');

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  try {
    await Category.update({ name }, { where: { id: categoryId } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const services = await Service.findAll({ where: { categoryId } });
    if (services.length > 0) {
      return res.status(400).json({ error: 'Category is not empty' });
    }
    await Category.destroy({ where: { id: categoryId } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };