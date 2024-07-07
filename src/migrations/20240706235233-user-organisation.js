'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
   
     */
       await queryInterface.createTable("users", {
         id: {
           allowNull: false,
           autoIncrement: true,
           unique: true,
           type: Sequelize.INTEGER,
         },
         userId: {
           type: Sequelize.UUID,
           references: {
             model: "User",
             key: "userId",
           },
         },
         orgId: {
           type: Sequelize.UUID,
           references: {
             model: "Organisation",
             key: "orgId",
           },
           createdAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
           updatedAt: {
             allowNull: false,
             type: Sequelize.DATE,
           },
         },
       });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
