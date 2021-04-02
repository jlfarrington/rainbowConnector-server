module.exports = (sequelize, DataTypes) => {
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
    return Comment;
}