'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserOrganisation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserOrganisation.belongsTo(models.Organisation, {
        foreignKey: 'OrganisationId',
        targetKey: 'orgId', // Assuming 'orgId' is the primary key of Organisation
      });
    }
  }
  UserOrganisation.init({
    OrganisationId:DataTypes.UUID,
    UserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'UserOrganisation',
    timestamps:false
  });
  return UserOrganisation;
};