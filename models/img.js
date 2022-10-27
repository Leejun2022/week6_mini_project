"use strict";
const { Model } = require("sequelize");

/**
 * @param {import("sequelize").Sequelize} sequelize - Sequelize
 * @param {import("sequelize").DataTypes} DataTypes - Sequelize Column DataTypes
 * @return {Model} - Sequelize Model
 * **/
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
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
      this.hasMany(models.Comments, {
        foreignKey: "postId",
        sourceKey: "postId",
      });
    }
  }

  Images.init(
    {
      imageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        required: true,
        autoIncrement: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "userKey",
        },
      },
      userKey: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userKey",
        },
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        required: true,
      },
    },
    {
      sequelize,
      modelName: "Images",
    }
  );
  return Images;
};
