const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../configs/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Service = sequelize.define('Service', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Normal', 'VIP'),
    allowNull: false
  }
});

const ServicePriceOption = sequelize.define('ServicePriceOption', {
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Hourly', 'Weekly', 'Monthly'),
    allowNull: false
  }
});

Category.hasMany(Service, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });

Service.hasMany(ServicePriceOption, { foreignKey: 'serviceId', onDelete: 'CASCADE' });
ServicePriceOption.belongsTo(Service, { foreignKey: 'serviceId' });

sequelize.sync();

module.exports = {
  User,
  Category,
  Service,
  ServicePriceOption,
  sequelize
};