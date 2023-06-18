const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_LINK)

sequelize.authenticate().then(
    function () {
      console.log("Connected to rainbow-connector database");
    },
    function (err) {
      console.log(err);
    }
  )

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

const Comment = sequelize.define('comment', {
  body: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
  }
});

User.hasMany(Rainbow);
Rainbow.belongsTo(User);

Rainbow.hasMany(Comment);
Comment.belongsTo(Rainbow);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = sequelize;
