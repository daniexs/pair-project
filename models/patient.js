'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patient.belongsTo(models.User)
      //Patient.hasMany(models.PatientDisease,{foreignKey: 'PatientId'})
      Patient.belongsToMany(models.Disease, {through: models.PatientDisease})
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    age: DataTypes.INTEGER,
    dateOfBirth: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};