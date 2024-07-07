import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

class UserOrganisation extends Model {}

export default (sequelize: Sequelize) => {
  UserOrganisation.init({
    userId: DataTypes.UUID,
    orgId: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'UserOrganisation',
  });

  return UserOrganisation;
};
