"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Recomments", {
      recommentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },


      userKey: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userKey",
        },
        allowNull: false,
        onDelete: "cascade",
      },
      commentId: {
        type: Sequelize.INTEGER,

        references: {
          model: "Comments",
          key: "CommentId",
        },

        allowNull: false,
        onDelete: "cascade",
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Recomments");
  },
};
