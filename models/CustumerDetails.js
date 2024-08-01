const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const CustomerDetails = sequelize.define('CustomerDetails', {
    contactNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

CustomerDetails.belongsTo(User);
User.hasOne(CustomerDetails);

module.exports = CustomerDetails;
