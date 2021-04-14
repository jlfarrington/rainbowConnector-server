module.exports = (sequelize, DataTypes) => {
    const Rainbow = sequelize.define("rainbow", {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      long: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
    });
    return Rainbow;
  };
  