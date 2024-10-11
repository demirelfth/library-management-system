module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
        quantity: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    });
  
    return Rating;
};