module.exports = function (sequelize, DataTypes) {
    const forSale = sequelize.define('for-sale', {
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.NUMBER,
            allowNull: false,
        }, 
        pickUpInfo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.NUMBER
        }
    //   role: {
    //       type: DataTypes.NUMBER,

    //   } 
    })
    return User;
}