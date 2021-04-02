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
        type: DataTypes.STRING,
        allowNull: false,
      },
      long: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return Rainbow;
  };
  