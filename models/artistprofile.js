module.exports = function (sequelize, DataTypes) {
    const ArtistProfile = sequelize.define('artist-profile', {
        aboutTheArtist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mediums: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inspiration: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  
        }, 
        achievements: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id:{
            type: DataTypes.NUMBER
        }
    //   role: {
    //       type: DataTypes.NUMBER,

    //   } 
    })
    return User;
}