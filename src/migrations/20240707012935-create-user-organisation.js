'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserOrganisations', {
         id: {
           allowNull: false,
           autoIncrement: true,
           unique: true,
           type: Sequelize.INTEGER,
         },
         UserId: {
           type: Sequelize.UUID,
           references: {
             model: "Users",
             key: "userId",
           },
         },
         OrganisationId: {
           type: Sequelize.UUID,
           references: {
             model: "Organisations",
             key: "orgId",
           },
         }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserOrganisations');
  }
};