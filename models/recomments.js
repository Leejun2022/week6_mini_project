"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recomments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'userKey',
        targetKey: 'userKey',
      });
      this.belongsTo(models.Comments, {
        foreignKey: 'commentId',
        targetKey: 'commentId',
      });
      this.belongsTo(models.Recomments, {
        foreignKey: "recommentId",
        targetKey: "recommentId",
      });
    }
  }
  Recomments.init(
    {
      recommentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userKey:{
      type: DataTypes.INTEGER,

        references: {
          model: "Users",
          key: "userKey",
        },
    },
      commentId: { 
        type: DataTypes.INTEGER,
         allowNull: false,
        references: {
          model: "Comments",
          key: "commentId",
        }, },
      comment: { type: DataTypes.STRING, unique: true, allowNull: false },
      nickame: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {
      sequelize,
      modelName: "Recomments",
    }
  );
  return Recomments;
};
