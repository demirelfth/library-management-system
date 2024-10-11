module.exports = (sequelize, DataTypes) => {
    const Borrow = sequelize.define('Borrow', {
        borrow_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        return_date: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    
    return Borrow;
};