const Sequelize = require("sequelize");

const sequelize = new Sequelize('rainbow-connector', 'postgres', 'password1', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(
    function () {
      console.log("Connected to rainbow-connector database");
    },
    function (err) {
      console.log(err);
    }
  )

const User = sequelize.import("./models/user");
const Rainbow = sequelize.import("./models/rainbow");
const Comment = sequelize.import("./models/comment");

User.hasMany(Rainbow);
Rainbow.belongsTo(User);

Rainbow.hasMany(Comment);
Comment.belongsTo(Rainbow);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = sequelize;
