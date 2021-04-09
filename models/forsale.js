const { DataTypes } = require('sequelize');
const db = require('../db');

const SaleListing = db.define('forsale', {
    image: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.INTEGER
    },
    pickup_info: {
        type: DataTypes.STRING
    }
});
module.exports = SaleListing;