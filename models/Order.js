const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered'),
        defaultValue: 'pending'
    },
    paymentDetails: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Order.belongsTo(User, { as: 'Customer' });
User.hasMany(Order, { foreignKey: 'CustomerId' });

const OrderProduct = sequelize.define('OrderProduct', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

module.exports = { Order, OrderProduct };
