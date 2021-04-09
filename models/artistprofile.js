const { DataTypes } = require('sequelize');
const db = require('../db');

// module.exports = function (sequelize, DataTypes) {
    // const ArtistProfile = sequelize.define('artist-profile', {
const ArtistProfile = db.define('artistprofile', {
        about_the_artist: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mediums: {
            type: DataTypes.STRING,
            allowNull: true
        },
        inspiration: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        achievements: {
            type: DataTypes.STRING,
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // user_id:{
        //     type: DataTypes.NUMBER
        // }
});
module.exports = ArtistProfile;