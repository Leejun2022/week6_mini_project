"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "userKey",
        targetKey: "userKey",
      });
      this.belongsTo(models.Posts, {
        foreignKey: "postId",
        targetKey: "postId",
      });
      this.hasMany(models.Recomments, {
        foreignKey: 'commentId',
        sourceKey: 'commentId',
      });
    }
  }
  Comments.init(
    {
      commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userKey: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userKey",
        },
      },
      postId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
          model: "Users",
          key: "userKey",
        },
      },
      comment: { type: DataTypes.STRING, unique: true, allowNull: false },
      nickname: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
