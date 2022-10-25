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
      commentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Comments",
          key: "CommentId",
        },
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
