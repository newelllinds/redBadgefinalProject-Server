const { DataTypes } = require('sequelize');
const db = require('../db');

// module.exports = function (sequelize, DataTypes) {
    // const User = sequelize.define('user', {

    const User = db.define('user', {
        // firstName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // lastName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
          type: DataTypes.INTEGER
        } 
    });
    module.exports = User;
