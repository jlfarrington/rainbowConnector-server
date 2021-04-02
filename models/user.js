module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
      },
    });
    return User;
  };
  