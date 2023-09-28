'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //Disease.hasMany(models.PatientDisease, {foreignKey: 'DiseaseId'})
      Disease.belongsToMany(models.Patient, {through: models.PatientDisease})

    }
    generateLevel(){
      if(this.level <= 4){
        return "Aman"
      }else if(this.level < 7 && this.level > 4){
        return "Perlu Bed Rest"
      }else{
        return "Rujuk Rumah Sakit"
      }
    }
  }
  Disease.init({
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    treatment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};