const { Service, ServicePriceOption } = require('../models');

const createService = async (req, res) => {
  const { categoryId } = req.params;
  const { name, type, priceOptions } = req.body;
  try {
    const service = await Service.create({ categoryId, name, type });

    if (priceOptions && priceOptions.length > 0) {
      for (const option of priceOptions) {
        await ServicePriceOption.create({
          serviceId: service.id,
          duration: option.duration,
          price: option.price,
          type: option.type
        });
      }
    }

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServices = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const services = await Service.findAll({ where: { categoryId } });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateService = async (req, res) => {
  const { serviceId } = req.params;
  const { name, type, priceOptions } = req.body;
  try {
    await Service.update({ name, type }, { where: { id: serviceId } });

    if (priceOptions && priceOptions.length > 0) {
      await ServicePriceOption.destroy({ where: { serviceId } });

      for (const option of priceOptions) {
        await ServicePriceOption.create({
          serviceId,
          duration: option.duration,
          price: option.price,
          type: option.type
        });
      }
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteService = async (req, res) => {
  const { serviceId } = req.params;
  try {
    await Service.destroy({ where: { id: serviceId } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createService, getServices, updateService, deleteService };