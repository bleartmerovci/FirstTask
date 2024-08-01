const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Review = sequelize.define('Review', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

Review.belongsTo(User, { as: 'Customer' });
User.hasMany(Review, { foreignKey: 'CustomerId' });

Review.belongsTo(Product);
Product.hasMany(Review);

module.exports = Review;
